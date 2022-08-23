class Rcanvas extends ELEM{
    constructor(){
        super("div",0,0,"position:relative;width:100vw;height:100vh;");
        let canvas = this.add("canvas").e;
        let ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.ctx = ctx;
    }
    initialize(){
        this.resize();
    }
    resize(){
        let {canvas} = this;
        canvas.width = this.e.offsetWidth;
        canvas.height = this.e.offsetHeight;
    }
};


class ConfedBanner{
    constructor(r,slope,w,starPosition,vx,container){
        this.r = r;
        this.slope = slope;
        this.w = w;
        this.starPosition = starPosition;
        this.vx = vx;
        this.container = container;
    }
    tick(dt){
        let {w,r,vx} = this;
        //velocity proportional to w
        this.r += (dt/5000)*(w*10)*vx;
        //square proportional
        this.w *= 1+(dt/2000);
        this.starPosition += dt/2000;
        if(r < -2 || r > 2){
            //delete it
            this.container.removeElement(this);
        }
        //there is a slight chance that the banner will fork itself
        if(Math.random() < 0.002){
            this.fork();
        }
    }
    fork(){
        let {r,slope,w,starPosition,vx,container} = this;
        container.addElement(new ConfedBanner(r,slope,0.05,starPosition,-vx,container));
    }
    render(){
        let {r,slope,w:relativeBannerWidth,starPosition,vx,container} = this;
        let {canvas,ctx} = container;
        let w = canvas.width;
        let h = canvas.height;
        //drawing white portion
        let bw = w*relativeBannerWidth;
        let x = r*w;//top center x
        ctx.beginPath();
        ctx.moveTo(x-bw/2,0);
        ctx.lineTo(x-bw/2+h*slope,h);
        ctx.lineTo(x+bw/2+h*slope,h);
        ctx.lineTo(x+bw/2,0);
        ctx.closePath();
        ctx.fillStyle = "#d1c8c9";
        ctx.fill();
        
        /*console.log(x-bw/2,0);
        console.log(x-bw/2+h*slope,h);
        console.log(x+bw/2+h*slope,h);
        console.log(x+bw/2,0);
        debugger;*/
        
        //drawing the inner blue portion
        ctx.beginPath();
        ctx.moveTo(x-0.8*bw/2,0);
        ctx.lineTo(x-0.8*bw/2+h*slope,h);
        ctx.lineTo(x+0.8*bw/2+h*slope,h);
        ctx.lineTo(x+0.8*bw/2,0);
        ctx.closePath();
        ctx.fillStyle = "#00004a";
        ctx.fill();
        
        //drawing the stars
        {
            let starInterval = Math.abs(bw/slope);//y interval
            let y = (starPosition%1-1)*starInterval;
            for(; y < h+starInterval*2; y += starInterval){
                let x = r*w+y*slope;
                //draw indivisual stars
                
                this.drawStar(x,y,bw*0.5);
            }
        }
    }
    drawStar(x,y,width){
        let {container} = this;
        let {canvas,ctx} = container;
        let r = width/2;
        let n = 5;
        let skips = 2;
        let verts = [];//k graphs that contain cycles
        for(let i = 0; i < n; i++){
            let radian = i/n*Math.PI*2;
            //starts from the top [0,-1] and clockwise
            verts.push([Math.sin(radian)*r,-Math.cos(radian)*r,false]);//marking means passed
        }
        for(let i = 0; i < n; i++){
            if(verts[i][2])continue;
            ctx.beginPath();
            //graph traversal fuck yeah!!!!
            for(let j = i; !verts[j][2]; j = (j+skips)%n){
                verts[j][2] = true;
                //console.log(verts[j][0]+x,verts[j][1]+y);
                ctx.lineTo(verts[j][0]+x,verts[j][1]+y);
            }
            ctx.closePath();
            ctx.fillStyle = "#d1c8c9";
            ctx.fill();
        }
        //debugger;
    }
}

class Offensive extends Rcanvas{
    constructor(){
        super();
        let that = this;
        //                               r,slope,w,  starPosition,vx,container
        this.addElement(new ConfedBanner(0,1.62, 0.1,0,          -1, this));
        this.addElement(new ConfedBanner(1,-1.62,0.1,0,          -1, this));
        //animate
        let start = 0;
        let an = function(t){
            if(start === 0)start = t;
            let dt = t - start;
            start = t;
            that.tick(dt);
            that.render();
            requestAnimationFrame(an);
        }
        requestAnimationFrame(an);
    }
    elements = new Map();//yea right! map to keep track of object! real efficient
    //fuck thsi is gonna contain interfaces if this were go
    //fuck go but I love go I'm gonna learn from you so much
    addElement(el){
        this.elements.set(el,true);
    }
    removeElement(el){
        this.elements.delete(el);
    }
    tick(dt){
        for(let [elem,_] of this.elements){
            elem.tick(dt);
        }
    }
    render(){
        let {canvas, ctx} = this;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let [elem,_] of this.elements){
            elem.render();
        }
    }
}


let body = new ELEM(document.body);
let main = async function(){
    let off = body.add(new Offensive());
    off.initialize();
}

main();




