import React, { useState } from "react";
import "./patientDetails.css";
function PatientDetails() {
  const [showReferralDetials, setShowReferralDetails] = useState(false);

  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <div className="d-flex align-items-center justify-content-between">
            <div className="accordion-header w-100">
              <div className="row w-100">
                <div className="col-md-4">
                  <p>
                    <strong>MRD No:</strong> 12345
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Patient Name:</strong> Punithaa
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>DOB:</strong> 1993-06-15
                  </p>
                </div>

                <div className="col-md-2">
                  <p>
                    <strong>Mobile Number:</strong> 9876543210
                  </p>
                </div>
                <div className="col-md-1 text-end">
                  <a
                    href="#"
                    className="nav-link"
                    id="consultationLink"
                    onClick={() => setShowReferralDetails(false)}
                  >
                    Consultation Details
                  </a>
                </div>
                <div className="col-md-1 text-end">
                  <a
                    href="#"
                    className="nav-link"
                    id="referralLink"
                    onClick={() => setShowReferralDetails(true)}
                  >
                    Referral
                  </a>
                </div>
              </div>
            </div>

            <button
              className="accordion-arrow-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            ></button>
          </div>

          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {showReferralDetials ? (
                <div>
                  <p className="d-inline-flex gap-1">
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample1"
                      aria-expanded="false"
                      aria-controls="collapseExample1"
                    >
                      Refer to doctor
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample1"
                      aria-expanded="false"
                      aria-controls="collapseExample1"
                    >
                      Refer to clinic
                    </button>
                    <button
                      className="btn btn-primary"
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

                  <div className="collapse" id="collapseExample1">
                    <div className="card card-body">
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
                          <button className="btn btn-primary mt-2">
                            Refer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="collapse" id="collapseExample2">
                    <div className="card card-body">
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
                          <button className="btn btn-primary mt-2">
                            Refer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PatientDetails;
