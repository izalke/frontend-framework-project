import { Outlet, ScrollRestoration } from "react-router-dom"
import { Wrapper, ProgressBar } from "./layoutElements"
import Nav from "./components/nav"
import Footer from "./components/footer"
import { useScroll } from "framer-motion"
import { ThemeProvider } from "styled-components"
import theme from "./../../assets/theme"

const Layout: React.FC = () => {
  const { scrollYProgress } = useScroll()

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <ProgressBar style={{ scaleX: scrollYProgress }} />
        <Nav />
        <main>
          <Outlet />
        </main>

        <ScrollRestoration />
        {/* <Footer /> */}
      </ThemeProvider>
    </Wrapper>
  )
}

export default Layout
