import styled, { keyframes } from "styled-components";

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
`;

export const TextBox = styled.div`
  position: relative;
  z-index: 2;
  max-width: 90%;
  text-align: center;

  h2 {
    color: ${(props) => props.theme.antiflashWhite};
    font-size: 2rem;
  }

  p {
    color: ${(props) => props.theme.antiflashWhite};
    font-size: 1rem;
  }
`;

export const HeaderContent = styled.div`
  margin-bottom: 40px;
  max-width: 35rem;
  margin-top: 8rem;

  h2 {
    color: ${(props) => props.theme.antiflashWhite};
    margin-bottom: 2rem;
    font-size: 3.5rem;
    line-height: 1.2;
  }

  p {
    color: ${(props) => props.theme.antiflashWhite};
    font-size: 1.5rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    margin-top: -5rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.4rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

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
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
`;

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
`;

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

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

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
`;
