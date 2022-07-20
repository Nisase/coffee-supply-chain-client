import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Typography, IconButton, Grid, Box, Stack, Container, Button } from '@mui/material';
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import { formatRelative } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import ExploreIcon from '@mui/icons-material/Explore';
import '@reach/combobox/styles.css';
import { Geolocation } from '../../logic/Maps/NavLocation';

import '../../App.css';

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

const getCoordinates = async (val) => {
  const results = await getGeocode({ address: val });
  const { lat, lng } = await getLatLng(results[0]);

  //   const lat = parseFloat(latLngObject[0]);
  //   const lng = parseFloat(latLngObject[1]);
  return { lat, lng };
};

const routeDirection = (dir1, dir2, setDirection) => {
  if (!dir2) return;
  const service = new window.google.maps.DirectionsService();
  service.route(
    {
      origin: dir1,
      destination: dir2,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === 'OK' && result) {
        setDirection(result);
      }
    }
  );
};

const MapsTracking = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const google = window.google;
  const [farmDir, setFarmDir] = useState('');
  const [processorDir, setProcessorDir] = useState('');
  const [warehouseDir, setWarehouseDir] = useState('');
  const [packerDir, setPackerDir] = useState('');
  const [warehouseRetDir, setWarehouseRetDir] = useState('');
  const [salepointRetDir, setSalepointRetDir] = useState('');

  const [farmMarker, setFarmMarker] = useState({});
  const [processorMarker, setProcessorMarker] = useState({});
  const [warehouseMarker, setWarehouseMarker] = useState({});
  const [packerMarker, setPackerMarker] = useState({});
  const [warehouseRetMarker, setWarehouseRetMarker] = useState({});
  const [salepointRetMarker, setSalepointRetMarker] = useState({});

  const [farmProcRoute, setFarmProcRoute] = useState();
  const [procWarehouseRoute, setProcWarehouseRoute] = useState();
  const [warehousePackerRoute, setWarehousePackerRoute] = useState();
  const [wareRetPackerRoute, setWareRetPackerRoute] = useState();
  const [salepointWareRoute, setSalepointWareRoute] = useState();

  const [selected, setSelected] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    setFarmDir('5223+H3V, Cuenca 010106, Ecuador');
    setProcessorDir('Del Cedron 1-52, Cuenca, Ecuador');
    setWarehouseDir('29PG+Q7 Latacunga, Ecuador');
    setPackerDir('Alcantarillas 366, Quito 170131, Ecuador');
    setWarehouseRetDir('JGVX+PMW, Sangolquí, Ecuador');
    setSalepointRetDir('17O521 Edmundo Carvajal N24-52 y Av. La Gasca, Interior C.C, Quito 170129, Ecuador');
  }, [farmDir, processorDir, warehouseDir, packerDir, warehouseRetDir, salepointRetDir]);

  useEffect(() => {
    const latLng = async () => {
      //   setFarmMarker(await getCoordinates(farmDir));
      //   setProcessorMarker(await getCoordinates(processorDir));
      //   setWarehouseMarker(await getCoordinates(warehouseDir));
      //   setPackerMarker(await getCoordinates(packerDir));
      //   setWarehouseRetMarker(await getCoordinates(warehouseRetDir));
      //   setSalepointRetMarker(await getCoordinates(salepointRetDir));
      const farmRes = await getCoordinates(farmDir);
      const processorRes = await getCoordinates(processorDir);
      const warehouseRes = await getCoordinates(warehouseDir);
      const packerRes = await getCoordinates(packerDir);
      const warehouseRetRes = await getCoordinates(warehouseRetDir);
      const salepointRetRes = await getCoordinates(salepointRetDir);
      setFarmMarker(farmRes);
      setProcessorMarker(processorRes);
      setWarehouseMarker(warehouseRes);
      setPackerMarker(packerRes);
      setWarehouseRetMarker(warehouseRetRes);
      setSalepointRetMarker(salepointRetRes);
      console.log('farm res:', farmRes);
      console.log('type lat: ', typeof farmRes.lat);
      console.log('lat: ', farmRes.lat);
    };

    latLng();
  }, []);

  useEffect(() => {
    routeDirection(farmMarker, processorMarker, setFarmProcRoute);
    routeDirection(processorMarker, warehouseMarker, setProcWarehouseRoute);
    routeDirection(warehouseMarker, packerMarker, setWarehousePackerRoute);
    routeDirection(packerMarker, warehouseRetMarker, setWareRetPackerRoute);
    routeDirection(warehouseRetMarker, salepointRetMarker, setSalepointWareRoute);
  }, []);

  //   const pantTo = useCallback(({ lat, lng }) => {
  //     mapRef.current.pantTo({ lat, lng });
  //     mapRef.current.setZoom(14);
  //   });

  if (loadError) return 'Error';
  if (!isLoaded) return 'Cargando...';

  return (
    <>
      <div className="map-track">
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={9}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {farmMarker && (
            <>
              <Marker
                position={farmMarker}
                // onClick={() => {
                //   //   setSelected(farmMarker);
                //   //   setSelectedLoc(farmMarker);
                //   pantTo({ lat: farmMarker.lat, lng: farmMarker.lng });
                // }}
              />
            </>
          )}

          {processorMarker && (
            <>
              <Marker
                position={processorMarker}
                // onClick={() => {
                //   pantTo(processorMarker);
                // }}
              />
            </>
          )}

          {warehouseMarker && (
            <>
              <Marker position={warehouseMarker} />
            </>
          )}

          {packerMarker && (
            <>
              <Marker position={packerMarker} />
            </>
          )}

          {warehouseRetMarker && (
            <>
              <Marker position={warehouseRetMarker} />
            </>
          )}

          {salepointRetMarker && (
            <>
              <Marker position={salepointRetMarker} />
            </>
          )}

          {/* {selected && selectedLoc ? (
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
          ) : null} */}

          {farmProcRoute && (
            <DirectionsRenderer
              directions={farmProcRoute}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#F96B13',
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {procWarehouseRoute && (
            <DirectionsRenderer
              directions={procWarehouseRoute}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#042A2B',
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {warehousePackerRoute && (
            <DirectionsRenderer
              directions={warehousePackerRoute}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#F96B13',
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {wareRetPackerRoute && (
            <DirectionsRenderer
              directions={wareRetPackerRoute}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#042A2B',
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {salepointWareRoute && (
            <DirectionsRenderer
              directions={salepointWareRoute}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#F96B13',
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default MapsTracking;
