module.exports = (function (){

  function Vector(x,y){
    this.x = x;
    this.y = y;
  }

  Vector.prototype.plus = function(other){
    return new Vector(this.x + other.x, this.y + other.y);
  };

  function Grid(width,height){
    this.space = new Array(width*height);
    this.width = width;
    this.height = height;
  }

  Grid.prototype.isInside = function(vector){
    return vector.x >= 0 
      && vector.x < this.width
      && vector.y >= 0
      && vector.y < this.height;
  };

  Grid.prototype.get = function(vector){
    return this.space[vector.x + vector.y * this.width];
  };

  Grid.prototype.set = function(vector, value){
    this.space[vector.x + vector.y * this.width] = value;
  };

  var directions = {
    'n':  new Vector( 0,-1),
    'ne': new Vector( 1,-1),
    'e':  new Vector( 1, 0),
    'se': new Vector( 1, 1),
    's':  new Vector( 0, 1),
    'sw': new Vector(-1, 1),
    'w':  new Vector(-1, 0),
    'nw': new Vector(-1,-1),
  };
  
  function randomElement(array){
    return array[Math.floor(Math.random() * array.length)];
  }

  var directionNames = 'n ne e se s sw w nw'.split(' ');

  function BouncingCritter(){
    this.direction = randomElement(directionNames);
  }

  BouncingCritter.prototype.act = function(view){
    if(view.look(this.direction) != ' ')
      this.direction = view.find(' ') || 's';
    return {type: 'move', direction: this.direction};
    
  };

  function elementFromChar(legend,ch){
    if(ch === " ") return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
  }

  function World(map,legend){
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line,y) {
      Array.from(line).forEach(function(ch,x){
        grid.set(new Vector(x,y),elementFromChar(legend,ch));
      });
    });
  }

  World.prototype.toString = function() {
    function charFromElement(element){
      if(element == null) return " ";
      else return element.originChar;
    }
    var output = "";
    for(var y = 0; y < this.grid.height; y++){
      for(var x = 0; x < this.grid.width; x++){
        var el = this.grid.get(new Vector(x,y));
        output += charFromElement(el);
      }
      output += "\n";
    }
    debugger;
    return output;
  };

  World.prototype.turn = function (){
    var acted = [];
    this.grid.forEach(function(critter,vector){
      if(critter.act && !acted.includes(critter)){
        acted.push(critter);
        this.letAct(critter,vector);
      }
    },this);
  };

  function Wall() {}

  return { 
    BouncingCritter, 
    Grid, 
    Vector,
    Wall,
    World, 
    elementFromChar, 
  };
});
