import { useState, useEffect } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
  });
  const [details, setDetails] = useState(null);

  const onSuccess = (locationGiven) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: locationGiven.coords.latitude,
        lng: locationGiven.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    if (error.code === 1) {
      fetch(
        'https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572'
      )
        .then((response) => response.json())
        .then((data) => setDetails(data));
    }
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Navegador não suporta localização',
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeoLocation;
