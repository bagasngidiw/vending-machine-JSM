import {
    useEffect,
    useState
} from "react";
import {
    API
} from "../lib/api";

export function useProduct() {
    const [product, setProduct] = useState([])

    const fetchData = async () => {
        try {
            const response = await API.get('product')
            setProduct(response.data)
            return response.data;

        } catch (error) {

        }

    }

    const reduceStock = async (productId, currentStock, selectedPrice, nominalAmount) => {

        try {
            const newStock = currentStock - 1
            const changeValue = nominalAmount - selectedPrice;

            await API.patch(`product/${productId}`, {
                stock: newStock
            });

            setProduct((prevProducts) => {
                return prevProducts.map((prod) => {
                    if (prod.id === productId) {
                        return {
                            ...prod,
                            stock: newStock,
                        };
                    }
                    return prod;
                });
            });
            // setChange(changeValue)
            return {changeValue}

        } catch (error) {
            console.log('gagal reduce stock');
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        product,
        reduceStock,
        // change
    }
}