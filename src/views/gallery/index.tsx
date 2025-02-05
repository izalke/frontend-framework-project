import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GalleryContainer,
  GalleryHeader,
  GalleryForm,
  GalleryGrid,
  GalleryItem,
  ModalOverlay,
  ModalContent,
  ModalImage,
  PrevButton,
  NextButton,
} from "./galleryElements";

// Framer Motion Variants
const headerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

const Gallery: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/files")
      .then((response) => response.json())
      .then((data) => setFiles(data.files))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Files uploaded successfully:", data);
          setFiles((prevFiles) => [...prevFiles, ...data.files]);
          setSelectedFile(null);
        } else {
          console.error("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const openImageModal = (file: string) => {
    const index = files.indexOf(file);
    setSelectedImage(file);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(null);
  };

  const nextImage = () => {
    if (currentImageIndex !== null) {
      const nextIndex = (currentImageIndex + 1) % files.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(files[nextIndex]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex !== null) {
      const prevIndex = (currentImageIndex - 1 + files.length) % files.length;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(files[prevIndex]);
    }
  };

  return (
    <GalleryContainer>
      <GalleryHeader as={motion.div} initial="hidden" animate="visible" variants={headerVariants}>
        <h2>Gallery</h2>
        <p>Browse and upload your favorite images to share with others.</p>
      </GalleryHeader>

      <GalleryForm onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit" disabled={!selectedFile}>
          Upload File
        </button>
        {selectedFile && (
          <div>
            <h4>Selected File:</h4>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected file preview"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </div>
        )}
      </GalleryForm>

      <GalleryGrid>
        {files.length === 0 ? (
          <p>No images to display</p>
        ) : (
          files.map((file, index) => (
            <GalleryItem key={index} onClick={() => openImageModal(file)}>
              <img src={`http://localhost:5000/data/${file}`} alt={file} />
            </GalleryItem>
          ))
        )}
      </GalleryGrid>

      {selectedImage && (
        <ModalOverlay onClick={closeImageModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <PrevButton onClick={prevImage}>&#8592;</PrevButton>
            <ModalImage src={`http://localhost:5000/data/${selectedImage}`} alt={selectedImage} />
            <NextButton onClick={nextImage}>&#8594;</NextButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </GalleryContainer>
  );
};

export default Gallery;
