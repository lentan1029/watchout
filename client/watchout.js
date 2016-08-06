// start slingin' some d3 here.
// var a = require(['./hello.js'], function() {
//   hihi('nobody');
// });

var randomAsteroidGenerator = function(index) {
  return {
    id: index,
    x: Math.random() * 95,
    y: Math.random() * 95,
    radius: 0.035,
    vx: 1,
    vy: 1
  };
};

var dataset = [];

for (var i = 0; i < 20; i++) {
  dataset.push(randomAsteroidGenerator(i));
}

var svg = d3.select('body').append('svg').attr('position', 'fixed')
.attr('top', 0)
.attr('bottom', 0)
.attr('width', '100%')
.attr('height', '100%'); 

svg.selectAll('image').data(dataset).enter().append('image')
.attr('xlink:href', './asteroid.png')
.attr('x', function(d) {
  return d.x.toString() + '%';
})
.attr('y', function(d) {
  return d.y.toString() + '%';
})
.attr('height', '5%')
.attr('width', '5%');

// var force = d3.forceSimulation(dataset);

// force.on('tick', function() {
//   console.log('hihihi');
//   d3.selectAll('image').data(dataset, function(item) {
//     return item.id;
//   }).transition().duration(1000)
//   .attr('x', function(d) {
//     return d.x.toString() + '%';
//   })
//   .attr('y', function(d) {
//     return d.y.toString() + '%';
//   });
//   force.ticks = 10;
// });

window.setInterval(collide, 50);

var collide = function() {

  var checkCollision = function (current, other) {
    var r = current.radius * 100; //maybe add some padding. current.radius returns decimal
    var cleft = current.x - r;
    var cright = current.x + r;
    var ctop = current.y - r;
    var cbtm = current.y + r;
    var oleft = other.x - r;
    var oright = other.x + r;
    var otop = other.y - r;
    var obtm = other.y + r;
  };
};

var randomMove = function() {
  for (var i = 0; i < dataset.length; i++) {
    dataset[i].x = Math.random() * 95;
    dataset[i].y = Math.random() * 95;
  }

};

window.setInterval(randomMove, 2000);
