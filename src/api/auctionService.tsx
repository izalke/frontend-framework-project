import { ref, get, child, update } from "firebase/database";
import { db, addAuction, deleteAuctionFromFirebase} from "./firebase";


interface FilterOptions {
  brand?: string;
}

const getAuctions = async (filters: FilterOptions = {}) => { 
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

const createAuction = async (auctionData: any) => {
  return await addAuction(auctionData)
}

const deleteAuction = async (auctionId: string) => {
  try {
    
    const firebaseDeleted = await deleteAuctionFromFirebase(auctionId);
    if (!firebaseDeleted) throw new Error("Error while deleting auction from firebase");

    
    const response = await fetch(`http://localhost:5000/api/delete-auction/${auctionId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error while deleting photo from nextcloud");
    }

    console.log(`Auction ${auctionId} with photo was deleted.`);
    return true;
  } catch (error) {
    console.error("Error while deleting auction:", error);
    return false;
  }
};

const updateAuction = async (auctionId: string, updatedData: any): Promise<boolean> => {
  try {
    const auctionRef = ref(db, `auctions/${auctionId}`);

    await update(auctionRef, updatedData);

    console.log(`Auction ${auctionId} has been updated.`);
    return true;
  } catch (error) {
    console.error("Error while updating auction:", error);
    return false;
  }
};


export { getAuctions, getAuctionById, createAuction, deleteAuction, updateAuction };