import React from "react";
import "../assets/css/checkout_for_staff.css";

const Checkout3: React.FC = () => {
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
                <h2 className="title-table title-red">Đây là thông tin đơn hàng, bạn chỉ trả tiền khi nhận được PHIẾU THANH TOÁN</h2>
            </div>
            <div className="container-table">
                <div>
                    <table className="all-sp">
                        <tr>
                            <td>1.0 x Suất Buffet Tiêu Chuẩn_NL (C)</td>
                            <td>329.000 đ</td>
                        </tr>
                        <tr>
                            <td>2.0 x Khăn lạnh</td>
                            <td>5.000 đ</td>
                        </tr>
                        <tr>
                            <td>1.0 x Suất Buffet nước ngọt</td>
                            <td>45.000 đ</td>
                        </tr>
                        <tr>
                            <td>1.0 x Suất Buffet nước ngọt</td>
                            <td>45.000 đ</td>
                        </tr>
                        <tr>
                            <td>1.0 x Suất Buffet nước ngọt</td>
                            <td>45.000 đ</td>
                        </tr>
                        <tr>
                            <td>1.0 x Suất Buffet nước ngọt</td>
                            <td>45.000 đ</td>
                        </tr>
                        <tr>
                            <td>Tổng tiền hàng</td>
                            <td>384.000 đ</td>
                        </tr>
                        <tr>
                            <td>VAT</td>
                            <td>34.000 đ</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="container-price-all-sp">
                <div>
                    <table className="price-all-sp">
                        <thead>
                            <th>Tổng tiền cần thanh toán</th>
                            <th>412420 đ</th>
                        </thead>
                    </table>
                </div>
            </div>
            <div className="container-method-checkout">
                <div>
                    <div className="title-all-method-payment">
                        <div><i className="bi bi-wallet-fill"></i></div>
                        <h3>Tất cả các hình thức thanh toán</h3>
                    </div>
                    <div className="all-div-method-payment">
                        <div>   
                            <div className="control-img">
                                <img src="https://developers.momo.vn/v3/assets/images/icon-52bd5808cecdb1970e1aeec3c31a3ee1.png" alt=""/>
                            </div>
                        </div>
                        <div>   
                            <div className="control-img">
                                <img src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg" alt=""/>
                            </div>
                        </div>
                        <div>   
                            <div className="control-img">
                                <img src="https://static.vecteezy.com/system/resources/previews/004/309/804/non_2x/stack-bills-money-cash-isolated-icon-free-vector.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
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

export default Checkout3;