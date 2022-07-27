import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import '@reach/combobox/styles.css';

import '../../App.css';

const google = window.google;

const libraries = ['places'];

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const options = {
  mapId: 'c43de04e5c01e2fc',
  scaleControl: true,
  scrollwheel: true,
  mapTypeControl: false,
  keyboardShortcuts: false,
  zoomControl: true,
};

// const center = {
//   lat: 0.06218317633464823,
//   lng: -78.6820212451912,
//   // lat: -1.831239,
//   // lng: -78.183406,
// };
// const center2 = {
//   lat: -1.831239,
//   lng: -78.183403,
// };

const getCoordinates = async (val) => {
  const results = await getGeocode({ address: val });
  const { lat, lng } = await getLatLng(results[0]);
  console.log('resultss');
  console.log(results);
  console.log(lat);

  return { lat, lng };
};

const MapsTracking = ({
  farmAddress,
  processAddress,
  warehouseAddress,
  packerAddress,
  warehouseRetAddress,
  salepointRetAddress,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [farmDir, setFarmDir] = useState('');
  const [processorDir, setProcessorDir] = useState('');
  const [warehouseDir, setWarehouseDir] = useState('');
  const [packerDir, setPackerDir] = useState('');
  const [warehouseRetDir, setWarehouseRetDir] = useState('');
  const [salepointRetDir, setSalepointRetDir] = useState('');

  const [farmMarker, setFarmMarker] = useState(null);
  const [processorMarker, setProcessorMarker] = useState(null);
  const [warehouseMarker, setWarehouseMarker] = useState(null);
  const [packerMarker, setPackerMarker] = useState(null);
  const [warehouseRetMarker, setWarehouseRetMarker] = useState(null);
  const [salepointRetMarker, setSalepointRetMarker] = useState(null);

  const [farmProcRoute, setFarmProcRoute] = useState();
  const [procWarehouseRoute, setProcWarehouseRoute] = useState();
  const [warehousePackerRoute, setWarehousePackerRoute] = useState();
  const [wareRetPackerRoute, setWareRetPackerRoute] = useState();
  const [salepointWareRoute, setSalepointWareRoute] = useState();

  const [center, setCenter] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const routeDirection = (dir1, dir2, setDirection) => {
    if (!dir2) return;
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: dir1,
        destination: dir2,
        travelMode: 'DRIVING',
        provideRouteAlternatives: false,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirection(result);
        }
      }
    );
  };

  const latLng = async () => {
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

  const defineCenter = async () => {
    const farmRes = await getCoordinates(farmDir);
    setCenter(farmRes);
  };
  const routes = () => {
    routeDirection(farmDir, processorDir, setFarmProcRoute);
    routeDirection(processorDir, warehouseDir, setProcWarehouseRoute);
    routeDirection(warehouseDir, packerDir, setWarehousePackerRoute);
    routeDirection(packerDir, warehouseRetDir, setWareRetPackerRoute);
    routeDirection(warehouseRetDir, salepointRetDir, setSalepointWareRoute);
  };

  useEffect(() => {
    defineCenter();
    setFarmDir(farmAddress);
    setProcessorDir(processAddress);
    setWarehouseDir(warehouseAddress);
    setPackerDir(packerAddress);
    setWarehouseRetDir(warehouseRetAddress);
    setSalepointRetDir(salepointRetAddress);

    // latLng();
    if (window.google) routes();
  }, [
    window.google,
    farmDir,
    processorDir,
    warehouseDir,
    packerDir,
    warehouseRetDir,
    salepointRetDir,
    farmProcRoute,
    procWarehouseRoute,
    warehousePackerRoute,
    wareRetPackerRoute,
    salepointWareRoute,
  ]);

  if (loadError) return 'Error';
  if (!isLoaded) return 'Cargando...';

  return (
    <div className="map-track">
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {/* {farmMarker && (
            <>
              <Marker
                position={farmMarker}
                label={"HOLA"}
                title={"Titulo"}
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
          ) : null} } */}

        {farmProcRoute && (
          <DirectionsRenderer
            directions={farmProcRoute}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: '#F96B13',
                strokeWeight: 5,
                // strokeOpacity: 0.5,
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
                // strokeOpacity: 0.5,
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
                // strokeOpacity: 0.5,
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
                // strokeOpacity: 0.5,
              },
            }}
          />
        )}

        {salepointWareRoute && (
          <DirectionsRenderer
            directions={salepointWareRoute}
            panel={<div>Holi</div>}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: '#F96B13',
                strokeWeight: 5,
                strokeOpacity: 0.5,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapsTracking;
