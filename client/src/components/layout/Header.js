import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/searchInput.js";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/cart.js";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully!");
  };
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <span style={{ fontSize: "30px", color: "green" }}>InEase 🌿</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item" >
              <NavLink to="/" className="nav-link">
                <span style={{ color: "dark" }}>Home</span>
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                <span style={{ color: "dark" }}>Categories</span>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c.slug}>
                    <Link
                      className="dropdown-item"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            


            <li className="nav-item">
              <Badge count={cart?.length} showZero color="green">
                <NavLink to="/cart" className="nav-link">
                  <span style={{ color: "black" }}>Cart</span>
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </nav> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <span style={{ fontSize: "30px", color: "green" }}>InEase 🌿</span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  <span style={{ color: "dark" }}>Categories</span>
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                  {categories?.map((c) => (
                    <Link
                      className="dropdown-item"
                      to={`/category/${c.slug}`}
                      key={c.slug}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <span style={{ color: "dark" }}>Login</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                          activeClassName="active"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero color="green">
                  <NavLink to="/cart" className="nav-link">
                    <span style={{ color: "black" }}>Cart</span>
                  </NavLink>
                </Badge>
              </li>
            </ul>
            <form className="form-inlinen d-flex my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
