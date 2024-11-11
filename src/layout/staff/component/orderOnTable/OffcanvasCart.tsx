import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import ProductModel from '../../../../models/ProductModel';
import '../../assets/css/menu.css';
import { useNavigate, useParams } from 'react-router-dom';

interface OffcanvasCartProps {
  show: boolean;
  onHide: () => void;
  cartItems: { product: ProductModel; quantity: number; note: string }[];
  onConfirmOrder: (items: { product: ProductModel; quantity: number; note: string }[]) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onUpdateSubtotal: (subtotal: number) => void;
}

const OffcanvasCart: React.FC<OffcanvasCartProps> = ({ show, onHide, cartItems, onConfirmOrder, onUpdateQuantity, onRemoveItem, onUpdateSubtotal }) => {
  const navigate = useNavigate();
  const { tableId } = useParams<{ tableId: string }>();
  const [selectedItems, setSelectedItems] = useState<{ product: ProductModel; quantity: number; note: string }[]>([]);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const selectedItemsSubtotal = selectedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const selectedItemsTax = selectedItemsSubtotal * 0.08;
  const selectedItemsTotal = selectedItemsSubtotal + selectedItemsTax;


  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        let orderId = localStorage.getItem(`orderId-${tableId}`);
        console.log(orderId);

        // Check if orderId exists in localStorage and fetch from backend
        if (!orderId) {
          console.log('No order found for this table');
          // Fetch orderId from the backend using tableId
          const orderCheckResponse = await fetch(`http://localhost:8080/api/order_staff/findOrderIdByTableId/${tableId}`);
          
          if (!orderCheckResponse.ok) {
            throw new Error('Error fetching orderId from backend');
          }

          const orderCheckData = await orderCheckResponse.json();

          if (orderCheckData.orderId) {
            // If an orderId exists, store it in localStorage
            const orderId = orderCheckData.orderId;
            localStorage.setItem(`orderId-${tableId}`, orderId);
          } else {
            // If no orderId exists, create a new order
            const orderResponse = await fetch('http://localhost:8080/api/order_staff/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: 1,
                customerId: null,
                address: "145 Phan Xích Long",
                notes: "Order tại bàn",
                orderStatus: "IN_TRANSIT",
                totalAmount: 0, // Tạm thời set tổng số tiền là 0
                tableId: Number(tableId),
              }),
            });

            if (!orderResponse.ok) {
              throw new Error('Error creating order');
            }

            const orderData = await orderResponse.json();
            const orderId = orderData.id; // Lưu orderId vào localStorage
            localStorage.setItem(`orderId-${tableId}`, orderId);
          }
        }

        // Fetch selected items from the backend (order details)
        const response = await fetch(`http://localhost:8080/api/orders_detail_staff/${orderId}`);
        if (!response.ok) {
          throw new Error('Error fetching selected items');
        }

        const data = await response.json();

        // Fetch product details (name, image) based on productId for each selected item
        const items = await Promise.all(data.map(async (item: any) => {
          // Fetch product details based on productId
          const productResponse = await fetch(`http://localhost:8080/api/product/${item.productId}`);
          if (!productResponse.ok) {
            throw new Error(`Error fetching product details for productId: ${item.productId}`);
          }
          const productData = await productResponse.json();

          return {
            product: {
              productId: item.productId,
              productName: productData.productName,  // Assuming productData has productName and image fields
              price: productData.price,  // Assuming productData has price
              image: productData.image,  // Assuming productData has image
            },
            quantity: item.quantity,
            note: item.itemNotes,
          };
        }));
        setSelectedItems(items);
      } catch (error) {
        console.error('Error fetching selected items:', error);
      }
    };
    fetchSelectedItems();
}, [tableId]);


  useEffect(() => {
    onUpdateSubtotal(selectedItemsSubtotal);
  }, [selectedItemsSubtotal, onUpdateSubtotal]);

  const handleConfirmOrder = async () => {
    try {
      let orderId = localStorage.getItem(`orderId-${tableId}`);

      // Nếu chưa có orderId, tạo mới đơn hàng
      if (!orderId) {
        const orderResponse = await fetch('http://localhost:8080/api/order_staff/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 1,
            customerId: null,
            address: "145 Phan Xích Long",
            notes: "Order tại bàn",
            orderStatus: "IN_TRANSIT",
            totalAmount: subtotal,
            tableId: Number(tableId),
          }),
        });

        if (!orderResponse.ok) {
          const errorText = await orderResponse.text();
          console.error('Lỗi từ server:', errorText);
          throw new Error('Lỗi khi tạo đơn hàng');
        }

        const orderData = await orderResponse.json();
        const orderId = orderData.id;
        localStorage.setItem(`orderId-${tableId}`, orderId); // Lưu orderId vào localStorage
      }

      // Gửi chi tiết đơn hàng để cập nhật hoặc thêm mới
      const orderDetails = cartItems.map(item => ({
        productId: item.product.productId,
        quantity: item.quantity,
        unitPrice: item.product.price,
        itemNotes: item.note,
        orderId: Number(orderId),
        createdDate: new Date().toISOString(),
      }));

      const detailsResponse = await fetch(`http://localhost:8080/api/orders_detail_staff/add_or_update/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (!detailsResponse.ok) {
        throw new Error('Lỗi khi thêm hoặc cập nhật chi tiết đơn hàng');
      }
      
      onConfirmOrder(cartItems); 

      const updateTototalAmountResponse = await fetch(`http://localhost:8080/api/order_staff/${tableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount: selectedItemsTotal,
        }),
      });

      if (!updateTototalAmountResponse.ok) {
        const errorText = await updateTototalAmountResponse.text();
        console.error('Error updating updateTototalAmountResponse:', errorText);
        throw new Error('Error updating updateTototalAmountResponse');
      }

      const updateTableStatusResponse = await fetch(`http://localhost:8080/api/table/${tableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableStatus: 'OCCUPIED_TABLE',
        }),
      });
  
      if (!updateTableStatusResponse.ok) {
        const errorText = await updateTableStatusResponse.text();
        console.error('Error updating table status:', errorText);
        throw new Error('Error updating table status');
      }


      navigate(0);
    } catch (error) {
      console.error("Lỗi khi xác nhận gọi món:", error);
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    onUpdateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    onRemoveItem(productId);
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Giỏ Hàng</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className="nav nav-tabs" id="cartTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="selecting-tab" data-bs-toggle="tab" data-bs-target="#selecting" type="button" role="tab" aria-controls="selecting" aria-selected="true">
              Danh sách đang chọn
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="selected-tab" data-bs-toggle="tab" data-bs-target="#selected" type="button" role="tab" aria-controls="selected" aria-selected="false">
              Các món đã gọi
            </button>
          </li>
        </ul>

        <div className="tab-content mt-3" id="cartTabContent">
          <div className="tab-pane fade show active" id="selecting" role="tabpanel" aria-labelledby="selecting-tab">
            <div className="cart-page" style={{ height: '350px', overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Sản Phẩm</th>
                    <th>Số Lượng</th>
                    <th className="text-end">Thành Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.product.productId}>
                      <td className="cart-info d-flex align-items-center">
                        <img src={item.product.image} className="rounded" alt="" width="80" />
                        <div>
                          <p style={{ margin: 0, fontWeight: 'bold' }}>{item.product.productName}</p>
                          <p>{item.note || ''}</p>
                          <button className="btn btn-link" onClick={() => handleRemoveItem(item.product.productId)}>Remove</button>
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          defaultValue={item.quantity}
                          min={1}
                          onChange={(e) => handleQuantityChange(item.product.productId, Number(e.target.value))}
                        />
                      </td>
                      <td className="text-end">{(item.product.price * item.quantity).toLocaleString()} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="total-price d-flex justify-content-end">
              <table className="table">
                <tbody>
                  <tr>
                  <td>Thông tin thanh toán trước VAT</td>
                    <td className="text-end fw-bold" style={{ color: 'var(--colorPrimary)' }}>{subtotal.toLocaleString()} VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button style={{ float: 'right' }} className="btn btn-danger" onClick={handleConfirmOrder}>
              Xác nhận gọi món
            </button>
          </div>

          <div className="tab-pane fade" id="selected" role="tabpanel" aria-labelledby="selected-tab">
            <div className="cart-page" style={{ height: '350px', overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Sản Phẩm</th>
                    <th>Số Lượng</th>
                    <th className="text-end">Thành Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item) => (
                    <tr key={item.product.productId}>
                      <td className="cart-info d-flex align-items-center">
                        <img src={item.product.image} className="rounded" alt="" width="80" />
                        <div>
                          <p style={{ margin: 0, fontWeight: 'bold' }}>{item.product.productName}</p>
                          <p>{item.note || ''}</p>
                        </div>
                      </td>
                      <td className='align-middle'>{item.quantity}</td>
                      <td className="text-end">{(item.product.price * item.quantity).toLocaleString()} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="total-price d-flex justify-content-end">
              <table className="table">
                <tbody>
                  <tr>
                  <td>Thông tin thanh toán trước VAT</td>
                    <td className="text-end fw-bold">{selectedItemsSubtotal.toLocaleString()} VND</td>
                  </tr>
                  <tr>
                    <td>VAT</td>
                    <td className="text-end fw-bold">{selectedItemsTax.toLocaleString()} VND</td>
                  </tr>
                  <tr>
                    <td>Tổng thanh toán bao gồm VAT</td>
                    <td className="text-end fw-bold" style={{ color: 'var(--colorPrimary)' }}>{selectedItemsTotal.toLocaleString()} VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button style={{ float: 'right' }} className="btn btn-danger">
              Thanh Toán
            </button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasCart;
