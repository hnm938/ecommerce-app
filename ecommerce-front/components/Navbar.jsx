import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";

import styles from "@/styles/Navbar.module.scss";

export default function Navbar() {
  const {cartProducts} = useContext(CartContext);
  return (
    <div className={styles["Navbar"]}>
      <h1 id={styles["navbar--store-title"]}>Store Name</h1>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/products"}>All Products</Link>
        <Link href={"/categories"}>Categories</Link>
        <Link href={"/account"}>Account</Link>
        <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
      </nav>
      <button
        id={styles["collapse-button"]}
        onClick={() => {
          document.querySelector(`.${styles["Navbar"]}`).classList.toggle(styles["open"]);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}