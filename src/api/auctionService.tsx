import { ref, get, child } from "firebase/database";
import { db } from "./firebase";

interface FilterOptions {
  brand?: string;
}

const getAuctions = async (filters: FilterOptions = {}) => { // 👈 Domyślna wartość dla filters
  console.log("Downloading auction");

  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "auctions"));
    if (snapshot.exists()) {
      let auctionsArray = Object.keys(snapshot.val()).map((key) => ({
        id: key,
        ...snapshot.val()[key],
      }));

     
      if (filters.brand && typeof filters.brand === "string") {
        auctionsArray = auctionsArray.filter((auction) =>
          auction.brand?.toLowerCase().includes(filters.brand!.toLowerCase())
        );
      }

      console.log("Downloading auction:", auctionsArray);
      return auctionsArray;
    } else {
      console.log("No data in database");
      return [];
    }
  } catch (error) {
    console.error("Error while loading auction", error);
    return [];
  }
};


 const getAuctionById = async (id: string) => {
  console.log(`Downloading auction with id: ${id}`);
  const dbRef = ref(db);

  try {
    const snapshot = await get(child(dbRef, `auctions/${id}`));
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    } else {
      console.log("Auction not found.");
      return null;
    }
  } catch (error) {
    console.error("Error while loading auction:", error);
    return null;
  }
};

export { getAuctions, getAuctionById };