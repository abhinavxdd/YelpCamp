maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: campground.geometry.coordinates,
    zoom: 10,
    attributionControl: false // Disable default attribution
});

// Add only ONE custom attribution control
map.addControl(new maptilersdk.AttributionControl({
    compact: false,
    customAttribution: '© MapTiler © OpenStreetMap contributors'
}), 'bottom-right');

// Add marker for campground location
new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h5>${campground.title}</h5><p>${campground.location}</p>`
            )
    )
    .addTo(map);