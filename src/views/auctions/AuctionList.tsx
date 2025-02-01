import React from "react";
import { Link } from "react-router-dom";

interface Auction {
  id: string;
  title?: string;
  price?: number;
  brand?: string;
}

interface AuctionListProps {
  auctions: Auction[];
}

const AuctionList: React.FC<AuctionListProps> = ({ auctions }) => {
  return (
    <div>
      <h3>Lista Aukcji</h3>
      {auctions.length > 0 ? (
        auctions.map((auction) => (
          <Link to={`/auctions/${auction.id}`} key={auction.id} style={{ textDecoration: "none", color: "black" }}>
            <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", cursor: "pointer" }}>
              <h4>{auction.title}</h4>
              <p>Marka: {auction.brand}</p>
              <p>Cena: {auction.price} PLN</p>
            </div>
          </Link>
        ))
      ) : (
        <p>Brak dostępnych aukcji.</p>
      )}
    </div>
  );
};

export { AuctionList };
