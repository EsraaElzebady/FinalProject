import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Button from "../Components/UI/Button/Button";

export default function Error() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-0 justify-center h-screen bg-[#FFFFFF]">
        <p className=" text-[200px] font-bold text-black">404</p>
        <p className=" text-3xl mb-5 font-bold text-black">Oops! That page can’t be found.</p>
        <p className=" mb-5 text-[#7E7E7E]">Sorry, but the page you are looking for is not found. Please, make sure you have typed the current URL.</p>
        <Button linkTo={'/'}  buttonText={'Go to home page'} className="mt-18 bg-black hover:bg-[#4E7661] hover text-white w-50  font-semibold text-[16px] p-3 rounded-1xl"> </Button>
        
        </div>   
        <Footer />  
    </div>
  )
}
