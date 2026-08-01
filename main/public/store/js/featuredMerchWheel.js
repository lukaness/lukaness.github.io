// This is for the merch wheels
// Image Wheel Carousel
// Usage:
// const wheel = new ImageWheel({
//     images: [
//         {
//             image: "https://picsum.photos/400/250?1",
//             link: "https://google.com"
//         },
//         {
//             image: "https://picsum.photos/400/250?2",
//             link: "https://youtube.com"
//         }
//     ]
// });

class ImageWheel {

    constructor(options = {}) {
        this.images = options.images || [];
        this.index = 0;

        this.create();
        this.update();
    }

    create() {

        // Inject CSS
        const style = document.createElement("style");
        style.textContent = `
        .iw-container{
            position:relative;
            width:700px;
            height:320px;
            margin:20px auto;
            overflow:hidden;
            border-radius:16px;
            background:#111;
            user-select:none;
        }

        .iw-track{
            display:flex;
            transition:.35s;
            height:100%;
        }

        .iw-slide{
            min-width:100%;
            display:flex;
            align-items:center;
            justify-content:center;
        }

        .iw-slide img{
            width:100%;
            height:100%;
            object-fit:cover;
            cursor:pointer;
        }

        .iw-arrow{
            position:absolute;
            top:50%;
            transform:translateY(-50%);
            width:50px;
            height:50px;
            border:none;
            border-radius:50%;
            background:rgba(0,0,0,.6);
            color:white;
            font-size:28px;
            cursor:pointer;
            z-index:5;
        }

        .iw-arrow:hover{
            background:#333;
        }

        .iw-left{
            left:12px;
        }

        .iw-right{
            right:12px;
        }
        `;
        document.head.appendChild(style);

        this.container = document.createElement("div");
        this.container.className = "iw-container";

        this.track = document.createElement("div");
        this.track.className = "iw-track";

        this.container.appendChild(this.track);

        this.images.forEach(item => {

            const slide = document.createElement("div");
            slide.className = "iw-slide";

            const img = document.createElement("img");
            img.src = item.image;

            img.onclick = () => {
                if(item.link)
                    window.open(item.link, "_blank");
            };

            slide.appendChild(img);
            this.track.appendChild(slide);

        });

        const left = document.createElement("button");
        left.className = "iw-arrow iw-left";
        left.innerHTML = "❮";

        const right = document.createElement("button");
        right.className = "iw-arrow iw-right";
        right.innerHTML = "❯";

        left.onclick = () => this.prev();
        right.onclick = () => this.next();

        this.container.appendChild(left);
        this.container.appendChild(right);

        document.body.appendChild(this.container);

        // Mouse wheel
        this.container.addEventListener("wheel", e=>{
            e.preventDefault();

            if(e.deltaY > 0)
                this.next();
            else
                this.prev();
        });

        // Keyboard
        document.addEventListener("keydown", e=>{
            if(e.key==="ArrowLeft")
                this.prev();

            if(e.key==="ArrowRight")
                this.next();
        });

    }

    update(){
        this.track.style.transform =
            `translateX(${-this.index*100}%)`;
    }

    next(){
        this.index++;
        if(this.index>=this.images.length)
            this.index=0;

        this.update();
    }

    prev(){
        this.index--;
        if(this.index<0)
            this.index=this.images.length-1;

        this.update();
    }

}

// Example
new ImageWheel({
    images:[
        {
            image:"../assets/bread.png",
            link:"https://minecraft.wiki/w/Bread"
        },
        {
            image:"../assets/ytlogo.png",
            link:"https://youtube.com/@itslukaness_"
        }
    ]
});
