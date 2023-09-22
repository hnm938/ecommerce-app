import { Button } from "@/components/StyledComponents";
import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1.7fr;
  gap: 40px;
  margin-top: 40px;
  padding: 0 40px;
`;

const Box = styled.div`
  background-color: whitesmoke;
  border-radius: 0.5rem;
  padding: 30px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
`;

export default function CartPage() {
  const { cartProducts, clearCart, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function increaseItemQuantity(id) {
    addProduct(id);
  }
  function decreaseItemQuantity(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <Layout>
        <h1>Thank you for your order</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <ColumnsWrapper>
        <Box>
          {!cartProducts?.length && <div>Your cart is empty</div>}
          <h2>Cart</h2>

          {products?.length > 0 && (
            <table>
              <thead>
                <tr>
                  <td>Product</td>
                  <td>Quantity</td>
                  <td>Price</td>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <td>{product.title}</td>
                    <td className="flex items-center gap-2">
                      <Button onClick={() => decreaseItemQuantity(product._id)}>
                        -
                      </Button>
                      {cartProducts.filter((id) => id === product._id).length}
                      <Button onClick={() => increaseItemQuantity(product._id)}>
                        +
                      </Button>
                    </td>
                    <td>
                      $
                      {cartProducts.filter((id) => id === product._id).length *
                        product.price}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <b>${total}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </Box>

        {!!cartProducts?.length && (
          <Box>
            <h2>Order information</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <div className="flex flex-row gap-4">
              <input
                type="text"
                placeholder="City"
                value={city}
                name="city"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                name="postalCode"
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              name="streetAddress"
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              name="country"
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <Button black block onClick={goToPayment}>
              Continue to payment
            </Button>
          </Box>
        )}
      </ColumnsWrapper>
    </Layout>
  );
}
