import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { userContext } from '../../Context/UserContext';




export default function Register() {

  let { setUserLogin } = useContext(userContext);

  const [errRes, setErrRes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'name must contain at least 3 letter').max(10, 'name must contain  10 letter only').required('name is required'),
    email: Yup.string().email('Invalid Email').required('email is required '),
    phone: Yup.string().matches(/^(01)[0125][0-9]{8}$/, 'Invalid phone').required('phone is required '),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Invalid password').required('password is required '),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'dosen\'t matched password').required('rePassword is required '),
  })

  let navigate = useNavigate();

  /* function validate(values) {

    let errors = {};

    if (!values.name) {
      errors.name = 'name is required'
    }
    else if (!/^[A-Z][a-z]{3,5}$/.test(values.name)) {
      errors.name = 'name must start with capital letter and at least 3 charchter'
    }
    if (!values.email) {
      errors.email = 'email is required'
    }
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = 'Invalid email format. Please enter a valid email address.'
    }
    if (!values.phone) {
      errors.phone = 'phone is required'
    }
    else if (!/^(01)[0125]{1}[0-9]{8}$/.test(values.phone)) {
      errors.phone = 'Invalid Number'
    }
    if (!values.password) {
      errors.password = 'password is required'
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)) {
      errors.password = 'Invalid password'
    }
    if (!values.rePassword) {
      errors.rePassword = 'rePassword is required'
    }
    else if (values.rePassword != values.password) {
      errors.rePassword = 'dosen\'t matche password'
    }
    return errors;
  } */


  function handleRegister(values) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then((apiResponse) => {
        navigate('/');
        setUserLogin(apiResponse.data.token);
        setIsLoading(false);
        localStorage.setItem('userToken',apiResponse.data.token);

      })
      .catch((apiResponse) => {
        setErrRes(apiResponse.response?.data?.message);
        setIsLoading(false);
      });






  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handleRegister,
  })


  return <>

    <div className='max-w-lg mx-auto p-10 md:p-0'>
      <form onSubmit={formik.handleSubmit}>
        <h2 className='text-3xl text-center md:text-left font-bold mb-6 text-emerald-500'>Register Now</h2>
        {errRes && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{errRes}</span></div>}
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Name</label>
        </div>
        {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.name}</span></div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Email</label>
        </div>
        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span></div> : null}


        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Phone</label>
        </div>
        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.phone}</span></div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Password</label>
        </div>
        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span></div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter RePassword</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.rePassword}</span></div> : null}

        <div className='md:flex items-center'>
          <button type="submit" className="text-white my-3 bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}
          </button>
          <p className='pl-5'>Do you have account <span className='font-semibold'><Link to={'/login'}>LogIn</Link></span></p>
        </div>
      </form>
    </div>


  </>
}
