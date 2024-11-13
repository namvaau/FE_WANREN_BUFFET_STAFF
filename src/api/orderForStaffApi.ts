import React from "react";
import axios from "axios";
import { request } from "./Request";
import OrderDetailModel from "../models/OrderDetaitModel";
import OrderDetailsWithNameProduct from "../models/OrderDetailsWithNameProduct";

export async function getAllOrderDetailsByOrderId(orderId: number): Promise<OrderDetailModel[]>{
    const rs: OrderDetailModel[] = [];
    try {
        const data = await request(`http://localhost:8080/Orders/${orderId}/orderDetails`);
        console.log(data._embedded.orderDetails);
        if (data && data._embedded && data._embedded.orderDetails) {
            for (const orderDetail of data._embedded.orderDetails) {
                const orderDetailModel = new OrderDetailModel(
                    orderDetail.orderDetailId,
                    orderDetail.quantity,
                    orderDetail.unitPrice,
                    orderDetail.itemNotes
                );
                rs.push(orderDetailModel);
            }
            return rs;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error, "Cannot log all orderDetail by orderId");
        return [];
    }
}

export async function getTableNumberByOrderId(orderId: number): Promise<number>{
    try {
        const response = await request(`http://localhost:8080/Orders/${orderId}/tablee`);
        const tableNumber = response.tableNumber;
        return tableNumber;
    } catch (error) {
        console.error(error, "Cannot log the number of table")
        return 0;
    }
}

export async function getOrderDetailWithNameProduct(orderId: number): Promise<OrderDetailsWithNameProduct[]> {
    const rs: OrderDetailsWithNameProduct[] = [];
    try{
        const data = await request(`http://localhost:8080/api/orders_detail_staff/get/order_details/with_name/${orderId}`);
        if (data && data.orderDetails) {
            for (const orderDetail of data.orderDetails) {
                const orderDetailModel = new OrderDetailsWithNameProduct(
                    orderDetail.productName,
                    orderDetail.quantity,
                    orderDetail.price
                );
                rs.push(orderDetailModel);
            }
            return rs;
        } else {
            return [];
        }
    }catch(error){
        console.error(error, "Cannot log all orderDetail by orderId");
        return [];
    }
}