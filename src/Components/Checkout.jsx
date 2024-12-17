import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { MdRemoveShoppingCart } from "react-icons/md";
import "../Styles/Checkout.css";
import { FaCheck, FaEdit } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { IoIosEye } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import axios from "axios";
import swal from "sweetalert";
// import crypto from "crypto";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state;
  const addresstype = localStorage.getItem("addresstype");

  const address =
    addresstype == "apartment"
      ? JSON.parse(localStorage.getItem("address"))
      : JSON.parse(localStorage.getItem("coporateaddress"));

  console.log("address", address);

  const Carts = JSON.parse(localStorage.getItem("cart"));
  const [cartdata, setCartData] = useState([]);
  console.log("carts", Carts);
  const user = JSON.parse(localStorage.getItem("user"));
  const defaultaddress = JSON.parse(sessionStorage.getItem("defaultaddress"));
 
  
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const session = JSON.parse(sessionStorage.getItem("user"));

  const [apartmentdata, setapartmentdata] = useState([]);
  const getapartmentd = async () => {
    try {
      let res = await axios.get(
        "https://dailydishbangalore.com/api/admin/getapartment"
      );
      if (res.status === 200) {
        setapartmentdata(res.data.corporatedata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [corporatedata, setcorporatedata] = useState([]);
  const getCorporatedata = async () => {
    try {
      let res = await axios.get(
        "https://dailydishbangalore.com/api/admin/getcorporate"
      );
      if (res.status === 200) {
        setcorporatedata(res.data.corporatedata);
        console.log("cor", res.data.corporatedata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalTaxPercent = useMemo(() => {
    return Carts?.reduce((totalTaxPercent, item) => {
      // const tax = Number(item.gst) * Number(item.Quantity); // Adjust for Quantity
      return totalTaxPercent + Number(item.gst);
    }, 0); // Initial value for totalTax is 0
  }, [Carts]);

  const totalTax = useMemo(() => {
    return Carts?.reduce((totalTax, item) => {
      const tax = (item.totalPrice * item.gst) / 100; // Adjust for Quantity
      return totalTax + tax;
    }, 0); // Initial value for totalTax is 0
  }, [Carts]);

  // Fetch data from local storage on component mount and whenever cart changes
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartData(storedCart);
  }, []);

  // Function to update local storage and state
  const updateCartData = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartData(updatedCart); // Update state to re-render the component
  };

  const increaseQuantity = (itemdata) => {
    const updatedCart = cartdata.map((item) => {
      if (item.foodItemId === itemdata?.foodItemId) {
        if (item.Quantity < item.remainingstock) {
          item.Quantity += 1;
          item.totalPrice = Number(item.price) * Number(item.Quantity);
        } else {
          alert("No more stock available!");
        }
      }
      return item;
    });
    updateCartData(updatedCart);
  };

  // Function to decrease quantity
  const decreaseQuantity = (itemdata) => {
    const updatedCart = cartdata
      .map((item) => {
        if (item.foodItemId === itemdata?.foodItemId) {
          if (item.Quantity > 0) {
            item.Quantity -= 1;
            item.totalPrice = item.price * item.Quantity;
          } else {
            alert("Minimum quantity reached!");
          }
        }
        return item;
      })
      .filter((item) => item.Quantity > 0);
    updateCartData(updatedCart);
  };

  const [show1, setShow1] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [delivarychargetype, setdelivarychargetype] = useState(0);
  const [delivaryaddress, setdelivaryaddress] = useState(address?.Address);
  console.log("delivaryaddress", delivaryaddress);
  const [slotdata, setslotdata] = useState();
  const [payid, setpayid] = useState("pay001");
  const [Cutlery, setCutlery] = useState(0);
  const [paymentmethod, setpaymentmethod] = useState("offline");
  console.log("delivarychargetype", delivarychargetype);
  console.log("address", address);

  const [name, setname] = useState();
  const [buildingaddress, setbuildingaddress] = useState();
  const [pincode, setpincode] = useState();
  const [mobilenumber, setmobilenumber] = useState();
  const [selectedValue, setSelectedValue] = useState("Apartment");
  const [flat, setFlat] = useState("");

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelection = (deliveryCharge, option) => {
    setdelivarychargetype(deliveryCharge); // Sets the delivery charge
    setSelectedOption(option); // Sets the selected option
    console.log("vvv", option);
  };

  //scroll window top
  useEffect(() => {});
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const d = new Date();

  const formattedProducts = cartdata?.map((item) => ({
    foodItemId: item.foodItemId,
    totalPrice: item.totalPrice,
    quantity: item.Quantity, // Using Quantity as per the structure
  }));
  const clearCart = async () => {
    // Log to confirm the action
    console.log("Clearing all items from cart");

    // Clear the cart in localStorage
    localStorage.removeItem("cart");

    // Optional: reload the page to reflect changes
    // window.location.reload();
  };
  const [slotsdata, setslotsdata] = useState([]);
  const getslotsdata = async () => {
    try {
      let res = await axios.get(
        "https://dailydishbangalore.com/api/admin/getavailableslots"
      );
      if (res.status === 200) {
        setslotsdata(res.data.Newaddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getslotsdata();
  }, []);

  const generateUniqueId = () => {
    const timestamp = Date.now().toString().slice(-4); // Get last 4 digits of the current timestamp
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    return `${address?.prefixcode}${timestamp}${randomNumber}`; // Resulting in an 8-character ID
  };

  const placeorder = async () => {
    try {
      if (Carts.length < 1) {
        return alert("Please add items to cart");
      }
      if (!delivarychargetype && delivarychargetype != 0) {
        return alert("Please select the Delivary Type!");
      }
      if (!delivaryaddress) {
        return alert("Please select the Delivary address!");
      }
      if (!slotdata) {
        return alert("Please select slot time!");
      }
      if (!addresstype) {
        return alert("Please select the address type!");
      }
      const config = {
        url: "/admin/addfoodorder",
        method: "post",
        baseURL: "https://dailydishbangalore.com/api/",
        header: { "content-type": "application/json" },
        data: {
          customerId: user?._id,
          allProduct: formattedProducts,
          Placedon: d,
          delivarylocation: delivaryaddress,
          username: user?.Fname,
          Mobilenumber: Number(user?.Mobile),
          paymentmethod: paymentmethod,
          delivarytype: Number(delivarychargetype || 0),
          payid: payid,
          addressline: user?.Address,
          subTotal: subtotal,
          foodtotal: Number(data?.total),
          allTotal: (
            calculateTaxPrice +
            subtotal +
            Cutlery +
            delivarychargetype
          )?.toFixed(2),
          tax: calculateTaxPrice,
          slot: slotdata,
          Cutlery: Number(Cutlery),
          approximatetime: selectedSlot,
          orderdelivarytype: addresstype,
          orderstatus: "Cooking",
          apartment: address?.apartmentname,
          prefixcode: address?.prefixcode,
          orderid: generateUniqueId(),
          deliveryMethod: selectedOption,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        swal({
          title: "Success!",
          text: "Order Placed Successfully",
          icon: "success", // Available options: 'success', 'error', 'warning', 'info', 'question'
          button: "OK",
        });
        navigate("/orders");
        clearCart();
        // window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Error!",
        text: "Order not complete",
        icon: "error",
        button: "Try Again",
      });
    }
  };
  console.log("apa", apartmentdata);

  const Savedaddressdata = JSON.parse(sessionStorage.getItem("Savedaddress"));
  console.log("Savedaddressdata", Savedaddressdata);

  const Handeledata = () => {
    if (!apartmentname) {
      return alert("Please Select Apartment");
    }
    if (!name) {
      return alert("Please Enter Name!");
    }
    if (!buildingaddress) {
      return alert("Please Enter Building Address!");
    }
    // if (!flat) {
    //   return alert("Please Enter Flat No");
    // }
    if (!mobilenumber) {
      return alert("Please Enter Mobile Number!");
    }
    try {
      const Savedaddress = {
        apartmentname: apartmentdata?.find(
          (data) => data?._id === apartmentname
        )?.Apartmentname,
        Delivarycharge: apartmentdata?.find(
          (data) => data?._id === apartmentname
        )?.apartmentdelivaryprice,
        doordelivarycharge: apartmentdata?.find(
          (data) => data?._id === apartmentname
        )?.doordelivaryprice,
        buildingaddress: buildingaddress,
        flatno: flat,
        mobilenumber: mobilenumber,
        prefixcode: apartmentdata?.find((data) => data?._id === apartmentname)
          ?.prefixcode,
      };

      const defaultaddress = {
        Apartmentdata: apartmentname,
        Fname: name,
        Mobile: mobilenumber,
        Flatno: buildingaddress,
      };
      // setdelivaryaddress(Savedaddress);
      console.log("session", Savedaddress);
      localStorage.setItem("address", JSON.stringify(Savedaddress));
      sessionStorage.setItem("defaultaddress", JSON.stringify(defaultaddress));
      sessionStorage.setItem("Savedaddress", JSON.stringify(Savedaddress));
      handleClose();
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to convert 24-hour time format to 12-hour AM/PM format
  const formatTo12Hour = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute} ${suffix}`;
  };

  // Function to convert a range of times (e.g. "1:00-1:45") into AM/PM format
  const formatSlotRange = (startTime, endTime) => {
    const formattedStart = formatTo12Hour(startTime);
    const formattedEnd = formatTo12Hour(endTime);
    return `${formattedStart} - ${formattedEnd}`;
  };

  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [fooditemdata, setfooditemdata] = useState([]);
  const getfooditems = async () => {
    try {
      let res = await axios.get(
        "https://dailydishbangalore.com/api/admin/getFoodItems"
      );
      if (res.status === 200) {
        setfooditemdata(res.data.data);
        console.log("food", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getfooditems();
  }, []);

  const filterOutLowStockItems = () => {
    let filteredCart = []; // To store items that pass the filter condition

    setCartData((prevCart) => {
      filteredCart = prevCart.filter((cartItem) => {
        const matchingFood = fooditemdata.find(
          (food) => food._id === cartItem._id
        );
        // Keep items in the cart only if Remainingstock is 1 or more
        return matchingFood ? matchingFood.Remainingstock >= 1 : true;
      });

      // Save filteredCart to localStorage
      localStorage.setItem("cart", JSON.stringify(filteredCart));

      return filteredCart; // Update state with filtered cart
    });
  };

  useEffect(() => {
    filterOutLowStockItems();
  }, [fooditemdata]);

  const slots = {
    lunch: {
      early: [
        { start: "12:30", end: "1:00" },
        { start: "1:00", end: "1:30" },
      ],
      // midday: [
      //   { start: "1:00", end: "1:45" },
      //   { start: "1:30", end: "2:15" },
      // ],
      // late: [{ start: "1:30", end: "2:15" }],
    },
    dinner: {
      early: [
        // { start: "19:30", end: "20:15" },
        // { start: "20:00", end: "20:45" },
        { start: "20:30", end: "21:00" },
        { start: "21:00", end: "21:30" },
      ],
      //   evening: [
      //     { start: "20:00", end: "20:45" },
      //     { start: "20:30", end: "21:15" },
      //   ],
      //   night: [{ start: "20:30", end: "21:15" }],
    },
  };

  useEffect(() => {
    const getCurrentTimeSlots = () => {
      const current = new Date();
      const hours = current.getHours();

      const minutes = current.getMinutes();
      const time = `${hours > 9 ? hours : "0" + hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}`;

      let slotsToShow = [];

      // Lunch Slots: 8:00 AM - 12:30 PM
      if (time >= "08:00" && time < "12:30") {
        slotsToShow = slots.lunch.early;
      } else if (time >= "15:00" && time < "20:30") {
        slotsToShow = slots.dinner.early;
      }
      // Lunch Slots: 12:30 PM - 1:00 PM
      // else if (time >= "12:30" && time < "13:00") {
      //   slotsToShow = slots.lunch.midday;
      // }
      // Lunch Slots: 1:00 PM - 1:30 PM
      // else if (time >= "13:00" && time < "13:30") {
      //   slotsToShow = slots.lunch.late;
      // }
      // Dinner Slots: 3:00 PM - 7:30 PM

      // else if (time >= "15:00" && time < "20:30") {
      //   slotsToShow = slots.dinner.early;
      // }

      // Dinner Slots: 7:30 PM - 8:00 PM
      // else if (time >= "19:30" && time < "20:00") {
      //   slotsToShow = slots.dinner.evening;
      // }
      // // Dinner Slots: 8:00 PM - 8:30 PM
      // else if (time >= "20:00" && time < "20:30") {
      //   slotsToShow = slots.dinner.night;
      // }

      // Format slots into a range with AM/PM
      const formattedSlots = slotsToShow.map((slot) =>
        formatSlotRange(slot.start, slot.end)
      );
      setAvailableSlots(formattedSlots);
      // setAvailableSlots(slots.dinner.early)
    };

    // Set the initial slots based on the current time
    getCurrentTimeSlots();

    // Update slots every minute to keep them current
    const interval = setInterval(getCurrentTimeSlots, 60000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const [apartmentname, setApartmentname] = useState("");
  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
    setslotdata(event.target.value);
  };
  const handleApartmentChange = (event) => {
    setApartmentname(event.target.value);
    console.log("ddfdfd", event.target.value);
  };

  const subtotal = useMemo(() => {
    return cartdata?.reduce((acc, item) => {
      return Number(acc) + Number(item.price) * Number(item.Quantity);
    }, 0);
  }, [cartdata]);

  const [gstlist, setGstList] = useState([]);
  const getGst = async () => {
    try {
      let res = await axios.get(
        "https://dailydishbangalore.com/api/admin/getgst"
      );
      if (res.status === 200) {
        setGstList(res.data.gst);
        console.log("gst", res.data.gst);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGst();
  }, []);

  const calculateTaxPrice = useMemo(() => {
    return (gstlist[0]?.TotalGst / 100) * subtotal;
  }, [subtotal, gstlist]);

  return (
    <div className="mainbg">
      <Container className="checkoutcontainer">
        <div className="mycart">
          <h5>My Cart</h5>

          <a href="/home">
            <RxCross2
              onClick={() => navigate("/home")}
              style={{ fontSize: "20px" }}
            />
          </a>
        </div>

        <div className="mobile-checkout">
          <div className="cartproducts">
            <div className="cartHead mb-2 border-bottom">Dish in Basket</div>
            {cartdata?.map((item) => {
              return (
                <div className="d-flex justify-content-between mb-2  ">
                  <div className="w-50">
                    <div className="d-flex gap-2 w-100 align-items-center ">
                      <div
                        className={
                          item?.foodcategory === "Veg" ? "veg" : "non-veg"
                        }
                      ></div>
                      <div className="chekout-p-name ">{item?.foodname} </div>
                    </div>
                  </div>
                  <div className="d-flex uprdiv  w-50 align-items-center justify-content-between">
                    <span className="btnDiv ">
                      <div className="increment">
                        <FaMinus
                          onClick={() => decreaseQuantity(item)}
                          className="plusbtn"
                        />
                      </div>
                      {item?.Quantity}
                      <div className="increment">
                        <FaPlus
                          onClick={() => increaseQuantity(item)}
                          className="plusbtn"
                        />
                      </div>
                    </span>

                    <div style={{ fontWeight: 700 }}>
                      ₹{item?.price * item?.Quantity}
                    </div>
                  </div>
                </div>
              );
            })}
            {cartdata?.length === 0 && (
              <div className="text-center">
                <MdRemoveShoppingCart style={{ fontSize: "18px" }} />{" "}
                &nbsp;&nbsp;No items in cart
              </div>
            )}
          </div>

          <div className="cutleryDiv">
            <div className="d-flex">
              <input
                type="checkbox"
                className="form-check-input "
                id="customCheckbox1"
                name="Send Cutlery"
                value="Send Cutlery"
                onChange={(e) => setCutlery(e.target.checked ? 3 : 0)}
                style={{ border: "1px solid orangered" }}
              />
              <label
                class="custom-checkbox-label form-check-label"
                for="customCheckbox1"
              ></label>
              <span style={{ fontWeight: 700, marginLeft: "5px" }}>
                Cutlery
              </span>
            </div>
            <div>
              <span> ₹ 3.00</span>
            </div>
          </div>

          <div className="deliverycard">
            <div className="deliveryHead">
              <span style={{ fontWeight: 700 }}>Choose Delivery Type</span>
            </div>
            <div className="maincard">
              {/* Render Deliver to Door only if addresstype is NOT corporate */}

              {addresstype === "apartment" ? (
                <>
                  <div
                    variant={selectedOption === "Door" ? "white" : ""}
                    className={`leftcard ${
                      selectedOption === "Door" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleSelection(address?.doordelivarycharge, "Door")
                    }
                  >
                    {selectedOption === "Door" && (
                      <div className="top-right-icon">
                        <FaCheck />
                      </div>
                    )}

                    <div className="top">
                      <div className="icon">
                        <img src="/Assets/door2.png" alt="" srcset="" />
                      </div>
                    </div>
                    <div className="center mt-1">
                      {address?.doordelivarycharge > 0 ? (
                        <b> ₹ {address?.doordelivarycharge}</b>
                      ) : (
                        <b
                          style={{
                            backgroundColor: "#355f2e",
                            borderRadius: "5px",
                            padding: "1px 8px",
                            color: "white",
                            marginTop: "5px",
                          }}
                        >
                          FREE
                        </b>
                      )}
                    </div>
                    <div className="bottom">
                      <div className="icon">
                        <h6>Deliver to Doors</h6>
                      </div>
                    </div>
                  </div>
                  <div
                    variant={selectedOption === "Gate/Tower" ? "white" : ""}
                    className={`rightcard ${
                      selectedOption === "Gate/Tower" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleSelection(address?.Delivarycharge, "Gate/Tower")
                    }
                  >
                    {selectedOption === "Gate/Tower" && (
                      <div className="top-right-icon">
                        <FaCheck />
                      </div>
                    )}

                    <div className="top">
                      <div className="icon">
                        <img src="/Assets/guard.png" alt="" srcset="" />
                      </div>
                    </div>
                    <div className="center mt-1">
                      {address?.Delivarycharge > 0 ? (
                        <b> ₹ {address?.Delivarycharge}</b>
                      ) : (
                        <b
                          style={{
                            backgroundColor: "#355f2e",
                            borderRadius: "5px",
                            padding: "1px 8px",
                            color: "white",
                            marginTop: "5px",
                          }}
                        >
                          FREE
                        </b>
                      )}
                    </div>
                    <div className="bottom">
                      <div className="icon">
                        <h6>Deliver to Gate</h6>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  variant={selectedOption === "Gate/Tower" ? "white" : ""}
                  className={`rightcard ${
                    selectedOption === "Gate/Tower" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleSelection(address?.Delivarycharge, "Gate/Tower")
                  }
                >
                  {selectedOption === "Gate/Tower" && (
                    <div className="top-right-icon">
                      <FaCheck />
                    </div>
                  )}

                  <div className="top">
                    <div className="icon">
                      <img src="/Assets/guard.png" alt="" srcset="" />
                    </div>
                  </div>
                  <div className="center mt-1">
                    {address?.Delivarycharge > 0 ? (
                      <b> ₹ {address?.Delivarycharge}</b>
                    ) : (
                      <b
                        style={{
                          backgroundColor: "#355f2e",
                          borderRadius: "5px",
                          padding: "1px 8px",
                          color: "white",
                          marginTop: "5px",
                        }}
                      >
                        FREE
                      </b>
                    )}
                  </div>
                  <div className="bottom">
                    <div className="icon">
                      <h6>Deliver to Gate</h6>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="deliverycard">
            <div
              className="deliveryHead  w-100 ps-2 border-bottom"
              style={{ float: "left" }}
            >
              <span style={{ fontWeight: 700 }}>Bill Details</span>
            </div>
            <div className="maincard2">
              <div className="d-flex justify-content-between  align-items-center w-100 billdetail">
                <div>
                  <div>
                    <div>Sub Total</div>
                    <div>Tax {`(${gstlist[0]?.TotalGst} %)`}</div>
                    {Cutlery != 0 && <div>Cutlery</div>}
                    {selectedOption ? (
                      <div>{`${selectedOption} Delivery`}</div>
                    ) : (
                      ""
                    )}
                    <div>
                      <b>Bill total</b>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <div style={{ textAlign: "right" }}>
                    <div>₹ {subtotal?.toFixed(2)}</div>

                    <div>₹ {calculateTaxPrice.toFixed(2)}</div>
                    {Cutlery != 0 && <div>₹ {Cutlery} </div>}
                    {delivarychargetype ? (
                      <div>₹ {delivarychargetype} </div>
                    ) : (
                      ""
                    )}
                    <div>
                      {Cutlery ? (
                        <b>
                          ₹{" "}
                          {(
                            calculateTaxPrice +
                              subtotal +
                              Cutlery +
                              delivarychargetype || 0
                          ).toFixed(2)}{" "}
                        </b>
                      ) : (
                        <b>
                          ₹{" "}
                          {(
                            calculateTaxPrice + subtotal + delivarychargetype ||
                            0
                          ).toFixed(2)}
                        </b>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="select-container mt-2 mb-2">
            {availableSlots.length > 0 ? (
              <div>
                <form>
                  <select
                    name=""
                    id=""
                    onChange={handleSlotChange}
                    className="vi_0 slot"
                    style={{ color: "white", width: "180px" }}
                  >
                    <option
                      value=""
                      style={{ color: "white" }}
                      className="option"
                    >
                      Select Slots
                    </option>
                    {availableSlots.map((slot, index) => (
                      <option
                        value={slot}
                        style={{ color: "white" }}
                        className="option"
                      >
                        {slot}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            ) : (
              <div className="cutleryDiv">
                No available slots at the moment.
              </div>
            )}
          </div>

          {/* </div> */}

          <div className="addressCard">
            <div className="d-flex justify-content-between">
              <span style={{ fontWeight: 700 }} className="addresselipse">
                Delivering To :{/* {defaultaddress?.Apartmentdata} */}
              </span>
              <span
                onClick={() => {
                  handleShow();
                  // setdelivaryaddress("");
                  getapartmentd();
                  getCorporatedata();
                }}
                style={{ cursor: "pointer" }}
              >
                Change:
                <MdOutlineEditLocationAlt
                  style={{ color: "#F81D0F", fontSize: "18px" }}
                />
              </span>
            </div>
            {/* {defaultaddress ? (
              <>
                <div className="d-flex gap-2 flex-column"> */}
            {/* <div className="radioh5">
                    <input
                      type="radio"
                      name="DeliveryMethod"
                      value="Apartment"
                      onChange={() =>
                        setdelivaryaddress(
                          `${Savedaddressdata?.apartmentname},${Savedaddressdata?.buildingaddress}, ${Savedaddressdata?.mobilenumber}, ${Savedaddressdata?.pincode}`
                        )
                      }
                    />
                    <div>
                      <span className="ms-2">
                        {addresstype?.charAt(0).toUpperCase() +
                          addresstype?.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </div> */}
            {/* <div>
                    <div className="d-flex">
                 {  defaultaddress?.Fname},{" "}
              {defaultaddress?.Flatno},
             {defaultaddress?.adress}, {defaultaddress?.Apartmentdata?.apartmentname},
             {defaultaddress?.Mobile},
                   
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )} */}

            {defaultaddress ? (
              <>
                <div>
                  <div className="d-flex gap-3 mt-3">
                    <div>
                      <MdLocationPin
                        style={{ fontSize: "30px", color: "#F5DE43" }}
                      />
                    </div>
                    <div className="d-flex">
                      {defaultaddress?.Fname}, {defaultaddress?.Flatno},
                      {defaultaddress?.address},
                      {/* {defaultaddress?.Apartmentdata}, */}
                      {defaultaddress?.Mobile},
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div>
            {Cutlery ? (
              <>
                <Button
                  variant=""
                  style={{
                    width: "100%",
                    backgroundColor: "#F81D0F",
                    color: "white",
                  }}
                  onClick={() => placeorder()}
                  className="placeorder"
                >
                  Continue to Pay |{" "}
                  {Cutlery ? (
                    <b>
                      ₹{" "}
                      {(
                        calculateTaxPrice +
                          subtotal +
                          Cutlery +
                          delivarychargetype || 0
                      ).toFixed(2)}
                    </b>
                  ) : (
                    <b>
                      ₹{" "}
                      {(
                        calculateTaxPrice +
                        subtotal +
                        delivarychargetype
                      ).toFixed(2)}
                    </b>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant=""
                  style={{
                    width: "100%",
                    backgroundColor: "#F81D0F",
                    color: "white",
                  }}
                  className="placeorder"
                  onClick={() => placeorder()}
                >
                  Continue to Pay |{" "}
                  {Cutlery ? (
                    <b>
                      ₹{" "}
                      {(
                        calculateTaxPrice +
                          subtotal +
                          Cutlery +
                          delivarychargetype || 0
                      ).toFixed(2)}
                    </b>
                  ) : (
                    <b>
                      ₹{" "}
                      {(
                        calculateTaxPrice + subtotal + delivarychargetype || 0
                      ).toFixed(2)}
                    </b>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* New address  */}
      <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {addresstype === "apartment" ? (
              <select
                name=""
                id=""
                onChange={handleApartmentChange}
                className="vi_0 slot"
                style={{
                  color: "black",
                  width: "180px",
                  backgroundColor: "transparent",
                }}
              >
                <option value="" style={{ color: "black" }} className="option">
                  Select Apartment
                </option>
                {apartmentdata?.map((data, index) => (
                  <option
                    value={data?.Apartmentname}
                    style={{ color: "black" }}
                    className="option"
                    // onClick={()=>setpincode(data?.pincode)}
                  >
                    {data?.Apartmentname}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name=""
                id=""
                onChange={handleApartmentChange}
                className="vi_0 slot"
                style={{
                  color: "black",
                  width: "180px",
                  backgroundColor: "transparent",
                }}
              >
                <option value="" style={{ color: "black" }} className="option">
                  Select Corporate
                </option>
                {corporatedata.map((data, index) => (
                  <option
                    value={data?.Apartmentname}
                    style={{ color: "black" }}
                    className="option"
                  >
                    {data?.Apartmentname}
                  </option>
                ))}
              </select>
            )}

            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              style={{ marginTop: "18px" }}
              onChange={(e) => setname(e.target.value)}
            />
            {addresstype === "apartment" ? (
              <Form.Control
                type="text"
                placeholder="Enter Flat No, Building Name ,Address"
                style={{ marginTop: "18px" }}
                onChange={(e) => setbuildingaddress(e.target.value)}
              />
            ) : null}

            <Form.Control
              type="number"
              placeholder="Enter Phone Number"
              style={{ marginTop: "18px" }}
              onChange={(e) => setmobilenumber(e.target.value)}
            />
            <Button
              variant=""
              className="modal-add-btn"
              style={{ width: "100%", marginTop: "24px", textAlign: "center" }}
              onClick={() => Handeledata()}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* price brakup  */}
      <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title>Price Breakups </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div>
              <h6>
                <b>Bill Details</b>
              </h6>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Checkout;
