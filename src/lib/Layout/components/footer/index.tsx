import React from "react"
import {
  Container,
  FooterSection,
  Box,
  Logo,
  CopyRight,
  Lista,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "./footerElements"
import logo from "../../../../assets/img/duck-logo.png"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <FooterSection>
        <Container>
          <Box>
            <Logo>
              <img
                style={{
                  display: "flex",
                  height: "80px",
                  width: "auto",
                  textAlign: "left",
                  position: "relative",
                  right: "13px",
                }}
                src={logo}
                alt="Aprest Automotive Logo"
              />
              <h2>Driven by Passion, Fueled by Innovation</h2>
              <p>
                At Duck Moto we provide premium solutions for car enthusiasts
                and professionals alike. From high-performance parts to expert
                maintenance tips, we are your trusted partner in the world of
                automobiles.
              </p>
            </Logo>
          </Box>
          <Lista>
            <ul>
              <h3>Company Information</h3>
              <li>NIP: 123456789</li>
              <li>31-553 Kraków</li>
              <li>Krakowska 1892</li>
            </ul>
          </Lista>
          <Lista>
            <ul>
              <h3>Contact Us</h3>
              <li>
                <a href="tel:48123456789">+48 123 456 789</a>
              </li>
              <li>
                <a href="mailto:test@email.com">test@email.com</a>
              </li>
            </ul>
          </Lista>
        </Container>
      </FooterSection>

      <CopyRight>
        <span>Copyright © {currentYear} Moto Duck</span>
      </CopyRight>
    </>
  )
}

export default Footer
