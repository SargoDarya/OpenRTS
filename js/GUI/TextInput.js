/** @namespace */
var GUI = GUI || {};
GUI.TextInput = function() {
  GUI.TextLabel.call(this);
  this._backgroundColor = "rgba(255, 255, 255, 0.7)";
  this._caretColor = "#000000";
  this._caretIndex = 0;
  this._clearOnEnter = true;
  this._enterCallback = null;
};

GUI.TextInput.prototype = new GUI.TextLabel;
GUI.TextInput.prototype.constructor = GUI.TextInput;

GUI.TextInput.prototype.handleKeyDown = function(evt)
{
  if(evt.metaKey || evt.ctrlKey || evt.altKey) return null;
  
  switch (evt.which) {
    case 8: // Backspace
      this._text = this._text.substr(0,this._caretIndex-1) + this._text.substr(this._caretIndex);
      if(this._caretIndex-1 > 0) this._caretIndex--;
      break;
  
    case 13:
      if(typeof this._enterCallback == 'function') this._enterCallback(this._text);
      if(this._clearOnEnter) {
        this._text = '';
        this._caretIndex = 0;
      }
      break;
  
    case 37:
      if(this._caretIndex-1 > 0) this._caretIndex--;
      break;
    
    case 39:
      if(this._caretIndex < this._text.length) this._caretIndex++;
      break;

    default:
      var c = String.fromCharCode(evt.which);
      c = (evt.shiftKey) ? c : c.toLowerCase();
      this._text = this._text.substr(0,this._caretIndex) + c + this._text.substr(this._caretIndex);
      this._caretIndex++;
      break;
  }
  
  this._dirty = true;
  this.invalidateRect();
};

GUI.TextInput.prototype.render = function() 
{
  if(!this._dirty) return false;
  
  var pos = GUI.Display.getTLPosition(this);
  this._ctx.fillStyle = this._backgroundColor;
  this._ctx.fillRect(pos.x, pos.y, this._size.width, this._size.height);
  
  // Render Caret
  GUI.Display.Manager._ctx.font = this._fontSize+'px '+this._font;
  var strokePosX = pos.x+this._ctx.measureText(this._text.substr(0, this._caretIndex)).width;
  this._ctx.strokeStyle = this._caretColor;
  this._ctx.beginPath();
  this._ctx.lineWidth = 1;
  this._ctx.moveTo(strokePosX, pos.y+this._lineHeight-this._fontSize);
  this._ctx.lineTo(strokePosX, pos.y+this._lineHeight);
  this._ctx.stroke();
  this._ctx.closePath();
  
  GUI.TextLabel.prototype.render.call(this);
};