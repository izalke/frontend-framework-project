import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaLinkedin, FaFacebookSquare, FaYoutube } from "react-icons/fa"
import logo from "../../../../assets/img/duck-logo.png"
import { useAuth } from "../../../../views/auth/AuthContext";
import {
  Wrapper,
  Bar,
  Logo,
  Spacer,
  Links,
  BurgerMenu,
  Drawer,
  MobileLink,
  SocialWrapper,
  MobileOverlay,
} from "./navElements"

const Nav = (): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { user, role, logout } = useAuth();
  const toggleDrawer = (): void => {
    setIsDrawerOpen((prev) => !prev)
  }
  

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isDrawerOpen])

  const { pathname } = useLocation()
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setIsDrawerOpen(false)
    }
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsDrawerOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Wrapper>
      <Bar>
        <Link to={"/"}>
          <Logo src={logo} alt="Ducks Cars Logo" />
        </Link>
        <Spacer />
        <Links>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/ourservices"}>Our Services</Link>
          </li>
          <li>
            <Link to={"/gallery"}>Gallery</Link>
          </li>
          <li>
            <Link to={"/auctions"}>Auctions</Link>
          </li>

          {role === "admin" && (
            <li>
              <Link to={"/addcar"}>Add Car</Link>
            </li>
          )}


          {user ? (
            <>
              <li>
                <span className="username">👤 {user.displayName || user.email}</span>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to={"/auth"}>Login / Sign in</Link>
            </li>
          )}



          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </Links>
        <BurgerMenu isActive={isDrawerOpen} onClick={toggleDrawer}>
          <span />
          <span />
          <span />
        </BurgerMenu>
      </Bar>
      <Drawer
        initial={{ x: "100%" }}
        animate={{ x: isDrawerOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <MobileLink to={"/"} isActive={pathname === "/"}>
          Home
        </MobileLink>
        <MobileLink to={"/about"} isActive={pathname === "/about"}>
          About
        </MobileLink>
        <MobileLink to={"/ourservices"} isActive={pathname === "/ourservices"}>
          Our Services
        </MobileLink>
        <MobileLink to={"/gallery"} isActive={pathname === "/gallery"}>
          Gallery
        </MobileLink>
        <MobileLink to={"/contact"} isActive={pathname === "/contact"}>
          Contact
        </MobileLink>
        <Spacer />
        <SocialWrapper>
          <a
            href={"https://www.facebook.com"}
            target={"_blank"}
            rel="noreferrer"
          >
            <FaFacebookSquare />
          </a>
          <a
            href={"https://www.linkedin.com"}
            target={"_blank"}
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href={"https://www.youtube.com"}
            target={"_blank"}
            rel="noreferrer"
          >
            <FaYoutube />
          </a>
        </SocialWrapper>
      </Drawer>
      <MobileOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: isDrawerOpen ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </Wrapper>
  )
}

export default Nav
