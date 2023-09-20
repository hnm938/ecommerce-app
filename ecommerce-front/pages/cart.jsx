import { Button } from "@/components/Button";
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
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function increaseItemQuantity(id) {
    addProduct(id);
  }
  function decreaseItemQuantity(id) {
    removeProduct(id);
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
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
            <h2>Order Information</h2>
            <form method="post" action="/api/checkout">
              <input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex flex-row gap-4 ">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e) => City(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(e) => setStreetAddress(e.target.value)}
              />{" "}
              <input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button confirm type="submit">
                Continue to Checkout
              </Button>
            </form>
          </Box>
        )}
      </ColumnsWrapper>
    </Layout>
  );
}
