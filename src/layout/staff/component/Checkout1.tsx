import React, { useState } from "react";
import "../assets/css/checkout_for_staff.css";
import orderForStaffService from "../../../api/orderForStaffApi";

const Checkout1: React.FC = () => {
    const [orderId, setOrderId] = useState<string | null>(localStorage.getItem('orderId'));
    const [orderTableNum, setOrderTableNum] = useState<string | null>('');
    const [orderDetails, setOrderDetails] = useState<[]>()
    const getOrderDetail = async (id: any) => {
        const orderDetailsResponse = await orderForStaffService.getAllOrderDetailsByOrderId(id);
        setOrderDetails(orderDetailsResponse?.data);
        const orderTableNumResponse = await orderForStaffService.getTableNumberByOrderId(id);
        setOrderTableNum(orderTableNumResponse)
    }

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
                <h2 className="title-table">Bàn 18 | Xác nhận kiểm đồ</h2>
            </div>
            <div className="container-table">
                <div>
                    <table className="all-sp">
                        <thead>
                            <th>Tên món</th>
                            <th>Số lượng</th>
                        </thead>
                        <tr>
                            <td>Suất Buffet Tiêu Chuẩn_NL (C)</td>
                            <td>1.0</td>
                        </tr>
                        <tr>
                            <td>Khăn lạnh</td>
                            <td>2.0</td>
                        </tr>
                        <tr>
                            <td>Suất Buffet nước ngọt</td>
                            <td>1.0</td>
                        </tr>
                        <tr>
                            <td>Suất Buffet nước ngọt</td>
                            <td>1.0</td>
                        </tr>
                        <tr>
                            <td>Suất Buffet nước ngọt</td>
                            <td>1.0</td>
                        </tr>
                        <tr>
                            <td>Suất Buffet nước ngọt</td>
                            <td>1.0</td>
                        </tr>
                        <tr>
                            <td>Suất Buffet nước ngọt</td>
                            <td>1.0</td>
                        </tr>
                        <tr>
                            <td>Suất Buffet nước ngọt</td>
                            <td>1.0</td>
                        </tr>
                        <tr>
                            <td>Suất Buffet nước ngọt</td>
                            <td>1.0</td>
                        </tr>
                        <tr>
                            <td>Suất Buffet nước ngọt</td>
                            <td>1.0</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="container-method-checkout">

            </div>
            <div className="container-button">
                <a href="">Tiếp tục</a>
            </div>
        </div>
        <div className="step-checkout">
            <div>
                <a href="checkout_for_staff_1.html">1</a>
                <a href="checkout_for_staff_2.html">2</a>
                <a href="checkout_for_staff_3.html">3</a>
            </div>
        </div>
    </div>
    );
};

export default Checkout1;
