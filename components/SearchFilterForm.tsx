"use client";
import React, { useState, useEffect } from "react";
import { useApi } from "../components/contexts/ApiContext";

interface Filters {
  search?: string;
  supplier?: string;
  quantityGt?: number;
  costPriceLt?: number;
  costPriceGte?: number;
}

// Component for search and filter form
const SearchFilterForm: React.FC = () => {
  const { setFilters } = useApi(); // Accessing setFilters from API context
  const [search, setSearch] = useState<string>(""); // State for search term
  const [supplier, setSupplier] = useState<string>("FragranceNet"); // State for supplier, default set to FragranceNet
  const [quantityGt, setQuantityGt] = useState<number>(0); // State for quantity greater than
  const [costPriceLt, setCostPriceLt] = useState<number>(0); // State for cost price less than
  const [costPriceGte, setCostPriceGte] = useState<number>(0); // State for cost price greater than or equal to

  // Effect to update filters whenever the supplier changes
  useEffect(() => {
    if (setFilters) {
      setFilters({
        ...setFilters,
        supplier: supplier || undefined,
      });
    }
  }, [supplier, setFilters]);

  // Handler for search form submission
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (setFilters) {
      setFilters({
        search: search || undefined,
        supplier: supplier || undefined,
        quantityGt: quantityGt || undefined,
        costPriceLt: costPriceLt || undefined,
        costPriceGte: costPriceGte || undefined,
      });
    }
  };

  // Handler for supplier change
  const handleSupplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSupplier = event.target.value;
    setSupplier(newSupplier);
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-6 gap-4 w-full pb-10 items-center justify-center pt-12">
      <div className="col-span-2">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
        <div className="relative flex items-center">
          <svg
            className="absolute left-3 z-20 hidden w-4 h-4 text-gray-500 pointer-events-none fill-current sm:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
          <input
            id="search"
            type="text"
            className="block w-full bg-white py-2 pl-10 pr-4 leading-normal focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 text-gray-700 rounded-md"
            placeholder="Enter search term"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Supplier</label>
        <select
          id="supplier"
          className="block w-full bg-white py-2 px-4 leading-normal focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 text-gray-700 rounded-md"
          value={supplier}
          onChange={handleSupplierChange}
        >
          <option value="FragranceX">FragranceX</option>
          <option value="FragranceNet">FragranceNet</option>
          <option value="Morris Costumes">Morris Costumes</option>
        </select>
      </div>

      <div>
        <label htmlFor="quantityGt" className="block text-sm font-medium text-gray-700">Quantity Greater</label>
        <input
          id="quantityGt"
          type="number"
          value={quantityGt}
          onChange={(e) => setQuantityGt(Number(e.target.value))}
          className="block w-full bg-white py-2 px-4 leading-normal focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 text-gray-700 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="costPriceLt" className="block text-sm font-medium text-gray-700">Cost Price Less</label>
        <input
          id="costPriceLt"
          type="number"
          value={costPriceLt}
          onChange={(e) => setCostPriceLt(Number(e.target.value))}
          className="block w-full bg-white py-2 px-4 leading-normal focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 text-gray-700 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="costPriceGte" className="block text-sm font-medium text-gray-700">Cost Price Greater</label>
        <input
          id="costPriceGte"
          type="number"
          value={costPriceGte}
          onChange={(e) => setCostPriceGte(Number(e.target.value))}
          className="block w-full bg-white py-2 px-4 leading-normal focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 text-gray-700 rounded-md"
        />
      </div>

      <div className="col-span-6 flex justify-center mt-4">
        <button
          type="submit"
          className="inline-flex w-28 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchFilterForm;
