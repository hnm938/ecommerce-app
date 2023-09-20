import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

import Layout from "@/components/Layout";
import ProductsGrid from "@/components/ProductsGrid";

export default function ProductsPage({ products }) {
  return (
    <Layout>
      <h1>All Products</h1>
      <ProductsGrid products={products} />
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
