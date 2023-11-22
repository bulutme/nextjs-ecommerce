const fetchProducts = async (page: number, search?: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products?page=${page}${
        search ? "&query=" + search : ""
      }`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { fetchProducts };
