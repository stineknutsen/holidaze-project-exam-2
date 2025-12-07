import styled from "styled-components";
import FormInput from "../Forms/FormInput";
import Button from "../Button";

const NewsletterSection = styled.section`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  width: 100%;
  height: 245px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function Newsletter() {
  return (
    <NewsletterSection>
      <h1>Sign up for special offers</h1>
      <p>Join our newsletter for travel inspiration and exclusive deals.</p>
      <form>
        <FormInput type="email" placeholder="Enter your email" />
        <Button type="submit">Subscribe</Button>
      </form>
    </NewsletterSection>
  );
}
