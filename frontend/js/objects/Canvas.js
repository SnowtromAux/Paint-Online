class Canvas{
    constructor(){
        this.canvas = game_canvas;
        this.ctx = game_ctx;
        this.canvas_width = C_WIDTH;
        this.canvas_height = C_HEIGHT;
        this.zoom = 100;
        
        this.cur_canvas_data = undefined;
        this.all_canvas_data = [this.ctx.getImageData(0 , 0 , this.canvas_width , this.canvas_height)];
        this.cur_canvas_index = 0;
    }

    listenForSockets(){
        socket.on("figure-created" , (image_data) => {
            this.updateCanvas(image_data);
        });

        socket.on("figure-updated" , (image_data) => {
            this.updateCanvas(image_data);
        });
        
        socket.on("figure-finished" , (image_data) => {
            this.finishFigure(image_data);
        });

        socket.on("history-updated" , (history_index) => {
            this.cur_canvas_index = history_index;
            this.changeCanvas(this.all_canvas_data[this.cur_canvas_index]);
        });
    }

    listenForEvents(){
        this.canvas.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        this.canvas.addEventListener("mousedown" , (e) => {
            switch(tool){
                case PEN:
                case RUBBER:
                    startCustomLine(this , e);
                    break;
                default:
                    break;
            }

            this.cur_canvas_data = this.canvas.toDataURL('image/png');

            if(this.cur_figure){
                this.updateCanvas(this.cur_canvas_data);
                socket.emit("create-figure" , player.party.code , this.cur_canvas_data);
            }
        });

        this.canvas.addEventListener("mousemove" , (e) => {
            switch(tool){
                case PEN:
                case RUBBER:
                    updateCustomLine(this , e);
                    break;
                default:
                    break;
            }

            this.cur_canvas_data = this.canvas.toDataURL('image/png');
            
            if(this.cur_figure){
                this.updateCanvas(this.cur_canvas_data);
                socket.emit("update-figure" , player.party.code , this.cur_canvas_data);
            }

        });

        this.canvas.addEventListener("mouseup" , (e) => {
            switch(tool){
                case PEN:
                case RUBBER:
                    finishCustomLine(this , e);
                    break;
                default:
                    break;
            }

            if(tool != NONE){
                this.finishFigure(this.cur_canvas_data);
                socket.emit("finish-figure" , player.party.code , this.cur_canvas_data);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'z')
                if(this.cur_canvas_index > 0)
                    this.cur_canvas_index--;

            if (e.ctrlKey && e.key === 'y')
                if(this.cur_canvas_index < this.all_canvas_data.length - 1)
                    this.cur_canvas_index++;

            
            socket.emit("update-history" , player.party.code , this.cur_canvas_index);
            this.changeCanvas(this.all_canvas_data[this.cur_canvas_index]);
          });
    }

    updateCanvas(image_data){
        const img = new Image();
        img.src = image_data;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
        };
    }

    finishFigure(image_data){
        if(this.cur_canvas_index < this.all_canvas_data.length  - 1){
            const buf = this.all_canvas_data[this.cur_canvas_index];

            while(this.all_canvas_data.length > 0)
                this.all_canvas_data.pop();

            this.all_canvas_data.push(buf);
            this.cur_canvas_index = 0;
        }

        this.updateCanvas(image_data);
        this.all_canvas_data.push(this.ctx.getImageData(0 , 0 , this.canvas_width , this.canvas_height));
        this.cur_canvas_index++;
    }

    changeCanvas(image_data){
        this.ctx.putImageData(image_data , 0 , 0);
    }
    
}