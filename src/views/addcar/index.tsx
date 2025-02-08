import { useState } from "react"
import { ref, get, child, set } from "firebase/database"
import { db } from "../../api/firebase"
import {
  Container,
  Form,
  Input,
  Textarea,
  Button,
  Message,
  Title,
} from "./carElements"

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const auctionId = await getNextAuctionId()
      await set(ref(db, `auctions/${auctionId}`), { ...formData, images: [] })

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
    <Container>
      <Title>Add new auction</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="brand"
          placeholder="Marka"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="title"
          placeholder="Tytuł"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="price"
          placeholder="Cena"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="capacity"
          placeholder="Pojemność silnika"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="power"
          placeholder="Moc (KM)"
          value={formData.power}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="mileage"
          placeholder="Przebieg (km)"
          value={formData.mileage}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="color"
          placeholder="Kolor"
          value={formData.color}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="vin"
          placeholder="VIN"
          value={formData.vin}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Opis"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Input type="file" multiple onChange={handleFileChange} />
        <Button type="submit" disabled={loading}>
          {loading ? "Dodawanie..." : "Dodaj Aukcję"}
        </Button>
      </Form>
      {message && <Message>{message}</Message>}
    </Container>
  )
}

export default AddCar
