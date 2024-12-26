import React from "react"
import { Link } from "react-router-dom"
import { Wrapper } from "./notfoundElements"

const NotFound: React.FC = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <p>
        Looks like the page you were looking for doesn't exist. Take a journey
        of our website by clicking the button below or take a look for all
        available pages by following this.
      </p>
      <Link to="/">Take me back</Link>
    </Wrapper>
  )
}

export default NotFound
