
export const fetchAllProducts = async () => {
    try {
        const response = await fetch('http://192.168.1.10:8080/api/v1/products');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
