import React from 'react';
import { editData, fetchDataFromApi } from '../../utils/api';
import { useState, useEffect } from 'react';

import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import { MdClose } from "react-icons/md";
import Button from '@mui/material/Button';
import './styles.css';  // Adjust the path if necessary


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [isOpenProductDialog, setIsOpenProductDialog] = useState(false);

    const [editOrderData, setEditOrderData] = useState(null);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUserEmail(userData?.email || '');

        window.scrollTo(0, 0);
        fetchDataFromApi(`/api/orders`).then((res) => {
            setOrders(res);
        });
    }, []);

    const showProducts = (id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            setIsOpenProductDialog(true);
            setProducts(res.products);
        });
    };

    const orderStatus = (orderStatus, id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            const order = {
                ...res,
                status: orderStatus,  // Update the order status with the selected value
            };

            editData(`/api/orders/${id}`, order).then(() => {
                fetchDataFromApi(`/api/orders`).then((res) => {
                    setOrders(res);
                    window.scrollTo({
                        top: 200,
                        behavior: 'smooth',
                    });
                });
            });

            setEditOrderData(res.products);
        });
    };

    const handleEditOrder = (id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            setEditOrderData(res);
            setIsEditPopupOpen(true);
        });
    };

    const handleInputChange = (e) => {
        setEditOrderData({
            ...editOrderData,
            [e.target.name]: e.target.value,
        });
    };

    const saveEditedOrder = () => {
        editData(`/api/orders/editorder/${editOrderData._id}`, editOrderData).then(() => {
            fetchDataFromApi(`/api/orders`).then((res) => {
                setOrders(res);
                setIsEditPopupOpen(false);
            });
        });
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
                    <h5 className="mb-0">Orders List</h5>

                    <div className="ml-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />

                            <StyledBreadcrumb
                                label="Orders"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </div>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Payment Id</th>
                                    <th>Products</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Pincode</th>
                                    <th>Total Amount</th>
                                    <th>Email</th>
                                    <th>User Id</th>
                                    <th>Order Status</th>
                                    <th>Date</th>
                                    {userEmail === "admin.ranienterprisesballia@gmail.com" && (
                                    <th>Edit</th>
                                   
                                    )}
                                    <th>Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.length !== 0 && orders?.map((order, index) => (
                                    <tr key={index}>
                                        <td><span className='text-blue font-weight-bold'>{order?.paymentId}</span></td>
                                        <td><span className='text-blue font-weight-bold cursor' onClick={() => showProducts(order?._id)}>Click here to view</span></td>
                                        <td>{order?.name}</td>
                                        <td>{order?.phoneNumber}</td>
                                        <td>{order?.address}</td>
                                        <td>{order?.pincode}</td>
                                        <td>{order?.amount}</td>
                                        <td>{order?.email}</td>
                                        <td>{order?.userid}</td>
                                        <td>
                                            <select
                                                value={order?.status}
                                                onChange={(e) => orderStatus(e.target.value, order?._id)}
                                                className={`form-select ${order?.status === 'Pending' ? 'text-danger' : 'text-success'}`}
                                                disabled={userEmail !== "admin.ranienterprisesballia@gmail.com" && order?.status === 'Cancelled'}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipping">Shipping</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>{order?.date}</td>
                                        {userEmail === "admin.ranienterprisesballia@gmail.com" && (
                                            <td>
                                                <Button 
                                                    onClick={() => handleEditOrder(order._id)}
                                                    disabled={order?.status === 'Cancelled'}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        )}

                                        <td>
                                            
                                        <a href={`${process.env.REACT_APP_BASE_URL}/${order?.billPdf}`} target="_blank">Download</a>
                                            
                                        </td>
                                                                                
                                    </tr>
                                  
                                  
                                ))}
                                  
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isEditPopupOpen && (
                <div className="edit-popup">
                    <div className="popup-content">
                        <h4>Edit Order</h4>
                        <Button onClick={() => setIsEditPopupOpen(false)} style={{color:'red'}}>Cancel</Button>
                        <br/>
                        <br/>
                        <br/>
                        {editOrderData && (
                            <form>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={editOrderData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={editOrderData.phoneNumber}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={editOrderData.address}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Pincode"
                                    name="pincode"
                                    value={editOrderData.pincode}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                {/* Non-editable fields */}
                                <TextField
                                    label="Payment ID (not editabel)"
                                    value={editOrderData.paymentId}
                                    
                                    fullWidth
                                />
                                <TextField
                                    label="Total Amount (not editabel)"
                                    value={editOrderData.amount}
                                   
                                    fullWidth
                                />
                                <TextField
                                    label="User ID (not editabel)"
                                    value={editOrderData.userid}
                                   
                                    fullWidth
                                    sx={{ 
                                        '& .MuiInputBase-input': {
                                            color: 'red'
                                        }
                                    }}
                                />


                                <Button onClick={saveEditedOrder} style={{marginTop:30,color:'green'}}>Save</Button>
                               
                            </form>
                        )}
                    </div>
                </div>
            )}

            <Dialog open={isOpenProductDialog} className="productModal">
                <Button className='close_' onClick={() => setIsOpenProductDialog(false)}><MdClose /></Button>
                <h4 className="mb-1 font-weight-bold pr-5 mb-4">Products</h4>
                <div className='table-responsive orderTable'>
                    <table className='table table-striped table-bordered'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Title</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.length !== 0 && products?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.productId}</td>
                                    <td style={{ whiteSpace: "inherit" }}><span>
                                        {item?.productTitle?.substr(0, 30) + '...'}
                                    </span></td>
                                    <td>
                                        <div className='img'>
                                            <img src={item?.image} alt={item?.productTitle} />
                                        </div>
                                    </td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.subTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Dialog>
        </>
    );
};

export default Orders;

                                   
