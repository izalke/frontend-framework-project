import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuctionById, updateAuction } from "../../api/auctionService";
import "./UpdateAuction.css";

const API_BASE = "http://localhost:5000/api";

const UpdateAuction: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [auction, setAuction] = useState<any | null>(null);
  const [editedAuction, setEditedAuction] = useState<any>({});
  const [images, setImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAuction() {
      if (id) {
        const data = await getAuctionById(id);
        setAuction(data);
        setEditedAuction(data); 

        await fetchImages(); 
      }
    }
    fetchAuction();
  }, [id]);

  const fetchImages = async () => {
    if (!id) return;
    try {
      const response = await fetch(`${API_BASE}/get-files/${id}`);
      const imageData = await response.json();
      setImages(imageData.files);
    } catch (error) {
      console.error("Error while downloading photo:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedAuction({
      ...editedAuction,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewImages(Array.from(event.target.files));
    }
  };

  const handleFileUpload = async () => {
    if (!id || newImages.length === 0) {
      alert("Nie wybrano plików.");
      return;
    }

    setLoading(true);
    for (const file of newImages) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      try {
        console.log(`Uploading file: ${file.name} to auction ${id}`);

        const response = await fetch(`${API_BASE}/upload-auction/${id}`, {
          method: "POST",
          body: formDataUpload,
        });

        if (!response.ok) {
          throw new Error(`Error while uploading photo: ${file.name}`);
        }

        console.log(`File uploaded OK ${file.name} `);
      } catch (error) {
        console.error("Error while uploading photo:", error);
      }
    }

    alert("Nowe zdjęcia zostały dodane!");
    setNewImages([]); 
    setLoading(false);
    await fetchImages(); 
  };

  const handleDeleteImage = async (fileName: string) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć to zdjęcie?");
    if (!confirmed || !id) return;

    try {
      const response = await fetch(`${API_BASE}/delete-image/${id}/${fileName}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error while deleting photo");

      alert("Zdjęcie usunięte.");
      await fetchImages(); 
    } catch (error) {
      alert("Nie udało się usunąć zdjęcia.");
    }
  };

  const handleSaveChanges = async () => {
    if (!id) return;
    const success = await updateAuction(id, editedAuction);
    if (success) {
      alert("Zmiany zapisane!");
      navigate(`/auctions/${id}`);
    } else {
      alert("Błąd podczas zapisywania zmian.");
    }
  };

  if (!auction) return <p className="loading">Ładowanie...</p>;

  return (
    <div className="update-auction">
      <h2>Edytuj aukcję</h2>

      <label>Marka:</label>
      <input type="text" name="brand" value={editedAuction.brand} onChange={handleInputChange} />

      <label>Tytuł:</label>
      <input type="text" name="title" value={editedAuction.title} onChange={handleInputChange} />

      <label>Cena:</label>
      <input type="number" name="price" value={editedAuction.price} onChange={handleInputChange} />

      <label>Pojemność silnika:</label>
      <input type="number" name="capacity" value={editedAuction.capacity} onChange={handleInputChange} />

      <label>Moc (KM):</label>
      <input type="number" name="power" value={editedAuction.power} onChange={handleInputChange} />

      <label>Przebieg (km):</label>
      <input type="number" name="mileage" value={editedAuction.mileage} onChange={handleInputChange} />

      <label>Kolor:</label>
      <input type="text" name="color" value={editedAuction.color} onChange={handleInputChange} />

      <label>VIN:</label>
      <input type="text" name="vin" value={editedAuction.vin} onChange={handleInputChange} />

      <label>Opis:</label>
      <textarea name="description" value={editedAuction.description} onChange={handleInputChange} />

      <h3>Zdjęcia</h3>
      <div className="auction-images">
        {images.map((file, index) => (
          <div key={index} className="image-container">
            <img src={`${API_BASE}/data/${id}/${file}`} alt={`Zdjęcie ${index + 1}`} className="thumbnail" />
            <button className="delete-image" onClick={() => handleDeleteImage(file)}>🗑</button>
          </div>
        ))}
      </div>

      <h3>Dodaj nowe zdjęcia</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={loading}>
        {loading ? "Dodawanie..." : "📤 Dodaj zdjęcia"}
      </button>

      <button onClick={handleSaveChanges} className="save-button">💾 Zapisz</button>
      <button onClick={() => navigate(`/auctions/${id}`)} className="cancel-button">❌ Anuluj</button>
    </div>
  );
};

export default UpdateAuction;
