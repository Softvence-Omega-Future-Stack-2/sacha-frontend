import { Outlet } from "react-router-dom"
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer"
import TranslationProvider from "./provider/TranslationProvider"

function App() {

  return (
    <TranslationProvider>
      <div className="mb-20">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </TranslationProvider>
  )
}

export default App
