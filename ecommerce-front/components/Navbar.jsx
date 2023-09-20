import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: whitesmoke;
`;

export default function Navbar() {
  const {cartProducts} = useContext(CartContext);
  return (
    <StyledHeader>
      <Link href={"/"}>Ecommerce</Link>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/products"}>All Products</Link>
        <Link href={"/categories"}>Categories</Link>
        <Link href={"/account"}>Account</Link>
        <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
      </nav>
    </StyledHeader>
  )
}