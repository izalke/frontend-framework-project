import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuctionById } from "../../api/auctionService";
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
};

const AuctionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<AuctionDetailsProps | null>(null);
  const [images, setImages] = useState<string[]>([]);

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

  if (!auction) return <p className="loading">Ładowanie...</p>;

  return (
    <div className="auction-details">
      <h2>{auction.title || "Brak tytułu"}</h2>
      <div className="auction-info">
        {Object.entries(auction).map(([key, value]) => (
          <p key={key}>
            <strong>{fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.toString()}
          </p>
        ))}
      </div>

      <h3>Zdjęcia</h3>
      <div className="auction-images">
        {images.length > 0 ? (
          images.map((file, index) => (
            <img key={index} src={`${API_BASE}/data/${id}/${file}`} alt={`Zdjęcie ${index + 1}`} />
          ))
        ) : (
          <p>Brak zdjęć</p>
        )}
      </div>
    </div>
  );
};

export default AuctionDetails;
