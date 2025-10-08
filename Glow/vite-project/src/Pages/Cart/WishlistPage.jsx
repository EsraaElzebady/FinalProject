import { useWishlistStore } from "../../Store/useWishlistStore";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  if (wishlist.length === 0) {
    return <p className="p-6">Your wishlist is empty.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.variantid}
            className="border rounded p-4 flex flex-col items-center"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.sku}
                className="w-32 h-32 object-contain mb-3"
              />
            )}
            <p className="font-semibold">{item.sku}</p>
            <p className="text-gray-600">${item.price}</p>

            <button
              onClick={() => removeFromWishlist(item.variantid)}
              className="mt-3 text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
