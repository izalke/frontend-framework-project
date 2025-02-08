import styled, { keyframes } from "styled-components"

// Header Section
export const Header = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`
export const TextBox = styled.div`
  position: relative;
  z-index: 2;
  max-width: 90%;
  text-align: center;

  h2 {
    color: ${(props) => props.theme.yinmnGreen};
    font-size: 2rem;
    text-transform: uppercase;

    @media (max-width: 768px) {
      font-size: 1.8rem;
      margin-top: 60px;
      margin-bottom: 20px;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-top: 60px;
      margin-bottom: 20px;
    }
  }

  p {
    color: ${(props) => props.theme.antiflashWhite};
    font-size: 1.25rem;
    line-height: 1.6;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    font-weight: 400;
    letter-spacing: 0.5px;
    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      line-height: 1.4;
      text-shadow: none;
    }
  }
`

// About Section
export const AboutSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #ffffff;

  h2 {
    font-size: 2rem;
    color: ${(props) => props.theme.yinmnGreen};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

// Image Gallery Section
export const ImageGallery = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  background-color: #f8f8f8;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const GalleryItem = styled.div`
  width: 30%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`

// Services Section
export const ServicesSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f8f8;
  margin-bottom: 4rem;

  h2 {
    text-align: center;
    font-size: 2rem;
    color: ${(props) => props.theme.yinmnGreen};
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  p {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
  }
`

export const Services = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`

export const ServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 250px;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.yinmnGreen};
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: #666;
    font-weight: 400;
  }
`

// Customer Reviews Section
export const ReviewsSection = styled.section`
  padding: 4rem 2rem;
  background-color: #ffffff;

  h2 {
    text-align: center;
    font-size: 2rem;
    color: ${(props) => props.theme.yinmnGreen};
    margin-bottom: 2rem;
  }

  .review-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
`

export const ReviewCard = styled.div`
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .stars {
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.yinmnGreen};
  }
`

// Scroll Indicator
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(45deg);
  }
  40% {
    transform: translateY(10px) rotate(45deg);
  }
  60% {
    transform: translateY(5px) rotate(45deg);
  }
`

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Arrow = styled.span`
  width: 20px;
  height: 20px;
  border-right: 2px solid ${(props) => props.theme.yinmnGreen};
  border-bottom: 2px solid ${(props) => props.theme.yinmnGreen};
  transform: rotate(45deg);
  margin: 5px;
  animation: ${bounce} 1.5s infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`

export const Our = styled.div`
  width: 85%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
  padding-bottom: 3rem;

  & > p {
    padding-top: 2rem;
    font-size: 19px;
    line-height: 30px;
  }

  & h1 {
    color: ${(props) => props.theme.yinmnGreen};
    font-size: 2rem;
  }
`

export const OurCol = styled.div`
  flex-basis: 31%;
  border-radius: 10px;
  text-align: center;

  & img {
    width: 100%;
    height: 30rem;
    object-fit: cover;

    @media (max-width: 1024px) {
      max-height: 300px;
      height: 300px;
    }
  }

  & p {
    padding: 0;
    color: ${(props) => props.theme.yinmnGreen};
    font-size: 15px;
    letter-spacing: 1px;
  }

  & h3 {
    font-size: 1.2rem;
    margin-top: 16px;
    margin-bottom: 10px;
    text-align: center;
    color: ${(props) => props.theme.yinmnGreen};
  }
`
export const Row = styled.div`
  margin-top: 5%;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;

    & > * {
      margin-top: 1rem;
    }
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    margin-top: 4%;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    margin-top: 3%;
    padding: 1rem;
    gap: 1rem;
  }
`

export const Ruo = styled.div`
  text-align: left;
  margin-top: 6rem;
  padding: 3rem;
  background-color: #fff;

  h1 {
    font-size: 2rem;
    margin-bottom: 3rem;
    color: ${(props) => props.theme.yinmnGreen};
    text-align: center;
  }

  .service {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;

    &:nth-child(2) {
      flex-direction: row-reverse;
    }

    &-content {
      flex-basis: 50%;
      padding: 0 2rem;

      h2 {
        font-size: 3rem;
        color: ${(props) => props.theme.yinmnGreen};
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.5rem;
        color: ${(props) => props.theme.yinmnGreen};
        margin-bottom: 1rem;
        text-transform: uppercase;
      }

      p {
        font-size: 1rem;
        line-height: 1.5;
        color: #666;
      }
    }

    &-image {
      flex-basis: 50%;
      padding: 0 2rem;

      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
      }
    }
  }

  @media (max-width: 768px) {
    .service {
      flex-direction: column;

      &-content,
      &-image {
        flex-basis: 100%;
        padding: 1rem 0;
      }

      &:nth-child(2) {
        flex-direction: column;
      }

      &-image {
        order: -1;
      }
    }
  }
`
