function startRectangle(c, ev) {
  let color;
  if (color1.selected) {
    color = ev.button == 0 ? color1.color : color2.color;
  } else if (color2.selected) {
    color = ev.button == 0 ? color2.color : color1.color;
  } else {
    color = ev.button == 0 ? color1.color : color2.color;
  }
  const image_data = c.ctx.getImageData(0, 0, c.canvas_width, c.canvas_height);
  c.cur_figure = new Rectangle(line_conf, color, image_data);
  c.cur_figure.startRectangle(ev.offsetX, ev.offsetY);

  c.updateCanvas(c.cur_canvas_data);
  socket.emit("create-figure", player.party.code, c.cur_canvas_data);
}

function updateRectangle(c, ev) {
  if (!c.cur_figure) return;
  c.ctx.clearRect(0, 0, c.canvas_width, c.canvas_height);
  c.cur_figure.updateRectangle(ev.offsetX, ev.offsetY);

  c.updateCanvas(c.cur_canvas_data);
  socket.emit("update-figure", player.party.code, c.cur_canvas_data);
}

function finishRectangle(c, ev) {
  if (!c.cur_figure) return;
  c.cur_figure.finishRectangle(ev.offsetX, ev.offsetY);

  c.finishFigure(c.cur_canvas_data);
  socket.emit("finish-figure", player.party.code, c.cur_canvas_data);

  c.cur_figure = undefined;
}
