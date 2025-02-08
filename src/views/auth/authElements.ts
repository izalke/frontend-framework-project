import styled from "styled-components";
import { motion } from "framer-motion";

export const AuthContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  margin: 5rem auto;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow};
  border-radius: 8px;
`;

export const AuthTitle = styled.h2`
  font-size: 1.8rem;
  margin-top: 5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  font-size: 1rem;
`;

export const AuthButton = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.yinmnGreen};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: darkgreen;
  }
`;

export const ToggleText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.link};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;


