import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import casa from './utils/casa.svg';
import empresa from './utils/empresa.svg';
import { Input } from "./components/Input";
import { Checkbox } from "./components/Checkbox";
import { fetchSinToken } from "./helpers/fetch";
import { SpinnerLoading } from "./components/SpinnerLoading";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export const App = () => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBNFChCHdB6g7PFBfzuoRegkBl3sBIkIHQ'
  });
  
  const [loading, setLoading] = useState(false);

  const [productsData, setProductsData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [routesToSendProducts, setRoutesToSendProducts] = useState([]);

  const [locationData, setLocationData] = useState({
    lat: 0,
    lng: 0,
  });

  const [total, setTotal] = useState(0);

  const [datos, setDatos] = useState({
    name: "",
    phone: "",
    hasWhatsapp: false,
    email: '',
    getMethod: 0,
    fullDirection: '',
    location: false,
    typeOfPayment: 0,
    referenceLocation: '',
    message: '',
    isRecurringOrder: false,
  });

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchSinToken('company_app_products/2');
      const data = await response.json();
      setProductsData(data);
    }
    getProducts();
  }, [])
  
  useEffect(() => {
    const getPaymentMethods = async () => {
      const response = await fetchSinToken('company_app_payment_methods/2/all');
      const data = await response.json();
      setPaymentMethod(data);
    }
    getPaymentMethods();
  }, [])

  useEffect(() => {
    const getRoutesToSendProducts = async () => {
      const resp = await fetchSinToken('company_app_delivery_routes/2/routes');
      const data = await resp.json();

      setRoutesToSendProducts(data);
    }
    getRoutesToSendProducts();
  }, [])
  
  

  const handleCardClick = (e, id) => {
    e.preventDefault();

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

    const total = newProductsData.reduce((acc, product) => {
      if (product.selected) {
        return acc + product.price * product.unidades;
      }

      return acc;
    } , 0);

    setTotal(total);

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

    // Sumar el total
    const newTotal = newProductsData.reduce((acc, product) => {
      if (product.selected) {
        return acc + product.price * product.unidades;
      }
      return acc;
    }, 0);

    setTotal(newTotal);
    setProductsData(newProductsData);
  };
  
  const handleMetodoDeEntrega = (e, id) => {
    e.preventDefault();
    setDatos({
      ...datos,
      getMethod: id,
    });
  };

  const handleMethodPayment = (e, id) => {
    e.preventDefault();

    setDatos({
      ...datos,
      typeOfPayment: id,
    });
  };

  const handleLocation = (e) => {
    e.preventDefault();
    
    navigator.geolocation.getCurrentPosition(onSuccess);

    function onSuccess(position) {
      setLocationData({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const products = [];

    productsData.forEach((product) => {
      if (product.selected) {
        products.push({
          product_Id: product.id,
          quantity: product.unidades,
          price: product.price,
          discount: 0,
        });
      }
    });

    const payload = {
      full_name: datos.name,
      phone_number: datos.phone,
      whatsapp: datos.hasWhatsapp,
      address: datos.fullDirection,
      email: datos.email,
      remark: datos.message,
      latitude: locationData.lat,
      longitude: locationData.lng,
      shipAddress: datos.fullDirection,
      status: "",
      paymentMethod_Id: datos.typeOfPayment,
      IsRecurrent: datos.isRecurringOrder,
      IsConfirmed: false,
      IsDelivered: false,
      IsPayout: false,
      deliveryroute_Id: 2,
      customer_Id: 1,
      orderItems: products,
    }

    const postOrder = async () => {
      const response = await fetchSinToken('orders', payload, 'POST');
      
      if (response.status === 201) {
        setLoading(false);
        Swal.fire({
          title: 'Orden creada',
          text: 'Tu orden ha sido creada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            setDatos({
              name: "",
              phone: "",
              hasWhatsapp: false,
              email: '',
              getMethod: 0,
              fullDirection: '',
              location: false,
              typeOfPayment: 0,
              referenceLocation: '',
              message: '',
              isRecurringOrder: false,
            });
          }
        })
      }else{
        setLoading(false);
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }

    }
    postOrder();

  };

  return loading ? <SpinnerLoading /> : (
    <div>
      <div className="text-xl mt-8 mx-8 lg:mx-16 mb-4">
        <h1 className="font-bold text-gray-600">Nombre de la empresa</h1>
      </div>
      <div className="bg-white h-full rounded-t-2xl">
        <form onSubmit={handleSubmit} className="py-8 px-8 lg:px-16">
          <Input
            label="Nombre completo"
            type="text"
            name="name"
            value={datos.name}
            onChange={(e) => setDatos({ ...datos, name: e.target.value })}
          />
          <Input
            label="Telefono"
            type="text"
            name="phone"
            value={datos.phone}
            onChange={(e) => setDatos({ ...datos, phone: e.target.value })}
          />
          <Checkbox
            label={'Tenés Whatsapp? Es para coordinar tu entrega'}
            name="hasWhatsapp"
            value={datos.hasWhatsapp}
            onChange={(e) => setDatos({ ...datos, hasWhatsapp: e.target.checked })}
          />
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            value={datos.email}
            onChange={(e) => setDatos({ ...datos, email: e.target.value })}
          />
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Seleccione su producto</label>
            <div className="flex overflow-x-auto space-x-4 h-36 items-center w-full">
              {productsData.map((item) => {
                return (
                  <div key={item.id} className="flex flex-col items-center">
                    <button
                      onClick={ !item.selected ? (e) => handleCardClick(e, item.id) : (e) => e.preventDefault() }
                      className="w-24 h-20 rounded-3xl bg-grey border border-gray-200 flex items-center justify-center relative"
                    >
                      <img
                        className="w-12 h-12"
                        src={ item.photo }
                        alt="1"
                        border="0"
                      />
                      {
                        (item.selected === true && item.unidades > 0)  && (
                          <div className="absolute bottom-1 rounded-full w-16 h-4 flex ">
                            <div className="flex flex-row w-20 rounded-3xl bg-gray-100 items-center justify-center">
                              <button
                                onClick={ () => AddItemsToCart(item.id, false) }
                                className="w-1/3"
                              >
                                -
                              </button>
                              <span className="border-x text-xs w-1/3">{ item.unidades }</span>
                              <button
                                className="w-1/3"
                                onClick={ () => AddItemsToCart(item.id, true) }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )
                      }
                    </button>
                    <label className="text-center text-sm lg:text-base">
                      { item.name }
                    </label>
                    <label className="text-center text-sm lg:text-base">
                      Precio: { item.price }
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
                    `w-24 h-20 rounded-3xl bg-grey ${ datos.getMethod  === 1 && 'border-2 border-gray-600'}  flex items-center justify-center`
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
                    `w-24 h-20 rounded-3xl bg-grey ${ datos.getMethod === 2 && 'border-2 border-gray-600'}  flex items-center justify-center`
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
          <div className="flex flex-col mt-4">
          <label className="text-sm lg:text-base">Ruta de entrega</label>
            <select
              className='bg-grey py-1.5 px-3 border-none rounded-3xl text-sm lg:text-base focus:outline-none'
            >
              <option value="none">Seleccione una ruta</option>
              {
                routesToSendProducts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.OrderTime} / {item.deliveryRoute.route_name}
                    </option>
                ))
              }
            </select>
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
            name="fullDirection"
            value={datos.fullDirection}
            onChange={(e) => setDatos({ ...datos, fullDirection: e.target.value })}
          />
          <Checkbox
            value={datos.location}
            onChange={(e) => setDatos({ ...datos, location: e.target.checked })}
            label='En este momento estoy en el punto de entrega'
          />
          {
            datos.location && (
              <>
                <button
                  onClick={ (e) => handleLocation(e) }
                  className="bg-gray-900 py-2 px-4 rounded-xl text-white mt-4 flex items-center"
                >
                  Confirmar ubicación
                </button>
                {
                  locationData.lat !== 0 && (
                    <>
                      <GoogleMap
                        zoom={14}
                        center={{
                          lat: locationData ? locationData.lat : 9.9360622,
                          lng: locationData ? locationData.lng : -84.1005207
                        }}
                        mapContainerClassName="w-full h-72 mt-4"
                      >
                        <Marker
                          position={{
                            lat: locationData ? locationData.lat : 9.9360622,
                            lng: locationData ? locationData.lng : -84.1005207
                          }}
                        />
                      </GoogleMap>
                    </>
                  )
                }
              </>
            )
          }
          <Input
            label="Si no estas en el punto de entrega, escribe el punto de referecia"
            type="text"
            name="name"
            value={datos.referenceLocation}
            onChange={(e) => setDatos({ ...datos, referenceLocation: e.target.value })}
          />
          <div className="flex flex-col mt-4">
            <label className="text-sm lg:text-base">Formas de pago</label>
              <div className="flex flex-row items-center gap-4">
                {
                  paymentMethod.map((item) => {
                    return (
                      <div key={item.paymentMethod.id} className="flex space-x-4 h-28 items-center lg:w-24">
                        <button
                          onClick={ (e) => handleMethodPayment(e, item.paymentMethod.id)}
                          className={
                            `w-24 h-20 rounded-3xl bg-grey ${ item.paymentMethod.id === datos.typeOfPayment && 'border-2 border-gray-600'}  flex items-center justify-center`
                          }
                        >
                          <img
                            className="w-12 h-12"
                            src={ item.paymentMethod.photo }
                            alt="1"
                            border="0"
                          />
                        </button>
                      </div>
                    );
                  })
                }
            </div>
            <p className="text-[10px]">
              Te daremos las instrucciones una vez creado el pedido.
            </p>
            <Input
              label="Mensaje / comentario del pedido:"
              type="text"
              name="message"
              value={datos.message}
              onChange={(e) => setDatos({ ...datos, message: e.target.value })}
            />
            <p className="text-[10px]">
              Si tienes alguna duda o comentario sobre tu pedido, puedes
              escribirlo aquí.
            </p>
            <div className="flex flex-row justify-between mt-6">
              <p className="text-2xl">Total de su orden:</p>
              <p className="text-2xl">₡ {total}</p>
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
              value={datos.isRecurringOrder}
              onChange={(e) => setDatos({ ...datos, isRecurringOrder: e.target.checked })}
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
