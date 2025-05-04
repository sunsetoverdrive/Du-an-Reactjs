import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import Search from "../pages/Search";
import Success from "../pages/Success";
import CartUpdate from "../pages/CartUpdate";
import Customer from "../pages/Customer";
import Login from "../pages/Login/index.";
import Order from "../pages/Order";
import Register from "../pages/Register";
import OrderDetails from "../pages/OrderDetails";
import AuthRequired from "../shared/AuthRequired";
export default [
  { path: "/", element: Home },
  { path: "/Home", element: Home },
  { path: "/Cart", element: Cart },
  { path: "/Category-:id", element: Category },
  { path: "*", element: NotFound },
  { path: "/Product-:id", element: ProductDetails },
  { path: "/Search", element: Search },
  { path: "/Success", element: Success },
  { path: "/CartUpdate", element: CartUpdate },
  { path: "/Customer", element: AuthRequired.CheckNotLogged(Customer) },
  { path: "/Login", element: AuthRequired.CheckLogged(Login) },
  { path: "/Orders", element: AuthRequired.CheckNotLogged(Order) },
  { path: "/Register", element: AuthRequired.CheckLogged(Register) },
  { path: "/OrderDetails-:id", element: OrderDetails },
  { path: "/UpdateCustomer-:id", element: Customer },
];
