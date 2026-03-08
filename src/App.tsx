import { Outlet } from "react-router-dom"
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer"
import TranslationProvider from "./provider/TranslationProvider"
import { Toaster } from "react-hot-toast"
import MessageNotification from "./features/chat/components/MessageNotification";

function App() {

  return (
    <TranslationProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <MessageNotification />
      <div className="mb-20">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </TranslationProvider>
  )
}

export default App
