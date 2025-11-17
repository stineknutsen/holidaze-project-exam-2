import styled from "styled-components";
import { theme } from "../../../theme.js";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 2rem;
  background-color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.tertiary};
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  min-width: 300px;
  max-width: 500px;
`;

export default FormWrapper;
