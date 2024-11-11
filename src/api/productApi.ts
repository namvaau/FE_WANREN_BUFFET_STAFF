
import ProductModel from "../models/ProductModel";
import { request } from "./Request";


// Get all products
export async function getAllProduct(): Promise<ProductModel[]> {
    const rs: ProductModel[] = [];
    try {
        const data = await request('http://localhost:8080/Product');
        console.log(data._embedded.products)// Đảm bảo đúng endpoint
        if (data && data._embedded && data._embedded.products) {

            for (const product of data._embedded.products) {
                const productModel = new ProductModel(
                    product.productId,
                    product.productName,
                    product.description,
                    product.price,
                    product.typefood, // Đảm bảo truyền đủ tham số
                    product.image,
                    product.quantity,
                    product.productStatus
                );
                rs.push(productModel);
            }

            return rs;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Cannot fetch product list:", error);
        return [];
    }
}



// Get hot products
export async function getProductHot(): Promise<ProductModel[]> {
    try {
        const productIds: number[] = await request('http://localhost:8080/api/product/ProductHot'); // Đảm bảo đúng endpoint
        if (Array.isArray(productIds)) {
            const productPromises = productIds.map(id => request(`http://localhost:8080/Product/${id}`));
            const productsData = await Promise.all(productPromises);

            return productsData.map((product: any) => new ProductModel(

                product.productId,
                product.productName,
                product.description,
                product.price,
                product.typefood,
                product.image,
                product.quantity,
                product.productStatus
            ));
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching hot products:", error);
        return [];
    }
}

export async function fetchProductsByType(typeFood: string): Promise<ProductModel[]> {
    const rs: ProductModel[] = [];
    try {
        const data = await request(`http://localhost:8080/Product/search/findByTypeFood?typeFood=${typeFood}`);
        // Spring Data REST thường trả về dữ liệu trong _embedded
        if (data && data._embedded && data._embedded.products) {
            for (const product of data._embedded.products) {
                const productModel = new ProductModel(
                    product.productId,
                    product.productName,
                    product.description,
                    product.price,
                    product.typefood, // Đảm bảo truyền đủ tham số
                    product.image,
                    product.quantity,
                    product.productStatus
                );
                rs.push(productModel);
            }
            return rs;
        } else {
            return [];
        }
    } catch (error) {
        console.error(`Cannot fetch products of type ${typeFood}:`, error);
        throw error;
    }
}

export async function fetchProductsByCategory(category: string): Promise<ProductModel[]> {
    const rs: ProductModel[] = [];
    try {
        const data = await request(`http://localhost:8080/api/product/by-category?categoryName=${category}`);
        console.log(data)
        if (Array.isArray(data)) {
            for (const product of data) {
                const productModel = new ProductModel(
                    product.productId,
                    product.productName,
                    product.description,
                    product.price,
                    product.typeFood,
                    product.image,
                    product.quantity,
                    product.productStatus,
                    product.category ? product.category.categoryName : 'No Category'  // Lấy categoryName từ API
                );
                rs.push(productModel);
            }
        }
        return rs;
    } catch (error) {
        console.error(`Cannot fetch products of category ${category}:`, error);
        throw error;
    }
}




export async function SearchProduct(foodname: string): Promise<ProductModel[]> {
    const rs: ProductModel[] = [];
    try {
        const data = await request(`http://localhost:8080/Product/search/findByProductNameContaining?productName=${foodname}`);
        // Spring Data REST thường trả về dữ liệu trong _embedded
        if (data && data._embedded && data._embedded.products) {
            for (const product of data._embedded.products) {
                const productModel = new ProductModel(
                    product.productId,
                    product.productName,
                    product.description,
                    product.price,
                    product.typefood, // Đảm bảo truyền đủ tham số
                    product.image,
                    product.quantity,
                    product.productStatus
                );
                rs.push(productModel);
            }

            return rs;
        } else {
            return [];
        }
    } catch (error) {
        console.error(`Cannot fetch products of type ${foodname}:`, error);
        throw error;
    }

    
}


