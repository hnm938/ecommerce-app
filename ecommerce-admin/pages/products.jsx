import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then(res => {
      setProducts(res.data);
    })  
  }, []);

  return (
    <Layout>
      <Link href={"/products/new"} className="btn-primary">
        Add new product.
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product name</td>
            <td>Price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 && products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price} <b className="text-blue-900">$CAD</b></td>
              <td className="flex flex-row gap-2 w-grow">
                <Link
                  className="btn-primary"
                  href={"/products/edit/" + product._id}
                >
                  Edit
                </Link>
                <Link className="btn-primary" href={"/products/delete/" + product._id}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
