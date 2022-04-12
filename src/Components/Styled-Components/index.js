import styled from "styled-components";

export const AppContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  min-width: 100wv;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FooterContainer = styled.footer`
  margin: 20px 10px;
`;

export const ModeContainer = styled.section`
  padding: 10px 20px;
`;

export const MainHeader = styled.h2`
  color: #0f9ad4;
  border-bottom: 1px solid gainsboro;
  font-weight: bold;
`;

export const ButtonSave = styled.button`
  color: white;
  text-transform: uppercase;
  border-radius: 16px;
  padding: 10px 20px;
  background-color: #64bee4;
  text-align: center;
  margin: 4px 2px;
  font-weight: bold;
  :disabled {
    background-color: grey;
  }
  :not(:disabled):hover {
    background-color: #1b80ab;
    cursor: pointer;
  }
`;

export const ButtonDiscard = styled(ButtonSave)`
  background-color: #f1f3f6;
  border: none;
  color: grey;
  :disabled {
    background-color: #f1f3f6;
  }
  :not(:disabled):hover {
    background-color: #df4759;
    cursor: pointer;
    color: white;
  }
`;

export const ModeHeader = styled.h1`
  color: #6dadd7;
  border-bottom: 1px solid gainsboro;
  margin-bottom: 0.5em;
  ::before {
    content: "${(props) =>
      props.basicModeOn || props.advancedModeOn ? "▾ " : "▸ "}";
    font-weight: bold;
    font-size: 0.7em;
  }
  :hover {
    cursor: pointer;
  }
`;

export const IndentedDiv = styled.div`
  text-indent: 20px;
`;

export const ErrorMessage = styled.p`
  font-weight: bold;
  color: red;
`;

export const SuccessMessage = styled(ErrorMessage)`
  color: green;
`;
