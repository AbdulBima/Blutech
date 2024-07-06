"use client";
import React, { useContext, useState } from "react";
import { ApiContext } from "../components/contexts/ApiContext";
import Image from "next/image";

// Component to render a table of products
const ProductTable: React.FC = () => {
  // Accessing the API context
  const apiContext = useContext(ApiContext);

  // State to manage selected products via checkboxes
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: boolean }>({});

  // Early return if the API context is not found
  if (!apiContext) {
    return <p>Error: ApiContext not found.</p>;
  }

  // Destructuring products, loading, and error from the API context
  const { products, loading, error } = apiContext;

  // Loading state handling
  if (loading) {
    return (
      <div className="w-[90vw] flex justify-center items-center">
        <div className="ping"></div>
      </div>
    );
  }

  // Error state handling
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Handler for checkbox changes
  const handleCheckboxChange = (sku: string | number) => {
    setSelectedProducts((prevSelected) => ({
      ...prevSelected,
      [sku]: !prevSelected[sku],
    }));
  };

  // Function to truncate long descriptions
  const truncateDescription = (description: string, maxLength: number): string => {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.substring(0, maxLength)}...`;
  };

  return (
    <div className="overflow-x-auto">
      {products.length > 0 && ( // Render table only if products array has items
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b"></th> {/* Column for checkboxes */}
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Brand</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Size</th>
              <th className="py-2 px-4 border-b">UPC</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.SKU}>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedProducts[product.SKU] || false}
                    onChange={() => handleCheckboxChange(product.SKU)}
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Image src={product.Image_1} alt={product.Title} width={50} height={50} />
                </td>
                <td className="py-2 px-4 border-b">{product.Title}</td>
                <td className="py-2 px-4 border-b">{truncateDescription(product.Description, 50)}</td>
                <td className="py-2 px-4 border-b">{product.Brand}</td>
                <td className="py-2 px-4 border-b">${product["Cost Price"]}</td> {/* Access with correct key */}
                <td className="py-2 px-4 border-b">{product.Quantity}</td>
                <td className="py-2 px-4 border-b">{product.size}</td>
                <td className="py-2 px-4 border-b">{product.UPC}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
