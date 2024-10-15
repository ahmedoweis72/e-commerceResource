import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContextProvider";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { AddProductToCart, IsLoading } = useContext(cartContext);

  async function Add(productId) {
    let response = await AddProductToCart(productId);
    if (response?.data.status == "success") {
      toast.success(response?.data.message);
    } else {
      toast.error(response?.data.message);
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { id, category } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [related, setRelated] = useState([]);

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((errors) => {});
  }
  function relatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let relatedProduct = data.data.filter(
          (product) => product.category.name == category
        );
        setRelated(relatedProduct);
      })
      .catch((errors) => {});
  }
  useEffect(() => {
    getProductDetails(id);
    relatedProduct(category);
  }, [id]);

  return (
    <>
      <div
        className="flex flex-col rounded-lg
       bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-4xl mx-auto md:flex-row"
      >
        <div className="w-1/3">
          <Slider {...settings}>
            {productDetails?.images.map((src) => (
              <img
                key={productDetails?.id}
                className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={src}
                alt={productDetails?.title}
              />
            ))}
          </Slider>
        </div>

        <div className="flex flex-col justify-start p-6 w-3/4">
          <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {productDetails?.title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {productDetails?.description}
          </p>

          <div className="flex justify-between items-center py-5">
            <span>{productDetails?.price}EGP</span>
            <span>
              {productDetails?.ratingsQuantity}
              <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>
          <button
            onClick={() => Add(productDetails?.id)}
            className="btn  hover:bg-green-400 w-full"
          >
            {IsLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </div>

      <div className=" row">
        {related.length == 0 ? (
          <div className="w-full h-full flex items-center justify-center ">
            <i className="fas fa-spinner text-3xl fa-spin"></i>
          </div>
        ) : (
          <>
            {related.map((product) => (
              <div key={product.id} className="p-4 w-[50%] md:w-1/4 lg:w-1/6 ">
                <div className="product">
                  <div onClick={()=>{setProductDetails(product)}} className=" cursor-pointer">
                    
                    <img
                      className="w-full"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="text-green-600 block font-light">
                      {product.category.name}
                    </span>
                    <h3 className="text-lg font-normal text-gray-800 mb-4">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span>{product.price}EGP</span>
                      <span>
                        {product.ratingsQuantity}
                        <i className="fas fa-star text-yellow-400"></i>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => Add(product.id)}
                    className="btn  hover:bg-green-400 w-full"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
