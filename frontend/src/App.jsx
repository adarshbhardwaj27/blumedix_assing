import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Header from "./components/sidebar/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Users from "./components/Users/Users";
import { useLocation } from "react-router-dom";
import CreateDialog from "./components/Users/CreateDialog";
import { useState } from "react";
import User from "./components/Users/User";
import Products from "./components/products/Products";
import Product from "./components/products/Product";
import CreateProductDialog from "./components/products/CreateProductDialog";
import EditProduct from "./components/products/EditProduct";
import EditUser from "./components/Users/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

const Layout = () => {
  const location = useLocation();
  const [showCreateDialog, setshowCreateDialog] = useState(false);
  const [showCreateProductDialog, setshowCreateProductDialog] = useState(false);

  const createUserHandler = () => {
    setshowCreateDialog(true);
    console.log("create user");
  };
  const createProdHandler = () => {
    setshowCreateProductDialog(true);
    console.log("create prod");
  };

  return (
    <>
      <section className="flex flex-col w-screen h-screen max-h-screen">
        <div className="logout absolute top-2 md:top-4 right-16 cursor-pointer z-50 ">
          {(location.pathname == "/" || location.pathname == "/users") && (
            <button
              className="bg-green-600 text-white p-2 mx-2 rounded-lg ml-2"
              onClick={createUserHandler}
            >
              Add User
            </button>
          )}
          {location.pathname == "/products" && (
            <button
              className="bg-green-600 text-white p-2 mx-2 rounded-lg ml-2"
              onClick={createProdHandler}
            >
              Add Product
            </button>
          )}
          <Link to="/login">
            <button className="bg-red-600 text-white p-2 rounded-lg">
              Logout
            </button>
          </Link>
        </div>
        <div className="block md:hidden">
          {/* Mobile Header */}
          <Header />
        </div>
        <section className="flex w-full h-screen max-h-screen overflow-hidden relative">
          {/* Desktop Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <main className="w-full overflow-auto p-8">
            <Outlet />
          </main>
        </section>
      </section>
      {showCreateDialog && (
        <CreateDialog
          showCreateDialog={showCreateDialog}
          setshowCreateDialog={setshowCreateDialog}
        />
      )}
      {showCreateProductDialog && (
        <CreateProductDialog
          showCreateProductDialog={showCreateProductDialog}
          setshowCreateProductDialog={setshowCreateProductDialog}
        />
      )}
    </>
  );
};
