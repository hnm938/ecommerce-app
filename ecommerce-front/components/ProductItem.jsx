import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Button } from "./Button.jsx";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ItemBox = styled.div`
  height: calc(100cqw / 4);
  aspect-ratio: 1/1;
  border: solid whitesmoke 1px;
  border-radius: 0.25rem;
  background-color: white smoke;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  div {
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-height: 100%;
      max-width: 100%;
    }
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
      <h1 className="mt-[0.75rem] mb-[0.25rem]">{title}</h1>
      <div className="w-[95%] flex justify-between items-center">
        <Button confirm onClick={() => addProduct(_id)}>Add to Cart</Button>
        <b className="text-xl text-gray-600">${price}</b>
      </div>
    </ProductWrapper>
  );
}
