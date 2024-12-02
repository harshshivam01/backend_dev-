import "./App.css";
import ProductList from "./productList";
import Login from "./login";
import Header from "./header";
import { createBrowserRouter,Outlet } from "react-router-dom";
import Signup from "./signup";
const App = () => {
  return (
    <div>
      <Header />
        <Outlet />
    </div>
  );
}

const router = createBrowserRouter([

  { 
    path: "/", 
    element: <App/>,
    children: [
      
      { path: "/", element: <ProductList /> },
    ]
   },
  { 
    path: "/login",
      element: <Login /> 
    },
    {
      path: "/signup",
      element: <Signup />
    }
 
]);

export default router;
