import { useState, useEffect } from 'react';

import { Grid} from '@mui/material';
import PhaseCard from './PhaseCard';

import { getCoffe1ERC20, getCoffe2ERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import AskHarvest from '../../logic/GetHavest/AskHarvest';
import AskProcess from '../../logic/GetProcess/AskProcess';
import AskTasting from '../../logic/GetTasting/AskTasting';
import AskWarehouse from '../../logic/GetWarehouse/AskWarehouse';
import AskShipPacker from '../../logic/GetShipPacker/AskShipPacker';
import AskPacker from '../../logic/GetPacker/AskPacker';
import AskShipRetailer from '../../logic/GetShipRetailer/AskShipRetailer';
import AskRetailer from '../../logic/GetRetailer/AskRetailer';

const TimeLine = ({ batchNoIn }) => {
  const [message, setMessage] = useState('Loading..');
  const [nextAction, setNextAction] = useState({});
  const [harversData, setHarversData] = useState({});
  const [processData, setProcessData] = useState({});
  const [inspectData, setInspectData] = useState({});
  const [agglomData, setAgglomData] = useState({});
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
  }

  const parsePrice = (price) => `$ ${parseFloat(price)}`

  useEffect(() => {
    const de = async () => {
      const erc = getCoffe1ERC20();
      const events = await erc.queryFilter(erc.filters.SetFarmDetails(null));
      const batchTemp = events.map((event) => event.args.batchNo);

      /* const nextActionsTemp = batchTemp.map(async (item) => {
        const res = await AskNextAction({ batchNo: item });
        return res.data;
      });
      setBatchNo(batchTemp);
      setNextActions(await Promise.all(nextActionsTemp));
      */

      setNextAction(await AskNextAction({ batchNo:  batchNoIn}));

      // console.log(retailerData )
      if(nextAction && nextAction.data!=='DONE'){
        setMessage("No Disponibles")
        return;
      }

      setHarversData(await AskHarvest({ batchNo:  batchNoIn}));
      setProcessData(await AskProcess({ batchNo:  batchNoIn}));
      setInspectData(await AskTasting({ batchNo:  batchNoIn}));
      setAgglomData(await AskWarehouse({ batchNo:  batchNoIn}));
      setShipPackerData(await AskShipPacker({ batchNo:  batchNoIn}));
      setPackerData(await AskPacker({ batchNo:  batchNoIn}));
      setShipRetailerData(await AskShipRetailer({ batchNo:  batchNoIn}));
      setRetailerData(await AskRetailer({ batchNo:  batchNoIn}));      

    };
    de();
  }, []);

  function dateToYMD(dateIN) {
    // eslint-disable-next-line no-self-compare
    if (dateIN.getTime() !== dateIN.getTime()) {
      return 'No disponible';
    }
    const d = dateIN.getDate();
    const m = dateIN.getMonth() + 1; // Month from 0 to 11
    const y = dateIN.getFullYear();
    return `${d<9?`0${d}`:d}-${m+1<10?`0${m+1}`:m+1}-${y}`;
}

  return (
      <Grid className='cursor-default relative'>
        <p className='text-center font-bold text-xl'>Tracking Coffe</p>
        <p className='text-center my-4 mb-10 break-all'>Bach #: <span className='underline '>{batchNoIn}</span></p>
        <div style={{backgroundImage:"url(static/icons/data_shapes.svg)"}} className="w-full h-full absolute opacity-10 none"><br/></div>

        <div className='grid py-5 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full'>
        <PhaseCard title={"Cosecha"} className={"bg-green-100"} icon={"cosecha.png"} date={harversData.data ? dateToYMD(new Date(harversData.data.harvestDate)) : message}>
              <div className='flex flex-col text-sm'>
              <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de cosecha</div>{harversData.data ? dateToYMD(new Date(harversData.data.harvestDate)) : message}</div>
              <div className='flex flex-col'><div className='mt-0 mb-1 font-semibold'>Familia</div>{harversData.data ? harversData.data.coffeeFamily : message}</div>
              <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Tipo de Semilla</div>{harversData.data ? harversData.data.typeOfSeed : message}</div>
              <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fertilizantes</div>{harversData.data ? harversData.data.fertilizerUsed : message}</div>
              </div>
        </PhaseCard>

        <PhaseCard title={"Procesado"} className={"bg-red-100"} icon={"proccess.png"} date={processData.data ? dateToYMD(new Date(processData.data.millDate)) : message}>
              <div className='flex flex-col text-sm'>
                <div className='bg-gray-100 rounded-lg'><img src={processData.data ? processData.data.roastImageHash : ""} alt="Imagen del café Tostado" className='h-48 mx-auto'/></div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Dirección del Procesado</div>{processData.data ? processData.data.procAddress : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Tipo de Secado</div>{processData.data ? processData.data.typeOfDrying : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de Tostado</div>{processData.data ? dateToYMD(new Date(processData.data.roastDate)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Tipo de Tostado</div>{processData.data ? processData.data.typeOfRoast : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Temp. de Tostado</div>{processData.data ? `${processData.data.roastTemp} grados` : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de Molienda</div>{processData.data ? dateToYMD(new Date(processData.data.millDate)) : message}</div>
              </div>
        </PhaseCard>

        <PhaseCard title={"Inspección"} className={"bg-blue-200"} icon={"inspeccion.png"} date={'No Disponible'}>
              <div className='flex flex-col text-sm'>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Puntaje de Test</div>{inspectData.data ? parseFloat(inspectData.data.tasteScore._hex) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Precio por kilo</div>{inspectData.data ? parsePrice(inspectData.data.grainPrice._hex) : message}</div>
              </div>
        </PhaseCard>

        <PhaseCard title={"Bodega"} className={"bg-blue-200"} icon={"aglomerado.png"} date={agglomData.data ? dateToYMD(new Date(agglomData.data.agglomDate)) : message}>
              <div className='flex flex-col text-sm'>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de ingreso</div>{agglomData.data ? dateToYMD(new Date(agglomData.data.agglomDate)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Dirección</div>{agglomData.data ? agglomData.data.agglomAddress : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Precio de almacenamiento por kilo</div>{agglomData.data ? parsePrice(agglomData.data.storagePrice._hex) : message}</div>
              </div>
        </PhaseCard>

        <PhaseCard title={"Transporte"} className={"bg-blue-200"} icon={"transporte.png"} date={shipPackerData.data ? dateToYMD(new Date(shipPackerData.data.pickupDateP)) : message}>
              <div className='flex flex-col text-sm'>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de Salida</div>{shipPackerData.data ? dateToYMD(new Date(shipPackerData.data.pickupDateP)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Tipo de Transporte</div>{shipPackerData.data ? shipPackerData.data.transportTypeP : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Precio de transporte</div>{shipPackerData.data ? parsePrice(shipPackerData.data.shipPriceP._hex) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Destino</div>{shipPackerData.data ? 'Empacadora' : message}</div>
              </div>
        </PhaseCard>

        <PhaseCard title={"Empacado"} className={"bg-blue-200"} icon={"empacado.png"} date={packerData.data ? dateToYMD(new Date(packerData.data.packDate)) : message}>
              <div className='flex flex-col text-sm'>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Dirección</div>{packerData.data ? packerData.data.packAddress : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de llegada</div>{packerData.data ? dateToYMD(new Date(packerData.data.arrivalDateP)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha empacado</div>{packerData.data ? dateToYMD(new Date(packerData.data.packDate)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Precio de empacado por kilo</div>{packerData.data ? parsePrice(packerData.data.packPrice._hex) : message}</div>
              </div>
        </PhaseCard>

        <PhaseCard title={"Transporte"} className={"bg-blue-200"} icon={"transporte.png"} date={shipRetailerData.data ? dateToYMD(new Date(shipRetailerData.data.pickupDateR)) : message}>
              <div className='flex flex-col text-sm'>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de Salida</div>{shipRetailerData.data ? dateToYMD(new Date(shipRetailerData.data.pickupDateR)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Tipo de Transporte</div>{shipRetailerData.data ? shipRetailerData.data.transportTypeR : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Precio de transporte</div>{shipRetailerData.data ? parsePrice(shipRetailerData.data.shipPriceR._hex) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Destino</div>{shipRetailerData.data ? 'Retailer' : message}</div>
              </div>
        </PhaseCard>

        <PhaseCard title={"Retailer"} className={"bg-blue-200"} icon={"retailer.png"} date={retailerData.data ? dateToYMD(new Date(retailerData.data.packDate)) : message}>
              <div className='flex flex-col text-sm'>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Almacen</div>{retailerData.data ? retailerData.data.warehouseName : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Dirección del almacen</div>{retailerData.data ? retailerData.data.warehouseAddress : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de llegada al almacen</div>{retailerData.data ? dateToYMD(new Date(retailerData.data.arrivalDateW)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Precio de envio</div>{retailerData.data ? parsePrice(retailerData.data.shipPriceSP._hex) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Dirección del punto de venta</div>{retailerData.data ? retailerData.data.salePointAddress : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha de llegada al punto de venta</div>{retailerData.data ? dateToYMD(new Date(retailerData.data.arrivalDateSP)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Fecha empacado</div>{retailerData.data ? dateToYMD(new Date(retailerData.data.packDate)) : message}</div>
                <div className='flex flex-col'><div className='mt-5 mb-1 font-semibold'>Precio por kilo</div>{retailerData.data ? parsePrice(retailerData.data.productPrice._hex) : message}</div>
              </div>
        </PhaseCard>

        </div>
        </Grid>

  );
};

export default TimeLine;
