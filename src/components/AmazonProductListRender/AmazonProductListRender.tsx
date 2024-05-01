"use client";

import styles from "./AmazonProductListRender.module.scss";
import { AmazonProductObj } from "@/utilities/customTypes";
import StarRatings from "react-star-ratings";
import useScreenDevice from "@/hooks/useScreenDevice";

type AmazonProductListRenderProps = {
  amazonProductList: AmazonProductObj[];
  isLoading: boolean;
};

export default function AmazonProductListRender(
  props: AmazonProductListRenderProps
) {
  const screenDevice = useScreenDevice();

  const renderAmazonProductList = () => {
    const toReturn = props.amazonProductList.map((productObj) => {
      return (
        <ProductBlock
          productObj={productObj}
          key={productObj.asin}
          isMobile={screenDevice.isMobile}
        ></ProductBlock>
      );
    });

    if (props.isLoading) {
      for (let i = 0; i < 10; i++) {
        const toAdd = (
          <LoadingProductBlock
            key={"loading-product-" + i}
            isMobile={screenDevice.isMobile}
          ></LoadingProductBlock>
        );

        toReturn.push(toAdd);
      }
    }

    return toReturn;
  };

  return <div className={styles.container}>{renderAmazonProductList()}</div>;
}

type ProductBlockProps = {
  productObj: AmazonProductObj;
  isMobile: boolean;
};

function ProductBlock(props: ProductBlockProps) {
  return (
    <div className={styles.productBlockContainer}>
      <ProductImg {...props} />
      <ProductCopy {...props} />
    </div>
  );
}

type LoadingProductBlockProps = {
  isMobile: boolean;
};
function LoadingProductBlock(props: LoadingProductBlockProps) {
  const cnContainer = () => {
    const cn = [styles.loadingProductBlockContainer];
    if (props.isMobile) {
      cn.push(styles.mobile);
    }
    return cn.join(" ");
  };
  return (
    <div className={cnContainer()}>
      <div />
    </div>
  );
}
const ProductImg = (props: ProductBlockProps) => {
  const { productObj } = props;

  let imgSrc = productObj.imageUrl;
  if (!props.isMobile) imgSrc = imgSrc.replace("UY218", "UL320");

  return (
    <a
      href={productObj.linkUrl}
      className={["hiddenLink", styles.productImgLink].join(" ")}
      target="_blank"
    >
      <div className={styles.productImgContainer}>
        <img src={imgSrc} alt="" className={styles.productImg} />
      </div>
    </a>
  );
};

const ProductCopy = (props: ProductBlockProps) => {
  const { productObj } = props;

  const MAX_TITLE_LENGTH = props.isMobile ? 100 : 120;
  let productTitle = productObj.title;
  if (productTitle.length > MAX_TITLE_LENGTH) {
    productTitle = productTitle.slice(0, MAX_TITLE_LENGTH - 3) + "...";
  }

  const productLink = productObj.linkUrl;
  const isPrime = !!productObj.isPrime;

  if (props.isMobile) {
    return (
      <a href={productLink} className="hiddenLink" target="_blank">
        <div className={styles.productCopyContainer}>
          <h3 className={styles.productTitle}>
            <a href={productLink} className="hiddenLink" target="_blank">
              {productTitle}
            </a>
          </h3>
          <ProductRatings
            rating={productObj.rating}
            ratingsTotal={productObj.ratingsTotal}
            productLink={productLink}
            isMobile={props.isMobile}
          />
          <ProductPrice
            priceStr={props.productObj.priceStr}
            priceSymbol={props.productObj.priceSymbol}
          />
          {isPrime && (
            <img
              src="prime_logo.jpg"
              alt="prime"
              className={styles.primeLogo}
            />
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
      <ProductRatings
        productLink={productLink}
        rating={productObj.rating}
        ratingsTotal={productObj.ratingsTotal}
        isMobile={props.isMobile}
      />
      <a href={productLink} className="hiddenLink" target="_blank">
        <ProductPrice
          priceStr={productObj.priceStr}
          priceSymbol={productObj.priceSymbol}
        />
      </a>
      {isPrime && (
        <img src="prime_logo.jpg" alt="prime" className={styles.primeLogo} />
      )}
    </div>
  );
};

const ProductPrice = (props: {
  priceStr: string | null;
  priceSymbol: string | null;
}) => {
  if (!props.priceStr || !props.priceSymbol) return null;

  const priceComponentList = props.priceStr.split(".");
  const price1 = priceComponentList[0];
  let price2 = priceComponentList.length > 1 ? priceComponentList[1] : null;
  if (price2 && price2.length < 2) {
    price2 = price2 + "0";
  }

  return (
    <span className={styles.priceContainer}>
      <span className={styles.priceSymbol}>{props.priceSymbol}</span>
      <span className={styles.price1}>{price1}</span>
      {!!price2 && <span className={styles.price2}>{price2}</span>}
    </span>
  );
};

const ProductRatings = (props: {
  isMobile: boolean;
  productLink: string;
  rating?: number;
  ratingsTotal?: number;
}) => {
  const { rating, ratingsTotal, productLink } = props;
  if (!rating || !ratingsTotal) return null;

  const reviewsLink = productLink + "#customerReviews";
  if (props.isMobile) {
    return (
      <div className={styles.ratingContainerMobile}>
        <span className={styles.ratingText}>{rating}</span>
        <StarRatings
          rating={rating}
          starDimension="16px"
          starSpacing="0px"
          starRatedColor="#FEA31C"
          ignoreInlineStyles={false}
        />
        <span className={styles.ratingCountText}>
          {"(" + ratingsTotal + ")"}
        </span>
      </div>
    );
  }
  return (
    <div className={styles.ratingContainer}>
      <a href={reviewsLink} target="_blank" className="hiddenLink">
        <StarRatings
          rating={rating}
          starDimension="16px"
          starSpacing="0px"
          starRatedColor="#FEA31C"
          starEmptyColor="#D7D7D7"
          ignoreInlineStyles={false}
        />
        <span className={styles.ratingCountText}>{ratingsTotal}</span>
      </a>
    </div>
  );
};
