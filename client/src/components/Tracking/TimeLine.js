import { useState, useEffect } from 'react';

import moment from 'moment';
import PhaseCard from './PhaseCard';

import AskNextActionInfura from '../../logic/GetNextAction/AskNextActionInfura';
import AskFarm from '../../logic/GetFarmDetails/AskFarm';
import AskHarvest from '../../logic/GetHavest/AskHarvest';
import AskProcess from '../../logic/GetProcess/AskProcess';
import AskTasting from '../../logic/GetTasting/AskTasting';
import AskCoffeeSeller from '../../logic/GetCoffeeSeller/AskCoffeeSeller';
import AskWarehouse from '../../logic/GetWarehouse/AskWarehouse';
import AskShipPacker from '../../logic/GetShipPacker/AskShipPacker';
import AskPacker from '../../logic/GetPacker/AskPacker';
import AskShipRetailer from '../../logic/GetShipRetailer/AskShipRetailer';
import AskRetailer from '../../logic/GetRetailer/AskRetailer';
import {
  getFarmTx,
  getHarvestTx,
  getProcessTx,
  getTasteTx,
  getSellTx,
  getWarehouseTx,
  getShipPackerTx,
  getPackerTx,
  getShipRetailerTx,
  getRetailerTx,
} from '../../logic/getBatchTx';

import getUserInfura from '../../logic/GetUserInfura';
import getOwnerInfura from '../../logic/GetOwnerInfura';

import '../../App.css';

