import React, { useState } from "react";

interface FiltersProps {
  setFilters: (filters: { brand?: string }) => void;
  setSortOption: (sort: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ setFilters, setSortOption }) => {
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const handleFilterChange = () => {
    setFilters({ brand: brand || undefined }); 
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    setSortOption(event.target.value);
  };

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <h3>Filtry</h3>
      <input
        type="text"
        placeholder="Marka"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <button onClick={handleFilterChange}>Zastosuj filtr</button>

      <h3>Sortowanie</h3>
      <select value={sort} onChange={handleSortChange}>
        <option value="">Brak</option>
        <option value="asc">Cena rosnąco</option>
        <option value="desc">Cena malejąco</option>
      </select>
    </div>
  );
};

export { Filters };