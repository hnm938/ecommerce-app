import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";

export default function ProductPage({ product }) {
  const {addProduct} = useContext(CartContext);
  return (
    <Layout>
      
    </Layout>
  )
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