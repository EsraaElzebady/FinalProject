import Head from "./Head/Head";
import NavBar from "./NavBar/NavBar";

export default function Header() {
  return (

  <>
    <Head text="Free shipping on all U.S. orders $50+ "
     textStyle=' w-full lg:flex  lg:justify-center lg:items-center md:text-left leading-[25.4px] font-urbanist font-medium text-[16px] w-full text-white'/>
    <div className="w-full ">
      <NavBar />
    </div>
  </>
  )
}
