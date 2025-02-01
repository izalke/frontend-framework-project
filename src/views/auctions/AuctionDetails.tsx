import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuctionById } from "../../api/auctionService";
import Modal from "react-modal";
import "./AuctionDetails.css";

const API_BASE = "http://localhost:5000/api";

interface AuctionDetailsProps {
  [key: string]: any;
}

const fieldLabels: { [key: string]: string } = {
  brand: "Marka",
  price: "Cena",
  title: "Tytuł",
  capacity: "Pojemność silnika",
  power: "Moc",
  mileage: "Przebieg",
  color: "Kolor",
  vin: "VIN",
  description: "Opis"
};

const AuctionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<AuctionDetailsProps | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchAuction() {
      if (id) {
        const data = await getAuctionById(id);
        setAuction(data);

        const response = await fetch(`${API_BASE}/get-files/${id}`);
        const imageData = await response.json();
        setImages(imageData.files);
      }
    }
    fetchAuction();
  }, [id]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.classList.add("modal-active");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("modal-active");
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!auction) return <p className="loading">Ładowanie...</p>;

  
  const { description, id: _, ...otherDetails } = auction;

  return (
    <div className="auction-details">
      <h2>{auction.title || "Brak tytułu"}</h2>
      
      <div className="auction-info">
        {Object.entries(otherDetails)
          .filter(([key]) => key !== "id") 
          .map(([key, value]) => (
            <p key={key}>
              <strong>{fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
            </p>
        ))}
      </div>

      {description && (
        <div className="auction-description">
          <h3>Opis</h3>
          <p>{description}</p>
        </div>
      )}

      <h3>Zdjęcia</h3>
      <div className="auction-images">
        {images.length > 0 ? (
          images.map((file, index) => (
            <img
              key={index}
              src={`${API_BASE}/data/${id}/${file}`}
              alt={`Zdjęcie ${index + 1}`}
              className="thumbnail"
              onClick={() => openModal(index)}
            />
          ))
        ) : (
          <p>Ładowanie zdjęć</p>
        )}
      </div>

     
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal-navigation">
          <button className="prev-button" onClick={prevImage}>◀</button>
          <img className="full-image" src={`${API_BASE}/data/${id}/${images[currentIndex]}`} alt="Powiększone zdjęcie" />
          <button className="next-button" onClick={nextImage}>▶</button>
        </div>
        <button className="close-button" onClick={closeModal}>Zamknij</button>
      </Modal>
    </div>
  );
};

export default AuctionDetails;
