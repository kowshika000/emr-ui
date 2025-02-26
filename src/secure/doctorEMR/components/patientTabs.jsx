import React, { useState } from "react";
import "./patientTab.css"; // Add your CSS classes here
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const PatientTabs = () => {
  const [activeTab, setActiveTab] = useState("patientDetails");

  const renderContent = () => {
    switch (activeTab) {
      case "patientDetails":
        return (
          <div>
            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>MRD No:</strong> 12345
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>Patient Name:</strong> Punithaa
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>Gender:</strong> Female
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>Age:</strong> 30
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>DOB:</strong> 1993-06-15
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>Mobile Number:</strong> 9876543210
                </p>
              </div>
            </div>
            <h5 className="text-start mt-1 mb-2 text-decoration-underline">
              Consultation Details
            </h5>
            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>Nationality:</strong> Indian
                </p>
              </div>

              <div className="col-md-2">
                <p>
                  <strong>Address:</strong> 123 Street, City
                </p>
              </div>

              <div className="col-md-2">
                <p>
                  <strong>Email:</strong> punithaa@example.com
                </p>
              </div>

              <div className="col-md-2">
                <p>
                  <strong>Insurance:</strong> ABC Health
                </p>
              </div>

              <div className="col-md-2">
                <p>
                  <strong>Sub-Insurance:</strong> XYZ Sub
                </p>
              </div>

              <div className="col-md-2">
                <p>
                  <strong>Co-Payment:</strong> 20%
                </p>
              </div>

              <div className="col-md-2">
                <p>
                  <strong>Cash:</strong> 1000
                </p>
              </div>

              <div className="col-md-2">
                <p>
                  <strong>Pending:</strong> 200
                </p>
              </div>

              <div className="col-md-2">
                <p>
                  <strong>Advice:</strong> Follow up in 2 weeks
                </p>
              </div>
            </div>
          </div>
        );
      case "referral":
        return (
          <div>
            <p class="d-inline-flex gap-1">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample1"
                aria-expanded="false"
                aria-controls="collapseExample1"
              >
                Refer to doctor
              </button>
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample1"
                aria-expanded="false"
                aria-controls="collapseExample1"
              >
                Refer to clinic
              </button>
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample2"
                aria-expanded="false"
                aria-controls="collapseExample2"
              >
                Refer to IP
              </button>
            </p>
            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>Referred By:</strong> Dr. Smith
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>Patient Name:</strong> Punithaa
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>Gender:</strong> Female
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>Age:</strong> 30
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>DOB:</strong> 1993-06-15
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <strong>Mobile Number:</strong> 9876543210
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <strong>Status:</strong> In Progress
                </p>
              </div>
            </div>

            <div class="collapse" id="collapseExample1">
              <div class="card card-body">
                <div className="row">
                  <div className="col-md-2">
                    <label>
                      <strong>Specialty</strong>
                    </label>
                    <select className="form-control">
                      <option value="" disabled selected>
                        Select Specialty
                      </option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="general">General Medicine</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label>
                      <strong>Doctor Name</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Doctor's Name"
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary mt-2">Refer</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="collapse" id="collapseExample2">
              <div class="card card-body">
                <div className="row">
                  <div className="col-md-2">
                    <label>
                      <strong>Specialty</strong>
                    </label>
                    <select className="form-control">
                      <option value="" disabled selected>
                        Select Specialty
                      </option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="general">General Medicine</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label>
                      <strong>Doctor Name</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Doctor's Name"
                    />
                  </div>
                  <div className="col-md-2">
                    <label>
                      <strong>Remarks</strong>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Remarks"
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary mt-2">Refer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="box-wrapper">
      <div className="container-fulid mt-1">
        <nav className="nav  justify-content-end ">
          <button
            className={`nav-link ${
              activeTab === "patientDetails" ? "active" : ""
            }`}
            onClick={() => setActiveTab("patientDetails")}
          >
            Patient Details
          </button>
          <button
            className={`nav-link ${
              activeTab === "referredByDoctor" ? "active" : ""
            }`}
            onClick={() => setActiveTab("referral")}
          >
            Referral
          </button>
        </nav>
        <div className="tab-content mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default PatientTabs;
