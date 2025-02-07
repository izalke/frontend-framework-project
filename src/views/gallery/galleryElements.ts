import styled from "styled-components"
import { motion } from "framer-motion"

export const GalleryContainer = styled(motion.div)`
  padding: 2rem;
  text-align: center;
`

export const GalleryHeading = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.yinmnGreen};
  margin-bottom: 1rem;
  margin-top: 4rem;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${({ theme }) => theme.richBlack};
    margin: 1rem auto 0;
  }
`

export const GalleryDescription = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.richBlack};
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

export const ImageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 6px 16px ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

export const ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.antiflashWhite};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.yinmnGreen};
  }
`

export const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 60%;
  max-height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`

export const CloseButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: 1px solid ${({ theme }) => theme.antiflashWhite};
  border-radius: 50%;
  font-size: 1rem;
  color: ${({ theme }) => theme.antiflashWhite};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1100;
`
