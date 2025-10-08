export default function OrderInfo() {
    const informations = [
        {
            id: 1,
            title: "Free Shipping",
            description: "Free Shipping for orders over $130",
            iconUrl: "public/Home/icon-box-01.svg"
        },
        {
            id: 2,
            title: "Returns",
            description: "Within 30 days for an exchange.",
            iconUrl: "public/Home/icon-box-02.svg"
        },
        {
            id: 3,
            title: "Online Support",
            description: "24 hours a day, 7 days a week",
            iconUrl: "public/Home/icon-box-03.svg"
        },
        {
            id: 4,
            title: "Flexible Payment",
            description: "Pay with Multiple Credit Cards",
            iconUrl: "public/Home/icon-box-04.svg"
        }
    ]
  return (
    <div className="p-10 pb-20 grid grid-cols-4 gap-4 ">
        {informations.map(info => (
            <div key={info.id} className="flex flex-col text-center items-center gap-4">
                <img src={info.iconUrl} alt={info.title} className="w-16 h-16"/>
                <div>
                    <h3 className="font-[600] text-lg mb-3">{info.title}</h3>
                    <p className="text-muted ">{info.description}</p>
                </div>
            </div>
        ))}
      
    </div>
  )
}
