import React, { useEffect, useState } from "react";
import "../assets/css/checkout_for_staff.css";
import { getAllOrderDetailsByOrderId, getOrderDetailWithNameProduct, getTableNumberByOrderId } from "../../../api/orderForStaffApi";
import OrderDetailModel from "../../../models/OrderDetaitModel";
import OrderDetailsWithNameProduct from "../../../models/OrderDetailsWithNameProduct";

const Checkout1: React.FC = () => {
    // const [orderId, setOrderId] = useState(localStorage.getItem('orderId'));
    const [orderId, setOrderId] = useState(2);
    const [error, setError] = useState<string | null>(null);
    const [orderTableNum, setOrderTableNum] = useState<number>(0);
    const [orderDetails, setOrderDetails] = useState<OrderDetailsWithNameProduct[]>([]);

    useEffect(() => {
        const loadOrderDetails = async () => {
            try {
                const fetchedOrderDetails = await getOrderDetailWithNameProduct(orderId);
                setOrderDetails(fetchedOrderDetails);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orderDetails';
                setError(errorMessage);
            }
        };

        const loadTableNum = async () => {
            try {
                const fetchedTableNum = await getTableNumberByOrderId(orderId);
                setOrderTableNum(fetchedTableNum);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tablenumber';
                setError(errorMessage);
            }
        };

        
        loadTableNum();
        loadOrderDetails();
    }, []);

    return(
        <div className="ps36231-checkout-staff-1">
        <div className="call-staff">
            <div className="d-flex justify-content-between align-items-center">
                <div className="turn-back">
                    <a href="">Quay lại</a>
                </div>

                <div className="call-staff-inner">
                    <i className="bi bi-bell-fill"></i>
                    Gọi nhân viên
                </div>
                <div className="turn-dashboard"><a href=""><i className="bi bi-arrow-counterclockwise"></i> Về trang chủ</a></div>
            </div>
        </div>
        <div>
            <div>
                <h2 className="title-table">Bàn số {orderTableNum} | Xác nhận kiểm đồ</h2>
            </div>
            <div className="container-table">
                <div>
                    <table className="all-sp">
                        <thead>
                            <th>Tên món</th>
                            <th>Số lượng</th>
                        </thead>
                        {orderDetails.map((orderDetail, index) => (
                            <tr key={index}>
                                <td>{orderDetail.productName}</td>
                                <td>{orderDetail.quantity}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <div className="container-method-checkout">

            </div>
            <div className="container-button">
                <a href="/checkout/2">Tiếp tục</a>
            </div>
        </div>
        <div className="step-checkout">
            <div>
                <a href="/checkout/1">1</a>
                <a href="/checkout/2">2</a>
                <a href="/checkout/3">3</a>
            </div>
        </div>
    </div>
    );
};

export default Checkout1;
