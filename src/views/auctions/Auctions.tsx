import React, { useState, useEffect } from "react";
import { AuctionList } from "./AuctionList";
import { getAuctions } from "../../api/auctionService";
import "./Auctions.css";

interface Auction {
  id: string;
  title?: string;
  price?: number;
  brand?: string;
}

const Auctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filters, setFilters] = useState<{ brand?: string; title?: string }>({});
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      let data = await getAuctions(filters);

     
      if (filters.brand) {
        data = data.filter((auction) =>
          auction.brand?.toLowerCase().includes(filters.brand!.toLowerCase())
        );
      }

      
      if (filters.title) {
        data = data.filter((auction) =>
          auction.title?.toLowerCase().includes(filters.title!.toLowerCase())
        );
      }

     
      if (sortOption === "asc") {
        data.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      } else if (sortOption === "desc") {
        data.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      }

      setAuctions(data);
    }

    fetchData();
  }, [filters, sortOption]);

  return (
    <div className="auctions-page">
      <div className="filters-container">
        <h3>Filtry</h3>
        <input
          type="text"
          placeholder="Filtruj po marce..."
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filtruj po tytule..."
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />

        <h3>Sortowanie</h3>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Brak</option>
          <option value="asc">Cena rosnąco</option>
          <option value="desc">Cena malejąco</option>
        </select>
      </div>

      <AuctionList auctions={auctions} />
    </div>
  );
};

export default Auctions;
