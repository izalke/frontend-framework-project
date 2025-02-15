import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./assets/theme"
import "./App.css"
import Layout from "./lib/Layout"
import Gallery from "./views/Gallery"
import Auctions from "./views/Auctions/Auctions"
import AuctionDetails from "./views/Auctions/AuctionDetails"
import AddCar from "./views/AddCar"
import Chat from "./views/Chat"
import Auth from "./views/Auth"
import { AuthProvider } from "./AuthContext"
import ProtectedRoute from "./views/Auth/ProtectedRoute"
import UpdateAuction from "./views/Auctions/UpdateAuction"

// views
import Home from "./views/Home"
import NotFound from "./views/NotFound"
// import About from "./views/About"
// import Market from "./views/Market"
// import Contact from "./views/Contact"

// Define router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "auctions",
        element: <Auctions />,
      },
      {
        path: "auctions/:id",
        element: <AuctionDetails />,
      },
      {
        path: "update-auction/:id",
        element: <UpdateAuction />,
      },
      {
        path: "addcar",
        element: (
          <ProtectedRoute>
            <AddCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "chat",
        element: <Chat />,
      },

      // {
      //   path: "about",
      //   element: <About />,
      // },
      // {
      //   path: "market",
      //   element: <Market />,
      // },
      // {
      //   path: "contact",
      //   element: <Contact />,
      // },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
