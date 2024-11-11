import React from 'react';
import { CategoryModel } from '../../../../models/ProductModel';
import '../../assets/css/styles.css'

interface ProductCardProps {
    productId: number;
    productName: string;
    image: string;
    price: number;
    description: string;
    typeFood: string;
    productStatus: string;
    quantity: number;
    category?: CategoryModel;
    onImageClick: () => void; // Only use this for modal opening
}

const ProductCard: React.FC<ProductCardProps> = ({
    productId,
    productName,
    image,
    price,
    description,
    typeFood,
    productStatus,
    quantity,
    category,
    onImageClick
}) => {
    return (
        <div className="col-6 col-md-3">
            <div
                className="card border border-0 p-3 card-custom"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
            >
                <img
                    src={image}
                    className="rounded-3"
                    alt={productName}
                    onClick={onImageClick} // Open modal on image click
                    style={{ cursor: 'pointer' }}
                />
                <div className="card-body p-0">
                    <h5 className="card-title fs-6 m-0 p-0">{productName}</h5>
                </div>
                <div className="mt-4 mb-2 d-flex justify-content-between align-items-center">
                    <h6 className="card__price fw-bold">{price} đ</h6>
                    <div className="input__septer d-flex justify-content-end align-items-center add-to-cart">
                        <button
                            id="increment"
                            type="button"
                            className="btn btn-danger"
                            onClick={onImageClick} // Open modal on button click
                        >
                            <i className="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
