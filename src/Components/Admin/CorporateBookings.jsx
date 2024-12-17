// import React, { useState, useEffect } from "react";
// import { Button, Modal, Table, Image } from "react-bootstrap";
// import { AiFillDelete } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import "../Admin/Admin.css";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { IoIosEye } from "react-icons/io";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import moment from "moment";

// const CorporateBookings = () => {

//     const [show, setShow] = useState();
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const [show4, setShow4] = useState();
//     const handleClose4 = () => setShow4(false);
//     const handleShow4 = () => setShow4(true);

//     const [show3, setShow3] = useState(false);
//     const handleClose3 = () => setShow3(false);
//     const handleShow3 = () => setShow3(true);

//     //pagination
//     // const [currenpage, setCurrentpage] = useState(1);
//     // const recordsperpage = 5;
//     // const lastIndex = currenpage * recordsperpage;
//     // const firstIndex = lastIndex - recordsperpage;
//     // const records = Addbooking.slice(firstIndex, lastIndex);
//     // const npages = Math.ceil(Addbooking.length / recordsperpage);
//     // const numbers = [...Array(npages + 1).keys()].slice(1);

//     // function changePage(id) {
//     //   setCurrentpage(id);
//     // }

//     // function prevpage() {
//     //   if (currenpage !== firstIndex) {
//     //     setCurrentpage(currenpage - 1);
//     //   }
//     // }

//     // function nextpage() {
//     //   if (currenpage !== lastIndex) {
//     //     setCurrentpage(currenpage + 1);
//     //   }
//     // }

//     // ==============DATE FILTER======================//

//     const [startDate, setstartDate] = useState("");
//     const [endDate, setendDate] = useState("");

//     const filterData = () => {
//       if (!startDate) return alert("Please select a 'from' date");
//       if (!endDate) return alert("Please select a 'to' date");

//       // Convert input dates to moment objects
//       const startDateObj = moment(startDate, "YYYY-MM-DD");
//       const endDateObj = moment(endDate, "YYYY-MM-DD");

//       // Ensure the end date is not before the start date
//       if (endDateObj.isBefore(startDateObj)) {
//         return alert("End date cannot be before the start date");
//       }

//       // Filter Addregister array based on the date range
//       const filteredData = (item) => {
//         const itemDate = moment(item?.createdAt, "YYYY-MM-DD");

//         return (
//           itemDate.isValid() &&
//           itemDate.isSameOrAfter(startDateObj) &&
//           itemDate.isSameOrBefore(endDateObj)
//         );
//       };
//       // Update the state with the filtered data
//       if (filteredData.length > 0) {
//         // setAdduser(filteredData);
//       } else {
//         alert("No records found within the selected date range");
//         // setAdduser([]); // Optionally, clear the data if no records found
//       }
//     };

//     function clearbutton() {
//       setendDate("");
//       setstartDate("");
//       // getAdduser();
//     }

//     // Export Excel
//     const handleExportExcel = () => {
//       // Create a custom mapping for the column headers
//       const customHeaders = (item) => ({
//         "Date / Time": moment(item.createdAt).format("MM/DD/YYYY, hh:mm A"),
//         "Mobile Number": item.Mobile,
//         "First Name": item.Fname,
//         "Last Name": item.Lname,
//         "Email ID": item.Email,
//         Address: item.address,
//       });

//       // Convert your custom data to an Excel sheet
//       const worksheet = XLSX.utils.json_to_sheet(customHeaders);

//       // Create a new workbook
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "User List ");

//       // Download the Excel file
//       XLSX.writeFile(workbook, "UserList.xlsx");
//     };

//     const [nochangedata, setNoChangeData] = useState([]);
//     const [ApartmentOrder, setApartmentOrder] = useState([]);
//     const getApartmentOrder = async () => {
//       try {
//         let res = await axios.get("https://dailydishbangalore.com/api/admin/getallorders");
//         if (res.status === 200) {
//           setApartmentOrder(res.data.order.reverse());
//           setNoChangeData(res.data.order);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     useEffect(() => {
//       getApartmentOrder();
//     }, []);

