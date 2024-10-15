import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import About from './components/About/About'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Home from './components/Home/Home'
import LogIn from './components/LogIn/LogIn'
import NotFound from './components/NotFound/NotFound'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContextProvider'
import { Toaster } from 'react-hot-toast'
import CheckOut from './components/CheckOut/CheckOut'
import AllOrder from './components/AllOrder/AllOrder'


let query = new QueryClient()

let router = createBrowserRouter([{
  path: '', element: <Layout />, children:
    [{ path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
    { path: 'brands', element: <ProtectedRoute><Brands /> </ProtectedRoute> },
    { path: 'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
    { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
    { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
    { path: 'productDetails/:id/:category', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
    { path: 'checkout', element: <ProtectedRoute><CheckOut /> </ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute><AllOrder /> </ProtectedRoute> },
    { path: 'login', element: <LogIn /> },
    { path: '*', element: <NotFound /> },
    { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
    { path: 'register', element: <Register /> },


    ]
}])
function App() {

  return <QueryClientProvider client={query}>
    <UserContextProvider>
      <CartContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </CartContextProvider>
    </UserContextProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>

}

export default App
