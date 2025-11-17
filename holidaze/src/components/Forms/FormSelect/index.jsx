import styled from "styled-components";
import { theme } from "../../../theme.js";

const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${theme.colors.tertiary};
  background-color: ${theme.colors.background};
  border-radius: 20px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export default FormSelect;