//   return (
//     <div>
//           <div>
//       <div className="d-flex gap-3 mb-2">
//         <div className="col-lg-3 d-flex justify-content-center">
//           <div class="input-group ">
//             <span class="input-group-text" id="basic-addon1">
//               <BsSearch />
//             </span>
//             <input
//               type="text"
//               class="form-control"
//               placeholder="Search..."
//               aria-describedby="basic-addon1"
//               // onChange={handleFilterH}
//               // value={searchH}
//             />
//           </div>
//         </div>
//         <div className="col-md-3 d-flex justify-content-center align-items-center">
//           <div className="input-group">
//             <label htmlFor="" className="m-auto">
//               From: &nbsp;
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               aria-describedby="date-filter"
//               value={startDate}
//               onChange={(e) => setstartDate(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="col-md-3 d-flex justify-content-center align-items-center">
//           <div className="input-group">
//             <label htmlFor="" className="m-auto">
//               To: &nbsp;
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               aria-describedby="date-filter"
//               value={endDate}
//               onChange={(e) => setendDate(e.target.value)}
//             />
//           </div>
//         </div>
//         <div>
//           <Button variant="" className="modal-add-btn" onClick={filterData}>
//             Submit
//           </Button>
//         </div>
//         <div>
//           <Button variant="danger" onClick={clearbutton}>
//             Clear
//           </Button>
//         </div>
//       </div>
//       <div className="customerhead p-2">
//         <div className="d-flex justify-content-between align-items-center">
//           <h2 className="header-c ">Corporate Booking List</h2>
//           <Button
//             variant="success"
//             // className="modal-add-btn"
//             onClick={handleExportExcel}
//           >
//             Export Excel
//           </Button>
//         </div>

//         <div className="mb-3">
//           <Table
//             responsive
//             bordered
//             style={{ width: "-webkit-fill-available" }}
//           >
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Order ID</th>
//                 <th style={{ padding: "30px" }}>Order Status</th>
//                 <th>Category Name</th>
//                 {/* <th>Sub Category Name</th> */}
//                 <th>Product Name</th>
//                 <th>Customer Name</th>
//                 <th>Phone Number</th>
//                 <th>Delivary location</th>
//                 <th>Delivary Type</th>
//                 <th>complete Address</th>
//                 <th>Payment Method</th>
//                 <th>Total Amount</th>
//                 <th>Placed On</th>
//                 <th>Order Invoice</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr>
//                 <td>1</td>
//                 <td style={{ paddingTop: "20px" }}>ORD2456743564</td>
//                 <td style={{ paddingTop: "20px", width: "400px" }}>
//                   Received
//                   <Button
//                     className="modal-add-btn mt-2"
//                     variant=""
//                     style={{ fontSize: "" }}
//                     onClick={() => handleShow3()}
//                   >
//                     Change Status
//                   </Button>
//                 </td>
//                 <td style={{ paddingTop: "20px" }}>VEG</td>
//                 {/* <td style={{ paddingTop: "20px" }}>Meals</td> */}
//                 <td style={{ paddingTop: "20px" }}>Rice, sambar</td>
//                 <td style={{ paddingTop: "20px" }}>jk</td>
//                 <td style={{ paddingTop: "20px" }}>9299999999</td>
//                 <td style={{ paddingTop: "20px" }}>Apartment</td>
//                 <td style={{ paddingTop: "20px" }}>DOOR Step</td>

//                 <td style={{ paddingTop: "20px" }}>Banglr 2nd cross j nagar</td>
//                 <td style={{ paddingTop: "20px" }}>online</td>
//                 <td style={{ paddingTop: "20px" }}>599</td>
//                 <td style={{ paddingTop: "20px" }}>10-10-2024</td>

//                 <td style={{ paddingTop: "20px" }}>
//                   <IoIosEye
//                     style={{ fontSize: "20px" }}
//                     onClick={() => handleShow()}
//                   ></IoIosEye>
//                 </td>
//                 <td>
//                   {" "}
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: "20px",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <div>
//                       <AiFillDelete
//                         className="text-danger"
//                         style={{ cursor: "pointer", fontSize: "20px" }}
//                         onClick={() => {
//                           handleShow4();
//                           // setData(item?._id);
//                         }}
//                       />{" "}
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </div>
//       </div>

