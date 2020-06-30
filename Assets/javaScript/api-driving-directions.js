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