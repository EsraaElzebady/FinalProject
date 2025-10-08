import Button from "../../Components/UI/Button/Button";

export default function MoreSection() {
  const moreDetails = [
    {
      id: 1,
      title: "Summer Collection",
      imageUrl: "public/Home/image-box-01.webp",
      buttonText: "Shop Now",
      linkTo: "/shop",
    },
    {
      id: 2,
      title: "From Our Blog",
      imageUrl: "public/Home/image-box-02.webp",
        buttonText: "Read More",
      linkTo: "/blog",
    },
  ];

  return (
    <div className="flex flex-col justify-center text-center py-10">
      <h1 className="text-3xl font-bold mb-2">More to Discover</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Our bundles were designed to conveniently package your tanning essentials while saving you money.
      </p>

      <div className="flex flex-col md:flex-row py-10 px-10 gap-6">
        {moreDetails.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-4 w-full md:w-1/2"
          >
            <div className="h-[400px] w-full overflow-hidden  group">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            </div>

            <h1 className="text-[24px] md:text-3xl font-bold text-black mt-4">
              {item.title}
            </h1>

            <Button buttonText={item.buttonText} linkTo={item.linkTo} />
          </div>
        ))}
      </div>
    </div>
  );
}
