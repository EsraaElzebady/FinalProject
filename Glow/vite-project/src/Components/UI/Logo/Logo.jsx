export default function Logo({ widthFit }) {
  return (
    <div className="flex justify-center" >
      <img 
        src="/logo-dark.png"  
        alt="glowing-img"
        style={{ width: widthFit, height: "auto" }} 
      />
    </div>
  );
}
