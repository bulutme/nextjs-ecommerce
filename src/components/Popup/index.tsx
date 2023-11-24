import { ReactNode, FC } from "react";
import styled from "styled-components";

interface PopupProps {
  trigger: ReactNode;
  content: ReactNode;
}

const PopupContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Trigger = styled.div`
  cursor: pointer;
`;

const PopupContent = styled.div<{ $visible: boolean }>`
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  position: absolute;
  z-index: 1000;
  top: 80%;
  left: -50%;
  transform: translateX(-50%);
  width: 400px;
  max-height: 450px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;

  ${PopupContainer}:hover & {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(8px);
  }
`;

const Popup: FC<PopupProps> = ({ trigger, content }) => {
  return (
    <PopupContainer>
      <Trigger>{trigger}</Trigger>
      <PopupContent $visible={false}>{content}</PopupContent>
    </PopupContainer>
  );
};

export default Popup;
