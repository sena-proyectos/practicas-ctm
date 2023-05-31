// import { Form } from "./components/Login";
// import { useEffect } from "react";
// import jwt_decode from 'jwt-decode';
import "./App.css";
import { Routing } from "./routes/routes";


function App() {
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //      const decodedToken = jwt_decode(token);
  //      const userRole = decodedToken.role;
  //     // Realiza cualquier acción adicional en función del rol del usuario
  //     // console.log('Rol del usuario:', userRole);
  //   }
  // }, []);

  return (
    <>
        <Routing/>
    </>
  );
}

export default App;
