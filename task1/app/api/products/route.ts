import data from "@/products.json";

interface ProductData {
    id: number;
    name: string;
    price: number;
    description: string;
}

export async function GET(request: Request) {

    const newData: ProductData[] = [];
    for (let i = 0; i < data.items.length; i++) {
        newData[i] = {id: i, name: data.items[i].name, price: data.items[i].price, description: data.items[i].description};
    }

    return new Response(JSON.stringify(newData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
