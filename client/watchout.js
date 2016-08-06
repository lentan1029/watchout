// start slingin' some d3 here.
// var a = require(['./hello.js'], function() {
//   hihi('nobody');
// });

var dataset = [0, 10, 2, 3, 14, 5];
var svg = d3.select('body').append('svg').attr('position', 'fixed')
.attr('top', 0)
.attr('bottom', 0)
.attr('width', '100%')
.attr('height', '100%'); 

svg.selectAll('circle').data(dataset).enter().append('circle')
.attr('cx', function(d, i) {
  return ((100 / dataset.length) * i).toString() + '%';
})
.attr('cy', '50%')
.attr('r', function(d) {
  return d;
});

