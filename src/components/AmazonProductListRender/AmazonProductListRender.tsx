"use client";

import useScreenSize from "@/hooks/useScreenSize";
import styles from "./AmazonProductListRender.module.scss";
import { AmazonProductObj } from "@/utilities/customTypes";
import StarRatings from "react-star-ratings";
import { spawn } from "child_process";

type AmazonProductListRenderProps = {
  amazonProductList: AmazonProductObj[];
};

export default function AmazonProductListRender(
  props: AmazonProductListRenderProps
) {
  const screenSize = useScreenSize();

  const renderAmazonProductList = () => {
    return props.amazonProductList.map((productObj) => {
      return (
        <ProductBlock
          productObj={productObj}
          key={productObj.asin}
          isMobile={screenSize.width < 421}
        ></ProductBlock>
      );
    });
  };

  return <div className={styles.container}>{renderAmazonProductList()}</div>;
}

type ProductBlockProps = {
  productObj: AmazonProductObj;
  isLoading?: boolean;
  isMobile: boolean;
};

function ProductBlock(props: ProductBlockProps) {
  const { productObj } = props;

  const MAX_TITLE_LENGTH = props.isMobile ? 100 : 120;
  let productTitle = productObj.title;
  if (productTitle.length > MAX_TITLE_LENGTH) {
    productTitle = productTitle.slice(0, MAX_TITLE_LENGTH - 3) + "...";
  }

  let imgSrc = productObj.imageUrl;
  if (!props.isMobile) imgSrc = imgSrc.replace("UY218", "UL320");

  const productLink = productObj.linkUrl;
  const reviewsLink = productLink + "#customerReviews";

  const renderRatings = () => {
    if (!productObj.rating) return null;
    if (props.isMobile) {
      return (
        <div className={styles.ratingContainerMobile}>
          <span className={styles.ratingText}>{productObj.rating}</span>
          <StarRatings
            rating={productObj.rating}
            starDimension="16px"
            starSpacing="0px"
            starRatedColor="#FEA31C"
            ignoreInlineStyles={false}
          />
          <span className={styles.ratingCountText}>
            {"(" + productObj.ratingsTotal + ")"}
          </span>
        </div>
      );
    }
    return (
      <div className={styles.ratingContainer}>
        <a href={reviewsLink} target="_blank" className="hiddenLink">
          <StarRatings
            rating={productObj.rating}
            starDimension="16px"
            starSpacing="0px"
            starRatedColor="#FEA31C"
            starEmptyColor="#D7D7D7"
            ignoreInlineStyles={false}
          />
          <span className={styles.ratingCountText}>
            {productObj.ratingsTotal}
          </span>
        </a>
      </div>
    );
  };

  const renderPrice = () => {
    if (!productObj.priceStr) return null;

    const priceComponentList = productObj.priceStr.split(".");
    const price1 = priceComponentList[0];
    let price2 = priceComponentList.length > 1 ? priceComponentList[1] : null;
    if (price2 && price2.length < 2) {
      price2 = price2 + "0";
    }

    return (
      <span className={styles.priceContainer}>
        <span className={styles.priceSymbol}>{productObj.priceSymbol}</span>
        <span className={styles.price1}>{price1}</span>
        {!!price2 && <span className={styles.price2}>{price2}</span>}
      </span>
    );
  };
  const renderProductCopy = () => {
    if (props.isLoading) {
      return null;
    }
    if (props.isMobile) {
      return (
        <a href={productLink} className="hiddenLink" target="_blank">
          <div className={styles.productCopyContainer}>
            <h3 className={styles.productTitle}>
              <a href={productLink} className="hiddenLink" target="_blank">
                {productTitle}
              </a>
            </h3>
            {!props.isLoading && (
              <>
                {renderRatings()}
                {renderPrice()}
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
        </a>
      );
    }

    return (
      <div className={styles.productCopyContainer}>
        <h3 className={styles.productTitle}>
          <a href={productLink} className="hiddenLink" target="_blank">
            {productTitle}
          </a>
        </h3>
        {!props.isLoading && (
          <>
            {renderRatings()}
            <a href={productLink} className="hiddenLink" target="_blank">
              {renderPrice()}
            </a>
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
    );
  };

  return (
    <div className={styles.productBlockContainer}>
      <a
        href={productLink}
        className={["hiddenLink", styles.productImgLink].join(" ")}
        target="_blank"
      >
        <div className={styles.productImgContainer}>
          <img src={imgSrc} alt="" className={styles.productImg} />
        </div>
      </a>
      {renderProductCopy()}
    </div>
  );
}
