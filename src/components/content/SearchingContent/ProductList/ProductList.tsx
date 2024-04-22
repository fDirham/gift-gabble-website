import { ProductObj } from "@/utilities/customTypes";
import styles from "./ProductList.module.scss";
import React from "react";
import StarRatings from "react-star-ratings";
import { DUMMY_PRODUCT_LIST_0 } from "@/utilities/dummyProductLists";
import LoadingText from "@/components/shared/LoadingText";
import LoadingGif from "@/components/shared/LoadingGif";
import useScreenSize from "@/hooks/useScreenSize";

type ProductListProps = {
  productList: ProductObj[];
  max?: number;
  isLoading: boolean;
  className?: string;
};

/**
 * TODO: Add actual pagination
 */

const LOADING_TEXT_LIST = [
  "searching the web for products...",
  "comparing reviews...",
  "running simulations...",
  "analyzing product ratings...",
  "testing products virtually...",
  "reading product FAQs...",
  "creating test products...",
];

export default function ProductList(props: ProductListProps) {
  const screenSize = useScreenSize();

  const renderLoadingWow = () => {
    if (!props.isLoading) return null;
    return (
      <div className={styles.wowContainer}>
        <LoadingText
          textList={LOADING_TEXT_LIST}
          className={styles.loadingText}
        />
        <LoadingGif
          gifClassName={styles.loadingGif}
          className={styles.loadingGifContainer}
        />
      </div>
    );
  };

  const renderProductList = () => {
    let listToRender = props.productList;
    if (props.isLoading) {
      listToRender = DUMMY_PRODUCT_LIST_0;
    }
    if (props.max && listToRender.length > props.max) {
      listToRender = listToRender.slice(0, props.max);
    }

    const productBlockClass = props.isLoading
      ? [styles.productBlock, styles.loading].join(" ")
      : styles.productBlock;

    return listToRender.map((productObj) => {
      let productTitle = productObj.title;
      const isMobile = screenSize.width <= 420;
      if (isMobile && productTitle.length > 80)
        productTitle = productTitle.slice(0, 77) + "...";
      return (
        <div className={productBlockClass} key={productObj.linkUrl}>
          {props.isLoading ? (
            <div className={styles.loadingImg} />
          ) : (
            <img className={styles.productImg} src={productObj.imageUrl} />
          )}
          <div className={styles.productCopyContainer}>
            <h3 className={styles.productTitle}>{productTitle}</h3>
            {!props.isLoading && (
              <>
                {!!productObj.rating && (
                  <div className={styles.ratingContainer}>
                    <span className={styles.ratingText}>
                      {productObj.rating}
                    </span>
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
              </>
            )}
          </div>
          <div className={styles.buyContainer}>
            {!props.isLoading && (
              <a
                className={"button " + styles.productLink}
                href={productObj.linkUrl}
                target="_blank"
                style={{ fontWeight: 400 }}
              >
                {productObj.price} on{" "}
                <span style={{ fontWeight: 600 }}>Amazon</span>
              </a>
            )}
          </div>
        </div>
      );
    });
  };
  return (
    <div className={[styles.container, props.className || ""].join(" ")}>
      {renderLoadingWow()}
      {renderProductList()}
    </div>
  );
}
