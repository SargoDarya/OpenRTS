var StateManager = function()
{
  this.init();
};

StateManager.prototype.init = function() 
{
  this.states = [];
};

StateManager.prototype.pushState = function(state)
{
  if(!GameState.prototype.isPrototypeOf(state)) {
    console.log('Not a valid GameState');
    return false;
  }
  state.init();
  this.states.push(state);
  return true;
};

StateManager.prototype.popState = function()
{
  return this.states.pop();
};

StateManager.prototype.getActiveState = function()
{
  return this.states[this.states.length-1];
};