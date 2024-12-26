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
                  display: "block",
                  height: "80px",
                  width: "auto",
                  position: "relative",
                  right: "13px",
                }}
                src={logo}
                alt=""
              />
              <h2>lorem</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                excepturi animi minima est sit illo vel ex molestias quis nam,
                alias veritatis cupiditate quam blanditiis veniam! Quod quaerat
                molestias atque.
              </p>
            </Logo>
          </Box>
          <Lista>
            <ul>
              <h3>Lorem</h3>
              <li>Lorem</li>
              <li>Lorem</li>
              <li>Lorem</li>
            </ul>
          </Lista>
        </Container>
        <Container>
          <Lista>
            <ol>
              <h3>Social Media</h3>
              <li>
                <a target={"_blank"} href={"https://www.facebook.com"}>
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a target={"_blank"} href={"https://instagram.com"}>
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a target={"_blank"} href={"https://www.youtube.com"}>
                  <YoutubeIcon />
                </a>
              </li>
            </ol>
          </Lista>
        </Container>
      </FooterSection>

      <CopyRight>
        <span>Copyright © {currentYear} MOTODUCK</span>
      </CopyRight>
    </>
  )
}

export default Footer
