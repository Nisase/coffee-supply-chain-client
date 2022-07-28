import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Typography, IconButton, Grid, Box, Stack, Container, Button } from '@mui/material';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import { formatRelative } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import ExploreIcon from '@mui/icons-material/Explore';
import {
  setDirectionData,
  setLatitudeData,
  setLongitudeData,
  setLocReadyToAddData,
} from '../../redux/locationDataSlice';
import '@reach/combobox/styles.css';
import { Geolocation } from '../../logic/Maps/NavLocation';

import '../../App.css';

const google = window.google;

const libraries = ['places'];
const mapContainerStyle = {
  height: '100%',
  width: '100%',
};
const options = {
  mapId: 'c43de04e5c01e2fc',
  //   mapId: "16108b5df1a7bf0e",
  //   disableDefaultUI: false,
  scaleControl: true,
  scrollwheel: true,
  mapTypeControl: false,
  keyboardShortcuts: false,
  zoomControl: true,
};
const center = {
  lat: 0.06218317633464823,
  lng: -78.6820212451912,
};

const MapsLocation = ({ svg }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  console.log('ENV', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  console.log(isLoaded);
  console.log(loadError);

  const [markers, setMarkers] = useState({});
  const [location, setLocation] = useState('');
  const [selected, setSelected] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState(null);

  const onMapClick = useCallback((e) => {
    setMarkers({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });

    const locDir = Geolocation(e.latLng.lat(), e.latLng.lng());
    console.log('locdir: ', locDir);

    locDir.then((response) => {
      if (response.results && response.results[0]) {
        setLocation(response.results[0].formatted_address);
      }
    });
  }, []);

  useEffect(() => {
    console.log('location');
    console.log(location);
    console.log(markers);
  }, [location, markers]);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  console.log('markers', markers);
  console.log('loc: ', location);
  console.log('svg: ', svg);

  if (loadError) return 'Error';
  if (!isLoaded) return 'Cargando ...';

  return (
    <>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Search panTo={panTo} setMarker={setMarkers} setLocation={setLocation} />

        <Locate panTo={panTo} setMarker={setMarkers} setLocation={setLocation} />
        <SendLocation marker={markers} location={location} />

        <Marker
          key={uuid()}
          // position={{ lat: parseFloat(markers.lat), lng: parseFloat(markers.lng) }}
          position={{ lat: parseFloat(markers.lat), lng: parseFloat(markers.lng) }}
          onClick={() => {
            setSelected(markers);
            setSelectedLoc(location);
          }}
          icon={{
            url: svg,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(10, 10),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />

        {selected && selectedLoc ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
              setSelectedLoc(null);
            }}
          >
            <Box>
              <Typography variant="subtitle2">{selectedLoc}</Typography>
              <Typography variant="body2">{formatRelative(selected.time, new Date())} </Typography>
            </Box>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};

function Locate({ panTo, setMarker, setLocation }) {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <IconButton
      sx={{ borderRadius: '2px' }}
      aria-label="compass"
      onClick={() => {
        if (!navigator.geolocation) {
          enqueueSnackbar(
            'La geolocalización no es compatible con su navegador. Por favor, utiliza el mapa para establecer tu ubicación.',
            {
              variant: 'error',
            }
          );
        } else {
          enqueueSnackbar('Localizando tu posición actual', { variant: 'success' });

          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              setMarker({ lat: position.coords.latitude, lng: position.coords.longitude, time: new Date() });

              const locDir = Geolocation(position.coords.latitude, position.coords.longitude);
              console.log('locdir: ', locDir);

              locDir.then((response) => {
                if (response.results[0]) {
                  setLocation(response.results[0].formatted_address);
                }
              });
            },
            () => {
              enqueueSnackbar(
                'No se puede obtener tu ubicación. Por favor, utiliza el mapa para establecer tu ubicación.',
                {
                  variant: 'error',
                }
              );
            }
          );
        }
      }}
    >
      <ExploreIcon sx={{ color: '#ff2f00', marginRight: '5px' }} />
      <Typography variant="body2" sx={{ color: '#ff2f00', fontWeight: 700 }}>
        Ubicación Actual
      </Typography>
    </IconButton>
  );
}

function Search({ panTo, setMarker, setLocation }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => -0.18117269544866682,
        lng: () => -78.51212535843558,
      },

      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    setMarker({ lat, lng, time: new Date() });
    panTo({ lat, lng });

    const locDir = Geolocation(lat, lng);

    locDir.then((response) => {
      if (response.results[0]) {
        setLocation(response.results[0].formatted_address);
      }
    });
  };

  return (
    <Box className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput value={value} onChange={handleInput} disabled={!ready} placeholder="Ingresa la dirección" />
        <ComboboxPopover className="comboPopover" style={{ zIndex: 9999999999 }}>
          <ComboboxList>
            {status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={uuid()} value={description} />)}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Box>
  );
}

function SendLocation({ marker, location }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const sendLoc = () => {
    dispatch(setDirectionData(location));
    dispatch(setLatitudeData(marker.lat));
    dispatch(setLongitudeData(marker.lng));
    dispatch(setLocReadyToAddData(true));
    enqueueSnackbar(
      `Dirección ${location} con latitud ${marker.lat} y longitud ${marker.lng} ingresada correctamente en el formulario.`,
      { variant: 'success' }
    );
  };
  return (
    <>
      <Button
        variant="contained"
        className="inner-map-btn"
        color="secondary"
        size="small"
        disabled={!marker.lat} // || location===''}
        sx={{
          // transform: 'translateY(1130%);'
          bottom: '-92%',
          left: '-14%',
          boxShadow: 2,
        }}
        onClick={sendLoc}
      >
        Usar Ubicación
      </Button>
    </>
  );
}
export default MapsLocation;
