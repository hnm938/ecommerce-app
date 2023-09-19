import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id="+id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you want to Delete: &nbsp;<b>"{productInfo?.title}"</b>
      </h1>
      <div className="flex gap-2 py-1 justify-center">
        <button className="btn-confirm" onClick={deleteProduct}>
          Confirm
        </button>
        <button className="btn-cancel" onClick={goBack}>
          Cancel
        </button>
      </div>
    </Layout>
  );
}
