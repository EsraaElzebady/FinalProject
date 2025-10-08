import Button from "../../Components/UI/Button/Button";
import OrderInfo from "./OrderInfo";

export default function Explore() {
  const details = [
    {
      id: 1,
      title: "Intensive Glow C+ Serum",
      description: "NEW COLLECTION",
      buttonText: "Explore Now",
      imageUrl: "public/Home/banner-01.webp", 
      linkTo: "/",
    },
    {
      id: 2,
      title: "25% off Everything",
      description: "Makeup with extended range in colors for every human.",
      buttonText: "Shop Sale",
      imageUrl: "public/Home/banner-02.webp",
      linkTo: "/",
    },
  ];

  return (
    <>
    <div className="flex flex-col md:flex-row py-10 px-10 gap-4 w-full">
      {details.map((item, index) => (
        <div
          key={item.id}
          className="relative flex-1 h-[400px] overflow-hidden group"
        >
          <div
            className={`
              absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out
              transform group-hover:scale-107 
            `}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          ></div>

          <div className="relative z-10 h-full w-full flex  py-10">
            <div className="text-black w-[400px] text-left px-8">
              {index === 0 ? (
                <>
                  <p className="uppercase mb-5">{item.description}</p>
                  <h1 className="text-[48px] md:text-3xl font-bold mb-5">
                    {item.title}
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-[48px] md:text-3xl font-bold mb-5">
                    {item.title}
                  </h1>
                  <p className="mb-8">{item.description}</p>
                </>
              )}
              <Button
                buttonText={item.buttonText}
                buttonWidth="10px 20px"
                linkTo={item.linkTo}
                className="bg-white text-black hover:bg-[var(--primary-color)] hover:text-white transition duration-300 ease-in-out px-8 py-2 mt-5"
              />
            </div>
          </div>
        </div>
      ))}
      </div>
    <OrderInfo />
    </>
  );
}
