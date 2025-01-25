import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/home.jsx";
import CategoryPage from "../pages/category/CategoryPage.jsx";
import { Search } from "../pages/search/Search.jsx";
import { ShopPage } from "../pages/shop/ShopPage.jsx";
import {SingleProduct} from '/src/pages/shop/productDetails/SingleProduct.jsx';
import { LogIn } from "../components/LogIn.jsx";
import { SignUp } from "../components/SignUp.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/about",
        element: <div>About Page</div>,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/identify",
        element: <div>Identify Page</div>,
      },
      {
        path: "/blog",
        element: <div>Blog Page</div>,
      },
    ],
  },
  {
    path:"/login",
    element:<LogIn/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  }
]);
export default router;
