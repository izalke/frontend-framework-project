import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Header,
  TextBox,
  ServicesSection,
  Services,
  ServiceItem,
} from "./homeElements"
import {
  FaCar,
  FaMoneyBillWave,
  FaWrench,
  FaRoad,
  FaClipboardCheck,
  FaGasPump,
  FaShieldAlt,
  FaCertificate,
  FaMapMarkedAlt,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"

// Images
import img1 from "./../../assets/img/pexels-images/pexels1.jpg"
import img2 from "./../../assets/img/pexels-images/pexels8.jpg"
import img3 from "./../../assets/img/pexels-images/pexels6.jpg"

const imageContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } },
}

const headerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
}

const services = [
  {
    icon: <FaCar />,
    title: "Wide Selection of Cars",
    subtitle: "Choose from a variety of new and pre-owned vehicles.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Flexible Financing Options",
    subtitle: "Get the best financing solutions tailored to your budget.",
  },
  {
    icon: <FaWrench />,
    title: "Certified Service Center",
    subtitle: "Expert maintenance and repairs for your vehicle.",
  },
  {
    icon: <FaGasPump />,
    title: "Fuel Efficiency",
    subtitle: "Explore cars with top-notch fuel economy.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Warranty Protection",
    subtitle: "Comprehensive warranty plans for peace of mind.",
  },
  {
    icon: <FaCertificate />,
    title: "Certified Pre-Owned",
    subtitle: "Quality checked and guaranteed pre-owned vehicles.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Transparent Deals",
    subtitle: "No hidden fees. Clear and honest transactions.",
  },
  {
    icon: <FaRoad />,
    title: "Test Drive",
    subtitle: "Book a test drive and experience your car before buying.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Convenient Locations",
    subtitle: "Find our dealerships near you with ease.",
  },
]

const images = [img1, img2, img3]

const Home: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Header Section */}
      <Header
        as={motion.div}
        style={{
          backgroundImage: `linear-gradient(rgba(4, 9, 30, 0.3), rgba(4, 9, 30, 0.2)), url(${images[currentImage]})`,
        }}
        initial="hidden"
        animate="visible"
        variants={imageContainerVariants}
      >
        <TextBox>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <h2>Welcome to AutoDream Dealership</h2>
            <p>
              Find your dream car today! We offer a wide selection of vehicles,
              affordable financing options, and expert service to keep your car
              running like new.
            </p>
          </motion.div>
        </TextBox>
      </Header>

      {/* Services Section */}
      <ServicesSection>
        <h2>Our Services</h2>
        <p>
          From finding the perfect car to expert maintenance, we are here to
          make your car buying and ownership experience seamless and enjoyable.
        </p>
        <Services>
          {services.map((service, index) => (
            <ServiceItem key={index}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.subtitle}</p>
            </ServiceItem>
          ))}
        </Services>
      </ServicesSection>
    </>
  )
}

export default Home
