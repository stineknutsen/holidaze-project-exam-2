import styled from "styled-components";

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.tertiary};
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 20px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export default FormInput;
