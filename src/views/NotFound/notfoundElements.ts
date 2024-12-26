import styled from "styled-components"

export const Wrapper = styled.section`
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 4rem;
    background: ${({ theme }) => theme.yinmnGreen};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    width: 45%;
    font-size: 1.1rem;
    text-align: center;
    color: black;

    @media screen and (max-width: 1024px) {
      width: 95%;
    }
  }

  a {
    margin-top: 1rem;
    cursor: pointer;
    padding: 0.5rem 2rem;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
    font-weight: 600;
    border-radius: 0.2rem;
    text-decoration: none;
    color: ${({ theme }) => theme.antiflashWhite};
    border: 2px solid ${({ theme }) => theme.yinmnGreen};
    background-color: ${({ theme }) => theme.yinmnGreen};
    transition: all 0.4s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.yinmnGreen};
      background-color: ${({ theme }) => theme.antiflashWhite};
    }
  }
`
