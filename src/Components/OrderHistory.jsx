import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { MdArrowBackIosNew } from "react-icons/md";
import "../Styles/Myorders.css";
import { FaCheckCircle } from "react-icons/fa";
import { IoFastFoodSharp, IoLocation } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import axios from "axios";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Modal from "react-bootstrap/Modal";
import { FaFileDownload } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineLiveHelp } from "react-icons/md";


const OrderHistory = () => {
  const navigate = useNavigate();
  const [Ongoing, setOngoing] = useState(true);
  const [Previous, setPrevious] = useState(false);
  const [orderitem, setOrderItem] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
   window.location.assign('/orders')
};
  const handleShow = (item) => {
    setShow(true);
    setData1(item);
  };
  const phoneNumber = '9845550715'; // Replace with your WhatsApp number
  const message = 'Hello! I need assistance.'; // Default message

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = (item) => {
    setShow2(true);
    setData1(item);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setorders] = useState([]);
  const getorders = async () => {
    try {
      let res = await axios.get(
        "https://dailydishbangalore.com/api/admin/getallorders"
      );
      if (res.status === 200) {
        setorders(res.data.order.reverse());
        console.log("df", res.data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("orders",orders)

  useEffect(() => {
    getorders();
    // const interval = setInterval(() => {
    //   getorders();
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);

  const [Data1, setData1] = useState({});
  console.log("Data1", Data1);

  const [Data12, setData12] = useState({});
  const handleShow4 = (item) => {
    setData1(item);
  };

  const handleShow45 = (item) => {
    setData12(item);
  };

  // console.log("data====>",Data1)

  const d = new Date();

  const placeorder = async () => {
    try {
      const config = {
        url: "/admin/addfoodorder",
        method: "post",
        baseURL: "https://dailydishbangalore.com/api/",
        header: { "content-type": "application/json" },
        data: {
          customerId: user?._id,
          allProduct: Data12?.allProduct,
          Placedon: d,
          delivarylocation: Data12?.delivarylocation,
          username: user?.Fname,
          Mobilenumber: Number(user?.Mobile),
          paymentmethod: Data12?.paymentmethod,
          delivarytype: Number(Data12?.delivarytype),
          payid: Data12?.payid,
          addressline: user?.Address,
          subTotal: Number(Data12?.subTotal),
          foodtotal: Number(Data12?.foodtotal),
          allTotal: Number(Data12?.allTotal + Data12?.delivarytype),
          tax: Number(Data12?.tax),
          slot: "2/2/2024",
          approximatetime: Number(Data12?.approximatetime),
          orderdelivarytype: Data12?.addresstype,
          orderstatus: "inprocess",
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("Order Placed Successfully");
        navigate("/orders");
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to place Order");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Order Tracking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Data1 && Object.keys(Data1).length ? (
            <>
              <div className="col-md-12 col-12 mb-2 ">
                <div className="d-flex justify-content-center flex-column">
                  <div className="deliveryStatusCard ">
                    <div className="order-delivery-status  w-100 mt-3">
                      <div className="order-status-container ">
                        {/* Step 1: Cooking */}
                        <div>
                          {Data1?.status === "Cooking" ||
                          Data1?.status === "inprocess" ? (
                            <>
                              <div className="status-step completed ">
                                <img
                                  src="Assets/cooking.gif"
                                  alt=""
                                  style={{ width: "30px" }}
                                />
                                <div className="line"></div>
                              </div>
                            </>
                          ) : Data1?.status === "Packing" ||
                            Data1?.status === "Ontheway" ||
                            Data1?.status === "Delivered" ? (
                            <>
                              <div className="status-step  completed">
                                <img
                                  src="Assets/delivered.gif"
                                  alt=""
                                  style={{ width: "30px" }}
                                />
                                <div className="line"></div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="status-step   completed ">
                                <div className="circle">X</div>
                                <div className="line"></div>
                              </div>
                            </>
                          )}

                          <p className="status-label">Cooking</p>
                        </div>

                        {/* Step 2: Packing */}
                        <div>
                          {Data1?.status === "Packing" ? (
                            <>
                              <div className="status-step  completed">
                                <img
                                  src="Assets/packing.gif"
                                  alt=""
                                  style={{ width: "30px" }}
                                />
                                <div className="line"></div>
                              </div>
                            </>
                          ) : Data1?.status === "Ontheway" ||
                            Data1?.status === "Delivered" ? (
                            <>
                              <div className="status-step   completed">
                                <img
                                  src="Assets/delivered.gif"
                                  alt=""
                                  style={{ width: "30px" }}
                                />
                                <div className="line"></div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="status-step completed">
                                <div className="circle">X</div>
                                <div className="line"></div>
                              </div>
                            </>
                          )}

                          <p className="status-label">Packing</p>
                        </div>

                        {/* Step 3: On the way */}
                        <div>
                          {Data1?.status === "Ontheway" ? (
                            <>
                              <div className="status-step completed">
                                <img
                                  src="Assets/delivery.gif"
                                  alt=""
                                  style={{ width: "30px" }}
                                />
                                <div className="line"></div>
                              </div>
                            </>
                          ) : Data1?.status === "Delivered" ? (
                            <>
                              <div className="status-step completed">
                                <img
                                  src="Assets/delivered.gif"
                                  alt=""
                                  style={{ width: "30px" }}
                                />
                                <div className="line"></div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="status-step completed">
                                <div className="circle">X</div>
                                <div className="line"></div>
                              </div>
                            </>
                          )}
                          <p className="status-label">Dispatched</p>
                        </div>

                        {/* Step 4: Delivered */}
                        <div>
                          {Data1?.orderstatus === "Delivered" ? (
                            <>
                              <div className="status-step completed">
                                <img
                                  src="Assets/delivered.gif"
                                  alt=""
                                  style={{ width: "30px" }}
                                />
                                {/* <div className="line"></div> */}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="status-step completed">
                                <div className="circle">X</div>
                              </div>
                            </>
                          )}
                          <p className="status-label">Delivered</p>
                        </div>
                      </div>
                    </div>

                    <p
                      style={{
                        color: "green",
                        textAlign: "center",
                        marginTop: "2%",
                      }}
                    >
                      {Data1?.status === "Cooking" ? (
                        <img
                          src="Assets/cooking.gif"
                          alt=""
                          style={{ width: "40px" }}
                        />
                      ) : Data1?.status === "Packing" ? (
                        <img
                          src="Assets/packing.gif"
                          alt=""
                          style={{ width: "40px" }}
                        />
                      ) : Data1?.status === "Ontheway" ? (
                        <img
                          src="Assets/delivery.gif"
                          alt=""
                          style={{ width: "40px" }}
                        />
                      ) : Data1?.status === "inprocess" ? (
                        <img
                          src="Assets/cooking.gif"
                          alt=""
                          style={{ width: "40px" }}
                        />
                      ) : (
                        <img
                          src="Assets/delivered.gif"
                          alt=""
                          style={{ width: "40px" }}
                        />
                      )}
                      &nbsp; Status: {Data1?.status}
                    </p>
                  </div>

                  <div className="mt-3">
                    <b>
                      {`We will deliver between ${Data1?.approximatetime} `}{" "}
                    </b>
                  </div>
                  <p
                    style={{
                      marginTop: "18px",
                      fontWeight: "bold",
                      marginTop: "2%",
                    }}
                  >
                    <MdLocationOn style={{ fontSize: "16px" }} />:{" "}
                    {Data1?.apartment}
                  </p>
                  <p
                    style={{
                      marginTop: "14px",
                      fontWeight: "bold",
                      marginTop: "2%",
                    }}
                  >
                    Order ID : {Data1?.orderid}
                  </p>
                  {/* <a href="http://" target="_blank" rel="noopener noreferrer" style={{marginTop:'20px'}}>Need help ?</a> */}
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="needhelp" >
                    Need help{" "}
                    <MdOutlineLiveHelp
                      style={{ fontSize: "20px", marginLeft: "5px" }}
                    />
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div div className="col-md-6 mb-2">
                <h2>Please Select Your Order</h2>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{
              backgroundColor: "#ffc156",
              color: "black",
              height: "30px",
              width: "100px",
              borderRadius: "5px",
              padding: "5px",
            }}
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Container className="ordermain">
        <div className="mycart">
          <h5>My Orders</h5>
          <a href="/home">
            <RxCross2 style={{ fontSize: "18px" }} />
          </a>
        </div>

        <div className="mobile-view-orderlist">
          <div>
            <div>
              {Ongoing ? (
                <>
                  <div className="row mb-3 myorder">
                    <div className="d-flex gap-3 ">
                      <div
                        onClick={() => {
                          setOngoing(true);
                          setPrevious(false);
                        }}
                      >
                        <Button variant="" className="modal-close-btn">
                          Ongoing
                        </Button>
                      </div>

                      <div
                        onClick={() => {
                          setOngoing(false);
                          setPrevious(true);
                        }}
                      >
                        <Button variant="" className="modal-close-btn ">
                          Previous
                        </Button>
                      </div>
                    </div>

                    <div className="col-md-12 mb-2">
                      {orders
                        ?.filter(
                          (item) =>
                            item?.customerId === user?._id &&
                            item?.orderstatus === "Cooking"
                        )
                        .map((items) => {
                          return (
                            <div className="order-card " key={items?._id}>
                              <div className="orderHead">
                                Arriving At-{" "}
                                <span style={{ float: "right" }}>
                                  {items?.approximatetime}
                                </span>{" "}
                              </div>
                              <div className="orderHead">
                                <b> ₹ {items?.allTotal}</b>{" "}
                                <span style={{ float: "right" }}>
                                  {new Date(items?.Placedon).toLocaleString()}
                                </span>
                              </div>

                              <div className="d-flex productImges ">
                                {items?.allProduct?.map((Item, index) => {
                                  return (
                                    <div
                                      className="d-flex gap-3 mt-1 "
                                      key={Item?.foodItemId?._id || index}
                                      onClick={() => {
                                        handleShow4(items); // Keep this to show product details
                                      }}
                                    >
                                      <div>
                                        <img
                                          src={`https://dailydishbangalore.com/Products/${Item?.foodItemId?.Foodgallery[0]?.image2}`}
                                          rounded
                                          className="orderspage-img"
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="w-100">
                                <button
                                  onClick={() => handleShow(items)} // Pass the "items" (parent order object) here
                                  className="mt-2"
                                  style={{
                                    backgroundColor: "#F81D0F",
                                    color: "white",
                                    height: "22px",
                                    alignItems: "center",
                                    fontSize: "14px",
                                    width: "100%",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Track Order
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {Previous ? (
                <>
                  <div>
                    <div className="row mb-3">
                      <div className="d-flex gap-3 ">
                        <div
                          onClick={() => {
                            setOngoing(true);
                            setPrevious(false);
                          }}
                        >
                          <Button variant="" className="modal-close-btn">
                            Ongoing
                          </Button>
                        </div>

                        <div
                          onClick={() => {
                            setOngoing(false);
                            setPrevious(true);
                          }}
                        >
                          <Button variant="" className="modal-close-btn ">
                            Previous
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-12 mb-2">
                        {orders
                          ?.filter(
                            (item) =>
                              item?.customerId === user?._id &&
                              item?.status === "Delivered"
                          )
                          .map((items) => {
                            return (
                              <div className="order-card  ">
                                {items?.allProduct?.map((Item, index) => {
                                  return (
                                    <div className="">
                                      <div
                                        className="d-flex flex-column productImges"
                                        key={Item?.foodItemId?._id || index}
                                        onClick={() => {
                                          handleShow4(items); // Keep this to show product details
                                        }}
                                      >
                                        <div>
                                          <img
                                            src={`https://dailydishbangalore.com/Products/${Item?.foodItemId?.Foodgallery[0]?.image2}`}
                                            rounded
                                            className="orderspage-img"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                                {/* Track Order button for the entire order */}
                                <div className="bottombtn  mt-2 pt-1 border-top">
                                  <div className="completed ">
                                    <img
                                      src="Assets/delivered.gif"
                                      alt=""
                                      srcset=""
                                      className="gifimg"
                                    />{" "}
                                    Delivered
                                  </div>
                                  <a
                                    className="centerneed border rounded-2"
                                    href={whatsappLink} target="_blank" rel="noopener noreferrer" 
                                  >
                                    Need help{" "}
                                    <MdOutlineLiveHelp
                                      style={{ fontSize: "17px" }}
                                    />
                                  </a>
                                  <div
                                    className="download  border rounded-2"
                                    onClick={() =>{
                                      // handleShow45()
                                      navigate("/Invoice", {
                                        state: { item: items },
                                      })
                                    }
                                    }
                                  >
                                    Download{" "}
                                    <FaFileDownload
                                      style={{ color: "white" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {" "}
          {Data12 && Object.keys(Data12).length ? (
            <>
              <div className="col-md-6 mb-2">
                <div>
                  <h6 className="mt-3">
                    {" "}
                    <img
                      src="Assets/delivered.gif"
                      alt=""
                      style={{ width: "35px" }}
                    />{" "}
                    Food has been Delivered
                  </h6>

                  <div className="mt-3">
                    <div className="d-flex gap-2"></div>
                  </div>

                  <h6>
                    <b>Delivery Details</b>
                  </h6>
                  <div className="d-flex gap-2 mb-2">
                    <IoFastFoodSharp
                      style={{ fontSize: "20px", color: "orangered" }}
                    />
                    <div className="">
                      <p>Restaurant Address</p>
                      <p style={{ fontWeight: "bold" }}>Dailydish Hotel</p>
                      <p>order delivered between {Data12?.approximatetime}</p>
                    </div>
                  </div>
                  <div className="d-flex gap-2 mb-2">
                    <IoLocation
                      style={{ fontSize: "20px", color: "orangered" }}
                    />
                    <div className="">
                      <p>Delivery Address</p>
                      <h6>
                        {Data12?.delivarylocation},{Data12?.addressline}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  <h6>
                    <b>Payment Summary</b>
                  </h6>
                  <Row>
                    <Col xs={5} style={{ fontSize: "15px" }}>
                      <div>Order Total:</div>
                      <div>Delivery Charges:</div>
                      <div>GST, Services Tax:</div>
                      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                        Total:
                      </div>
                    </Col>
                    <Col xs={3} style={{ fontSize: "15px" }}>
                      <div>₹ {Data12?.subTotal}</div>
                      <div>₹ {Data12?.delivarytype}</div>
                      <div>₹ {Data12?.tax}</div>
                      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                        ₹ {Data12?.allTotal}
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <div className="d-flex gap-2">
                    <Button
                      variant="light"
                      style={{
                        backgroundColor: "white",
                        borderColor: "orange",
                      }}
                      onClick={() =>{
                
                        navigate("/Invoice", { state: { item: Data12 } })
                      }
                      }
                    >
                      Download Invoice
                    </Button>
                    <Button
                      variant=""
                      className="modal-add-btn"
                      onClick={() => placeorder()}
                    >
                      Order Again
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div div className="col-md-6 mb-2">
                <h2>Please Select Your Order</h2>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{
              backgroundColor: "#ffc156",
              color: "black",
              height: "30px",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderHistory;
