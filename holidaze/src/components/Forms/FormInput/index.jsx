import styled from "styled-components";
import { theme } from "../../../theme.js";

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${theme.colors.tertiary};
  background-color: ${theme.colors.background};
  border-radius: 20px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export default FormInput;
