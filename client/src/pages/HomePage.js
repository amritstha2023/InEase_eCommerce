import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [recommproduct, setrecommproduct] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/all-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // get all products
  const  getAllProducts = async () => {
    try {

  
    
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
      console.log(auth?.user?._id);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getallSlider=async()=>{
    try {
      const data = localStorage.getItem("auth");
      const parseData = JSON.parse(data);
      console.log(parseData.user._id);
    
        const res=await fetch(`http://localhost:8080/api/v1/product/filterproduct/${parseData.user._id}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                
              },
              
        });
        // console.log(res);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
        if(res.status==200){
            const json=await res.json();
            console.log(json);
            // setslider(json)
            setrecommproduct(json)
      
        }
    } catch (e) {
        console.log(e);
     
    }
}
  //get total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotal();
    getallSlider();
  }, []);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${nextPage}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
      setPage(nextPage);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/filter-product",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-100">
        <div className="row">
          <div className="col-sm-3 mt-4 d-flex flex-column align-items-center">
            <h5 className="title text-dark">Category Filter</h5>
            <div className="items">
              {categories?.map((c) => (
                <Checkbox
                  className="tt"
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  <span className="itemstitle">{c.name}</span>
                </Checkbox>
              ))}
            </div>

            
            <div className="bhead">
              <button className="button" onClick={() => window.location.reload()}>
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-sm-9 mt-4">
         {recommproduct<=0? <div></div>: <div className="products ">
              <h1 className="title text-center text-dark">Recommdation Products</h1>
              <div className="d-flex flex-row flex-wrap">
                {recommproduct?.map((p) => (
                  <div
                    className="card"
                    style={{ width: "20rem", margin: 20 }}
                    key={p._id}
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/get-image/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />

                    <div className="card-body">
                      <h5 className="fs-4 fw-bold">{p.name}</h5>
                      <p className="text-muted">
                        {p.description.substring(0, 50)}
                        {p.description.length > 50 ? "..." : ""}
                      </p>
                      <p className="fw-bold">NRs {p.price}</p>
                      {localStorage.getItem("auth") !== null ? (
                        <div className="d-flex flex-wrap justify-content-around">
                          <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item add to cart successfully...");
                            }}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      ): ""}
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                {products && products.length < total && (
                  <button
                    className="btn btn-info text-light"
                    onClick={loadMore} // Call the loadMore function on button click
                  >
                    {loading ? "Loading ..." : "Load More"}
                  </button>
                )}
              </div>
            </div>}
            <div className="products ">
              <h1 className="title text-center text-dark">All Products</h1>
              <div className="d-flex flex-row flex-wrap">
                {products?.map((p) => (
                  <div
                    className="card"
                    style={{ width: "20rem", margin: 20 }}
                    key={p._id}
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/get-image/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />

                    <div className="card-body">
                      <h5 className="fs-4 fw-bold">{p.name}</h5>
                      <p className="text-muted">
                        {p.description.substring(0, 50)}
                        {p.description.length > 50 ? "..." : ""}
                      </p>
                      <p className="fw-bold">NRs {p.price}</p>
                      {localStorage.getItem("auth") !== null ? (
                        <div className="d-flex flex-wrap justify-content-around">
                          <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item add to cart successfully...");
                            }}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      ): ""}
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                {products && products.length < total && (
                  <button
                    className="btn btn-info text-light"
                    onClick={loadMore} // Call the loadMore function on button click
                  >
                    {loading ? "Loading ..." : "Load More"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
