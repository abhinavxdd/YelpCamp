maptilersdk.config.apiKey = mapToken;

// Check if campground and geometry exist
if (campground && campground.geometry && campground.geometry.coordinates && campground.geometry.coordinates.length === 2) {
    const map = new maptilersdk.Map({
        container: 'map',
        style: maptilersdk.MapStyle.STREETS,
        center: campground.geometry.coordinates,
        zoom: 10
    });

    // Add marker after map loads
    map.on('load', function() {
        new maptilersdk.Marker()
            .setLngLat(campground.geometry.coordinates)
            .setPopup(
                new maptilersdk.Popup({ offset: 25 })
                    .setHTML(
                        `<h3>${campground.title}</h3><p>${campground.location}</p>`
                    )
            )
            .addTo(map);
    });
} else {
    // Hide map container and show message if no geometry
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = '<div class="alert alert-info">Map location not available for this campground.</div>';
        mapContainer.style.height = 'auto';
    }
    // console.log('Campground geometry not found:', campground);
}