import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

import ProductForm from "@/components/ProductForm";

import styles from "@/styles/Product.module.scss";
import { useRouter } from "next/router";


export default function Products() {
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  
  return (
    <Layout
      sidebarTitle="Products"
      sidebarSubtitle="Edit & Manage Products"
      sidebar={<ProductTable onEditClick={setEditProductId} />}
    >
      <div className={styles.productPage}>
        {/* <Link href="/products/new" className="btn-primary">
          Add new product
        </Link> */}
        <h1>Create Product</h1>
        <ProductForm />
      </div>
    </Layout>
  );
}

export function ProductTable() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <td>Product name</td>
          <td>Price</td>
          <td> </td>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                {product.price} <b>$CAD</b>
              </td>
              <td>
                <a onClick={async () => {
                  await router.push("/products");
                  router.push("/products/edit/" + product._id);
                }}>Edit</a>
                {/* <Link href={"/products/edit/" + product._id}>Edit</Link> */}
                <Link
                  href={"/products/delete/" + product._id}
                  className="delete-btn"
                  style={{ color: "var(--error)", borderColor: "var(--error)" }}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
