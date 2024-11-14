import React, { useEffect, useState } from "react";
import "../assets/css/checkout_for_staff.css";
import OrderDetailsWithNameProduct from "../../../models/OrderDetailsWithNameProduct";
import { getOrderAmount, getOrderDetailWithNameProduct } from "../../../api/orderForStaffApi";

const Checkout3: React.FC = () => {
    const [orderId, setOrderId] = useState(2);
    const [error, setError] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [vat, setVat] = useState<number>(0);
    const [lastAmount, setLastAmount] = useState<number>(0);
    const [choicePayment, setChoicePayment] = useState<string | undefined>(undefined);
    const [orderDetails, setOrderDetails] = useState<OrderDetailsWithNameProduct[]>([]);

    const borderStyle:React.CSSProperties = {
        border: "2px solid blue"
    }

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

        const getAmount = async () =>{
            try {
                const amountOfRs = await getOrderAmount(orderId);
                setAmount(amountOfRs);
                setVat((amountOfRs * 10)/100);
                setLastAmount(amountOfRs - (amountOfRs * 10)/100);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to get amount';
                setError(errorMessage);
            }
        }

        getAmount();
        loadOrderDetails();
    }, []);

    const choiceClick = (event: React.MouseEvent<HTMLDivElement>) =>{
        const divId = event.currentTarget.dataset.id;
        setChoicePayment(divId);
    }

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
                        {orderDetails.map((orderDetail, index) => (
                            <tr key={index}>
                                <td>{orderDetail.quantity + " x " + orderDetail.productName}</td>
                                <td>{orderDetail.price + " đ"}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Tổng tiền hàng</td>
                            <td>{amount + " đ"}</td>
                        </tr>
                        <tr>
                            <td>VAT</td>
                            <td>{vat + " đ"}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="container-price-all-sp">
                <div>
                    <table className="price-all-sp">
                        <thead>
                            <th>Tổng tiền cần thanh toán</th>
                            <th>{lastAmount + " đ"}</th>
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
                        <div data-id="1" onClick={choiceClick} className={choicePayment === '1' ? 'selected' : ''}>   
                            <div className="control-img">
                                <img src="https://developers.momo.vn/v3/assets/images/icon-52bd5808cecdb1970e1aeec3c31a3ee1.png" alt=""/>
                            </div>
                        </div>
                        <div data-id="2" onClick={choiceClick} className={choicePayment === '2' ? 'selected' : ''}>   
                            <div className="control-img">
                                <img src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg" alt=""/>
                            </div>
                        </div>
                        <div data-id="3" onClick={choiceClick} className={choicePayment === '3' ? 'selected' : ''}>   
                            <div className="control-img">
                                <img src="https://static.vecteezy.com/system/resources/previews/004/309/804/non_2x/stack-bills-money-cash-isolated-icon-free-vector.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-button">
                <a href="">Thanh toán</a>
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

export default Checkout3;