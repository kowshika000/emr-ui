import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Row, Form, Button } from "react-bootstrap";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const BlockAvailability = () => {
  const [formData, setFormData] = useState({
    doctorId: "",
    title: "",
    startTime: "",
    endTime: ""
  });
  const [specialistList, setSpecialistList] = useState([]);

  // useEffect(() => {
  //   setEventData(formData);
  // }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChangeStartTime = (e) => {
    setFormData({
      ...formData,
      ["startTime"]: e?.format("HH:mm:ss")
    });
  };

  const handleChangeEndTime = (e) => {
    setFormData({
      ...formData,
      ["endTime"]: e?.format("HH:mm:ss")
    });
  };

  const blockAvailability = () => {};

  return (
    <Box width={"50%"}>
      <Form>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="mt-3">{"Specialist"}</Form.Label>
            <Form.Select
              value={formData.doctorId}
              onChange={handleChange}
              name="doctorId"
            >
              <option value={"-1"}>select...</option>
              {specialistList.map((type) => {
                return <option value={type.doctorId}>{type.doctorName}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-3">Title</Form.Label>
            <Form.Control
              name="title"
              required={true}
              value={formData.title}
              type="text"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-3">Start Time</Form.Label>
            <Box width={"100%"}>
              <TimePicker
                name="startTime"
                onChange={handleChangeStartTime}
                ampm={false}
                // value={formData.startTime}
                sx={{ width: "100%" }}
              />
            </Box>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-3">End Time</Form.Label>
            <Box width={"100%"}>
              <TimePicker
                name="endTime"
                // value={formData.endTime}
                onChange={handleChangeEndTime}
                sx={{ width: "100%" }}
                ampm={false}
              />
            </Box>
          </Form.Group>
        </Row>
      </Form>

      <Box
        display={"flex"}
        padding={"0.5em"}
        width={"100%"}
        justifyContent={"flex-end"}
      >
        <Button color="danger" onClick={blockAvailability}>
          Block Availability
        </Button>
      </Box>
    </Box>
  );
};

export default BlockAvailability;
