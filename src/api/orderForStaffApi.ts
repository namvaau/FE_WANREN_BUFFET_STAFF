import React from "react";
import axios from "axios";

const getAllOrderDetailsByOrderId = async(orderId: any) => {
    try {
        const response = await axios.get(`http://localhost:8080/Orders/${orderId}/orderDetails`);
        const listResponse = await response;
        return listResponse;
    } catch (error) {
        console.error(error, "Cannot log all orderDetail by orderId");
    }
}

const getTableNumberByOrderId = async(orderId: any) => {
    try {
        const response = await axios.get(`http://localhost:8080/Orders/${orderId}/tablee`);
        const tableNumber = response.data.tableNumber;
        return tableNumber;
    } catch (error) {
        console.error(error, "Cannot log the number of table")
    }
}

const orderForStaffService = {
    getAllOrderDetailsByOrderId,
    getTableNumberByOrderId
}

export default orderForStaffService;