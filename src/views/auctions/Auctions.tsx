import React, { useState, useEffect } from "react";
import { Filters } from "./Filters";
import { AuctionList } from "./AuctionList";
import { getAuctions } from "../../api/auctionService";

interface Auction {
  id: string;
  title?: string;
  price?: number;
  brand?: string;
}

const Auctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filters, setFilters] = useState<{ brand?: string }>({});
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await getAuctions(filters);
      let filteredData = data;

      if (filters.brand) {
        filteredData = filteredData.filter((auction) =>
          auction.brand?.toLowerCase().includes(filters.brand!.toLowerCase())
        );
      }

      if (sortOption === "asc") {
        filteredData.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      } else if (sortOption === "desc") {
        filteredData.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      }

      setAuctions(filteredData);
    }

    fetchData();
  }, [filters, sortOption]);

  return (
    <div>
      <h1>Aukcje</h1>
      <Filters setFilters={setFilters} setSortOption={setSortOption} />
      <AuctionList auctions={auctions} />
    </div>
  );
};

export default Auctions;