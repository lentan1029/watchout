// start slingin' some d3 here.
// var a = require(['./hello.js'], function() {
//   hihi('nobody');
// });

var randomAsteroidGenerator = function(index) {
  return {
    id: index,
    x: Math.random() * 95,
    y: Math.random() * 95
  };
};

var dataset = [];

for (var i = 0; i < 20; i++) {
  dataset.push(randomAsteroidGenerator(i));
}

console.log(dataset);

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
// .attr('cx', function(d, i) {
//   return ((100 / dataset.length) * i).toString() + '%';
// })
// .attr('cy', '50%')

// .attr('r', function(d) {
//   return d;
// });

var randomMove = function() {

};

// window.setInterval()
