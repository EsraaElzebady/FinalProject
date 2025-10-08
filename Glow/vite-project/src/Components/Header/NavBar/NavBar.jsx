import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../UI/Logo/Logo";
import SearchIcon from "../../UI/Search/SearchIcon";
import CartIcon from "../../UI/CartIcon/CartIcon";
import WislistIcon from "../../UI/WishlistIcon/WishlistIcon";
import Account from "../../UI/Account/Account";
import NavLink from "./NavLink.jsx/NavLink";
import { useWishlistStore } from "../../../Store/useWishlistStore";
import { useCartStore } from "../../../Store/useCartStore";
import Badge from "./Badge";
import SearchOffcanvas from "../../FilterOffcanvas/SearchOffcanvas";

export default function Navbar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const wishlistCount = useWishlistStore((state) => state.wishlistCount);
  const cartCount = useCartStore((state) => state.cartCount);

  useEffect(() => {
    fetchWishlist();
    fetchCart();
  }, [fetchWishlist, fetchCart]);

  return (
<nav className="bg-white sticky top-0 z-50 shadow-sm">
  <div className="max-w-8xl mx-auto px-4 py-3 grid grid-cols-3 items-center">
    {/* Left: Hamburger + Desktop Nav */}
    <div className="flex items-center gap-4">
      {/* Mobile Hamburger */}
      <button
        className="lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Nav */}
      <div className="hidden lg:flex gap-4 uppercase text-sm w-full font-semibold">
        <NavLink linkText="home" ref="/" />
        <NavLink linkText="shop" ref="/shop" />
        <NavLink linkText="contact " ref="/contact" />
        <NavLink linkText="about " ref="/about" />
        <NavLink linkText="blog" ref="/blog" />
        <NavLink linkText="profile" ref="/profile" />

        {/* More dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className="flex uppercase items-center"
          >
            more
            <ChevronDown className="ml-1 w-4 h-4" />
          </button>
          <AnimatePresence>
            {isMoreOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg"
              >
                <a href="/faq" className="block px-4 py-2 hover:bg-gray-100">
                  FAQ
                </a>
                <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                  Start a Fin
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>

    {/* Center: Logo */}
    <div className="flex justify-center">
      <Logo widthFit={180} />
    </div>

    {/* Right: Icons */}
    <div className="flex items-center justify-end gap-4">
      <div>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <SearchIcon />
        </button>
        <SearchOffcanvas
          isSearchOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>

      <Link to="/profile">
        <Account />
      </Link>

      <div className="relative">
        <Link to="/wishlist">
          <WislistIcon />
        </Link>
        <Badge className="top-[-1px] right-[4px]" count={wishlistCount} />
      </div>

      <div className="relative">
        <Link to="/cart">
          <CartIcon />
        </Link>
        <Badge className="top-[-4px] right-[-6px]" count={cartCount} />
      </div>
    </div>
  </div>

  {/* Mobile Offcanvas stays the same */}
  <AnimatePresence>
    {isMobileOpen && (
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 p-6 flex flex-col gap-6 uppercase font-semibold"
      >
        <div className="flex justify-between items-center mb-6">
          <Logo widthFit={140} />
          <button onClick={() => setIsMobileOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <NavLink linkText="home" ref="/" />
        <NavLink linkText="shop" ref="/shop" />
        <NavLink linkText="contact us" ref="/contact" />
        <NavLink linkText="about us" ref="/about" />
        <NavLink linkText="blog" ref="/blog" />
        <NavLink linkText="profile" ref="/profile" />
      </motion.div>
    )}
  </AnimatePresence>
</nav>

  );
}
