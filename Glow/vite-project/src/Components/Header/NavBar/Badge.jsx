export default function Badge({ className, count }) {
  return (
    <div
      className={`absolute flex items-center justify-center
                  w-[18px] h-[18px] text-white text-[12px] 
                  rounded-full bg-black ${className}`}
    >
      {count ?? 0}
    </div>
  );
}
