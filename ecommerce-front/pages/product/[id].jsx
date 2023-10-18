import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext, useEffect } from "react";

import ScrollContainer from "react-indiana-drag-scroll";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/SingleProduct.module.scss";
import { Button } from "@/components/StyledComponents";

export default function SingleProduct({ product }) {
  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    document
      .querySelector(`.${styles["product-gallery--preview"]}`)
      .childNodes[0].classList.add(styles["selected"]);
  }, []);

  return (
    <Layout>
      <div className={styles["ProductPage"]}>
        <div id={styles["product-gallery"]}>
          <img
            id={styles["product-gallery--main"]}
            src={product.images[0]}
            alt=""
          />
          <ScrollContainer className={styles["product-gallery--preview"]}>
            {product.images.map((image) => (
              <img
                src={image}
                alt="product_image"
                onClick={(e) => {
                  const mainImage = document.getElementById(
                    styles["product-gallery--main"]
                  );
                  mainImage.src = image;

                  e.target.parentElement.childNodes.forEach((child) => {
                    child.classList.remove(styles["selected"]);
                  });
                  e.target.classList.add(styles["selected"]);
                }}
              />
            ))}
          </ScrollContainer>
        </div>
        <div id={styles["product-info"]}>
          <h1 id={styles["product-info--title"]}>{product.title}</h1>
          <p id={styles["product-info--description"]}>{product.description}</p>
          <div>
            <p>${product.price} <span>(CAD)</span></p>
            <div className={styles["item--rating"]}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <Button
              onClick={() => {
                addProduct(product._id);
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
