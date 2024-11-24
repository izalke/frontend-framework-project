import styled, { css } from "styled-components"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export const Wrapper = styled.nav`
  width: 100%;
  z-index: 997;
`

export const Bar = styled.div`
  width: 100%;
  padding: 1.5rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 999;
  background-color: ${({ theme }) => theme.antiflashWhite};
  box-shadow: 1px 1px 3px 0px rgba(${({ theme }) => theme.richBlack}, 0.2);

  @media screen and (max-width: 1024px) {
    padding: 1rem;
  }
`

export const Logo = styled.img`
  width: 120px;
  height: auto;
`

export const Spacer = styled.div`
  flex: 1;
`

export const Links = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    margin: 0 1.5rem;
    display: inline-block;

    a {
      width: 100%;
      height: 100%;
      color: ${({ theme }) => theme.richBlack};
      padding: 0.3rem 0.3rem;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`

export const BurgerMenu = styled.div<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  cursor: pointer;

  span {
    height: 3px;
    width: 100%;
    display: block;
    border-radius: 0.04rem;
    background-color: ${({ theme }) => theme.yinmnGreen};
    transition: all 0.3s linear;
  }

  ${(props) =>
    props.isActive &&
    css`
      span:first-of-type {
        opacity: 1;
        transform: rotateZ(45deg) translateY(15px);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:last-of-type {
        opacity: 1;
        transform: rotateZ(-45deg) translateY(-15px);
      }
    `}

  @media screen and (min-width: 1024px) {
    display: none;
  }
`

export const Drawer = styled(motion.div)`
  top: 0;
  right: 0;
  width: 80vw;
  position: fixed;
  height: 100vh;
  z-index: 998;
  background-color: ${({ theme }) => theme.antiflashWhite};
  box-shadow: 1px 1px 3px 2px rgba(${({ theme }) => theme.richBlack}, 0.2);
  padding-top: calc(2rem + 40px + 1.2rem + 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MobileOverlay = styled(motion.div)`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 996;
  background-color: #000;
`

export const MobileLink = styled(Link)<{ isActive: boolean }>`
  display: block;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.5rem;
  background: ${({ isActive, theme }) =>
    isActive ? theme.greenGradient : "none"};
  background-clip: text;
  -webkit-text-fill-color: ${({ isActive }) =>
    isActive ? "transparent" : "inherit"};
  color: ${({ theme }) => theme.richBlack};
`

export const SocialWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;

  a {
    position: relative;
    height: fit-content;

    * {
      font-size: 1.9rem;
      margin-right: 0.5rem;
    }

    svg {
      fill: grey;
      transition: all 0.4s ease-in-out;
      position: relative;
      z-index: 2;

      &:hover {
        fill: ${({ theme }) => theme.yinmnGreen};
      }
    }
  }
`
