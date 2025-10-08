import { API_URL } from "../../Data/Data";

export const getImageUrl = (imgObj) => {
    if (!imgObj) return "/placeholder.png";
    if (imgObj.formats?.medium?.url) return `${API_URL}${imgObj.formats.medium.url}`;
    if (imgObj.formats?.small?.url) return `${API_URL}${imgObj.formats.small.url}`;
    return `${API_URL}${imgObj.url}`;
  };

  export const getVariantArray = (product) => {
    if (!product) return [];
    const maybe = product.VariantProduct;
  
    if (!maybe) return [];
  
    // ✅ Case 1: it's already an array
    if (Array.isArray(maybe)) return maybe;
  
    // ✅ Case 2: Strapi relation style: { data: [] }
    if (maybe?.data && Array.isArray(maybe.data)) return maybe.data;
  
    return [];
  };
  export const normalizeColor = (c) => {
    if (!c) return null;
    return c.trim().toLowerCase();
  };
  export const extractColorFromVariant = (variant) => {
      if (!variant) return null;
  
      // simple string
      if (typeof variant.color === "string") return normalizeColor(variant.color);
  
      // Strapi nested structure
      if (variant.color?.data?.attributes?.name) {
        return normalizeColor(variant.color.data.attributes.name);
      }
  
      // fallback object
      if (variant.color && typeof variant.color === "object") {
        const nested = variant.color;
        return normalizeColor(
          nested?.name || nested?.value || nested?.hex || nested?.color || nested?.label || ""
        );
      }
  
      return null;
    };

    export const normalizeVariants = (arr = []) => {
      return arr.map((v) => ({
        variantid: v.id,
        size: v.Product_size,
        color: v.color?.trim(),
        scent: v.scent?.trim(),
        price: v.price,
        image: v.product_img?.data?.attributes?.url
          ? `${API_URL}${v.product_img.data.attributes.url}`
          : v.product_img?.url
          ? `${API_URL}${v.product_img.url}`
          : null,
        stock: v.stock,
        sku: v.sku,
        brand: v.brand?.trim(),
        brand_image: v.brand_image?.data?.attributes?.url
          ? `${API_URL}${v.brand_image.data.attributes.url}`
          : v.brand_image?.url
          ? `${API_URL}${v.brand_image.url}`
          : null,
      }));
    };
    // src/Store/useWishlistStore.js
export const getUserId = () => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    // Decode JWT payload to get user id
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || null;
  } catch (err) {
    console.error("❌ Error getting userId from token:", err);
    return null;
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};
export function extractVariantOptions(restoredVariants) {
  const sizes = [...new Set(restoredVariants.map(v => v.size).filter(Boolean))];

  const colors = [...new Set(
    restoredVariants.map(v => v.color?.toLowerCase()).filter(Boolean)
  )];

  const scents = [...new Set(restoredVariants.map(v => v.scent).filter(Boolean))];

  const brands = Array.from(
    new Map(
      restoredVariants
        .filter(v => v.brand)
        .map(v => [v.brand.toLowerCase(), { name: v.brand, image: v.brand_image }])
    ).values()
  );
   const defaults = {
      size: sizes[0] || null,
      color: colors[0] || null,
      scent: scents[0] || null,
      brand: brands[0]?.name || null,
    };



  return { sizes, colors, scents, brands , defaults };
}
