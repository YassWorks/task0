import ProductData from "./types/ProductData";

const Home = async () => {
    // Fetching data from the API
    const data = await fetch("http://localhost:3001/api/products");
    if (!data.ok) {
        throw new Error("Failed to fetch data");
    }

    const products = await data.json();

    return (
        <>
            <div className="py-20 px-10 text-center">Product List</div>
            <ul>
                {products.map((product: ProductData) => {
                    return <li key={product.id} className="py-5 px-10 text-center">
                       <div>{product.name}</div>
                       <div>{product.price}$</div>
                       <div>{product.description}</div>
                       <br />
                    </li>;
                })}
            </ul>
        </>
    );
};

export default Home;
