Array.prototype.remove = function(obj) {
  for(var i=0; i<this.length; i++) {
    if(this[i] === obj) {
      this.splice(i, 1);
      return true;
    };
  };
  return false;
};