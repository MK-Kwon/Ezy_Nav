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
// set up containers for the map + panel
let mapContainer = document.getElementById('map'),
    routeInstructionsContainer = document.getElementById('panel');

// Step 1: initialise communication with the platform
let platform = new H.service.Platform({
    app_id: 'wcU125hOha6uKl56A00d',
    app_code: 'DD3bbz78Ju_Tb88oKzx0kA',
    useCIT: true,
    useHTTPS: true,
});

// let pixelRatio = window.devicePixelRatio || 1;
// https://docs.w3cub.com/dom/window/devicepixelratio/
let defaultLayers = platform.createDefaultLayers({
})

// Step 2. initialise a map (Not specifying a location will render the world map)
let map = new H.Map(mapContainer,
    defaultLayers.normal.map, {
        //pixelRatio: pixelRatio
        center: {
            lat: -34.9285,
            lng: 138.6007
        },
        zoom: 13
    });
