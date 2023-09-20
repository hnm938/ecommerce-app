import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { ProductTable } from "@/pages/products";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (!id) { return; }
    axios.get("/api/products?id="+id).then(res => {
      setProductInfo(res.data);
    });  
  }, [id])

  return (
    <Layout
      sidebarTitle="Products"
      sidebarSubtitle="Edit & Manage Products"
      sidebar={<ProductTable />}
    >
      <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}