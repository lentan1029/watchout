// start slingin' some d3 here.
// var a = require(['./hello.js'], function() {
//   hihi('nobody');
// });

var randomAsteroidGenerator = function(index) {
  return {
    id: index,
    x: Math.random() * 95,
    y: Math.random() * 95,
    radius: 0.035
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

// window.setInterval(collide, 50);

// var collide = function() {

//   var checkCollision = function (current, other) {
//     var distanceSquared = Math.pow((current.x - other.x), 2) + Math.pow((current.y - other.y), 2);
//     if (distanceSquared < Math.pow(current.radius + other.radius, 2)) {
//       return true;
//     }



//   };


// };

var randomMove = function() {
  for (var i = 0; i < dataset.length; i++) {
    dataset[i].x = Math.random() * 95;
    dataset[i].y = Math.random() * 95;
  }

  d3.selectAll('image').data(dataset, function(item) {
    return item.id;
  }).transition().duration(1000)
  .attr('x', function(d) {
    return d.x.toString() + '%';
  })
  .attr('y', function(d) {
    return d.y.toString() + '%';
  });

};

window.setInterval(randomMove, 2000);


var circles = d3.range(1).map(function() {
  return {
    // x: Math.round(Math.random() * (width - radius * 2) + radius),
    // y: Math.round(Math.random() * (height - radius * 2) + radius)
    x: (Math.random() * 95) + '%',
    y: (Math.random() * 95) + '%'
  };
});

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory20);


var dragstarted = function(d) {
  d3.select(this).raise().classed('active', true);
};

var dragged = function(d) {
  d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
};

var dragended = function(d) {
  d3.select(this).classed('active', false);
};

d3.select('svg').selectAll('circle')
  .data(circles)
  .enter().append('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 8)
    .style('fill', function(d, i) { return color(i); })
    .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
