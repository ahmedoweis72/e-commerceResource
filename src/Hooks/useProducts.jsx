import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {

    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      }

  let response=  useQuery({
        queryKey:['recentProduct'],
        queryFn:getProducts,
        staleTime:8000,
        refetchInterval:30000,
        refetchIntervalInBackground:30000
    })
  return response;
}
