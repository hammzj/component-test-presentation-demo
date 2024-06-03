import axios from "axios";

const api = axios.create();

export const getProducts = async (type: string) => {
    if (!type) type = 'empty'
    const response = await api.get(`/products/${type}-products.json`);
    if (response.status < 200 || response.status > 299) {
        console.error(response);
    }
    return response.data;
}
