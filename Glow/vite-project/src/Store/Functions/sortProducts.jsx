export function sortProducts(products, sortOrder) {
    return [...products].sort((a, b) => {
      const nameA = (a.product_name || "").toLowerCase();
      const nameB = (b.product_name || "").toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }
  