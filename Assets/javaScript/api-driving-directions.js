// Calculates and displays a car route from waypoint0 to waypoint1
function calculateRouteFromAtoBDrive(platform, waypoint0, waypoint1) {

    let router = platform.getRoutingService(),
  
      routeRequestParams = {
        metricSystem: 'imperial',
        mode: 'fastest;car',
        representation: 'display',
        routeattributes: 'waypoints,summary,shape,legs',
        maneuverattributes: 'direction,action',
        waypoint0: waypoint0,
        waypoint1: waypoint1,
      };
  
    router.calculateRoute(
      routeRequestParams,
      onSuccess,
      onError
    );
  }

// This function will be called once the Routing REST API provides a response
function onSuccess(result) {
    let route = result.response.route[0];
    addRouteShapeToMap(route);
    addManueversToMap(route);
    addWaypointsToPanel(route.waypoint);
    addManueversToPanel(route);
    addSummaryToPanel(route.summary);
  }

// This function will be called if a communication error occurs during the JSON-P request
function onError(error) {
    alert('Can\'t reach the remote server');
  }

// Boilerplate map initialization code starts below;
  // Set up containers for the map + panel
  var mapContainer = document.getElementById('map'),
    routeInstructionsContainer = document.getElementById('panel');
  
  var bubble;
  
  // Opens/Closes a infobubble
  // @param 'position'   The location on the map
  // @param 'text'   The contents of the infobubble/
  function openBubble(position, text) {
    if (!bubble) {
      bubble = new H.ui.InfoBubble(
        position,
        // The FO property holds the province name.
        {
          content: text
        });
      ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }

  // Creates a H.map.Polyline from the shape of the route and adds it to the map
  // @param    route A route as received from the H.service.RoutingService
  function addRouteShapeToMap(route) {
    let strip = new H.geo.Strip(),
      routeShape = route.shape,
      polyline;
  
    routeShape.forEach(function (point) {
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });
  
    polyline = new H.map.Polyline(strip, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 128, 255, 0.7)'
      }
    });
    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    map.setViewBounds(polyline.getBounds(), true);
  }

//  Creates a series of H.map.Marker points from the route and adds them to the map.
// @param {Object} route A route as received from the H.service.RoutingService
function addManueversToMap(route) {
    var svgMarkup = '<svg width="18" height="18" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="8" r="8" ' +
      'fill="#1b468d" stroke="white" stroke-width="1"  />' +
      '</svg>',
      dotIcon = new H.map.Icon(svgMarkup, {
        anchor: {
          x: 8,
          y: 8
        }
      }),
      group = new H.map.Group(),
      i,
      j;
  
    // Add a marker for each maneuver
    for (i = 0; i < route.leg.length; i += 1) {
      for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
        // Get the next maneuver.
        maneuver = route.leg[i].maneuver[j];
        // Add a marker to the maneuvers group
        let marker = new H.map.Marker({
          lat: maneuver.position.latitude,
          lng: maneuver.position.longitude
        }, {
            icon: dotIcon
          });
        marker.instruction = maneuver.instruction;
        group.addObject(marker);
      }
    }
  
    group.addEventListener('tap', function (evt) {
      map.setCenter(evt.target.getPosition());
      openBubble(
        evt.target.getPosition(), evt.target.instruction);
    }, false);
  
    // Add the maneuvers group to the map
    map.addObject(group);
  }
  
  // Creates a series of H.map.Marker points from the route and adds them to the map
  // @praram   route   A route as received from the H.service.RoutingService
  function addWaypointsToPanel(waypoints) {
  
    let nodeH3 = document.createElement('h3'),
      waypointLabels = [],
      i;
  
    for (i = 0; i < waypoints.length; i += 1) {
      waypointLabels.push(waypoints[i].label)
    }
  
    nodeH3.textContent = waypointLabels.join(' - ');
  
    routeInstructionsContainer.innerHTML = '';
    routeInstructionsContainer.appendChild(nodeH3);
  }

  // Creates a series of H.map.Marker points from the route and adds them to the map
  // @praram   route   A route as received from the H.service.RoutingService
  function addSummaryToPanel(summary) {
    let summaryDiv = document.createElement('div'),
      content = '';
    content += '<b>Total distance</b>: ' + convertToImperial(summary.distance)  + 'm. <br/>';
    content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';
    summaryDiv.style.fontSize = 'small';
    summaryDiv.style.marginLeft = '5%';
    summaryDiv.style.marginRight = '5%';
    summaryDiv.innerHTML = content;
    routeInstructionsContainer.appendChild(summaryDiv);
  }

  function convertToImperial(distance) {
    let miles = Math.trunc(distance / 1609.34);
    let remainder = distance % 1609.34;
    let feet = Math.trunc(remainder / 3.28084);
    return (miles + " miles and " + feet + " feet.");
  }

  // Creates a series of H.map.Marker points from the route and adds them to the map
  // @praram   route   A route as received from the H.service.RoutingService
  function addManueversToPanel(route) {
  
    let nodeOL = document.createElement('ol'),
      i,
      j;
  
    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft = '5%';
    nodeOL.style.marginRight = '5%';
    nodeOL.className = 'directions';
  
    // Add a marker for each maneuver
    for (i = 0; i < route.leg.length; i += 1) {
      for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
        // Get the next maneuver.
        maneuver = route.leg[i].maneuver[j];
  
        let li = document.createElement('li'),
          spanArrow = document.createElement('span'),
          spanInstruction = document.createElement('span');
  
        spanArrow.className = 'arrow ' + maneuver.action;
        spanInstruction.innerHTML = maneuver.instruction;
        li.appendChild(spanArrow);
        li.appendChild(spanInstruction);
  
        nodeOL.appendChild(li);
      }
    }
    routeInstructionsContainer.appendChild(nodeOL);
  }