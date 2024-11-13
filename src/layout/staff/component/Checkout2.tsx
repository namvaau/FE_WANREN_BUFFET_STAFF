import React from "react";
import "../assets/css/checkout_for_staff.css";

const Checkout2: React.FC = () => {
    return(
        <div className="ps36231-checkout-staff-1">
        <div className="call-staff">
            <div className="d-flex justify-content-between align-items-center">
                <div className="turn-back"><a href="">Quay lại</a></div>
                <div className="call-staff-inner">
                    <i className="bi bi-bell-fill"></i>
                    Gọi nhân viên
                </div>
                <div className="turn-dashboard"><a href=""><i className="bi bi-arrow-counterclockwise"></i> Về trang chủ</a></div>
            </div>
        </div>
        <div>
            <div>
                <h2 className="title-table">Nhập số điện thoại để nhận tích điểm</h2>
            </div>
            <div className="container-table">
                <div>
                    <input type="tel" placeholder="Nhập số điện thoại"/>
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

export default Checkout2;