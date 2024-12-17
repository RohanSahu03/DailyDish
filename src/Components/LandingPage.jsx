import React, { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Container,
  Form,
  Modal,
} from "react-bootstrap";
import { FaCheck, FaHome } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import "../Styles/Landingpage.css";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const Navigate = useNavigate();

  const handleSelection = (option) => {
    setSelectedOption(option);

    // localStorage.setItem("addresstype", option);
    // localStorage.removeItem("address");
    // sessionStorage.removeItem("Savedaddress")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected option:", selectedOption);
  };

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const Handeledata = () => {
  //   try {
  //     if (ab) {
  //       let data = JSON.parse(ab);
  //       localStorage.setItem("address", data?.Address);
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <Container>
        <div className="row p-0 landingpage ">
          <div className="col-md-6 p-0 left">
            <div className="col-md-12">
              <img
                src="Assets/homeimg.JPG"
                alt=""
                className="landing-left-img"
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="main">
              {/* <div className="screenone-title mb-2">
                <span>Home food Starts at</span>
                <br />
                <Button
                  variant=""
                  className="modal-add-btn"
                  style={{
                    borderLeft: "dotted",
                    borderBottom: "double",
                  }}
                >
                  49
                </Button>
              </div> */}
              <div className="hellodeliver">
                <h6 className=" mbl mt-3">Hello!</h6>
                <p className="mbl">Where to Deliver?</p>
              </div>
              <Form onSubmit={handleSubmit} className=" mbl-selectr mt-3">
                <Form.Group
                  style={{
                    display: "flex",
                    gap: "25px",
                    justifyContent: "center",
                    padding: "0px 25px",
                  }}
                >
                  <div className="button-container">
                    <div
                      variant={selectedOption === "apartment" ? "white" : ""}
                      className={`selection-button ${
                        selectedOption === "apartment" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSelection("apartment");
                        localStorage.setItem("addresstype", "apartment");
                        Navigate("/home");
                      }}
                    >
                      <img
                        src="/Assets/apartment.png"
                        alt=""
                        srcset=""
                        className="office"
                      />
                      <h6 className="mt-2" style={{ color: "black" }}>
                        Apartment
                      </h6>
                      {selectedOption === "apartment" && (
                        <div className="top-right-icon">
                          <FaCheck />
                        </div>
                      )}
                    </div>

                    <b className="mbl-name">Apartment</b>
                  </div>
                  <div className="button-container">
                    <div
                      variant={selectedOption === "corporate" ? "white" : ""}
                      className={`selection-button ${
                        selectedOption === "corporate" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSelection("corporate");
                        localStorage.setItem("addresstype", "corporate");
                        Navigate("/home");
                      }}
                    >
                      <img
                        src="/Assets/office.png"
                        alt=""
                        srcset=""
                        className="office"
                      />

                      {/* <div className="balloon">
                      
                      </div> */}
                      <h6 className="mt-2" style={{ color: "black" }}>
                        Corporate
                      </h6>
                      {selectedOption === "corporate" && (
                        <div className="top-right-icon">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                    <b className="mbl-name">Corporate</b>
                  </div>
                </Form.Group>
                {/* <Button
                  variant=""
                  disabled={!selectedOption}
                  className="contiBtn"
            
                  onClick={() => Navigate("/home")}
                >
                  Continue
                </Button> */}
              </Form>
              {/* <a
                href="https://www.youtube.com/@dailydish8803/featured"
                target="_blank"
                className="why-us-link"
                style={{ color: "unset", textDecoration: "none" }}
              >
                <img src="Assets/why.JPG" alt="" className="why-img" />
              </a> */}

              {/* <img
                src="Assets/dailydishlogo.jpeg"
                alt=""
                className="bottom-logo"
              /> */}
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center mt-3 mb-2">
       

            <div className="col-md-4 mb-2">
              <p>© 2024 Chef Innovation all rights reserved.
              </p>
            </div>

         
          </div>
      </Container>

      {/* Address Add Modal  */}
      {/* <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              className="radio"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Form.Check type="radio" label="Apartment" name="radio" />
              <Form.Check type="radio" label="Corporate" name="radio" />
            </div>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              style={{ marginTop: "18px" }}
            />
            <Form.Control
              type="text"
              placeholder="Enter Flat No, Building Name"
              style={{ marginTop: "18px" }}
            />
            <Form.Control
              type="number"
              placeholder="Enter Pincode"
              style={{ marginTop: "18px" }}
            />
            <Form.Control
              type="number"
              placeholder="Enter Phone Number"
              style={{ marginTop: "18px" }}
            />
            <Button style={{ width: "100%", marginTop: "24px" }}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default LandingPage;