//       {/* Delete booking */}
//       <Modal
//         show={show4}
//         onHide={handleClose4}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "99999" }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Warning</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="row">
//             <div className="col-md-12">
//               <p className="fs-4" style={{ color: "red" }}>
//                 Are you sure?
//                 <br /> you want to delete this data?
//               </p>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="" className="modal-close-btn" onClick={handleClose4}>
//             Close
//           </Button>
//           <Button variant="" className="modal-add-btn">
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Invoice */}
//       <Modal
//         show={show}
//         onHide={handleClose}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="row">
//             <div>
//               <h4>Order Summary</h4>
//               <b>1 Items</b>
//               <hr />

//               <div className="row m-2 align-items-center">
//                 <div className="col-md-10">
//                   <div className="order-icond-text">
//                     <div className="col-md-2">
//                       <img
//                         src="../Assets/dinner-banner.jpg"
//                         alt=""
//                         style={{ width: "90px", height: "80px" }}
//                       />
//                     </div>

//                     <div style={{ textAlign: "left" }}>
//                       <b>Andra Chicken</b> <br />
//                       <span>500 Graam x 1</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-2">
//                   <p>
//                     <b>₹ 359</b>
//                   </p>
//                 </div>
//               </div>

//               <div className="row m-2 mt-3 align-items-center">
//                 <b>Bill Details</b>
//                 <div className="col-md-10 mb-2">
//                   <div>
//                     <div>Sub Total</div>
//                     <div>Tax</div>
//                     <div>Delivery charges</div>
//                     <div>
//                       <b>Bill total</b>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-2 mb-2">
//                   <div style={{ textAlign: "left" }}>
//                     <div>
//                       <div>₹ 352</div>
//                       <div>₹ 10</div>
//                       <div>₹ 30</div>

//                       <div>
//                         <b>₹ 499</b>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="d-flex gap-4 justify-content-end mt-3 mb-3">
//             <div>
//               <Button
//                 variant=""
//                 style={{
//                   background: "white",
//                   color: "green",
//                   border: "1px solid green",
//                 }}
//                 onClick={handleClose}
//               >
//                 Close
//               </Button>
//             </div>
//             <div>
//               <Button
//                 variant=""
//                 style={{
//                   background: "green",
//                   color: "white",
//                   border: "1px solid white",
//                 }}
//                 onClick={handleClose}
//               >
//                 Download Invoice
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* status change  */}
//       <Modal
//         show={show3}
//         onHide={handleClose3}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "99999" }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Warning</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="row">
//            <div className="col-md-12 mb-2">
//            <select name="" id="" className="vi_0" >
//               <option value="">Cooking</option>
//               <option value="">Packing</option>
//               <option value="">On the way</option>
//               <option value="">Delivered</option>
//             </select>
//            </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="" className="modal-add-btn" onClick={handleClose3}>
//           Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//     </div>
//   )
// }

// export default CorporateBookings

