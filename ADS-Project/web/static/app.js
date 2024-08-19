document.getElementById('fareForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = {
        'passenger_count': parseFloat(document.getElementById('passengerCount').value),
        'trip_distance': parseFloat(document.getElementById('tripDistance').value),
        'pickup_longitude': parseFloat(document.getElementById('pickupLongitude').value),
        'pickup_latitude': parseFloat(document.getElementById('pickupLatitude').value),
        'dropoff_longitude': parseFloat(document.getElementById('dropoffLongitude').value),
        'dropoff_latitude': parseFloat(document.getElementById('dropoffLatitude').value)
    };

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('predictionResult').textContent = 'Predicted Fare: Rs.' + data.toFixed(2);
    })
    .catch(error => console.error('Error:', error));
});
