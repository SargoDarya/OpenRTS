/** @namespace */
var GUI = GUI || {};
GUI.TextArea = function(){
  GUI.TextLabel.call(this);
  this._backgroundColor = "rgba(0, 0, 0, 0.5)";
  this._text = "";
  this._breakOn = "\n";
  this._padding = 5;
  this._dirty = true;
};

GUI.TextArea.prototype = new GUI.DisplayObject;
GUI.TextArea.prototype.constructor = GUI.TextArea;

GUI.TextArea.prototype.text = function(text) {
  if(typeof text === 'string') {
    this._text = text;
    this._dirty = true;
    this.invalidateRect();
  }
  return this._text;
};

GUI.TextArea.prototype.color = function(color) {
  if(typeof color === 'string') {
    this._color = color;
    this._dirty = true;
    this.invalidateRect();
  }
  return this._color;
};

GUI.TextArea.prototype.render = function()
{
  if(!this._dirty) return null;
  
  var pos = GUI.Display.getTLPosition(this);
  
  this._ctx.fillStyle = this._backgroundColor;
  this._ctx.fillRect(pos.x, pos.y, this._size.width, this._size.height);
  
  this._ctx.fillStyle = this._color;
  var lines = this._text.split(this._breakOn);
  var currentLine = 1;
  for(var lIdx=0; lIdx<lines.length; lIdx++) {
    var words = lines[lIdx].split(' ');
    var idx = 1;
    while (words.length > 0 && idx <= words.length)
    {
      var str = words.slice(0,idx).join(' ');
      var w = this._ctx.measureText(str).width;
      if ( w > this._size.width )
      {
        if (idx==1)
        {
            idx=2;
        }
        this._ctx.fillText(
          words.slice(0,idx-1).join(' '), 
          pos.x, 
          pos.y + (this._lineHeight*currentLine)
        );
        currentLine++;
        words = words.splice(idx-1);
        idx = 1;
      } else {
        idx++;
      }
    }
    if (idx > 0) {
      this._ctx.fillText( 
        words.join(' '), 
        pos.x, 
        pos.y + (this._lineHeight*currentLine)
      );
    }
    currentLine++;
  }
  
  GUI.DisplayObject.prototype.render.call(this);
  this._dirty = false;
};