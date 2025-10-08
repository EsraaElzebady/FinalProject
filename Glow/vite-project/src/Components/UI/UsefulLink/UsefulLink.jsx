import Links from "../Links/Links";

export default function UsefulLink() {
  return (
    <div className="flex flex-col font-[poppins] p-4 bg-inherit text-[var(--footer-link-color)] ">
        <p className="text-2xl font-normal capitalize mb-5 text-black ">
            useful links
        </p>
        <div className="flex flex-col ">
        <Links link="new-arrival"  linkText='New products'/>
        <Links link="bestseller"    linkText='Best Seller' />
        <Links link="bundleandsave"  linkText="Bundle & save"/>
        <Links link="giftCards"           linkText = "online gift cards"/>
        </div>

     

      
    </div>
  )
}
