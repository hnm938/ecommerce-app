import Header from "@/components/Header"
import Layout from "@/components/Layout";
import NewProducts from "@/components/NewProducts";

import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <Layout>
      <Header title="Featured Products" subtitle="Some of the products we love" />
      <NewProducts products={newProducts} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "650a4f5a2f7e94ec6a228203";
  await mongooseConnect();
  
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { "_id": -1 }, limit: 10 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}