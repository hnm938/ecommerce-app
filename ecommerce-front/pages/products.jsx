import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

import Layout from "@/components/Layout";
import ProductsGrid from "@/components/ProductsGrid";

import { Hero, Splitter } from "@/components/StyledComponents";
import Header from "@/components/Header";

import styles from "@/styles/Products.module.scss";

export default function ProductsPage({ products }) {
  return (
    <Layout>
      <div className={styles["Products"]}>
        <Header
          title="All Products"
          subtitle="Browse all Products"
        />
        <header>
          <Hero
            $height="25vw"
            $maxHeight="20rem"
            $backgroundImage="../images/hero_background_1.jpg"
          >
            <h1>STORE NAME</h1>
            <Splitter />
          </Hero>
        </header>
        <ProductsGrid products={products} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
