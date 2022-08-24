class Rcanvas extends ELEM{
    constructor(){
        super("div",0,0,"position:relative;width:100vw;height:100vh;");
        let that = this;
        let canvas = this.add("canvas").e;
        let ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.ctx = ctx;
        window.addEventListener("resize",()=>{
            that.resize();
        });
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


class ConfederateCross{
    slope = 1.62;
    forkstate = 0;
    constructor(container,rx,ry,rvx,rvy,rw){
        this.rx  = rx;
        this.ry  = ry;
        this.rvx = rvx;
        this.rvy = rvy;
        this.rw  = rw;
    }
    tick(dt){
        let {rvx,rvy,rw} = this;
        this.rx += thix.rvx*dt*(rw*10);
        this.ry += this.rvy*dt*(rw*10);//velocity proportional to banner size to prevent locking
        this.rw *= 1+dt/2;
        if(this.forkstate === 0){
            
        }
        if(this.forkstate !== 2 && ){

        }
        if(this.isOutofScreen()){

            //teleport over
            //but lazy so just bounce

        }
    }
    isOutofScreen(){
        let [nw,ne,sw,se,bw] = this.getCornerX();
        let left = (nw<sw?nw:sw)-bw;
        let right = (ne>se?ne:se)+bw;
        return right < 0 || this.container.canvas.width < left;
    }
    render(){
        //first draw the banners

    }
    getCornerX(){
        let {container,rx,ry,rw,slope} = this;
        let {canvas} = container;
        let x = rx*canvas.width;
        let y = ry*canvas.height;
        let nw = x-y*slope;
        let ne = x+y*slope,0;
        let sw = x-(h-y)*slope;
        let se = x+(h-y)*slope;
        let bw = rw*width;//banner width
        return [nw,ne,sw,se,bw];
    }
    drawBanner(){
        let {container,x,y,r,slope} = this;
        let {canvas,ctx} = container;

        //x coordinates
        let [nw,ne,sw,se] = this.getCornerX();
        ctx.beginPath();
        ctx.moveTo(nw,0);
    }
}


class Offensive extends ELEM{
    constructor(){
        super();
    }
}
