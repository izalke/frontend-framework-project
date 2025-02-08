import { useState } from "react"
import { ref, get, child, set } from "firebase/database"
import { db } from "../../api/firebase"
import "./index.css"

const AddCar = () => {
  const [formData, setFormData] = useState({
    brand: "",
    title: "",
    price: "",
    capacity: "",
    power: "",
    mileage: "",
    color: "",
    vin: "",
    description: "",
    images: [] as File[],
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const getNextAuctionId = async () => {
    const dbRef = ref(db)
    try {
      const snapshot = await get(child(dbRef, "auctions"))
      if (snapshot.exists()) {
        const keys = Object.keys(snapshot.val())
        return (
          Math.max(...keys.map((key) => parseInt(key, 10) || 0)) + 1
        ).toString()
      }
      return "1"
    } catch (error) {
      console.error("Error fetching next ID:", error)
      return "1"
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        images: Array.from(event.target.files || []),
      }))
    }
  }

  const handleFileUpload = async (auctionId: string) => {
    if (!formData.images.length) return

    for (const file of formData.images) {
      const formDataUpload = new FormData()
      formDataUpload.append("file", file)

      try {
        console.log(`Uploading file: ${file.name} to auction: ${auctionId}`)

        const response = await fetch(
          `http://localhost:5000/api/upload-auction/${auctionId}`,
          {
            method: "POST",
            body: formDataUpload,
          }
        )

        if (!response.ok) {
          throw new Error(`Error uploading file: ${file.name}`)
        }

        console.log(`File ${file.name} uploaded OK.`)
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const auctionId = await getNextAuctionId()
      await set(ref(db, `auctions/${auctionId}`), { ...formData, images: [] })

      await fetch(`http://localhost:5000/api/create-folder/${auctionId}`, {
        method: "POST",
      })
      await handleFileUpload(auctionId)

      setMessage("Aukcja dodana pomyślnie!")
      setFormData({
        brand: "",
        title: "",
        price: "",
        capacity: "",
        power: "",
        mileage: "",
        color: "",
        vin: "",
        description: "",
        images: [],
      })
    } catch (error) {
      setMessage("Błąd podczas dodawania aukcji.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Dodaj nową aukcję</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="brand"
          placeholder="Marka"
          value={formData.brand}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="title"
          placeholder="Tytuł"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Cena"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="capacity"
          placeholder="Pojemność silnika"
          value={formData.capacity}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="power"
          placeholder="Moc (KM)"
          value={formData.power}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="mileage"
          placeholder="Przebieg (km)"
          value={formData.mileage}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="color"
          placeholder="Kolor"
          value={formData.color}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="vin"
          placeholder="VIN"
          value={formData.vin}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          placeholder="Opis"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded mt-2"
        >
          {loading ? "Dodawanie..." : "Dodaj Aukcję"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  )
}

export default AddCar
