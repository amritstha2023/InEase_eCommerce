import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/forgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/user/Search";
import ProductDetails from "./pages/user/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />} />
        <Route path="/user" element={<Dashboard />} />
        <Route path="/dashboard/user/profile" element={<Profile />} />
        <Route path="/dashboard/user/orders" element={<Orders />} />

        <Route path="/dashboard" element={<AdminRoute />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="dashboard/admin/create-category"
          element={<CreateCategory />}
        />
        <Route
          path="dashboard/admin/create-product"
          element={<CreateProduct />}
        />
        <Route path="dashboard/admin/orders" element={<AdminOrders />} />
        <Route
          path="dashboard/admin/products/:slug"
          element={<UpdateProduct />}
        />
        <Route path="dashboard/admin/products" element={<Products />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
