"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// Interface defining the structure of a product object
interface Product {
  SKU: string | number;
  Title: string;
  Description: string;
  Brand: string;
  Gender: string;
  MSRP: number | null;
  "Cost Price": number; 
  Image_1: string;
  URL: string;
  Quantity: number;
  size: string;
  UPC: number | string | null;
  catalog_time: string;
  supplier: string;
}

// Interface defining the structure of the filters that can be applied to the product list
interface Filters {
  search?: string;
  supplier?: string;
  quantityGt?: number;
  costPriceLt?: number;
  costPriceGte?: number;
}

// Interface defining the structure of the API context
interface ApiContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  setFilters: (filters: Filters) => void;
}

// Create the API context with a default undefined value
export const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Custom hook to use the API context
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiContextProvider");
  }
  return context;
};

// Props type for the ApiContextProvider component
interface ApiContextProviderProps {
  children: ReactNode;
}

// Component to provide the API context to its children
export const ApiContextProvider: React.FC<ApiContextProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ supplier: "FragranceNet" }); // Default supplier set to FragranceNet

  // Effect to fetch products whenever the filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: any = {};

        // Map filter keys to query parameters
        if (filters.search) params.search = filters.search;
        if (filters.supplier) params.supplier = filters.supplier;
        if (filters.quantityGt) params.Quantity_gt = filters.quantityGt;
        if (filters.costPriceLt) params.Cost_Price_lt = filters.costPriceLt;
        if (filters.costPriceGte) params.Cost_Price_gte = filters.costPriceGte;

        // Fetch products from the API
        const response = await axios.get("http://3.88.1.181:8000/products/public/catalog", { params });
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <ApiContext.Provider value={{ products, loading, error, setFilters }}>
      {children}
    </ApiContext.Provider>
  );
};
