const expect = require('chai').expect;
const App = require('../index.js');
const jsdiff = require('diff');

describe('Basic Grid', () => {
  const Grid = App.Grid;
  const Vector = App.Vector;
  it('Makes a 5x5 grid', () => {
    const testGrid = new Grid(5, 5);
    expect(testGrid.width).to.equal(5);
    expect(testGrid.height).to.equal(5);
  });

  it('Makes an empty grid', () => {
    const testGrid = new Grid(5, 5);
    expect(testGrid.get(new Vector(1, 1))).to.equal(undefined);
  });

  it('Gets a set value', () => {
    var testGrid = new Grid(5, 5);
    testGrid.set(new Vector(1, 1), 'X');
    expect(testGrid.get(new Vector(1, 1))).to.equal('X');
  });
});

describe('Legend', () => {
  var elementFromChar = App.elementFromChar;
  var legend = {};

  it('Gives null from a space', () => {
    expect(elementFromChar(legend, ' ')).to.equal(null);
  });

  describe('elementFromChar', () => {
    function Wall() {}
    legend.X = Wall;

    it('Returns an element from a char', () => {
      expect(elementFromChar(legend, 'X')).to.be.an('object');
    });

    it('Returns an element with an originChar property', () => {
      expect(elementFromChar(legend, 'X')).to.have.property('originChar');
    });
  });
});

describe('World', () =>  {
  var plan = [
    '############################',
    '#      #    #      o      ##',
    '#                          #',
    '#          #####           #',
    '##         #   #    ##     #',
    '###           ##     #     #',
    '#           ###      #     #',
    '#   ####                   #',
    '#   ##       o             #',
    '# o  #         o       ### #',
    '#    #                     #',
    '############################',
  ];

  var BouncingCritter = App.BouncingCritter;
  var Wall = App.Wall;
  var World = App.World;
  var legend = {
    '#': Wall,
    o: BouncingCritter,
  };

  describe('Properties', () => {
    var world = new World(plan, legend);
    it('Has grid and legend properties', () => {
      expect(world).to.have.property('grid');
      expect(world).to.have.property('legend');
    });
  });

  describe('Printing', () => {
    var world = new World(plan, legend);
    console.log(jsdiff.diffChars(plan.join('\n'), world.toString().trim()));
    it('toString produces the same plan used to build', () => {
      expect(world.toString().split('\n')).to.deep.equal(plan);
    });
  });
});
