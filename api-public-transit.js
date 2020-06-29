// Calculates and displays a public transport route from waypoint0 to waypoint1
function calculateRouteFromAtoBPublicTransit(platform, waypoint0, waypoint1){

    let router = platform.getRoutingService();

        routeRequestParams = {
            metricSystem: 'imperial',
            mode: 'fastest;publicTransport',
            representation: 'display',
            waypoint0: waypoint0,
            waypoint1: waypoint1,
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action'
        };

        router.calculateRoute(
            routeRequestParams,
            onSuccess,
            onError
        );
}