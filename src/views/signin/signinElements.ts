import styled from "styled-components";

// Main Container
export const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${(props) => props.theme.backgroundLight};

  h1 {
    font-size: 2rem;
    color: ${(props) => props.theme.yinmnGreen};
    margin-bottom: 1rem;
  }

  form {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background-color: ${(props) => props.theme.antiflashWhite};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      background-color: ${(props) => props.theme.yinmnGreen};
      color: ${(props) => props.theme.antiflashWhite};
      padding: 0.75rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${(props) => props.theme.yinmnGreenHover};
      }
    }
  }
`;

// Form Input Styles
export const FormInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    color: ${(props) => props.theme.textDark};
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid ${(props) => props.theme.borderGray};
    border-radius: 5px;
    outline: none;

    &:focus {
      border-color: ${(props) => props.theme.yinmnGreen};
    }
  }
`;

// Error Message
export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.errorRed};
  font-size: 0.875rem;
  text-align: center;
`;

export const SuccessMessage = styled.p`
  color: ${(props) => props.theme.successGreen};
  font-size: 0.875rem;
  text-align: center;
`;
