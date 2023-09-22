import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Button } from "./StyledComponents";

const itemWidth = "15vw";

const ProductWrapper = styled.div`
  width: ${itemWidth};
  aspect-ratio: 1 / 1.35;

  display: grid;
  grid-template-rows: 1.75fr 0.25fr;
  grid-template-columns: 1fr;

  overflow: hidden;

  h1 {
    width: 95%;
    max-width: ${itemWidth};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 1000px) {
    width: calc(${itemWidth} * 1.35);
  }

  @media only screen and (max-width: 650px) {
    width: calc(${itemWidth} * 1.85);
  }

  @media only screen and (max-width: 400px) {
    width: calc(${itemWidth} * 2.75);
  }
`;

const ItemBox = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 1.5rem;

  grid-row: 1;

  border: solid rgb(0, 0, 0, 0.05) 1px;
  border-radius: 0.25rem;

  background-color: white smoke;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  cursor: pointer;
  transition: all 150ms ease;

  div {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  &:hover {
    background: white;
    filter: brightness(0.9);
  }
`;

const ItemInfo = styled.div`
  height: 100%;
  width: 100%;

  grid-row: 2;

  display: flex;
  flex-direction: column;

  font-family: "Titillium Web";

  line-height: 1.5cqw;

  h1 {
    min-width: 100%;
    font-size: 1.1cqw;
    font-weight: 700;
    margin: 0.75cqw 0 0 0;
  }

  h2 {
    font-size: 1.1cqw;
    font-weight: 500;
    color: gray;
    margin: 0;
  }
  
  div {
    button {
      font-size: 1cqw;
      min-width: fit-content;
      width: 10cqw;
    }
    b { font-size: 1.5cqw; }
  }

  @media only screen and (max-width: 1000px) {
    line-height: 2.5cqw;

    h1 { font-size: 1.75cqw; }
    h2 { font-size: 1.5cqw; } 

    div {
      button { font-size: 1.5cqw; }
      b { font-size: 2cqw; }
    }
  }

  @media only screen and (max-width: 650px) {
    line-height: 3cqw;

    h1 { font-size: 2.25cqw; }
    h2 { font-size: 2.25cqw; }
  }
`;

export default function ProductItem({
  _id,
  title,
  description,
  price,
  images,
}) {
  const { addProduct } = useContext(CartContext);
  const router = useRouter();
  const url = "/product/"+_id;

  return (
    <ProductWrapper>
      <ItemBox onClick={() => router.push(url)}>
        <div>
          <img src={images[0]} alt="" />
        </div>
      </ItemBox>
      <ItemInfo>
        <h1>{title}</h1>
        <h2>${price}</h2>
      </ItemInfo>
    </ProductWrapper>
  );
}
