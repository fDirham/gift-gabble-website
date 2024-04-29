"use client";

import styles from "./AmazonProductListRender.module.scss";
import { AmazonProductObj } from "@/utilities/customTypes";
import StarRatings from "react-star-ratings";

type AmazonProductListRenderProps = {
  amazonProductList: AmazonProductObj[];
};

export default function AmazonProductListRender(
  props: AmazonProductListRenderProps
) {
  const renderAmazonProductList = () => {
    return props.amazonProductList.map((productObj) => {
      return (
        <ProductBlock
          productObj={productObj}
          key={productObj.asin}
        ></ProductBlock>
      );
    });
  };

  return <div className={styles.container}>{renderAmazonProductList()}</div>;
}

type ProductBlockProps = {
  productObj: AmazonProductObj;
  isLoading?: boolean;
};

function ProductBlock(props: ProductBlockProps) {
  const { productObj } = props;

  const MAX_TITLE_LENGTH = 120;
  let productTitle = productObj.title;
  if (productTitle.length > MAX_TITLE_LENGTH) {
    productTitle = productTitle.slice(0, MAX_TITLE_LENGTH - 3) + "...";
  }

  const imgSrc = productObj.imageUrl;

  return (
    <div className={styles.productBlockContainer}>
      <div className={styles.productImgContainer}>
        <img src={imgSrc} alt="" className={styles.productImg} />
      </div>
      <div className={styles.productCopyContainer}>
        <h3 className={styles.productTitle}>{productTitle}</h3>
        {!props.isLoading && (
          <>
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
            <span className={styles.price}>{productObj.price}</span>
            {!!productObj.isPrime && (
              <img
                src="prime_logo.jpg"
                alt="prime"
                className={styles.primeLogo}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
