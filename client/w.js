// start slingin' some d3 here.
// var a = require(['./hello.js'], function() {
//   hihi('nobody');
// });



var dataset = [];



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
var n = 20,
m = 4,
radius = d3.scale.sqrt().range([0, 8]),
color = d3.scale.category10().domain(d3.range(m));

var randomAsteroidGenerator = function(index) {
  return {
    id: index,
    x: Math.random() * 95,
    y: Math.random() * 95
  };
};
 for (var i = 0; i < 20; i++) {
  dataset.push(randomAsteroidGenerator(i));
}
for (i in d3.range(n)){
dataset.push({
d: i,
x: Math.random() * 95,
y: Math.random() * 95});
}

var force = d3.layout.force()
.nodes(dataset)
.on("tick", tick)
.start();

var circle = svg.selectAll("circle")
.data(dataset)
.enter().append("circle")
.attr("r", function(d) { return d.radius; })
.attr("cx", function(d) { return d.x; })
.attr("cy", function(d) { return d.y; })
.style("fill", function(d) { return d.color; })
.call(force.drag);

function tick(e) {
force.alpha(0.1)
circle
.each(collide(0.5))
.attr("cx", function(d) { return d.x; })
.attr("cy", function(d) { return d.y; });
}


// Resolve collisions between nodes.
function collide(alpha) {
return function(d) {
  var r = d.radius + 16,
      nx1 = d.x - r,
      nx2 = d.x + r,
      ny1 = d.y - r,
      ny2 = d.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== d)) {
      var x = d.x - quad.point.x,
          y = d.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = d.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        d.x -= x *= l;
        d.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
 }
};

// window.setInterval()