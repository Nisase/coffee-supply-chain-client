import React from 'react';

export const Geolocation = async (lat, lng) => {
  const geocoder = new window.google.maps.Geocoder();
  const latlngObj = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const resPromise = geocoder.geocode({ location: latlngObj });

  try {
    return await resPromise;
  } catch (error) {
    return error;
  }
};
