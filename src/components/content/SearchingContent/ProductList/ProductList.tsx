import { ProductObj } from "@/utilities/customTypes";
import styles from "./ProductList.module.scss";
import React from "react";
import StarRatings from "react-star-ratings";

type ProductListProps = {
  productList: ProductObj[];
};
export default function ProductList(props: ProductListProps) {
  const renderProductList = () => {
    return props.productList.map((productObj) => {
      return (
        <div className={styles.productBlock} key={productObj.linkUrl}>
          <img className={styles.productImg} src={productObj.imageUrl} />
          <div className={styles.productCopyContainer}>
            <h3 className={styles.productTitle}>{productObj.title}</h3>
            {!!productObj.rating && (
              <div className={styles.ratingContainer}>
                <span className={styles.ratingText}>{productObj.rating}</span>
                <StarRatings
                  rating={productObj.rating}
                  starDimension="16px"
                  starSpacing="0px"
                  starRatedColor="#FEA31C"
                />
                <span className={styles.ratingCountText}>
                  {"(" + productObj.ratingsTotal + ")"}
                </span>
              </div>
            )}
            {!!productObj.isPrime && (
              <img
                src="prime_logo.jpg"
                alt="prime"
                className={styles.primeLogo}
              />
            )}

            <a
              className={"button " + styles.productLink}
              href={productObj.linkUrl}
              target="_blank"
            >
              {productObj.price} on <b>Amazon</b>
            </a>
          </div>
        </div>
      );
    });
  };
  return <div className={styles.container}>{renderProductList()}</div>;
}
