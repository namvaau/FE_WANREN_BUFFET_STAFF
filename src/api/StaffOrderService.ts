// StaffOrderService.ts
import axios from 'axios';
import { StaffOrderDTO } from '../models/Type';

const API_URL = 'http://localhost:8080/api/StaffOrders';

export const StaffOrderService = {
  createOrder: async (orderData: StaffOrderDTO.OrderWithDetailsRequest) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  },
  // Other methods ...
};
