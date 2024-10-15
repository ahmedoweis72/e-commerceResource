import { Navigate } from "react-router-dom"


export default function ProtectedRoute(props) {

if (localStorage.getItem('userToken')!==null) {
  return props.children
}
return <Navigate to={'/login'}/>
  
}
