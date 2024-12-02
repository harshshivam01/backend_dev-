import  { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/product/all");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-between items-center ">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-300 rounded-md p-4 w-64 text-center justify-stretch"
         
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <span className="text-lg text-left mt-2 font-semibold">{product.name}</span>
          <p className="text-sm text-left mt-2 text-gray-500">{product.description}</p>
          <p className="text-lg text-left mt-2 font-bold"><strong>Price:</strong> ${product.price}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
