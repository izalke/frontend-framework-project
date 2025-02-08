import styled from "styled-components"
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa"

export const FooterContact = styled.div`
  flex: 1;

  & p,
  h2 {
    color: ${({ theme }) => theme.yinmnGreen};
  }

  & h2 {
    line-height: 1.3;
    margin-bottom: 15px;
    font-size: 2.2rem;
    color: ${({ theme }) => theme.yinmnGreen};
  }

  & p {
    font-size: 1.1rem;
    line-height: 1.7;
    text-align: justify;
    color: ${({ theme }) => theme.yinmnGreen};
  }
`

export const Container = styled.div`
  max-width: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: 6fr 2fr 2fr 1fr;
  grid-gap: 20px;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`

export const Box = styled.div`
  & ul {
    display: block;
    color: ${({ theme }) => theme.yinmnGreen};
    margin-bottom: 20px;
    text-decoration: none;
  }

  & li {
    display: block;
    color: ${({ theme }) => theme.yinmnGreen};
    margin-bottom: 20px;
    text-decoration: none;
  }
`

export const Lista = styled.div`
  & ul {
    display: block;
    color: ${({ theme }) => theme.yinmnGreen};
    margin-bottom: 20px;
    text-decoration: none;
  }

  & li {
    display: block;
    color: ${({ theme }) => theme.yinmnGreen};
    margin-bottom: 20px;
    text-decoration: none;

    & a {
      color: ${({ theme }) => theme.yinmnGreen};
      text-align: left;
      display: block;
      transition: color 0.3s ease-in-out;
    }
  }

  & ol {
    display: inline-block;
    color: ${({ theme }) => theme.yinmnGreen};
    margin-bottom: 20px;
    text-decoration: none;

    & > li {
      display: inline-block;
      color: ${({ theme }) => theme.yinmnGreen};
      text-decoration: none;
    }
  }
`
export const FlexSan = styled.div`
  background-color: #c0a36a;
  margin-inline: auto;
  margin-bottom: 30px;
  width: 100%;
  padding: 4rem 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    flex: 0;
    display: inline-block;
    text-decoration: none;
    color: ${({ theme }) => theme.yinmnGreen};
    border: 1px solid #fff;
    padding: 12px 60px;
    font-size: 13px;
    background: #fff;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    height: fit-content;
    margin: 2rem;
  }

  & a:hover {
    color: ${({ theme }) => theme.yinmnGreen};
    border: 1px solid #fff;
    background: transparent;
    cursor: pointer;
  }
`

export const FooterSection = styled.div`
  background-color: #0f0f0f;
  padding: 50px 0;
  color: ${({ theme }) => theme.yinmnGreen};

  & p {
    color: grey;
    margin: 20px 0;
  }

  & input {
    background-color: #fff;
    padding: 17px;
    width: 100%;
    border-radius: 5px;
  }

  & h3 {
    font-weight: 500;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.yinmnGreen};
  }

  & ul {
    display: block;
  }
  & a {
    display: flex;
    justify-content: center;
    letter-spacing: 2px;
    text-decoration: none;
  }
`

export const Logo = styled.div`
  & h2 {
    color: #fff;
    font-weight: 500;
  }
`

export const CopyRight = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #0f0f0f;
  color: rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  & a {
    text-decoration: none;
  }

  @media screen and (max-width: 800px) {
    footer .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`

const socialIcon = `
  font-size: 2rem;
  margin: 0 .5rem;
  
  }
`

export const FacebookIcon = styled(FaFacebookSquare)`
  ${socialIcon}
`

export const InstagramIcon = styled(FaInstagram)`
  ${socialIcon}
`

export const YoutubeIcon = styled(FaYoutube)`
  ${socialIcon}
`
export const Designed = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #0f0f0f;
  color: rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  & a {
    text-decoration: none;
  }

  @media screen and (max-width: 800px) {
    footer .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`
