import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./assets/theme"
import "./App.css"
import Layout from "./lib/Layout"

// views
// import Home from "./views/Home"
// import NotFound from "./views/NotFound"
// import About from "./views/About"
// import Market from "./views/Market"
// import Contact from "./views/Contact"

// Define router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <NotFound />,
    children: [
      // {
      //   path: "",
      //   element: <Home />,
      // },
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
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
