"use client";

import ProductData from "./types/ProductData";
import { useState, useEffect } from "react";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<ProductData[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/products`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const products = await response.json();
            setProducts(products);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/products?search=${searchQuery}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const products = await response.json();
            setFilteredProducts(products);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="py-20 px-10 text-center text-3xl font-bold">Product List</div>
            <div className="flex justify-center items-center mb-5">
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-10 border-2 border-gray-300 rounded-md p-2"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button
                    className="bg-blue-500 text-white rounded-md p-2 ml-2"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {searchQuery ? (
                <ul>
                    {filteredProducts.map((product: ProductData) => (
                        <li key={product.id} className="py-5 px-10 text-center">
                            <div>{product.name}</div>
                            <div>{product.price}$</div>
                            <div>{product.description}</div>
                            <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    {products.map((product: ProductData) => (
                        <li key={product.id} className="py-5 px-10 text-center">
                            <div>{product.name}</div>
                            <div>{product.price}$</div>
                            <div>{product.description}</div>
                            <br />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Home;
