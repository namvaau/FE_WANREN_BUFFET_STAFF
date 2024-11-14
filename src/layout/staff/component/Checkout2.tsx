import React, { useEffect, useState } from "react";
import "../assets/css/checkout_for_staff.css";
import { getOrderAmount, updateLoyaltyPoint } from "../../../api/orderForStaffApi";

const Checkout2: React.FC = () => {
    const [orderId, setOrderId] = useState(2);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [error1, setError1] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [disable, setDisable] = useState<boolean>(false);

    const styleOfA:React.CSSProperties = {
        marginRight: '10px',
        pointerEvents: disable ? "none" : "auto", // Vô hiệu hóa pointer events nếu bị disable
        backgroundColor: disable ? "gray" : "blue", // Đổi màu nếu disable
        cursor: disable ? "not-allowed" : "pointer",
    }

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    useEffect(() =>{
        const getAmount = async () =>{
            try {
                const amountOfRs = await getOrderAmount(orderId);
                setAmount(amountOfRs);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to get amount';
                setError(errorMessage);
            }
        }

        getAmount();
    }, []);

    const updatePoints = async (phoneNumber:string, amount:number) =>{
        try {
            const messageRs = await updateLoyaltyPoint(phoneNumber, amount);
            setMessage(messageRs);
            if(message === "Tích điểm thành công"){
                alert(message);
                setMessage(null);
                setDisable(true);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to get amount';
            setError1(errorMessage);
        }
    }

    const handleClick = () => {
        try {
            updatePoints(inputValue, amount);
        } catch (error) {
            console.error("Cannot update loyalty point");
        }
    };

    return(
        <div className="ps36231-checkout-staff-1">
        <div className="call-staff">
            <div className="d-flex justify-content-between align-items-center">
                <div className="turn-back"><a href="/checkout/1">Quay lại</a></div>
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
                    <input value={inputValue} onChange={handleChange} type="tel" placeholder="Nhập số điện thoại" disabled={disable}/>
                </div>
            </div>
            <div className="container-method-checkout">

            </div>
            <div className="container-button">
                <button style={styleOfA} onClick={handleClick} disabled={disable} >Áp dụng</button>
                <a href="/checkout/3">Tiếp tục</a>
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

export default Checkout2;