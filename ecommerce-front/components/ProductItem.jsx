import styled from "styled-components";
import css from "styled-jsx/css";

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  border: solid lightgray 1px;
  border-radius: 0.25rem;

  ${props => props.confirm && css`
    border-radius: 0.25rem;
    font-weight: 600;
    color: var(--confirm);
    border-color: var(--confirm);
  `}
`;

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
  return (
    <ProductWrapper>
      <ItemBox>
        <div>
          <img src={images[0]} alt="" />
        </div>
      </ItemBox>
      <h1 className="mt-[0.75rem] mb-[0.25rem]">{title}</h1>
      <div className="w-[95%] flex justify-between items-center">
        <Button confirm>Add to Cart</Button>
        <b className="text-xl text-gray-600">${price}</b>
      </div>
    </ProductWrapper>
  );
}
