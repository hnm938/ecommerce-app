import ProductItem from "./ProductItem";

import styled from "styled-components"

const ProductsGrid = styled.div`
  padding: 1rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  align-items: flex-start;
  justify-content: center;
  gap: 1rem 1rem;
`;

export default function NewProducts({ products  }) {
  return (
    <ProductsGrid>
      {products.length > 0 && products.map(product => (
        <ProductItem {...product} />
      ))}
    </ProductsGrid>
  )
}