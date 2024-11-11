import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProductsByCategory } from '../../../../api/productApi';
import ProductModel from '../../../../models/ProductModel';
import ProductModal from './ProductModal';

interface ProductListProps {
    category: string;
    cartItems: { product: ProductModel; quantity: number; note: string; totalPrice: number }[];
    setCartItems: React.Dispatch<React.SetStateAction<{ product: ProductModel; quantity: number; note: string; totalPrice: number }[]>>;
}

const ProductList: React.FC<ProductListProps> = ({ category, cartItems, setCartItems }) => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await fetchProductsByCategory(category);
                console.log(fetchedProducts)
                setProducts(fetchedProducts);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [category]);

    const handleImageClick = (product: ProductModel) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleAddToCart = (item: {
        product: ProductModel;
        quantity: number;
        note: string;
        totalPrice: number;
    }) => {
        setCartItems((prevItems) => {
            // Tìm sản phẩm với cùng `productId` và `note`
            const itemExists = prevItems.find(
                (cartItem) =>
                    cartItem.product.productId === item.product.productId &&
                    cartItem.note === item.note
            );
    
            if (itemExists) {
                // Nếu sản phẩm và note giống nhau, tăng số lượng và cập nhật tổng giá
                return prevItems.map((cartItem) =>
                    cartItem.product.productId === item.product.productId &&
                    cartItem.note === item.note
                        ? {
                              ...cartItem,
                              quantity: cartItem.quantity + item.quantity,
                              totalPrice: cartItem.totalPrice + item.totalPrice,
                          }
                        : cartItem
                );
            }
    
            // Nếu sản phẩm với `note` khác nhau, thêm mục mới vào giỏ hàng
            return [...prevItems, item];
        });
    
        // Đóng modal sau khi thêm vào giỏ hàng
        setShowModal(false);
    
        // Log hành động vào console để kiểm tra
        console.log(
            `Product ${item.product.productId} added to cart with quantity ${item.quantity}, note: ${item.note}`
        );
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    if (loading) {
        return <div style={{ paddingLeft: '20px' }}>Loading products...</div>;
    }

    if (error) {
        return <div style={{ paddingLeft: '20px' }} className="error">{error}</div>;
    }

    if (products.length === 0) {
        return <div style={{ paddingLeft: '20px' }}>No products available in this category.</div>;
    }

    return (
        <div style={{ margin: '0 18px 18px 18px' }}>
            <div className="content-section">
                <div className="row g-4 mb-5">
                    {products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            productId={product.productId}
                            productName={product.productName}
                            image={product.image}
                            price={product.price}
                            description={product.description || 'No description available'}
                            typeFood={product.typeFood || 'Unknown'}
                            productStatus={product.productStatus || 'Unavailable'}
                            quantity={product.quantity || 0}
                            category={product.category}
                            onImageClick={() => handleImageClick(product)}
                        />
                    ))}
                </div>
            </div>
            {showModal && selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
};

export default ProductList;
