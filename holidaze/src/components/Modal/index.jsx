import styled from "styled-components";
import FormWrapper from "../Forms/FormWrapper";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled(FormWrapper)`
  max-height: 80vh;
  overflow-y: auto;
`;

const Modal = ({ children, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>{children}</ModalBox>
    </Overlay>
  );
};

export default Modal;
