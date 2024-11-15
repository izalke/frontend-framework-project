import { Routes, Route, Link } from "react-router-dom"
import CarList from "./api/CarList"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/cars" element={<CarList />} />
      </Routes>
    </div>
  )
}

export default App
