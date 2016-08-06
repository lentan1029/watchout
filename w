// watchout for asteroids 

// set inCollisionFlag, to eliminate multiple counts for the same collision
var inCollisionFlag = false;

// Display board for player stats
var dashboard = [{name: 'High Score', value: 0, y: 5}, {name: 'Score', value: 0, y: 10}, {name: 'Collisions', value: 0, y: 15}];

// function to create an asteroid with a randomized starting position
var randomAsteroidGenerator = function(index) {
  return {
    id: index,
    x: Math.random() * 95,
    y: Math.random() * 95,
    radius: 2.5
  };
};

// Generates the set of asteroids 
var dataset = [];
for (var i = 0; i < 25; i++) {
  dataset.push(randomAsteroidGenerator(i));
}

// Generates the player circle
var circles = d3.range(1).map(function() {
  return {
    x: Math.random() * 95,
    y: Math.random() * 95,
    radius: 1
  };
});

// Player drag start add css active class = true
var dragstarted = function(d) {
  d3.select(this).raise().classed('active', true);
};

// Player drag active dragging:  update cx, cy
var dragged = function(d) {
  d3.select(this)
  .attr('cx', function() {
    d.x = event.pageX / window.innerWidth * 100;
    return d.x + '%';
  })
  .attr('cy', function() {
    d.y = event.pageY / window.innerHeight * 100;
    return d.y + '%';
  });
};

// Player drag end dragging: add css active class = true
var dragended = function(d) {
  d3.select(this).classed('active', false);
};

// Collision: there is a flash on the screen in pink
var boom = function() {
  if (!inCollisionFlag) {
    inCollisionFlag = true;
    d3.select('svg > rect').attr('fill', 'pink');
    dashboard[1]['value'] = 0;
    dashboard[2]['value'] = dashboard[2]['value'] + 1;
  }
};

// Normal (non-collision) state
var live = function() {
  if (inCollisionFlag) {
    inCollisionFlag = false;
    d3.select('svg > rect').attr('fill', 'white');
  }
};

window.setInterval(function() {
  dashboard[1]['value'] = dashboard[1]['value'] + 1;
}, 1000);


// set up svgs for the enemies
var svg = d3.select('body').append('svg').attr('position', 'fixed')
.attr('top', 0)
.attr('bottom', 0)
.attr('width', '100%')
.attr('height', '100%');

svg.append('rect')
.attr('width', '100%')
.attr('height', '100%')
.attr('fill', 'white');

// add enemy attributes
svg.selectAll('text')
.data(dashboard, function(item) {
  return item.name;
}).enter().append('text')
.attr('name', function(d) {
  d.name;
})
.attr('y', function(d) {
  return d.y + '%';
})
.attr('x', '0.5%') 
.text(function(d) {
  return d.name + ': ' + d.value;
})
.attr('font-size', '30')
.attr('font-family', 'Verdana');

// set up svg for the player
svg.selectAll('circle')
.data(circles)
.enter().append('circle')
.attr('cx', function(d) { return d.x.toString() + '%'; })
.attr('cy', function(d) { return d.y.toString() + '%'; })
.attr('r', '1%')
.style('fill', function(d, i) { return ['Blue', 'Fuchsia', 'Lime'][Math.floor(Math.random() * 3)]; })
.call(d3.drag()
.on('start', dragstarted)
.on('drag', dragged)
.on('end', dragended));


// add attributes for the player
svg.selectAll('image').data(dataset).enter().append('image')
.attr('xlink:href', './shuriken.png')
.attr('x', function(d) {
  return d.x.toString() + '%';
})
.attr('y', function(d) {
  return d.y.toString() + '%';
})
.attr('height', '5%')
.attr('width', '5%');


// Collide prototype
var collide = function() {

  if (dashboard[0]['value'] < dashboard[1]['value']) {
    dashboard[0]['value'] = dashboard[1]['value'];
  }

  d3.selectAll('svg > text').data(dashboard, function(item) {
    return item.name;
  })
  .text(function(d) {
    return d.name + ': ' + d.value;
  });

  var checkCollision = function (current, other) {
    var distanceSquared = Math.pow((current.x + current.radius - other.x) * window.innerWidth / window.innerHeight, 2) + Math.pow((current.y + current.radius - other.y), 2);
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

// Enemy movement: pick new rndom location
var randomMove = function() {
  for (var i = 0; i < dataset.length; i++) {
    dataset[i].x = Math.random() * 95;
    dataset[i].y = Math.random() * 95;
  }

// Enemy movement: spinning on center axis
  d3.selectAll('image').data(dataset, function(item) {
    return item.id;
  }).transition().duration(4000)
  .attrTween('transform', function(d, i, a) {
    return d3.interpolateString(
      'rotate(0,' + (this.x.baseVal.value + 0.025 * window.innerWidth) + ', ' + (this.y.baseVal.value + 0.025 * window.innerHeight) + ')',
      'rotate(720,' + ((this.__data__.x + 2.5) / 100 * window.innerWidth) + ', ' + (this.__data__.y / 100 * window.innerHeight) + ')');
  })
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

// set timing for collision checks and enemy movement
window.setInterval(function() { collide(); }, 20);
window.setTimeout(function() { randomMove(); window.setInterval(randomMove, 4300); }, 1000);
