import { useState, useEffect } from 'react';

import { Grid } from '@mui/material';
import PhaseCard from './PhaseCard';

import { infuraGetCoffe1ERC20, infuraGetCoffe2ERC20, getCoffe1ERC20 } from '../../logic/erc20';
import AskNextActionInfura from '../../logic/GetNextAction/AskNextActionInfura';
import AskFarm from '../../logic/GetFarmDetails/AskFarm';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import AskHarvest from '../../logic/GetHavest/AskHarvest';
import AskProcess from '../../logic/GetProcess/AskProcess';
import AskTasting from '../../logic/GetTasting/AskTasting';
import AskCoffeeSeller from '../../logic/GetCoffeeSeller/AskCoffeeSeller';
import AskWarehouse from '../../logic/GetWarehouse/AskWarehouse';
import AskShipPacker from '../../logic/GetShipPacker/AskShipPacker';
import AskPacker from '../../logic/GetPacker/AskPacker';
import AskShipRetailer from '../../logic/GetShipRetailer/AskShipRetailer';
import AskRetailer from '../../logic/GetRetailer/AskRetailer';

const TimeLine = ({ batchNoIn }) => {
  const [message, setMessage] = useState('Loading..');
  const [nextAction, setNextAction] = useState({});
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

  // https://docs.ethers.io/v5/concepts/events/
  // http://localhost:3000/tracking?batch=0x6B4964E34816C7FF32EA3787c2C615E583715197

  const parseFloat = (str, radix) => {
    const parts = str.split('.');
    if (parts.length > 1) {
      return parseInt(parts[0], radix) + parseInt(parts[1], radix) / radix ** parts[1].length;
    }
    return parseInt(parts[0], radix);
  };

  const parsePrice = (price) => `$ ${parseFloat(price)}`;

  useEffect(
    () => {
      const de = async () => {
        const erc1 = infuraGetCoffe1ERC20();
        // const erc1 = getCoffe1ERC20();
        const erc2 = infuraGetCoffe2ERC20();
        const events = await erc1.queryFilter(erc1.filters.SetFarmDetails(null));
        const batchTemp = events.map((event) => event.args.batchNo);

        /* const nextActionsTemp = batchTemp.map(async (item) => {
        const res = await AskNextAction({ batchNo: item });
        return res.data;
      });
      setBatchNo(batchTemp);
      setNextActions(await Promise.all(nextActionsTemp));
      */

        const nAction = await AskNextActionInfura({ batchNo: batchNoIn });
        const farmdat = await AskFarm({ batchNo: batchNoIn });
        const harvestdat = await AskHarvest({ batchNo: batchNoIn });
        const procdat = await AskProcess({ batchNo: batchNoIn });
        const tastedat = await AskTasting({ batchNo: batchNoIn });
        const selldat = await AskCoffeeSeller({ batchNo: batchNoIn });
        const warehousedat = await AskWarehouse({ batchNo: batchNoIn });
        const shipackdat = await AskShipPacker({ batchNo: batchNoIn });
        const packdat = await AskPacker({ batchNo: batchNoIn });
        const shiretailerdat = await AskShipRetailer({ batchNo: batchNoIn });
        const retailerdat = await AskRetailer({ batchNo: batchNoIn });

        console.log('n action: ', nAction);
        console.log('farm: ', farmdat);
        console.log('harvest: ', harvestdat);
        console.log('procs: ', procdat);
        console.log('taste: ', tastedat);
        console.log('sell: ', selldat);
        console.log('warehouse: ', warehousedat);
        console.log('shippack: ', shipackdat);
        console.log('pack: ', packdat);
        console.log('retship: ', shiretailerdat);
        console.log('ret: ', retailerdat);
        setNextAction(await AskNextActionInfura({ batchNo: batchNoIn }));

        // console.log(retailerData )
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
      };
      de();
    },
    [
      // farmData,
      // processData,
      // tasteData,
      // sellData,
      // warehouseData,
      // shipPackerData,
      // packerData,
      // shipRetailerData,
      // retailerData,
    ]
  );

  function dateToYMD(dateIN) {
    // eslint-disable-next-line no-self-compare
    if (dateIN.getTime() !== dateIN.getTime()) {
      return 'No disponible';
    }
    const d = dateIN.getDate();
    const m = dateIN.getMonth() + 1; // Month from 0 to 11
    const y = dateIN.getFullYear();
    return `${d < 9 ? `0${d}` : d}-${m + 1 < 10 ? `0${m + 1}` : m + 1}-${y}`;
  }

  return (
    <div className="cursor-default max-w-5xl mx-auto">
      <p className="text-center font-bold text-xl">Tracking Coffe</p>
      <p className="text-center my-4 mb-10 break-all">
        Lote #: <span className="underline ">{batchNoIn}</span>
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
          icon={'cosecha.png'}
          date={farmData.data ? farmData.data.farmDate : message}
          // date={farmData.data ? dateToYMD(new Date(farmData.data.farmDate)) : message}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Nombre</div>
              {/* {farmData.data} */}
              {farmData.data ? farmData.data.farmName : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección</div>
              {farmData.data ? farmData.data.farmAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Geolocalización: Latitud</div>
              {farmData.data ? farmData.data.latitude : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Geolocalización: Longitud</div>
              {farmData.data ? farmData.data.longitude : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Cosecha'}
          className={'bg-green-100'}
          icon={'cosecha.png'}
          date={harverstData.data ? dateToYMD(new Date(harverstData.data.harvestDate)) : message}
        >
          <div className="flex flex-col text-sm">
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
              <div className="mt-5 mb-1 font-semibold">Fecha de cosecha</div>
              {harverstData.data ? dateToYMD(new Date(harverstData.data.harvestDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Humedad del Grano Cosechado</div>
              {harverstData.data ? `${harverstData.data.humidityPercentage} [%]` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Peso del Lote Cosechado</div>
              {harverstData.data ? `${harverstData.data.batchWeight} [kg]` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Procesado'}
          className={'bg-red-100'}
          icon={'proccess.png'}
          date={processData.data ? dateToYMD(new Date(processData.data.millDate)) : message}
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
              <div className="mt-5 mb-1 font-semibold">Dirección</div>
              {processData.data ? processData.data.processorAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Tipo de Secado</div>
              {processData.data ? processData.data.typeOfDrying : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Humedad del Grano Secado</div>
              {processData.data ? `${processData.data.humidityAfterDrying} [%]` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Temp. de Tostado</div>
              {processData.data ? `${processData.data.tempTypeRoast[0]} [ºC]` : message}
            </div>{' '}
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Tipo de Tostado</div>
              {processData.data ? processData.data.tempTypeRoast[1] : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha de Tostado</div>
              {processData.data ? dateToYMD(new Date(processData.data.roastMillDates[0])) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha de Molienda</div>
              {processData.data ? dateToYMD(new Date(processData.data.roastMillDates[1])) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio de Procesado por Kilo</div>
              {processData.data ? `${parsePrice(processData.data.processorPricePerKilo)}` : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Peso del Lote Procesado</div>
              {processData.data ? `${processData.data.processBatchWeight} [kg]` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard title={'Catación'} className={'bg-blue-200'} icon={'inspeccion.png'} date={'No Disponible'}>
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Puntaje de Catación</div>
              {tasteData.data ? tasteData.data.tastingScore : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio del Servicio</div>
              {tasteData.data ? `${parsePrice(tasteData.data.tastingServicePrice)}` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard title={'Venta del Grano'} className={'bg-blue-200'} icon={'inspeccion.png'} date={'No Disponible'}>
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio del Grano por Kilo</div>
              {sellData.data ? `${parsePrice(sellData.data)}` : message}
              {/* {sellData.data ? `${sellData.data.beanPricePerKilo} [$]` : message} */}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Bodega'}
          className={'bg-blue-200'}
          icon={'aglomerado.png'}
          date={warehouseData.data ? dateToYMD(new Date(warehouseData.data.warehouseArrivalDate)) : message}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección</div>
              {warehouseData.data ? warehouseData.data.warehouseAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha de Ingreso</div>
              {warehouseData.data ? dateToYMD(new Date(warehouseData.data.warehouseArrivalDate)) : message}
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
          date={shipPackerData.data ? dateToYMD(new Date(shipPackerData.data.warehousePickupDate)) : message}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de Salida</div>
              {shipPackerData.data ? dateToYMD(new Date(shipPackerData.data.warehousePickupDate)) : message}
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
          date={packerData.data ? dateToYMD(new Date(packerData.data.packDate)) : message}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección</div>
              {packerData.data ? packerData.data.packerAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha de llegada</div>
              {packerData.data ? dateToYMD(new Date(packerData.data.packerArrivalDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha empacado</div>
              {packerData.data ? dateToYMD(new Date(packerData.data.packingDate)) : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Precio de empacado por Kilo</div>
              {packerData.data ? `${parsePrice(packerData.data.packingPricePerKilo)}` : message}
            </div>
          </div>
        </PhaseCard>

        <PhaseCard
          title={'Transporte hacia Retailer'}
          className={'bg-blue-200'}
          icon={'transporte.png'}
          date={shipRetailerData.data ? dateToYMD(new Date(shipRetailerData.data.packerPickupDate)) : message}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha y Hora de Salida</div>
              {shipRetailerData.data ? dateToYMD(new Date(shipRetailerData.data.packerPickupDate)) : message}
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
          date={retailerData.data ? dateToYMD(new Date(retailerData.data.warehouseSalepointArrivalDate[0])) : message}
        >
          <div className="flex flex-col text-sm">
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Almacén</div>
              {retailerData.data ? retailerData.data.warehouseRetailerName : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Dirección del Almacén</div>
              {retailerData.data ? retailerData.data.warehouseRetailerAddress : message}
            </div>
            <div className="flex flex-col">
              <div className="mt-5 mb-1 font-semibold">Fecha de Llegada al Almacén</div>
              {retailerData.data ? dateToYMD(new Date(retailerData.data.warehouseSalepointArrivalDate[0])) : message}
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
              <div className="mt-5 mb-1 font-semibold">Fecha de Llegada al Punto de Venta</div>
              {retailerData.data ? dateToYMD(new Date(retailerData.data.warehouseSalepointArrivalDate[1])) : message}
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
