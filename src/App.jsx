import React, { useState } from "react";
import { products } from "./utils/products";

import casa from './utils/casa.svg';
import empresa from './utils/empresa.svg';
import bac from './assets/bac.svg';
import money from './assets/money.svg';
import sinpeMovil from './assets/sinpeMovil.svg';

export const App = () => {

  const [product, setProduct] = useState(0);

  const handleCardClick = (e) => {
    e.preventDefault();
    setProduct(product + 1);
  };

  return (
    <div>
      <div className="text-xl mt-8 mx-8 lg:mx-16 mb-4">
        <h1 className="font-bold text-gray-600">Nombre de la empresa</h1>
      </div>
      <div className="bg-white h-full rounded-t-2xl">
        <form className="py-8 px-8 lg:px-16">
          <div className="flex flex-col">
            <label className="text-sm lg:text-base">Nombre Completo</label>
            <input
              className="bg-grey py-1.5 px-3 border-none rounded-3xl text-sm lg:text-base focus:outline-none"
              type="text"
              name="name"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Telefono</label>
            <input
              className="bg-grey py-1.5 px-3 border-none rounded-3xl text-sm lg:text-base focus:outline-none"
              type="text"
              name="name"
            />
          </div>
          <div className="flex flex-row gap-2 mt-4">
            <input type="checkbox" name="name" />
            <label className="text-sm lg:text-base">
              Tenés Whatsapp? Es para coordinar tu entrega
            </label>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Correo Electrónico</label>
            <input
              className="bg-grey py-1.5 px-3 border-none rounded-3xl text-sm lg:text-base focus:outline-none"
              type="text"
              name="name"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Seleccione su producto</label>
            <div className="flex overflow-x-auto space-x-4 h-36 items-center w-full">
              {products.map(({id, image, name}) => {
                return (
                  <div key={id} className="flex flex-col items-center">
                    <button
                      onClick={ handleCardClick }
                      className="w-24 h-20 rounded-3xl bg-grey border border-gray-200 flex items-center justify-center relative"
                    >
                      <img
                        className="w-12 h-12"
                        src={ image }
                        alt="1"
                        border="0"
                      />
                      {
                        product > 0 && (
                          <div className="absolute bottom-0 bg-red-500 rounded-full w-16 h-4 flex ">
                            <div className="flex flex-row w-20 bg-blue-600 items-center justify-center">
                              <button className="w-1/3">
                                -
                              </button>
                              <span className="text-white text-xs w-1/3">{ product }</span>
                              <button className="w-1/3">
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
                <div className="w-24 h-20 rounded-3xl bg-grey border border-gray-200 flex items-center justify-center">
                  <img
                    className="w-12 h-12"
                    src={ casa }
                    alt="1"
                    border="0"
                  />
                </div>
                <label className="text-center text-sm lg:text-base">
                  Casa
                </label>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-20 rounded-3xl bg-grey border border-gray-200 flex items-center justify-center">
                  <img
                    className="w-12 h-12"
                    src={ empresa }
                    alt="1"
                    border="0"
                  />
                </div>
                <label className="text-center text-sm lg:text-base">
                  Casa
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
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Dirección completa</label>
            <input
              className="bg-grey py-1.5 px-3 border-none rounded-3xl text-sm lg:text-base focus:outline-none"
              type="text"
              name="name"
            />
          </div>
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
                <div className="w-24 h-20 rounded-3xl bg-grey border border-gray-200 flex flex-col items-center justify-center">
                  <img
                    className="w-12 h-12"
                    src={ money }
                    alt="1"
                    border="0"
                  />
                  <p className="text text-[10px] text-gray-600">Pago en efectivo</p>
                </div>
              </div>
              <div className="flex flex-col items-center w-1/3 lg:w-24">
                <div className="w-24 h-20 rounded-3xl bg-grey border border-gray-200 flex items-center justify-center">
                  <img
                    className="w-20 h-20"
                    src={ sinpeMovil }
                    alt="1"
                    border="0"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center w-1/3 lg:w-24">
                <div className="w-24 h-20 rounded-3xl bg-grey border border-gray-200 flex items-center justify-center">
                  <img
                    className="w-20 h-20"
                    src={ bac}
                    alt="1"
                    border="0"
                  />
                </div>
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
            <div className="flex flex-row gap-2 mt-4">
              <input type="checkbox" name="name" />
              <label className="text-sm lg:text-base">
                Deseo que este sea un pedido recurrente. Si lo indicas te
                estaremos entregando producto todas las semanas.
              </label>
            </div>
            <div className="flex justify-center items-center mt-6">
              <button className="bg-gray-900 py-2 px-4 rounded-xl text-white mt-4 flex items-center">
                Confirmar pedido
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
