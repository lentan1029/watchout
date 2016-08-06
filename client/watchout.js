// start slingin' some d3 here.
// var a = require(['./hello.js'], function() {
//   hihi('nobody');
// });

var boom = function() {
  d3.select('svg > rect').attr('fill', 'pink');
};

var live = function() {
  d3.select('svg > rect').attr('fill', 'white');
};

var randomAsteroidGenerator = function(index) {
  return {
    id: index,
    x: Math.random() * 95,
    y: Math.random() * 95,
    radius: 2.5
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

svg.append('rect')
.attr('width', '100%')
.attr('height', '100%')
.attr('fill', 'pink');

var collide = function() {

  var checkCollision = function (current, other) {
    var distanceSquared = Math.pow((current.x + current.radius - other.x), 2) + Math.pow((current.y + current.radius - other.y), 2);
    
    // console.log(other.x, current.x, distanceSquared);

    if (distanceSquared < Math.pow(current.radius + other.radius, 2)) {
      return true;
    }
    return false;
  };

  var didCollide = false;

  d3.selectAll('image').each(function() {
    // if (this.__data__.id === 0) {
    //   console.log(this);
    // }
    var obj = {
      id: this.__data__.id,
      x: this.x.animVal.valueInSpecifiedUnits,
      y: this.y.animVal.valueInSpecifiedUnits,
      radius: this.__data__.radius
    };

    // console.log(obj);
    // console.log(this.__data__);

    if (checkCollision(obj, svg.select('circle').data()[0])) {
      didCollide = true;
    }
  });

  if (didCollide) {
    boom();
  } else {
    live();
  }

  return didCollide;

};

var randomMove = function() {
  for (var i = 0; i < dataset.length; i++) {
    dataset[i].x = Math.random() * 95;
    dataset[i].y = Math.random() * 95;
    // dataset[i].x = 10;
    // dataset[i].y = 10;
  }

  d3.selectAll('image').data(dataset, function(item) {
    return item.id;
  }).transition().duration(2000)
  .tween('x', function() {
    return function() {
      collide();
    };
  })
  .tween('y', function() {
    return function() {
      collide();
    };
  })
  .attr('x', function(d) {
    return d.x.toString() + '%';
  })
  .attr('y', function(d) {
    return d.y.toString() + '%';
  });

};

window.setInterval(function() {
  collide();
}, 20);
window.setInterval(randomMove, 3500);


var circles = d3.range(1).map(function() {
  return {
    x: Math.random() * 95,
    y: Math.random() * 95,
    radius: 1
  };
});

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory20);


var dragstarted = function(d) {
  d3.select(this).raise().classed('active', true);
};

var dragged = function(d) {
  d3.select(this)
  .attr('cx', function() {
    d.x = event.pageX / window.innerWidth * 100;
    // console.log(event.pageX / window.innerWidth * 100);
    return d.x + '%';
  })
  .attr('cy', function() {
    d.y = event.pageY / window.innerHeight * 100;
    return d.y + '%';
  });
};

var dragended = function(d) {
  d3.select(this).classed('active', false);
};


//CREATE ASTEROIDS
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


svg.selectAll('circle')
.data(circles)
.enter().append('circle')
.attr('cx', function(d) { return d.x.toString() + '%'; })
.attr('cy', function(d) { return d.y.toString() + '%'; })
.attr('r', '1%')
.style('fill', function(d, i) { return color(i); })
.call(d3.drag()
.on('start', dragstarted)
.on('drag', dragged)
.on('end', dragended));



