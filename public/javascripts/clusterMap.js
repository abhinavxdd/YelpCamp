maptilersdk.config.apiKey = mapToken;

// Default center (fallback)
let defaultCenter = [78.9629, 20.5937];
let defaultZoom = 3;

// Initialize map immediately with default location
const map = initializeMap(defaultCenter, defaultZoom);

// Try to get user's location in background
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // Success - update map center to user's location
            const userLocation = [position.coords.longitude, position.coords.latitude];
            map.easeTo({
                center: userLocation,
                zoom: 10,
                duration: 2000 // Smooth 2-second transition
            });
            
            // Add user location marker
            new maptilersdk.Marker({ color: 'red' })
                .setLngLat(userLocation)
                .setPopup(
                    new maptilersdk.Popup({ offset: 25 })
                        .setHTML('<strong>Your Location</strong>')
                )
                .addTo(map);
        },
        function(error) {
            // Error or denied - keep default location
            console.log('Location access denied or failed:', error);
        },
        {
            timeout: 3000,
            enableHighAccuracy: false,
            maximumAge: 60000
        }
    );
}

function initializeMap(center, zoom) {
    const map = new maptilersdk.Map({
        container: 'cluster-map',
        style: `https://api.maptiler.com/maps/basic-v2-dark/style.json?key=${mapToken}`,
        center: center,
        zoom: zoom
    });

    // Add a load event listener to ensure the map loads properly
    map.on('load', function () {
        console.log('Map loaded successfully!'); // For debugging
        
        // Only add source if we have campgrounds with geometry
        if (campgrounds.features.length > 0) {
            map.addSource('campgrounds', {
                type: 'geojson',
                data: campgrounds,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });

            // Add cluster layer
            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'campgrounds',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#00BCD4',
                        10,
                        '#2196F3',
                        30,
                        '#3F51B5'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        15,
                        10,
                        20,
                        30,
                        25
                    ]
                }
            });

            // Add cluster count layer
            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'campgrounds',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            // Add unclustered points
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'campgrounds',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            // Click events for clusters
            map.on('click', 'clusters', function (e) {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('campgrounds').getClusterExpansionZoom(
                    clusterId,
                    function (err, zoom) {
                        if (err) return;
                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });

            // Click events for unclustered points
            map.on('click', 'unclustered-point', function (e) {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const { popUpMarkup } = e.features[0].properties;

                new maptilersdk.Popup({ offset: 25 })
                    .setLngLat(coordinates)
                    .setHTML(popUpMarkup)
                    .addTo(map);
            });

            // Hover events for unclustered points - THIS IS THE NEW FUNCTIONALITY
            map.on('mouseenter', 'unclustered-point', function (e) {
                // Change cursor to pointer
                map.getCanvas().style.cursor = 'pointer';
                
                const coordinates = e.features[0].geometry.coordinates.slice();
                const { popUpMarkup } = e.features[0].properties;

                // Create and show popup on hover
                const popup = new maptilersdk.Popup({
                    closeButton: false,
                    closeOnClick: false,
                    offset: 25
                })
                    .setLngLat(coordinates)
                    .setHTML(popUpMarkup)
                    .addTo(map);

                // Store popup reference on the map for cleanup
                map._hoverPopup = popup;
            });

            map.on('mouseleave', 'unclustered-point', function () {
                // Reset cursor
                map.getCanvas().style.cursor = '';
                
                // Remove hover popup if it exists
                if (map._hoverPopup) {
                    map._hoverPopup.remove();
                    map._hoverPopup = null;
                }
            });

            // Existing hover events for clusters
            map.on('mouseenter', 'clusters', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', function () {
                map.getCanvas().style.cursor = '';
            });
        }
    });

    // Add error handling
    map.on('error', function(e) {
        console.error('Map error:', e);
    });

    return map; // Return the map instance
}