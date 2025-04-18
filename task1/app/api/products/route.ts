import data from "@/products.json";
import ProductData from "@/app/types/ProductData";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";

    const newData: ProductData[] = data.items.map((item, i) => ({
        id: i,
        name: item.name,
        price: item.price,
        description: item.description,
    }));

    if (search.trim() === "") {
        return new Response(JSON.stringify(newData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    const filteredData = newData.filter((product: ProductData) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return new Response(JSON.stringify(filteredData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}