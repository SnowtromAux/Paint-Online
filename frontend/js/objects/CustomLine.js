class CustomLine{
    constructor(default_width , line_conf , type , color){
        this.default_width = default_width;
        this.line_conf = line_conf;
        this.type = type;
        this.color = color;

        this.canvas = game_canvas;
        this.ctx = game_ctx;
        
        this.width = default_width * line_conf.size;
        this.dashed = (type == "rubber") ? false : line_conf.dashed;

        this.start_point = {};
        this.lines = [];
    }

    startLine(x , y){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.lineWidth = this.width;

        if(this.dashed)
            this.ctx.setLineDash([DASH_LENGTH * this.line_conf.size , GAP_LENGTH * this.line_conf.size]);
        else
            this.ctx.setLineDash([]);

        this.ctx.moveTo(x , y);
        this.start_point = {x: x , y: y};

        this.ctx.fillRect(x - this.width / 2 , y - this.width / 2 , this.width , this.width);
    }

    updateLine(x , y){
        this.ctx.lineTo(x , y);
        this.ctx.stroke();
        this.lines.push({x: x , y: y});
    }

    finishLine(){
        this.ctx.closePath();
    }
}