const TimeLine = ({ batchNoIn }) => {
  const [message, setMessage] = useState('Loading..');
  const [txMessage, setTxMessage] = useState('Loading..');
  let nextAction = {};
  const [farmData, setFarmData] = useState({});
  const [harverstData, setHarverstData] = useState({});
  const [processData, setProcessData] = useState({});
  const [tasteData, setTasteData] = useState({});
  const [sellData, setSellData] = useState({});
  const [warehouseData, setWarehouseData] = useState({});
  const [shipPackerData, setShipPackerData] = useState({});
  const [packerData, setPackerData] = useState({});
  const [shipRetailerData, setShipRetailerData] = useState({});
  const [retailerData, setRetailerData] = useState({});

  const [farmTx, setFarmTx] = useState(null);
  const [harvestTx, setHarvestTx] = useState(null);
  const [processTx, setProcessTx] = useState(null);
  const [tasteTx, setTasteTx] = useState(null);
  const [sellTx, setSellTx] = useState(null);
  const [warehouseTx, setWarehouseTx] = useState(null);
  const [shipPackerTx, setShipPackerTx] = useState(null);
  const [packerTx, setPackerTx] = useState(null);
  const [shipRetailerTx, setShipRetailerTx] = useState(null);
  const [retailerTx, setRetailerTx] = useState(null);

  const [userAdmin, setUserAdmin] = useState(null);
  const [userHarvest, setUserHarvest] = useState({});
  const [userProcess, setUserProcess] = useState({});
  const [userTaste, setUserTaste] = useState({});
  const [userSell, setUserSell] = useState({});
  const [userWarehouse, setUserWarehouse] = useState({});
  const [userShipPacker, setUserShipPacker] = useState({});
  const [userPacker, setUserPacker] = useState({});
  const [userShipRetailer, setUserShipRetailer] = useState({});
  const [userRetailer, setUserRetailer] = useState({});

  const parsePrice = (price) => `$ ${parseFloat(price)}`;

  useEffect(() => {
    const getPaticipants = async () => {
      const nextActionLocal = await AskNextActionInfura({ batchNo: batchNoIn });
      console.log('GET DATA INFURA');

      if (nextActionLocal && nextActionLocal.data !== 'DONE') {
        console.log('NO DONE');
        setTxMessage('No disponible');
        return;
      }

      const farmTx = await getFarmTx(batchNoIn);
      const harvestTx = await getHarvestTx(batchNoIn);
      const processTx = await getProcessTx(batchNoIn);
      const tasteTx = await getTasteTx(batchNoIn);
      const sellTx = await getSellTx(batchNoIn);
      const warehouseTx = await getWarehouseTx(batchNoIn);
      const shipPackerTx = await getShipPackerTx(batchNoIn);
      const packerTx = await getPackerTx(batchNoIn);
      const shipRetailerTx = await getShipRetailerTx(batchNoIn);
      const retailerTx = await getRetailerTx(batchNoIn);

      setFarmTx(farmTx);
      setHarvestTx(harvestTx);
      setProcessTx(processTx);
      setTasteTx(tasteTx);
      setSellTx(sellTx);
      setWarehouseTx(warehouseTx);
      setShipPackerTx(shipPackerTx);
      setPackerTx(packerTx);
      setShipRetailerTx(shipRetailerTx);
      setRetailerTx(retailerTx);

      setUserAdmin(await getOwnerInfura());
      setUserHarvest(await getUserInfura(harvestTx ? harvestTx[0] : null));
      setUserProcess(await getUserInfura(processTx ? processTx[0] : null));
      setUserTaste(await getUserInfura(tasteTx ? tasteTx[0] : null));
      setUserSell(await getUserInfura(sellTx ? sellTx[0] : null));
      setUserWarehouse(await getUserInfura(warehouseTx ? warehouseTx[0] : null));
      setUserShipPacker(await getUserInfura(shipPackerTx ? shipPackerTx[0] : null));
      setUserPacker(await getUserInfura(packerTx ? packerTx[0] : null));
      setUserShipRetailer(await getUserInfura(shipRetailerTx ? shipRetailerTx[0] : null));
      setUserRetailer(await getUserInfura(retailerTx ? retailerTx[0] : null));
      setTxMessage('No disponible');
    };

    getPaticipants();
  }, []);

  useEffect(() => {
    const getDataInfura = async () => {
      nextAction = await AskNextActionInfura({ batchNo: batchNoIn });
      console.log('GET DATA INFURA');
      console.log(nextAction);

      if (nextAction && nextAction.data !== 'DONE') {
        console.log('NO DONE');
        setMessage('No disponible');
        return;
      }

      setFarmData(await AskFarm({ batchNo: batchNoIn }));
      setHarverstData(await AskHarvest({ batchNo: batchNoIn }));
      setProcessData(await AskProcess({ batchNo: batchNoIn }));
      setTasteData(await AskTasting({ batchNo: batchNoIn }));
      setSellData(await AskCoffeeSeller({ batchNo: batchNoIn }));
      setWarehouseData(await AskWarehouse({ batchNo: batchNoIn }));
      setShipPackerData(await AskShipPacker({ batchNo: batchNoIn }));
      setPackerData(await AskPacker({ batchNo: batchNoIn }));
      setShipRetailerData(await AskShipRetailer({ batchNo: batchNoIn }));
      setRetailerData(await AskRetailer({ batchNo: batchNoIn }));
      setMessage('No disponible');
    };
    getDataInfura();
  }, []);

  function unixToYMD(unixData) {
    const ds = moment.unix(unixData).format('DD-MM-YYYY');
    const ts = moment.unix(unixData).format('HH:mm:ss');

    return `${ds} || ${ts}`;
  }

  function dateToYMD2(dateIN) {
    // eslint-disable-next-line no-self-compare
    if (dateIN.getTime() !== dateIN.getTime()) {
      return 'No disponible';
    }
    const ds = moment(dateIN).format('DD-MM-YYYY');
    const ts = moment(dateIN).format('HH:mm:ss');
    return `${ds} || ${ts}`;
  }

  return (
    <div className="cursor-default max-w-5xl mx-auto mt-10">
      <p className="text-center mt-20 font-bold text-xl">Tracking del Café</p>
      <p className="text-center my-4 mb-10 break-all">
        Lote #: <span className="underline">{batchNoIn}</span>
      </p>
      <div
        style={{ backgroundImage: 'url(static/icons/data_shapes.svg)' }}
        className="w-full h-full absolute opacity-10 none"
      >
        <br />
      </div>

      <div className="grid py-5 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full">
        <PhaseCard
          title={'Datos de la Granja'}
          className={'bg-green-100'}
          icon={'farm3.png'}
          date={farmTx ? unixToYMD(farmTx[2]) : txMessage}
          url={farmTx ? `https://rinkeby.etherscan.io/tx/${farmTx[1]}` : null}
          verificate={farmData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-1 mb-1 font-semibold ">Información del Editor: </div>
              {userAdmin ? (
                <>
                  <div>Administrador</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${userAdmin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(userAdmin).slice(0, 8).concat('...').concat(String(userAdmin).slice(-8))}
                  </a>
                  <a target="_blank" href="mailto:coffeetrackec@gmail.com" rel="noreferrer" className="mail-track">
                    coffeetrackec@gmail.com
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Nombre</div>

              {farmData.data ? farmData.data.farmName : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección</div>
              {farmData.data ? farmData.data.farmAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Geolocalización: Latitud</div>
              {farmData.data ? `${parseFloat(farmData.data.latitude)}` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Geolocalización: Longitud</div>
              {farmData.data ? `${parseFloat(farmData.data.longitude)}` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Cosecha'}
          className={'bg-green-100'}
          icon={'cosecha.png'}
          date={harvestTx ? unixToYMD(harvestTx[2]) : txMessage}
          url={harvestTx ? `https://rinkeby.etherscan.io/tx/${harvestTx[1]}` : null}
          verificate={harverstData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-1 mb-1 font-semibold ">Información del Editor:</div>
              {harvestTx ? (
                <>
                  <div>{userHarvest.name ? `${userHarvest.name}` : message}</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${harvestTx[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(harvestTx[0]).slice(0, 8).concat('...').concat(String(harvestTx[0]).slice(-8))}
                  </a>
                  <a target="_blank" href={`mailto:${userHarvest.email}`} rel="noreferrer" className="mail-track ">
                    {userHarvest.email ? userHarvest.email : message}
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Proveedor de Semilla</div>
              {harverstData.data ? harverstData.data.seedSupplier : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Tipo de Semilla</div>
              {harverstData.data ? harverstData.data.typeOfSeed : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Familia del Café</div>
              {harverstData.data ? harverstData.data.coffeeFamily : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fertilizantes</div>
              {harverstData.data ? harverstData.data.fertilizerUsed : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de cosecha</div>
              {harverstData.data ? dateToYMD2(new Date(harverstData.data.harvestDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Humedad del Grano Cosechado</div>
              {harverstData.data ? `${parseFloat(harverstData.data.humidityPercentage)} [%]` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Peso del Lote Cosechado</div>
              {harverstData.data ? `${parseFloat(harverstData.data.batchWeight)} [kg]` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Procesado'}
          className={'bg-red-100'}
          icon={'proccess.png'}
          date={processTx ? unixToYMD(processTx[2]) : txMessage}
          url={processTx ? `https://rinkeby.etherscan.io/tx/${processTx[1]}` : null}
          verificate={processData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="bg-gray-100 rounded-lg">
              <img
                src={processData.data ? processData.data.roastImageHash : 'static/images/no-imagen.gif'}
                alt="Imagen del Café Tostado"
                className="h-48 mx-auto"
              />
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold ">Información del Editor: </div>
              {processTx ? (
                <>
                  <div>{userProcess.name && processTx[0] ? `${userProcess.name}` : message}</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${processTx[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(processTx[0]).slice(0, 8).concat('...').concat(String(processTx[0]).slice(-8))}
                  </a>

                  <a target="_blank" href={`mailto:${userProcess.email}`} rel="noreferrer" className="mail-track ">
                    {userProcess.email ? userProcess.email : message}
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección</div>
              {processData.data ? processData.data.processorAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Tipo de Secado</div>
              {processData.data ? processData.data.typeOfDrying : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Humedad del Grano Secado</div>
              {processData.data ? `${parseFloat(processData.data.humidityAfterDrying)} [%]` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Temperatura de Tostado</div>
              {processData.data ? `${parseFloat(processData.data.tempTypeRoast[0])} [ºC]` : message}
            </div>{' '}
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Tipo de Tostado</div>
              {processData.data ? processData.data.tempTypeRoast[1] : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de Tostado</div>
              {processData.data ? dateToYMD2(new Date(processData.data.roastMillDates[0])) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de Molienda</div>
              {processData.data ? dateToYMD2(new Date(processData.data.roastMillDates[1])) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio de Procesado por Kilo</div>
              {processData.data ? `${parsePrice(processData.data.processorPricePerKilo)}` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Peso del Lote Procesado</div>
              {processData.data ? `${parseFloat(processData.data.processBatchWeight)} [kg]` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Catación'}
          className={'bg-blue-200'}
          icon={'inspeccion.png'}
          date={tasteTx ? unixToYMD(tasteTx[2]) : message}
          url={tasteTx ? `https://rinkeby.etherscan.io/tx/${tasteTx[1]}` : txMessage}
          verificate={tasteData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-1 mb-1 font-semibold ">Información del Editor: </div>
              {tasteTx ? (
                <>
                  <div>{userTaste.name && tasteTx[0] ? `${userTaste.name}` : message}</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${tasteTx[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(tasteTx[0]).slice(0, 8).concat('...').concat(String(tasteTx[0]).slice(-8))}
                  </a>
                  <a target="_blank" href={`mailto:${userTaste.email}`} rel="noreferrer" className="mail-track">
                    {userTaste.email ? userTaste.email : message}
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Puntaje de Catación</div>
              {tasteData.data ? `${parseFloat(tasteData.data.tastingScore)}` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio del Servicio</div>
              {tasteData.data ? `${parsePrice(tasteData.data.tastingServicePrice)}` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Venta del Grano'}
          className={'bg-blue-200'}
          icon={'sell1.png'}
          date={sellTx ? unixToYMD(sellTx[2]) : txMessage}
          url={sellTx ? `https://rinkeby.etherscan.io/tx/${sellTx[1]}` : null}
          verificate={sellData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="mt-1 mb-1 font-semibold ">Información del Editor: </div>
                {sellTx ? (
                  <>
                    <div>{userSell.name && sellTx[0] ? `${userSell.name}` : message}</div>
                    <a
                      href={`https://rinkeby.etherscan.io/address/${sellTx[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="user-link"
                    >
                      {/* Cuenta:  */}
                      {String(sellTx[0]).slice(0, 8).concat('...').concat(String(sellTx[0]).slice(-8))}
                    </a>
                    <a target="_blank" href={`mailto:${userSell.email}`} rel="noreferrer" className="mail-track ">
                      {userSell.email ? userSell.email : message}
                    </a>
                  </>
                ) : (
                  <p>{txMessage}</p>
                )}
              </div>
              <div className="mt-5 mb-1 font-semibold">Precio del Grano por Kilo</div>
              {sellData.data ? `${parsePrice(sellData.data)}` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Bodega'}
          className={'bg-blue-200'}
          icon={'aglomerado.png'}
          date={warehouseTx ? unixToYMD(warehouseTx[2]) : txMessage}
          url={warehouseTx ? `https://rinkeby.etherscan.io/tx/${warehouseTx[1]}` : null}
          verificate={warehouseData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-1 mb-1 font-semibold ">Información del Editor: </div>
              {warehouseTx ? (
                <>
                  <div>{userWarehouse.name && warehouseTx[0] ? `${userWarehouse.name}` : message}</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${warehouseTx[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(warehouseTx[0]).slice(0, 8).concat('...').concat(String(warehouseTx[0]).slice(-8))}
                  </a>
                  <a target="_blank" href={`mailto:${userWarehouse.email}`} rel="noreferrer" className="mail-track ">
                    {userWarehouse.email ? userWarehouse.email : message}
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección</div>
              {warehouseData.data ? warehouseData.data.warehouseAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de Ingreso</div>
              {warehouseData.data ? dateToYMD2(new Date(warehouseData.data.warehouseArrivalDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio de Almacenamiento por Kilo</div>
              {warehouseData.data ? `${parsePrice(warehouseData.data.storagePricePerKiloPerTime)}` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Transporte hacia Empacador'}
          className={'bg-blue-200'}
          icon={'transporte.png'}
          date={shipPackerTx ? unixToYMD(shipPackerTx[2]) : txMessage}
          url={shipPackerTx ? `https://rinkeby.etherscan.io/tx/${shipPackerTx[1]}` : null}
          verificate={shipPackerData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-1 mb-1 font-semibold ">Información del Editor: </div>
              {shipPackerTx ? (
                <>
                  <div>{userShipPacker.name && shipPackerTx[0] ? `${userShipPacker.name}` : message}</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${shipPackerTx[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(shipPackerTx[0]).slice(0, 8).concat('...').concat(String(shipPackerTx[0]).slice(-8))}
                  </a>
                  <a target="_blank" href={`mailto:${userShipPacker.email}`} rel="noreferrer" className="mail-track">
                    {userShipPacker.email ? userShipPacker.email : message}
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora y Hora de Salida</div>
              {shipPackerData.data ? dateToYMD2(new Date(shipPackerData.data.warehousePickupDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Tipo de Transporte</div>
              {shipPackerData.data ? shipPackerData.data.toPackerTransportType : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio de Transporte</div>
              {shipPackerData.data ? `${parsePrice(shipPackerData.data.toPackerShippingPrice)}` : message}
            </div>
            {/* <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Destino</div>
              {shipPackerData.data ? 'Empacadora' : message}
            </div> */}
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Empacado'}
          className={'bg-blue-200'}
          icon={'empacado.png'}
          date={packerTx ? unixToYMD(packerTx[2]) : txMessage}
          url={packerTx ? `https://rinkeby.etherscan.io/tx/${packerTx[1]}` : null}
          verificate={packerData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-1 mb-1 font-semibold ">Información del Editor: </div>
              {packerTx ? (
                <>
                  <div>{userPacker.name && packerTx[0] ? `${userPacker.name}` : message}</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${packerTx[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(packerTx[0]).slice(0, 8).concat('...').concat(String(packerTx[0]).slice(-8))}
                  </a>
                  <a target="_blank" href={`mailto:${userPacker.email}`} rel="noreferrer" className="mail-track">
                    {userPacker.email ? userPacker.email : message}
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección</div>
              {packerData.data ? packerData.data.packerAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de Llegada</div>
              {packerData.data ? dateToYMD2(new Date(packerData.data.packerArrivalDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora Empacado</div>
              {packerData.data ? dateToYMD2(new Date(packerData.data.packingDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio de Empacado por Kilo</div>
              {packerData.data ? `${parsePrice(packerData.data.packingPricePerKilo)}` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Transporte hacia Retailer'}
          className={'bg-blue-200'}
          icon={'transporte.png'}
          date={shipRetailerTx ? unixToYMD(shipRetailerTx[2]) : txMessage}
          url={shipRetailerTx ? `https://rinkeby.etherscan.io/tx/${shipRetailerTx[1]}` : null}
          verificate={shipRetailerData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-1 mb-1 font-semibold ">Información del Editor: </div>
              {shipRetailerTx ? (
                <>
                  <div>{userShipRetailer.name && shipRetailerTx[0] ? `${userShipRetailer.name}` : message}</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${shipRetailerTx[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(shipRetailerTx[0]).slice(0, 8).concat('...').concat(String(shipRetailerTx[0]).slice(-8))}
                  </a>
                  <a target="_blank" href={`mailto:${userShipRetailer.email}`} rel="noreferrer" className="mail-track ">
                    {userShipRetailer.email ? userShipRetailer.email : message}
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora y Hora de Salida</div>
              {shipRetailerData.data ? dateToYMD2(new Date(shipRetailerData.data.packerPickupDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Tipo de Transporte</div>
              {shipRetailerData.data ? shipRetailerData.data.toRetailerTransportType : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio de transporte</div>
              {shipRetailerData.data ? `${parsePrice(shipRetailerData.data.toReatilerShippingPrice)}` : message}
            </div>
            {/* <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Destino</div>
              {shipRetailerData.data ? 'Retailer' : message}
            </div> */}
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Retailer'}
          className={'bg-blue-200'}
          icon={'retailer.png'}
          date={retailerTx ? unixToYMD(retailerTx[2]) : txMessage}
          url={retailerTx ? `https://rinkeby.etherscan.io/tx/${retailerTx[1]}` : null}
          verificate={retailerData.data != null}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-1 mb-1 font-semibold ">Información del Editor:</div>
              {retailerTx ? (
                <>
                  <div>{userRetailer.name && retailerTx[0] ? `${userRetailer.name}` : message}</div>
                  <a
                    href={`https://rinkeby.etherscan.io/address/${retailerTx[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    {String(retailerTx[0]).slice(0, 8).concat('...').concat(String(retailerTx[0]).slice(-8))}
                  </a>
                  <a target="_blank" href={`mailto:${userRetailer.email}`} rel="noreferrer" className="mail-track">
                    {userRetailer.email ? userRetailer.email : message}
                  </a>
                </>
              ) : (
                <p>{txMessage}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Almacén</div>
              {retailerData.data ? retailerData.data.warehouseRetailerName : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección del Almacén</div>
              {retailerData.data ? retailerData.data.warehouseRetailerAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de Llegada al Almacén</div>
              {retailerData.data ? dateToYMD2(new Date(retailerData.data.warehouseSalepointArrivalDate[0])) : message}
            </div>

            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Punto de Venta</div>
              {retailerData.data ? retailerData.data.salepointRetailerName : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección del Punto de Venta</div>
              {retailerData.data ? retailerData.data.salepointRetailerAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de Llegada al Punto de Venta</div>
              {retailerData.data ? dateToYMD2(new Date(retailerData.data.warehouseSalepointArrivalDate[1])) : message}
            </div>

            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Tipo de Transporte</div>
              {retailerData.data ? retailerData.data.toSalepointTransportType : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio de Transporte</div>
              {retailerData.data ? `${parsePrice(retailerData.data.toSalepointShippingPrice)}` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio por Kilo</div>
              {retailerData.data ? `${parsePrice(retailerData.data.retailerPricePerKilo)}` : message}
            </div>
          </div>
        </PhaseCard>
      </div>
    </div>
  );
};

export default TimeLine;
