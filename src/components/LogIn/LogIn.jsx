import React, { useContext, useEffect, useState } from 'react'
import styles from './LogIn.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';



export default function LogIn() {


  let {setUserLogin,userLogin}=useContext(userContext);

  const [errRes, setErrRes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invlid Email').required('Required Email'),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Invalid password').required('password is required '),
  })
  function handleLogIn(values) {
    setIsLoading(true),
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        .then((logRes) => {navigate('/');
          setUserLogin(logRes.data.token);
          setIsLoading(false);
          localStorage.setItem('userToken',logRes.data.token);
          
        })
        .catch((logResErr) => {
          setIsLoading(false);
          setErrRes(logResErr.response?.data?.message);


        });
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: handleLogIn
  })

  return <>

    <div className='md:max-w-lg mx-auto p-10 md:p-0'>
      <form onSubmit={formik.handleSubmit}>
        <h2 className='text-3xl text-center md:text-left font-bold mb-6 text-emerald-500'>LogIn</h2>

        {errRes && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{errRes}</span></div>}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Email</label>
        </div>
        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span></div> : null}




        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Password</label>
        </div>
        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span></div> : null}

        <div className='md:flex items-center '>
          <button type="submit" className="my-3 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}
          </button>
          <p className='pl-5'>Didn't have account <span className='font-semibold'><Link to={'/register'}>Register</Link></span></p>
        </div>


      </form>
    </div>

  </>
}
