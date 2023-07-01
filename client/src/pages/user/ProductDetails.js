import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/ProductDetailsStyles.css";
import { useCart } from "../../context/cart";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //inital product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getting product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-singleproduct/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/get-image/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="350"
            width={"220px"}
          />
        </div>

        <div className="col-md-5 mt-4 ">
          <h1 className="text-center " style={{color:"black"}}>Product Details</h1>
          <div className="d-flex flex-column align-items-center">
            <h4
              className="text-center"
              style={{ color: "black", fontWeight: "bold" }}
            >
              <strong>Name:</strong> {product.name}
            </h4>

            <h6 className="text-center">
              <strong>Description:</strong>
            </h6>
            <p className="text-center description-text">
              {product.description}
            </p>
            <h6 className="text-center">
              <strong>Category:</strong> {product?.category?.name}
            </h6>
            <h6 className="text-center">
              <strong>Price:</strong>{" "}
              <span
                className="price"
                style={{ color: "black", fontWeight: "bold" }}
              >
                NRS {product.price}
              </span>
            </h6>

            <button
              className="btn btn-success mt-3 mx-auto d-block"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to cart successfully...");
              }}
            >
              ADD TO CART
            </button>
          </div>
          <hr className="my-4 line-big" style={{ transform: "scaleX(2)" }} />

          {/* Line separating the sections */}
        </div>
      </div>
      <div className="row container similar-products mt-4">
        <h4 className="mt-3 text-center text-dark">Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center text-dark">No Similar Products found</p>
        )}

        <div className="d-flex flex-wrap justify-content-center">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`http://localhost:8080/api/v1/product/get-image/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5
                  className="card-title "
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  {p.name}
                </h5>
                <p className="card-text text-dark">
                  {p.description.substring(0, 60)}...
                </p>
                <p className="card-name-price text-green font-weight-bold">
                  Price:{" "}
                  <span
                    className="price"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    NRS {p.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
