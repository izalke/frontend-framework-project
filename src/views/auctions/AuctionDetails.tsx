import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { getAuctionById, deleteAuction } from "../../api/auctionService"; 
import { useAuth } from "../../views/auth/AuthContext"; // ✅ Pobranie roli użytkownika
import Modal from "react-modal";
import "./AuctionDetails.css";

const API_BASE = "http://localhost:5000/api";

const AuctionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); 
  const { user, role } = useAuth(); // ✅ Pobranie użytkownika i roli
  const [auction, setAuction] = useState<any | null>(null);
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

  // ✅ Funkcja usuwania aukcji
  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę aukcję?");
    if (!confirmed) return;

    const success = await deleteAuction(id);
    if (success) {
      alert("Aukcja została usunięta.");
      navigate("/auctions"); 
    } else {
      alert("Błąd podczas usuwania aukcji.");
    }
  };

  if (!auction) return <p className="loading">Ładowanie...</p>;

  return (
    <div className="auction-details">
      <h2>{auction.title || "Brak tytułu"}</h2>

      <div className="auction-info">
        {Object.entries(auction)
          .filter(([key]) => key !== "id") 
          .map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {String(value)}
            </p>
          ))}
      </div>

      <h3>Zdjęcia</h3>
      <div className="auction-images">
        {images.length > 0 ? (
          images.map((file, index) => (
            <img
              key={index}
              src={`${API_BASE}/data/${id}/${file}`}
              alt={`Zdjęcie ${index + 1}`}
              className="thumbnail"
              onClick={() => {
                setCurrentIndex(index);
                setIsOpen(true);
              }}
            />
          ))
        ) : (
          <p>Ładowanie zdjęć</p>
        )}
      </div>

      {/* ✅ Pokazuj przycisk usuwania TYLKO jeśli użytkownik jest adminem */}
      {role === "admin" && (
        <button onClick={handleDelete} className="delete-button">
          🗑 Usuń aukcję
        </button>
      )}

      {/* 🔍 Modal ze zdjęciami */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal-navigation">
          <button onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}>◀</button>
          <img className="full-image" src={`${API_BASE}/data/${id}/${images[currentIndex]}`} alt="Powiększone zdjęcie" />
          <button onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}>▶</button>
        </div>
        <button className="close-button" onClick={() => setIsOpen(false)}>Zamknij</button>
      </Modal>
    </div>
  );
};

export default AuctionDetails;