import React, { useState, useEffect,useMemo } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoIosEye } from "react-icons/io";
import axios from "axios";
import * as XLSX from "xlsx";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const CorporateBookings = () => {
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const [data, setdata] = useState();
  const handleShow = (item) => {
    setdata(item);
    setShow(true);
  };

  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const navigate = useNavigate()

  const [show3, setShow3] = useState(false);
  const [dataa, setdataa] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (items) => {
    setShow3(true);
    setdataa(items);
  };



  //Get method Integration
  const [ApartmentOrder, setApartmentOrder] = useState([]);
  const getApartmentOrder = async () => {
    try {
      let res = await axios.get(
        "https://dailydishbangalore.com/api/admin/getallorders"
      );
      if (res.status === 200) {
        setApartmentOrder(res.data.order.reverse());
        setNoChangeData(res.data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApartmentOrder();
    // const interval = setInterval(() => {
    //   getApartmentOrder();
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);

  //integrating get method
  const [Addproducts, setAddproducts] = useState([]);
  const getAddproducts = async () => {
    try {
      let res = await axios.get(
        "https://dailydishbangalore.com/api/admin/getFoodItems"
      );
      if (res.status === 200) {
        setAddproducts(res.data.data);
        setNoChangeData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [delData, setdelData] = useState();
  let deleteBooking = async (data) => {
    try {
      let res = await axios.delete(
        `https://dailydishbangalore.com/api/admin/deletefoodorder/${data}`
      );
      if (res) {
        alert(`Bookings Data Deleted Successfully`);
        handleClose4();
        getAddproducts();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getAddproducts();
  }, []);

  //Pagination
  // const [currenpage, setCurrentpage] = useState(1);
  // const recordsperpage = 10;
  // const lastIndex = currenpage * recordsperpage;
  // const firstIndex = lastIndex - recordsperpage;
  // const records = ApartmentOrder.slice(firstIndex, lastIndex);
  // const npages = Math.ceil(ApartmentOrder.length / recordsperpage);
  // const numbers = [...Array(npages + 1).keys()].slice(1);

  // function changePage(id) {
  //   setCurrentpage(id);
  // }

  // function prevpage() {
  //   if (currenpage !== firstIndex) {
  //     setCurrentpage(currenpage - 1);
  //   }
  // }

  // function nextpage() {
  //   if (currenpage !== lastIndex) {
  //     setCurrentpage(currenpage + 1);
  //   }
  // }

  // Search filter
  const [nochangedata, setNoChangeData] = useState([]);
  const [searchH, setSearchH] = useState("");

  const handleFilterH = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchH(searchTerm);
    if (searchTerm !== "") {
      const filteredData = nochangedata.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
      setApartmentOrder(filteredData);
    } else {
      setApartmentOrder(nochangedata);
    }
  };

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const neworder = ApartmentOrder.filter(
    (item) => item?.orderdelivarytype === "corporate"
  )
  const pageCount = Math.ceil(neworder.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };



  // ==============DATE FILTER======================//

  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  function filterByDateRange() {
    // Parse the input date strings into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const newarry = ApartmentOrder.filter(order => {
      // Convert the `Placedon` date to a Date object
      const placedDate = new Date(order.Placedon);
      // Check if the placedDate falls within the range (inclusive)
       return placedDate >= start && placedDate <= end;
    });
    setApartmentOrder(newarry)
  }

  function clearbutton() {
    setendDate("");
    setstartDate("");
    setApartmentOrder(nochangedata)
    // getAdduser();
  }

  // Export Excel
  const handleExportExcel = () => {
    // Create a custom mapping for the column headers
    const customHeaders = ApartmentOrder.filter(
      (item) => item?.orderdelivarytype === "corporate"
    ).map((item, i) => ({
      "S.No": i + 1,
      Date: moment(item?.Placedon).format("MM/DD/YYYY, hh:mm A"),
      "Order ID": item?.orderid,
      "Order Status": item?.status,
      "Custome":item?.username,
      "Phone":item?.Mobilenumber,
      Slotsdata: item?.slot,
      "Category Name": item?.allProduct?.map((items) => `${items?.foodItemId?.foodcategory}`).join(", ") || "N/A",
      "Product Name": item?.allProduct?.map((items) => `${items?.foodItemId?.foodname}`).join(", ") || "N/A",
      "Unit": item?.allProduct?.map((items) => `${items?.foodItemId?.unit}`).join(", ") || "N/A",
      "Quantity": item?.allProduct?.map((items) => `${items?.quantity}`).join(", ") || "N/A",
      Address: item?.delivarylocation,
      "Delivery Charge": item?.delivarytype,
      "Delivery Type":item?.deliveryMethod
    }));
    
    // Convert your custom data to an Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(customHeaders);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User List ");

    // Download the Excel file
    XLSX.writeFile(workbook, "Corporatebookings.xlsx");
  };

  const [statusdata, setstatusdata] = useState("");
  const changestatus = async (item) => {
    try {
      const config = {
        url: "/admin/updateOrderStatus/" + item._id,
        method: "put",
        baseURL: "https://dailydishbangalore.com/api",
        headers: { "Content-Type": "application/json" },
        data: {
          newStatus: statusdata,
        },
      };

      const res = await axios(config);

      if (res.status === 200) {
        handleClose3();
        getApartmentOrder();
        window.location.reload();
      } else {
        alert("Failed to Update Order");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while updating Order");
    }
  };

  console.log("dfdf",data)
  const totalTaxPercent = useMemo(() => {
    if (!data?.allProduct?.length) {
      return 0; // Fallback for missing or empty allProduct
    }
  
    return data.allProduct.reduce((totalTaxPercent, item) => {
      const tax = Number(item?.foodItemId?.gst || 0) * Number(item?.quantity || 0); // Adjust for Quantity
      return totalTaxPercent + tax;
    }, 0); // Initial value for totalTaxPercent is 0
  }, [data]);


  return (
    <div>
      <div className="d-flex gap-3 mb-2">
        <div className="col-lg-3 d-flex justify-content-center">
          <div class="input-group ">
            <span class="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              aria-describedby="basic-addon1"
              onChange={handleFilterH}
              value={searchH}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div className="input-group">
            <label htmlFor="" className="m-auto">
              From: &nbsp;
            </label>
            <input
              type="date"
              className="form-control"
              aria-describedby="date-filter"
              value={startDate}
              onChange={(e) => setstartDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div className="input-group">
            <label htmlFor="" className="m-auto">
              To: &nbsp;
            </label>
            <input
              type="date"
              className="form-control"
              aria-describedby="date-filter"
              value={endDate}
              onChange={(e) => setendDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button variant="" className="modal-add-btn" onClick={filterByDateRange}>
            Submit
          </Button>
        </div>
        <div>
          <Button variant="danger" onClick={clearbutton}>
            Clear
          </Button>
        </div>
      </div>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Corporate Booking List</h2>
          <Button variant="success" onClick={handleExportExcel}>
            Export Excel
          </Button>
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Placed On</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th style={{ padding: "30px" }}>Order Status</th>
                <th>Slots Details</th>
                <th>Category Name</th>
                <th>Product Name</th>
                <th>Unit</th>
                <th>Quantity</th>
           
                <th>Phone Number</th>
                <th>Corporate</th>
                <th>Delivary location</th>
                <th>Delivary Type</th>
                <th>Payment Method</th>
                <th>Delivary Amount</th>
                <th>Tax</th>
                <th>Total Amount</th>
                <th>Order Invoice</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {ApartmentOrder
                .filter((item) => item?.orderdelivarytype === "corporate")?.slice(pagesVisited, pagesVisited + usersPerPage)
                ?.map((items, i) => {
                  return (
                    <tr key={i+1}>
                      <td>{i + 1 + usersPerPage * pageNumber}</td>
                      <td style={{ paddingTop: "20px" }}>
                        {moment(items?.createdAt).format("MM/DD/YYYY, h:mm A")}
                      </td>
                      <td style={{ paddingTop: "20px" }}>{items?.orderid}</td>
                      <td style={{ paddingTop: "20px" }}>{items?.username}</td>
                      <td style={{ paddingTop: "20px", width: "400px" }}>
                        {items?.status}
                        <Button
                          className="modal-add-btn mt-2"
                          variant=""
                          style={{ fontSize: "" }}
                          onClick={() => handleShow3(items)}
                        >
                          Change Status
                        </Button>
                      </td>
                      <td style={{ paddingTop: "20px" }}>{items?.slot}</td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.allProduct.map((item) => {
                          return `${item?.foodItemId?.foodcategory}` + ",";
                        })}
                      </td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.allProduct.map((item) => {
                          return `${item?.foodItemId?.foodname}` + ",";
                        })}
                      </td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.allProduct.map((item) => {
                          return `${item?.foodItemId?.unit}` + ",";
                        })}
                      </td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.allProduct.map((item) => {
                          return `${item?.quantity}` + ",";
                        })}
                      </td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.Mobilenumber}
                      </td>
                      <td style={{ paddingTop: "20px" }}>{items?.apartment}</td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.delivarylocation},{items?.addressline}
                      </td>

                      <td style={{ paddingTop: "20px" }}>Gate Delivery</td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.paymentmethod}
                      </td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.delivarytype}
                      </td>
                      <td style={{ paddingTop: "20px" }}>{items?.tax}</td>
                      <td style={{ paddingTop: "20px" }}>
                        {/* {items?.allProduct?.reduce((acc, item) => {
                          return (
                            Number(acc) +
                            Number(item?.foodItemId?.totalprice) +
                            Number(items?.delivarytype) +
                            Number(items?.tax) +
                            Number(items?.Cutlery)
                          ).toFixed(2);
                        }, 0)} */}
                        {
                          items?.allTotal.toFixed(2)
                        }
                      </td>
                      <td style={{ paddingTop: "20px" }}>
                        <IoIosEye
                          style={{ fontSize: "20px" }}
                          onClick={() => handleShow(items)}
                        ></IoIosEye>
                      </td>
                      <td>
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            gap: "20px",
                            justifyContent: "center",
                          }}
                        >
                          <div>
                            <AiFillDelete
                              className="text-danger"
                              style={{ cursor: "pointer", fontSize: "20px" }}
                              onClick={() => {
                                handleShow4();
                                setdelData(items?._id);
                              }}
                            />{" "}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div style={{ display: "flex" }} className="reactPagination">
            <p style={{ width: "100%", marginTop: "20px" }}>
              Total Count: {neworder?.length}
            </p>
            <ReactPaginate
              previousLabel={"Back"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>

      {/* Delete booking */}
      <Modal
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <p className="fs-4" style={{ color: "red" }}>
                Are you sure?
                <br /> you want to delete this data?
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="modal-close-btn" onClick={handleClose4}>
            Close
          </Button>
          <Button
            variant=""
            onClick={() => deleteBooking(delData)}
            className="modal-add-btn"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Invoice */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div>
              <h4>Order Summary</h4>
              <b>{data?.allProduct?.length} Items</b>
              <hr />

              <div className="row w-100">
              {data?.allProduct?.map((Item) => {
                      return (
                        <>
                          <div className="row w-100 border mt-1">
                            <div className="col-md-4">
                            <img
                              src={`https://dailydishbangalore.com/Products/${Item?.foodItemId?.Foodgallery[0]?.image2}`}
                              alt=""
                              style={{ width: "90px", height: "80px" }}
                            />
                            </div>
                          <div className="col-md-4">
                          <div style={{ textAlign: "left" }}>
                            <b>{Item?.foodItemId?.foodname}</b> <br />
                            <span>
                          <b> ₹  {Item?.foodItemId?.foodprice}</b> 
                            </span>
                            <br />
                            <b>  Qty. {Item?.quantity}</b> 
                          </div>
                          </div>
                        
                        <div className="col-md-4 d-flex align-items-center">
                        <div style={{ textAlign: "left" }}>
                            <b>₹ {((Item?.quantity)*(Item?.foodItemId?.foodprice)).toFixed(2)}</b> <br />
                        
                          </div>
                        </div>

                          </div>

                          
                          
                        </>
                      );
                    })}
       
              </div>


              <div className="row m-2 mt-3 align-items-center">
                <b>Bill Details</b>
                <div className="col-md-10 mb-2">
                  <div>
                    <div>Sub Total</div>
                    <div>Tax (5%)</div>
                    <div>Cutlery</div>
                    <div>Delivery charges</div>
                    <div>
                      <b>Bill total</b>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 mb-2">
                  <div style={{ textAlign: "left" }}>
                    <div>
                      <div>
                        ₹{" "}
                        {data?.allProduct?.reduce((acc, item) => {
                          return (
                            Number(acc) + Number(item?.quantity)*Number(item?.foodItemId?.foodprice)
                          ).toFixed(2);
                        }, 0)}
                      </div>
                      <div>₹ {data?.tax}</div>
                      <div>₹ {data?.Cutlery}</div>
                      <div>₹ {data?.delivarytype}</div>

                      <div>
                        <b>
                          ₹{" "}
                          {data?.allProduct?.reduce((acc, item) => {
                            return (
                              Number(acc) +
                              Number(item?.quantity)*Number(item?.foodItemId?.foodprice) +
                              Number(data?.delivarytype) +
                              Number(data?.tax) +
                              Number(data?.Cutlery)
                            ).toFixed(2);
                          }, 0)}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-4 justify-content-end mt-3 mb-3">
            <div>
              <Button
                variant=""
                style={{
                  background: "white",
                  color: "green",
                  border: "1px solid green",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
            <div>
              <Button
                variant=""
                style={{
                  background: "green",
                  color: "white",
                  border: "1px solid white",
                }}
                onClick={() => navigate('/AdminInvoice', { state: { item: data } })}
              >
                 Invoice
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* status change  */}
      <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 mb-2">
            <select
              name="status"
              id="status"
              className="vi_0"
              onChange={(e) => {
                console.log("Selected Value:", e.target.value); // To verify the value
                setstatusdata(e.target.value);
              }}
            >
              <option value="">Select Status</option>
              <option value="Cooking">Cooking</option>
              <option value="Packing">Packing</option>
              <option value="Ontheway">On the way</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            className="modal-add-btn"
            onClick={() => changestatus(dataa)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CorporateBookings;
