import React from "react";
import { ApiContextProvider } from "../components/contexts/ApiContext";
import SearchFilterForm from "../components/SearchFilterForm";
import ProductTable from "../components/ProductTable";
const Home: React.FC = () => {
  return (
    
    <main className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Product Catalog</h1>
      <div className="hidden md:block"> {/* Hide on mobile, show on desktop */}
        <SearchFilterForm />
        <ProductTable />
      </div>
      <div className="md:hidden h-[80vh] flex items-center justify-center text-center"> {/* Show on mobile, hide on desktop */}
        <p className="text-lg text-gray-600 mt-6">Please view on desktop for full functionality.</p>
      </div>
    </main>
  );
};

export default Home;