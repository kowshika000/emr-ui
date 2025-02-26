import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  FormControl,
  MenuItem,
  Paper
} from "@mui/material";
import EMRLoader from "../../../../../components/global/loader/EMRLoaderOverlay";
import { useLoading } from "../../../../../components/global/loader/LoadingContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import EMRMenuIcon from "../../../../../components/global/EMRMenuIcon";
import MedicalInformationOutlined from "@mui/icons-material/MedicalInformationOutlined";
import { useNavigate } from "react-router-dom";
import { ipInsurance } from "../../../data";
import "../../../insurance.css";

const ManualSubmission = () => {
  const [filter, setFilter] = useState({});
  const [statusFilter, setStatusFilter] = useState("--All--");
  const [appointments, setAppointments] = useState([]);
  const { loading, setLoading } = useLoading();
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const tableRef = useRef();
  const navigate = useNavigate();

  const columns = [
    { id: "claim_no", label: "Claim No", filter: false },
    { id: "insurar_name", label: "Insurar Name", filter: false },
    {
      id: "total_claims",
      label: "Total Claims",
      width: 200,
      filter: false,
      children: [
        {
          id: "count",
          label: "Count",
          filter: true,
          type: "input"
        },
        { id: "Amount", label: "amount", filter: true, type: "input" }
      ]
    },
    {
      id: "pending_claims",
      label: "Pending Claims",
      filter: false,
      width: 500,
      children: [
        {
          id: "verification",
          label: "Verification",
          filter: false,
          children: [
            {
              id: "count",
              label: "Count",
              filter: true,
              type: "input"
            },
            { id: "Amount", label: "amount", filter: true, type: "input" }
          ]
        },
        {
          id: "submission",
          label: "Submission",
          filter: false,
          children: [
            {
              id: "count",
              label: "Count",
              filter: true,
              type: "input"
            },
            { id: "Amount", label: "amount", filter: true, type: "input" }
          ]
        }
      ]
    },
    {
      id: "Submitted Claims",
      label: "submitted_claims",
      filter: false,
      width: 250,
      children: [
        {
          id: "count",
          label: "Count",
          filter: true,
          type: "input"
        },
        { id: "Amount", label: "amount", filter: true, type: "input" }
      ]
    }
  ];

  const status = [
    { id: "all", label: "--All--" },
    { id: "pending", label: "Pending" },
    { id: "verified", label: "Verified" },
    { id: "submitted", label: "Submitted" },
    { id: "re-submitted_pending", label: "Re-Submitted Pending" },
    { id: "re-verified", label: "Re-Verified" },
    { id: "re-submitted", label: "Re-Submitted" },
    { id: "re-re-submitted_pending", label: "Re-Re-Submitted Pending" },
    { id: "re-re-verified", label: "Re-Re-Verified" },
    { id: "re-re-submitted", label: "Re-Re-Submitted" },
    { id: "write_off", label: "Write Off" },
    { id: "cancelled ", label: "Cancelled" }
  ];

  const handleFilterChange = (columnId, value, type) => {
    if (type === "select") {
      setStatusFilter(value);
    }
    setFilter({ ...filter, [columnId]: value });
  };

  const onCreatePatientVisit = (params) => {
    navigate("/secure/registration");
  };

  const dropDownMenuItems = [
    {
      name: "Create Patient Visit",
      icon: MedicalInformationOutlined,
      callback: onCreatePatientVisit
    }
  ];

  const handleDateChange = (columnId, e) => {
    let value = moment(e).format("DD/MM/YYYY");
    if (value === "Invalid date") {
      setFilter({ ...filter, [columnId]: "" });
    } else {
      setFilter({ ...filter, [columnId]: value });
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = tableRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 1 && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Box padding={"1em"} width={"100%"} id="manual-insurance-page">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>OP INSURANCE : CLAIM INVOICES LIST</Box>
        <Box>{moment().format("LLLL")}</Box>
      </Box>
      <EMRLoader show={loading} />
      <TableContainer
        style={{ height: "75vh" }}
        component={Paper}
        onScroll={handleScroll}
        ref={tableRef}
      >
        <Table style={{ overflow: "auto" }}>
          <TableHead sx={{ height: "1em" }}>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell>
                    {column.children ? (
                      <Box width={column.width ? `${column.width}px` : "200px"}>
                        <Box>{column.label}</Box>
                        <hr></hr>
                        <Box display={"flex"} px={1}>
                          {column.children.map((child) => {
                            console.log({ child });
                            return child.children ? (
                              <Box width={"500px"}>
                                <Box>{child.label}</Box>
                                <hr></hr>
                                <Box display={"flex"} px={1}>
                                  {child.children.map((innerChild) => {
                                    return (
                                      <Box width={"50%"}>
                                        {innerChild.label} <hr></hr>
                                      </Box>
                                    );
                                  })}
                                </Box>
                              </Box>
                            ) : (
                              <Box width={"50%"}>
                                {child.label} <hr></hr>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    ) : (
                      <Box>{column.label}</Box>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow style={{ backgroundColor: "white" }}>
              {columns.map((column) => (
                <TableCell padding="8px">
                  {column.filter && column.type === "input" && (
                    <TextField
                      size="small"
                      id={column.id}
                      className="filter-input"
                      value={filter[column.id] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.id, e.target.value, "input")
                      }
                    >
                      {column.label}
                    </TextField>
                  )}
                  {column.filter && column.type === "date" && (
                    <DatePicker
                      className="filter-input"
                      slotProps={{ actionBar: { actions: ["clear"] } }}
                      onChange={(e) => handleDateChange(column.id, e)}
                    />
                  )}
                  {column.filter && column.type === "select" && (
                    <FormControl fullWidth>
                      <Select
                        id="status-select"
                        className="filter-input"
                        value={statusFilter}
                        onChange={(e) =>
                          handleFilterChange(
                            column.id,
                            e.target.value,
                            "select"
                          )
                        }
                      >
                        {status.map((option, index) => {
                          return (
                            <MenuItem
                              key={`${option.id}_${index}`}
                              value={option.label}
                            >
                              {option.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ipInsurance?.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => {
                  return (
                    column.id !== "actions" && (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    )
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManualSubmission;
