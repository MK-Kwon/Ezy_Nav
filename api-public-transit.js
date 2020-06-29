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