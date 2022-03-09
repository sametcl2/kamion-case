import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

function PrivateRoute({ children, isAuthenticated, ...rest }) {
     const token = localStorage.getItem("token");
     return (
       <Route
         {...rest}
         render={
           () => (
               token
               ? (
                 children
               ) : (
                 <Redirect
                   to={{
                     pathname: '/login',
                   }}
                 />
               ))
         }
       />
     );
   }
   
export default PrivateRoute;