import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'
import Navbar from './components/Navbar'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Home</h1>
      <p>
        Lebron the goat
      </p>
    </>
  )
}

export default Home
