var practice = function(){
    var ctx,width,height;
    var particle = [];
    
    var GRAVITY_X = 0;
    var GRAVITY_Y = 0.5;
    
    var BOUNCINESS = 0.8;
    var FRICTION = 1.01;
    var WALL_STICK = false;
    var WALL_BOUNCE = true;
    var STICKNESS = 0;
    
    var run = function(){
        ctx.clearRect(0,0,width,height);
        ctx.fillStyle = "#444";
        //prototypeを実行
        for(var i = 0;i < particle.length;i++){
            particle[i].draw();
        }
        
        requestAnimationFrame(run);
    };

    var Particle = function(x,y,size){
        this.size = size;
        this.x = x;
        this.y = y;

        this.fx = 0;
        this.fy = 0;
        this.dx = 0;
        this.dy = 0;
    };
    
 
    Particle.prototype.draw = function(){
        this.fx += GRAVITY_X;
        this.fy += GRAVITY_Y;
        this.x += this.fx;
        this.y += this.fy;
        
        //X方向の壁の当たり判定
        if(this.x < this.size){
            if(WALL_STICK){
                this.x = this.size;
                this.fy /= FRICTION * STICKNESS;
            }
            else if(WALL_BOUNCE){
                this.x = this.size;
                this.fx = this.fx * (-1) * BOUNCINESS;
                this.fy /= FRICTION;
            }
            else{
                this.dx += (this.size - this.x);
            }
        }
        else if(this.x > width - this.size){
            if(WALL_STICK){
                this.x = width - this.size;
                this.fy /= FRICTION * STICKNESS;
            }
            else if(WALL_BOUNCE){
                this.x = height - this.size;
                this.fx = this.fx * (-1) * BOUNCINESS;
                this.fy /= FRICTION;
            }
            else{
                this.dx += (this.x - width + this.size);
            }
        }
        
        //Y方向の壁の当たり判定
        if(this.y < this.size){
            if(WALL_STICK){
                this.y = this.size;
                this.fx /= FRICTION * STICKNESS;
            }
            else if(WALL_BOUNCE){
                this.y = this.size;
                this.fy = this.fy * (-1) * BOUNCINESS;
                this.fx /= FRICTION;
            }
            else{
                this.dy += (this.size - this.y);
            }
        }
        else if(this.y > height - this.size){
            if(WALL_STICK){
                this.y = height - this.size;
                this.fx /= FRICTION * STICKNESS;
            }
            else if(WALL_BOUNCE){
                this.y = height - this.size;
                this.fy = this.fy * (-1) * BOUNCINESS;
                this.fx /= FRICTION;
            }
            else{
                this.dy += (this.y - height + this.size);
            }
        }
        
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
 
    };
    
    return{
        init:function(cvs,w,h){
            var canvas = document.getElementById(cvs);
            ctx = canvas.getContext("2d");
            
            width = canvas.width = w;
            height = canvas.height = h;
                       
            for(var i = 0;i < 10;i++){
                var px = Math.random() * width;
                var py = Math.random() * height;
                particle.push(new Particle(px,py,10));
            }
            
            run();
        },
        stop:function(){
        }
    };
}();

practice.init("canvas",400,400);