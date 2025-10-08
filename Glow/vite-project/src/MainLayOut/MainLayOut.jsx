import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import { Outlet, useLocation } from 'react-router'

export default function MainLyOut() {
  const myLocation = useLocation()
  const checkout = myLocation.pathname == "/checkout"
  return (
    <div className="">
      <Header />
      <Outlet />
      {!checkout &&
      <Footer />
      }
    </div>
  )
}
