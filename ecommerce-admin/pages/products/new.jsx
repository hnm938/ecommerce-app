import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { ProductTable } from "../products";

export default function NewProduct() {
  return (
    <Layout
      sidebarTitle="Products"
      sidebarSubtitle="Edit & Manage Products"
      sidebar={<ProductTable />}
    >
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
