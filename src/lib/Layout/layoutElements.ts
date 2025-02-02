import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  width: 100dvw;

  > main {
    padding: 0 0 0 0;
  }

  @media screen and (max-width: 1024px) {
    > main {
      padding: 10px 0 0 0;
    }
  }
`;
export const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: #90b137;
  transform-origin: 0%;
  z-index: 1000;
`;
