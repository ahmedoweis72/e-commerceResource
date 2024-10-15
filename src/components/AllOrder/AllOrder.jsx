import React, { useEffect, useState } from 'react'
import styles from './AllOrder.module.css';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';


export default function AllOrder() {




  function getOrder() {
  
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
      
      
  }
  // useEffect(() => {
  //   getOrder()
  // }, [])

 let{data , isLoading,isError,error} = useQuery({
  queryKey:['allorder'],
  queryFn:getOrder
 })

 if (isError) {
  return <div className='w-full h-full flex items-center justify-center '><h1>{error}</h1></div>;
}

  if (isLoading) {
    return <div className='w-full h-full flex items-center justify-center '><ClimbingBoxLoader color="green" /></div>;
  }
  return <>

    <div className="order-summary">
      <h2>Order Summary</h2>

      <h3>Customer Details</h3>
      <p><strong>Name:</strong> {data?.data.data[0]?.user.name}</p>
      <p><strong>Email:</strong> <a href={`mailto:${data?.data.data[0]?.user.email}`}>{data?.data.data[0]?.user.email}</a></p>
      <p><strong>Phone:</strong> {data?.data.data[0]?.user.phone}</p>

      <h3>Shipping Address</h3>
      <p><strong>Address:</strong> {data?.data.data[0]?.shippingAddress.details}, {data?.data.data[0]?.shippingAddress.city}</p>
      <p><strong>Phone:</strong> {data?.data.data[0]?.shippingAddress.phone}</p>

      <h3>Order Overview</h3>
      <p><strong>Order ID:</strong> {data?.data.data[0]?._id}</p>
      <p><strong>Total Order Price:</strong> EGP {data?.data.data[0]?.totalOrderPrice}</p>
      <p><strong>Tax:</strong> EGP {data?.data.data[0]?.taxPrice}</p>
      <p><strong>Shipping:</strong> EGP {data?.data.data[0]?.shippingPrice}</p>
      <p><strong>Payment Method:</strong> {data?.data.data[0]?.paymentMethodType}</p>
      <p><strong>Status:</strong></p>
      <ul>
        <li><strong>Paid:</strong> {data?.data.data[0]?.isPaid ? '✔️ Yes' : '❌ No'}</li>
        <li><strong>Delivered:</strong> {data?.data.data[0]?.isDelivered ? '✔️ Yes' : '❌ No'}</li>
      </ul>

      <h3>Cart Items</h3>
      <ul>
        {data?.data.data[0]?.cartItems?.map(item => (
          <li key={item._id}>
            <div>
              <strong>Product:</strong> {item.product.title || 'Details not available'}
            </div>
            <div>
              <strong>Price:</strong> EGP {item.price}
            </div>
            <div>
              <strong>Quantity:</strong> {item.count}
            </div>
            {item?.product.imageCover && (
              <img src={item.product.imageCover} alt={item.product.title} style={{ width: '100px' }} />
            )}
            <hr />
          </li>
        ))}
      </ul>

      <h3>Important Dates</h3>
      <p><strong>Paid At:</strong> {new Date(data?.data.data[0]?.paidAt).toLocaleString()}</p>
      <p><strong>Created At:</strong> {new Date(data?.data.data[0]?.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(data?.data.data[0]?.updatedAt).toLocaleString()}</p>
    </div>

  </>
}
