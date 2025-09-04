maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'cluster-map',
    style: maptilersdk.MapStyle.STREETS,
    center: [-103.5917, 40.6699],
    zoom: 3
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
                    100,
                    '#2196F3',
                    750,
                    '#3F51B5'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
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

        // Click events
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

        map.on('click', 'unclustered-point', function (e) {
            const { popUpMarkup } = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();

            new maptilersdk.Popup()
                .setLngLat(coordinates)
                .setHTML(popUpMarkup)
                .addTo(map);
        });

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