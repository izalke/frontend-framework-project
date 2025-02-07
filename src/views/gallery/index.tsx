import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"

import {
  GalleryContainer,
  GalleryHeading,
  GalleryDescription,
  ImageGrid,
  ImageWrapper,
  ImageOverlay,
  Modal,
  ModalContent,
  CloseButton,
} from "./galleryElements"

import img1 from "../../assets/img/pexels-images/pexels1.jpg"
import img2 from "../../assets/img/pexels-images/pexels2.jpg"
import img3 from "../../assets/img/pexels-images/pexels3.jpg"
import img4 from "../../assets/img/pexels-images/pexels4.jpg"
import img5 from "../../assets/img/pexels-images/pexels5.jpg"
import img6 from "../../assets/img/pexels-images/pexels6.jpg"
import img7 from "../../assets/img/pexels-images/pexels7.jpg"
import img8 from "../../assets/img/pexels-images/pexels8.jpg"
import img9 from "../../assets/img/pexels-images/pexels9.jpg"
import img10 from "../../assets/img/pexels-images/pexels10.jpg"
import img11 from "../../assets/img/pexels-images/pexels11.jpg"
import img12 from "../../assets/img/pexels-images/pexels12.jpg"
import img13 from "../../assets/img/pexels-images/pexels13.jpg"
import img14 from "../../assets/img/pexels-images/pexels14.jpg"
import img16 from "../../assets/img/pexels-images/pexels2.jpg"
import img17 from "../../assets/img/pexels-images/pexels9.jpg"

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img16,
  img17,
]

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <GalleryContainer
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
    >
      <GalleryHeading>Gallery</GalleryHeading>
      <GalleryDescription>
        Welcome to our service gallery! We are an authorized car dealer, proudly
        presenting our wide range of vehicles. Explore our finest models and
        find the perfect car for you!
      </GalleryDescription>
      <ImageGrid>
        {images.map((src, index) => (
          <ImageWrapper
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(src)}
          >
            <img src={src} alt={`Gallery Image ${index + 1}`} />
            <ImageOverlay whileHover={{ opacity: 1 }}>
              <p>Car Image {index + 1}</p>
            </ImageOverlay>
          </ImageWrapper>
        ))}
      </ImageGrid>
      <AnimatePresence>
        {selectedImage && (
          <Modal
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              onClick={(e: { stopPropagation: () => void }) =>
                e.stopPropagation()
              }
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <img src={selectedImage} alt="Enlarged" />
              <CloseButton onClick={() => setSelectedImage(null)}>
                &times;
              </CloseButton>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GalleryContainer>
  )
}

export default Gallery
