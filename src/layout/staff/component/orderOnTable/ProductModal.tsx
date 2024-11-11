import React, { useState } from 'react';
import '../../assets/css/product_detail.css';
import ProductModel from '../../../../models/ProductModel';

interface ProductModalProps {
    product: ProductModel;
    onClose: () => void;
    onAddToCart: (item: {
        product: ProductModel;
        quantity: number;
        note: string;
        totalPrice: number;
    }) => void;
}


const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        const totalPrice = product.price * quantity;
        onAddToCart({
            product,
            quantity,
            note,
            totalPrice,
        });
    };

    return (
        <div className="ps36231 modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="container-modal">
                        <div className="container-modal-header">
                            <div className="control-img">
                                <img src={product.image} alt={product.productName} className="rounded" />
                                <div className="container-button d-grid place-item-center">
                                    <button type="button" className="btn-close" onClick={onClose}></button>
                                </div>
                            </div>
                        </div>
                        <div className="container-modal-footer">
                            <div className="name-item fw-bold">{product.productName}</div>
                            <div className="note pt-2">
                                <textarea
                                    className="form-control no-border"
                                    aria-label="With textarea"
                                    placeholder="Ghi chú"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="container-price-quantity mt-3">
                                <div className="price-quantity">
                                    <div className="price fw-bold">
                                        <span>Giá: {product.price.toLocaleString()} ₫</span>
                                    </div>
                                    <div className="quantity-control d-flex align-items-center pt-2">
                                        <button id="increment" className="btn btn-primary btn-sm" onClick={handleDecrease}>
                                            <i className="bi bi-dash-lg"></i>
                                        </button>
                                        <span className="mx-3 fs-5 text-dark">{quantity}</span>
                                        <button id="increment" className="btn btn-primary btn-sm" onClick={handleIncrease}>
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="control-btn-add-to-cart mt-4 d-grid">
                                    <button  className="btn btn-primary" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>
    );
};

export default ProductModal;
