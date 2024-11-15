import React, { useEffect, useState } from "react"
import { db, ref, get } from "./firebase"

const CarList: React.FC = () => {
  const [cars, setCars] = useState<any[]>([])

  // database read
  const fetchCars = async () => {
    const carsRef = ref(db, "cars")
    try {
      const snapshot = await get(carsRef)
      if (snapshot.exists()) {
        const data = snapshot.val()
        const carsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setCars(carsArray)
      } else {
        console.log("Brak danych!")
      }
    } catch (error) {
      console.error("Błąd pobierania danych:", error)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  return (
    <div>
      <h2>Lista Samochodów</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <p>Model: {car.model}</p>
            <p>Rok: {car.year}</p>
            <p>Cena: ${car.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CarList
