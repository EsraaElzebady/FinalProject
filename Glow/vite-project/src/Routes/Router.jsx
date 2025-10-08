import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "../Error/Error";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Services from "../Pages/Services/Services";
import Faq from "../Pages/Faq/Faq";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import MainLayOut from "../MainLayOut/MainLayOut";
import FindAStore from "../Pages/FindAStore/FindAStore";
import Shop from "../Pages/Shop/Shop";
import Blog from "../Pages/Blog/Blog";
import SingleNewPage from "../Pages/Blog/SingleNewPage";
import SingleProductShop from "../Pages/Shop/SingleProductShop";
import BestSeller from "../Pages/ProductCategories/BestSeller/BestSeller";
import Under25$ from "../Pages/ProductCategories/Under 25$/Under25$";
import Under40$ from "../Pages/ProductCategories/Under 40$/under40$";
import BeautyAndCosmetics from "../Pages/ProductCategories/Beauty & cosmetics/BeautyAndCosmetics";
import BodyCare from "../Pages/ProductCategories/Body Care/BodyCare";
import Cheek from "../Pages/ProductCategories/Cheek/Cheek";
import Cleanser from "../Pages/ProductCategories/Cleanser/Cleanser";
import EyeCare from "../Pages/ProductCategories/Eye Care/EyeCare";
import HairSpray from "../Pages/ProductCategories/Hair Spray/HairSpray";
import HairOil from "../Pages/ProductCategories/HairOil/HairOil";
import Lip from "../Pages/ProductCategories/Lip/Lip";
import NewArrival from "../Pages/ProductCategories/New Arrival/NewArrival";
import Moisturizing from "../Pages/ProductCategories/Moisturizing/Moisturizing";
import CartPage from "../Pages/Cart/CartPage";
import WishList from "../Pages/WishList";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfilePage from "../Pages/Profile/Profile";
import MakeUp from "../Pages/Blog/MakeUP.JSX";
import CheckOut from "../Pages/Home/Checkout/CheckOut";
import CheckoutForm from "../Pages/Home/Checkout/CheckoutForm.JSX";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut />} errorElement={<Error />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="faq" element={<Faq />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="findastore" element={<FindAStore />} />

          {/* Shop */}
          <Route path="shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<SingleProductShop />} />

          {/* Blog */}
          <Route path="blog" element={<Blog />} />
          <Route path="/blog/:name" element={<MakeUp  />} />
          <Route path="/blog/:name/:slug" element={<SingleNewPage />} />

          {/* Blog categories */}
          {/* <Route path="cosmetics" element={<MakeUp name="Cosmetics" />} />
          <Route path="make-up" element={<MakeUp name="Make Up" />} />
          <Route path="organic" element={<MakeUp name="Organic" />} />
          <Route
            path="natural-cleansers"
            element={<MakeUp name="Natural cleansers" />}
          /> */}

          {/* Categories */}
          <Route path="best-seller" element={<BestSeller />} />
          <Route path="under25$" element={<Under25$ />} />
          <Route path="treatment" element={<Under40$ />} />
          <Route path="beauty&cosmetics" element={<BeautyAndCosmetics />} />
          <Route path="bodycare" element={<BodyCare />} />
          <Route path="cheek" element={<Cheek />} />
          <Route path="cleanser" element={<Cleanser />} />
          <Route path="eyecare" element={<EyeCare />} />
          <Route path="new-arrival" element={<NewArrival />} />
          <Route path="hairspray" element={<HairSpray />} />
          <Route path="hairoil" element={<HairOil />} />
          <Route path="lip" element={<Lip />} />
          <Route path="moisturizing" element={<Moisturizing />} />
          <Route path="checkout" element={<CheckoutForm  />} />


          {/* Protected routes */}
          <Route
            path="cart"
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoutes>
                <WishList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoutes>
                <ProfilePage />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
