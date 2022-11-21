import React, { useState } from "react";
import { products } from "./utils/products";

import casa from './utils/casa.svg';
import empresa from './utils/empresa.svg';
import bac from './assets/bac.svg';
import money from './assets/money.svg';
import sinpeMovil from './assets/sinpeMovil.svg';
import { Input } from "./components/Input";
import { Checkbox } from "./components/Checkbox";

import GoogleMapReact from "google-map-react";

export const App = () => {

  const [product, setProduct] = useState(0);
  
  const [metodoDeEntrega, setMetodoDeEntrega] = useState(0);
  const [productsData, setProductsData] = useState(products);
  const [methodPayment, setmethodPayment] = useState(0);

  const [location, setLocation] = useState(false);
  const [locationData, setLocationData] = useState({
    lat: 0,
    lng: 0,
  });

  const handleCardClick = (e, id) => {
    e.preventDefault();

    // Modificar el array u agregar un nuevo elemento
    const newProductsData = productsData.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          selected: !product.selected,
          unidades: product.selected ? 0 : 1,
        };
      }

      return product;
    });

    setProductsData(newProductsData);

  };

  const AddItemsToCart = (id, add) => {
    const newProductsData = productsData.map((product) => {
      if (product.id === id) {
        if(add){
          return {
            ...product,
            unidades: product.unidades + 1,
          };
        }else{
          return {
            ...product,
            unidades: product.unidades - 1,
          };
        }
      }
      return product;
    });

    setProductsData(newProductsData);
  };
  
  const handleMetodoDeEntrega = (e, id) => {
    e.preventDefault();
    setMetodoDeEntrega(id);
  };

  const handleMethodPayment = (e, id) => {
    e.preventDefault();
    setmethodPayment(id);
  };

  const handleLocation = (e) => {
    e.preventDefault();
    
    navigator.geolocation.getCurrentPosition(onSuccess);

    function onSuccess(position) {
      setLocationData({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLocation(true);
    }
  };

  return (
    <div>
      <div className="text-xl mt-8 mx-8 lg:mx-16 mb-4">
        <h1 className="font-bold text-gray-600">Nombre de la empresa</h1>
      </div>
      <div className="bg-white h-full rounded-t-2xl">
        <form className="py-8 px-8 lg:px-16">
          <Input
            label="Nombre completo"
            type="text"
            name="name"
          />
          <Input
            label="Telefono"
            type="text"
            name="name"
          />
          <Checkbox
            label={'Tenés Whatsapp? Es para coordinar tu entrega'}
          />
          <Input
            label="Correo Electrónico"
            type="text"
            name="name"
          />
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Seleccione su producto</label>
            <div className="flex overflow-x-auto space-x-4 h-36 items-center w-full">
              {productsData.map(({id, image, name, selected, unidades}) => {
                return (
                  <div key={id} className="flex flex-col items-center">
                    <button
                      onClick={ !selected ? (e) => handleCardClick(e, id) : (e) => e.preventDefault() }
                      className="w-24 h-20 rounded-3xl bg-grey border border-gray-200 flex items-center justify-center relative"
                    >
                      <img
                        className="w-12 h-12"
                        src={ image }
                        alt="1"
                        border="0"
                      />
                      {
                        selected === true && (
                          <div className="absolute bottom-1 rounded-full w-16 h-4 flex ">
                            <div className="flex flex-row w-20 rounded-3xl bg-gray-100 items-center justify-center">
                              <button
                                onClick={ () => AddItemsToCart(id, false) }
                                className="w-1/3"
                              >
                                -
                              </button>
                              <span className="border-x text-xs w-1/3">{ unidades }</span>
                              <button
                                className="w-1/3"
                                onClick={ () => AddItemsToCart(id, true) }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )
                      }
                    </button>
                    <label className="text-center text-sm lg:text-base">
                      { name }
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Metodo de entrega</label>
            <div className="flex overflow-x-auto space-x-4 h-36 items-center w-full">
              <div className="flex flex-col items-center">
                <button
                  onClick={ (e) => handleMetodoDeEntrega(e, 1)}
                  className={
                    `w-24 h-20 rounded-3xl bg-grey ${ metodoDeEntrega === 1 && 'border-2 border-gray-600'}  flex items-center justify-center`
                  }
                >
                  <img
                    className="w-12 h-12"
                    src={ casa }
                    alt="1"
                    border="0"
                  />
                </button>
                <label className="text-center text-sm lg:text-base">
                  Casa
                </label>
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={ (e) => handleMetodoDeEntrega(e, 2)}
                  className={
                    `w-24 h-20 rounded-3xl bg-grey ${ metodoDeEntrega === 2 && 'border-2 border-gray-600'}  flex items-center justify-center`
                  }
                >
                  <img
                    className="w-12 h-12"
                    src={ empresa }
                    alt="1"
                    border="0"
                  />
                </button>
                <label className="text-center text-sm lg:text-base">
                  Empresa
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-sm lg:text-base mt-4">
            <p>
              Si vivís cerca de una de nuestras rutas igual podemos coordinar tu
              entrega. Para que tu pedido sea Entregado al dia mas cercano de tu
              ruta deberás pedirlo antes de las 6:00 pm.
            </p>
          </div>
          <Input
            label="Dirección completa"
            type="text"
            name="name"
          />
          <Checkbox
            value={location}
            onChange={ (e) => setLocation(e.target.checked) }
            label='En este momento estoy en el punto de entrega'
          />
          {
            location && (
              <>
                <button
                  onClick={ (e) => handleLocation(e) }
                  className="bg-gray-900 py-2 px-4 rounded-xl text-white mt-4 flex items-center"
                >
                  Confirmar ubicación
                </button>
                {
                  locationData.lat && (
                    <>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyAg7ZBmPiZvSZICkciPnGjAHT7yM-SgiXs' }}
                        defaultCenter={locationData}
                        center={locationData}
                        defaultZoom={15}
                      >
                      </GoogleMapReact>
                    </>
                  )
                }
              </>
            )
          }
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">
              Si no estas en el punto de entrega, escribe el punto de referecia
            </label>
            <input
              className="bg-grey py-1.5 px-3 border-none rounded-3xl text-sm lg:text-base mt-2 focus:outline-none"
              type="text"
              name="name"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Formas de pago</label>
            <div className="flex space-x-4 h-28 items-center w-full">
              <div className="flex flex-col items-center w-1/3 lg:w-24">
                <button
                  onClick={ (e) => handleMethodPayment(e, 1)}
                  className={
                    `w-24 h-20 rounded-3xl bg-grey ${ methodPayment === 1 && 'border-2 border-gray-600'}  flex flex-col items-center justify-center`
                  }
                >
                  <img
                    className="w-12 h-12"
                    src={ money }
                    alt="1"
                    border="0"
                  />
                  <p className="text text-[10px] text-gray-600">Pago en efectivo</p>
                </button>
              </div>
              <div className="flex flex-col items-center w-1/3 lg:w-24">
                <button
                  onClick={ (e) => handleMethodPayment(e, 2)}
                  className={
                    `w-24 h-20 rounded-3xl bg-grey ${ methodPayment === 2 && 'border-2 border-gray-600'}  flex items-center justify-center`
                  }
                >
                  <img
                    className="w-20 h-20"
                    src={ sinpeMovil }
                    alt="1"
                    border="0"
                  />
                </button>
              </div>
              <div className="flex flex-col items-center w-1/3 lg:w-24">
                <button
                  onClick={ (e) => handleMethodPayment(e, 3)}
                  className={
                    `w-24 h-20 rounded-3xl bg-grey ${ methodPayment === 3 && 'border-2 border-gray-600'}  flex items-center justify-center`
                  }
                >
                  <img
                    className="w-20 h-20"
                    src={ bac}
                    alt="1"
                    border="0"
                  />
                </button>
              </div>
            </div>
            <p className="text-[10px]">
              Te daremos las instrucciones una vez creado el pedido.
            </p>
            <div className="flex flex-col mt-4">
              <label className="text-sm lg:text-base">
                Mensaje / comentario del pedido:
              </label>
              <input
                className="bg-grey py-1.5 px-3 border-none rounded-3xl text-sm lg:text-base mt-2 focus:outline-none"
                type="text"
                name="name"
              />
              <p className="text-[10px]">
                Si tienes alguna duda o comentario sobre tu pedido, puedes
                escribirlo aquí.
              </p>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <p className="text-2xl">Total de su orden:</p>
              <p className="text-2xl">₡ 0</p>
            </div>
            <div>
              <p className="text-[10px]">
                Nuesto envío fuera de CONCASA tiene un costo adicional de ₡500
                por pedido,
              </p>
              <p className="text-[10px]">
                sin importar la cantidad de las botellas.
              </p>
            </div>
            <Checkbox
              label='Deseo que este sea un pedido recurrente. Si lo indicas te estaremos entregando producto todas las semanas.'
            />
            <div className="flex justify-center items-center mt-6">
              <button
                type="submit"
                className="bg-gray-900 py-2 px-4 rounded-xl text-white mt-4 flex items-center"
              >
                Confirmar pedido
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
