var expect = require('chai').expect;
var App = require('../index.js')();
 



describe("Basic Grid", function() {
  var Grid = App.Grid;
  var Vector = App.Vector;
  it("Makes a 5x5 grid", function() { 
    var testGrid = new Grid(5,5);
    expect(testGrid.width).to.equal(5);
    expect(testGrid.height).to.equal(5);
  });

  it("Makes an empty grid", function(){
    var testGrid = new Grid(5,5);
    expect(testGrid.get(new Vector(1,1))).to.equal(undefined);
  });

  it("Gets a set value",function(){
    var testGrid = new Grid(5,5);
    testGrid.set(new Vector(1,1),"X");
    expect(testGrid.get(new Vector(1,1))).to.equal("X");
  });
});

describe("Legend", function() {
  var elementFromChar = App.elementFromChar;
  var legend = {};

  it("Gives null from a space", function(){
    expect(elementFromChar(legend," ")).to.equal(null);
  });

  describe("elementFromChar", function(){
      function Wall(){}
      legend.X = Wall;

    it("Returns an element from a char", function(){
      expect(elementFromChar(legend,"X")).to.be.an('object');
    });

    it("Returns an element with an originChar property" ,function(){
      expect(elementFromChar(legend,"X")).to.have.property("originChar");
    });
  });

});

describe("World", function(){

  var plan = ["############################",
              "#      #    #      o      ##",
              "#                          #",
              "#          #####           #",
              "##         #   #    ##     #",
              "###           ##     #     #",
              "#           ###      #     #",
              "#   ####                   #",
              "#   ##       o             #",
              "# o  #         o       ### #",
              "#    #                     #",
              "############################"];

  var BouncingCritter = App.BouncingCritter;
  var Wall = App.Wall;
  var World = App.World;
  var legend = {
    "#": Wall,
    "o": BouncingCritter
  };

  describe("Properties", function(){
    var world = new World(plan,legend);
    it("Has grid and legend properties",function(){
      expect(world).to.have.property("grid");
      expect(world).to.have.property("legend");
    });
  });

  describe("Printing", function(){
    var world = new World(plan,legend);
    console.log(plan.join("\n"));
    console.log(world.toString());
    /*it("toString produces the same plan used to build", function(){
      expect(world.toString()).to.include.all(plan);
    });*/
  });

});
