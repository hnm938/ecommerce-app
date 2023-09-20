import styled from "styled-components";
import css from "styled-jsx/css";

export const Button = styled.button`
  padding: 0.25rem 0.5rem;
  border: solid lightgray 1px;
  border-radius: 0.25rem;

  ${(props) =>
    props.confirm &&
    css`
      border-radius: 0.25rem;
      font-weight: 600;
      color: var(--confirm);
      border-color: var(--confirm);
    `}
`;
