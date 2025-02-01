import { ref, get, child } from "firebase/database";
import { db } from "./firebase";

interface FilterOptions {
  brand?: string;
}

const getAuctions = async (filters: FilterOptions = {}) => { // 👈 Domyślna wartość dla filters
  console.log("🔥 Pobieranie aukcji z Realtime Database...");

  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "auctions"));
    if (snapshot.exists()) {
      let auctionsArray = Object.keys(snapshot.val()).map((key) => ({
        id: key,
        ...snapshot.val()[key],
      }));

      // **Filtrowanie aukcji według marki**
      if (filters.brand && typeof filters.brand === "string") {
        auctionsArray = auctionsArray.filter((auction) =>
          auction.brand?.toLowerCase().includes(filters.brand!.toLowerCase())
        );
      }

      console.log("✅ Pobrane aukcje:", auctionsArray);
      return auctionsArray;
    } else {
      console.log("❌ Brak danych w Realtime Database");
      return [];
    }
  } catch (error) {
    console.error("❌ Błąd pobierania aukcji:", error);
    return [];
  }
};


 const getAuctionById = async (id: string) => {
  console.log(`🔍 Pobieranie aukcji o ID: ${id}`);
  const dbRef = ref(db);

  try {
    const snapshot = await get(child(dbRef, `auctions/${id}`));
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    } else {
      console.log("❌ Aukcja nie znaleziona.");
      return null;
    }
  } catch (error) {
    console.error("❌ Błąd pobierania aukcji:", error);
    return null;
  }
};

export { getAuctions, getAuctionById };