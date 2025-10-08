export default function Prand() {
    const PrandInfo = [
      {
        id: 1,
        imgUrl: "public/Home/featured-box-03.png",
        info: "“ Also the customer service is phenomenal. I would purchase again.”",
      },
      {
        id: 2,
        imgUrl: "public/Home/featured-box-02.png",
        info: "“Great product line. Very attentive staff to deal with.”",
      },
      {
        id: 3,
        imgUrl: "public/Home/featured-box-01.png",
        info: '"Are you looking to upgrade your beauty at an affordable price? Look no further than e.Space"',
      },
    ];
  
    return (
      <div className="bg-[#EDF1F0] flex flex-col gap-6 items-center justify-center p-10 py-20 rounded-lg">
        <h1 className="text-[36px]">As seen in</h1>
        <div className="grid grid-cols-3 items-center gap-20">
          {PrandInfo.map((prand, index) => (
            <div key={prand.id} className={`flex flex-col items-center gap-4  ${
                  index === PrandInfo.length - 1 ? "pb-3" : ""
                }`}>
              <img
                src={prand.imgUrl}
                alt={`prand-${prand.id}`}
                className={`w-40 mb-2 h-20 object-contain ${
                    index === PrandInfo.length - 1 ? "mt-12 " : ""
                  } `}
              />
              <p
                className={`text-center italic text-lg font-[500] text-black `}
              >
                {prand.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  