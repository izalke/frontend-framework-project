import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AuctionList.css"; 

const API_BASE = "http://localhost:5000/api"; 

interface Auction {
  id: string;
  title?: string;
  price?: number;
  brand?: string;
}

interface AuctionWithImage extends Auction {
  image?: string; 
}

const AuctionList: React.FC<{ auctions: Auction[] }> = ({ auctions }) => {
  const [auctionsWithImages, setAuctionsWithImages] = useState<AuctionWithImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedAuctions = await Promise.all(
        auctions.map(async (auction) => {
          try {
            const response = await fetch(`${API_BASE}/get-files/${auction.id}`);
            const data = await response.json();
            const imageUrl = data.files.length > 0 
              ? `${API_BASE}/data/${auction.id}/${data.files[0]}` 
              : "/placeholder.jpg"; 

            return { ...auction, image: imageUrl };
          } catch (error) {
            console.error("Błąd pobierania zdjęć:", error);
            return { ...auction, image: "/placeholder.jpg" };
          }
        })
      );

      setAuctionsWithImages(updatedAuctions);
    };

    fetchImages();
  }, [auctions]);

  return (
    <div className="auction-list-container">
      <h3>Lista Aukcji</h3>
      {auctionsWithImages.length > 0 ? (
        auctionsWithImages.map((auction) => (
          <Link to={`/auctions/${auction.id}`} key={auction.id} className="auction-link">
            <div className="auction-item">
              <div className="auction-info">
                <h4>{auction.title}</h4>
                <p>Marka: {auction.brand}</p>
                <p>Cena: {auction.price} PLN</p>
              </div>
              <div className="auction-image">
                <img src={auction.image} alt={auction.title || "Zdjęcie auta"} />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Ładowanie aukcji.</p>
      )}
    </div>
  );
};

export { AuctionList };
