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