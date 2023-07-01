import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "NPR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" cart-page text-dark">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-dark p-2 mb-1">
              {!auth?.user
                ? "Sorry"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                  }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        {cart?.length  < 1 ?
          "" : (<div className="container ">
            <div className="row ">
              <div className="col-md-7 p-0 m-0">
                {cart?.map((p) => (
                  <div className="card my-4" key={p._id}>
                    <div className="d-flex flex-row align-items-center">
                      <div className="row">
                        <div className="col-sm-3">
                          <img
                            src={`http://localhost:8080/api/v1/product/get-image/${p._id}`}
                            alt={p.name}
                            style={{ width: "75%", height: "75%" }}
                          />
                        </div>
                        <div className="col-sm-7">
                          <div className="card-body">
                            <p className="fw-bold fs-5">{p.name}</p>
                            <p className="text-muted">
                              {p.description.substring(0, 30)}
                            </p>
                            <p className="text-bold">Price : NPR {p.price}</p>
                          </div>
                        </div>
                        <div className="col-sm-2 d-flex align-items-start">
                          <button
                            className="btn btn-danger"
                            onClick={() => removeCartItem(p._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-5 cart-summary mt-4">
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4>Total : {totalPrice()} </h4>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h4>Current Address</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>

                      <div className="mt-2">
                        <button
                          className="btn btn-success"
                          onClick={() => navigate("/payment")}
                        >
                          Make Payment
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Plase Login to checkout
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>)}
      </div>
    </Layout>
  );
};

export default CartPage;
