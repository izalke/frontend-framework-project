import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Header,
  TextBox,
  ServicesSection,
  Services,
  ServiceItem,
  ReviewsSection,
  ReviewCard,
  Our,
  Row,
  OurCol,
  Ruo,
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
  FaStar,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"

// Images
import img1 from "./../../assets/img/pexels-images/pexels1.jpg"
import img2 from "./../../assets/img/pexels-images/pexels4.jpg"
import img3 from "./../../assets/img/pexels-images/pexels13.jpg"

import customer1 from "./../../assets/img/people1.jpg"
import customer2 from "./../../assets/img/people2.jpg"
import customer3 from "./../../assets/img/people3.jpg"

const imageContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } },
}

const headerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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

const reviews = [
  {
    name: "John Doe",
    review:
      "Amazing experience! The team helped me find my dream car with a great financing option. Highly recommended!",
    rating: 5,
    img: customer1,
  },
  {
    name: "Sarah Johnson",
    review:
      "Great customer service and a huge selection of vehicles. My car runs perfectly. Thank you!",
    rating: 4,
    img: customer2,
  },
  {
    name: "Mark Williams",
    review:
      "Transparent deals, no hidden fees, and a very friendly staff. I'll definitely be back for my next car!",
    rating: 5,
    img: customer3,
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
              Find your dream car today! At AutoDream Dealership, we provide a
              wide selection of high-quality new and certified pre-owned
              vehicles to suit every lifestyle and budget. Whether you're
              looking for a luxurious sedan, a powerful SUV, a fuel-efficient
              hybrid, or a rugged truck, we have the perfect car for you. Our
              dealership goes beyond just selling cars—we offer flexible
              financing options tailored to your needs, ensuring you drive off
              the lot with confidence and peace of mind. Our dedicated service
              center is staffed with experienced technicians who provide expert
              maintenance and repairs to keep your vehicle running smoothly for
              years to come.
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

      <Our id="our">
        <h1>THE UNIQUE ADVANTAGES OF OUR DEALERSHIP</h1>
        <p>
          At AutoDream Dealership, we offer more than just cars—we provide an
          exceptional car-buying experience that combines a vast selection of
          high-quality vehicles, flexible financing solutions, and top-tier
          customer service. Whether you're looking for a brand-new luxury model
          or a certified pre-owned vehicle, we ensure a seamless, stress-free
          journey from selection to purchase.
        </p>
        <Row>
          <OurCol>
            <img src={img1} />
            <h3>Extensive Vehicle Selection</h3>
          </OurCol>
          <OurCol>
            <img src={img2} />
            <h3>Affordable Financing Options</h3>
          </OurCol>
          <OurCol>
            <img src={img3} />
            <h3>Top-Notch Customer Service</h3>
          </OurCol>
        </Row>
      </Our>

      <Ruo>
        <h1>INFORMATION</h1>

        {/* First Section */}
        <div className="service">
          <div className="service-image">
            <img src={img1} alt="First Service" />
          </div>
          <div className="service-content">
            <h2>01.</h2>
            <div>
              <h3>Prime Location & Easy Access</h3>
              <p>
                Our dealership is strategically located for convenience and ease
                of access. Whether you're visiting us from the city center or
                the suburbs, our well-connected location makes test-driving,
                servicing, and purchasing a vehicle a hassle-free experience.
                Nearby highways and public transport options make it easier than
                ever to drive home in your dream car the very same day.
              </p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="service">
          <div className="service-image">
            <img src={img1} alt="Second Service" />
          </div>
          <div className="service-content">
            <h2>02.</h2>
            <div>
              <h3>Modern Showroom & Customer Lounge</h3>
              <p>
                Step into our state-of-the-art showroom, where you can explore
                the latest models in a comfortable and stylish environment. Our
                dedicated team of professionals is ready to assist you with
                vehicle features, test drives.
              </p>
            </div>
          </div>
        </div>
      </Ruo>

      {/* Customer Reviews Section */}
      <ReviewsSection>
        <h2>What Our Customers Say</h2>
        <div className="review-container">
          {reviews.map((review, index) => (
            <ReviewCard key={index}>
              <img src={review.img} alt={review.name} />
              <h3>{review.name}</h3>
              <p>{review.review}</p>
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </ReviewCard>
          ))}
        </div>
      </ReviewsSection>
    </>
  )
}

export default Home
