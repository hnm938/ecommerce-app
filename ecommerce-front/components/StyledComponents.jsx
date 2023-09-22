import styled from "styled-components";

export const Hero = styled.div`
  width: 100%;
  height: ${props => props.$height || "20vw"};
  max-height: ${props => props.$maxHeight || ""};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url(${props => props.$backgroundImage});
  background-size: cover;

  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.25);
`;

export const Splitter = styled.hr`

`;

export const Button = styled.button`
  padding: 0.25rem 0.5rem;
  border: solid lightgray 1px;
  border-radius: 0.25rem;

  ${(props) =>
    props.confirm &&
    `
      border-radius: 0.25rem;
      font-weight: 600;
      color: var(--confirm);
      border-color: var(--confirm);
    `}
`;
