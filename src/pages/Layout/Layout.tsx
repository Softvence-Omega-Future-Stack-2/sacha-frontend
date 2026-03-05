import Navbar from '../../components/Layout/Navbar'
import Footer from '../../components/Layout/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout