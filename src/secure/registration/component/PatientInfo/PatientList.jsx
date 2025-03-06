import React, { useEffect, useState } from "react";
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
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const PatientList = () => {
  const [filter, setFilter] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("--All--");
  const handleFilterChange = (columnId, value, type) => {
    if (type === "select") {
      setStatusFilter(value);
    }
    setFilter({ ...filter, [columnId]: value });
  };
   const handleDateChange = (columnId, e) => {
      let value = moment(e).format("DD/MM/YYYY");
      if (value === "Invalid date") {
        setFilter({ ...filter, [columnId]: "" });
      } else {
        setFilter({ ...filter, [columnId]: value });
      }
    };
  const columns = [
    { id: "s_no", label: "S.No", filter: false },
    { id: "patient_type", label: "Registration Date", filter: false },
    { id: "mr_number", label: "MRD Number", filter: true, type: "input" },
    // { id: "visit_date", label: "Visit Date", filter: true, type: "date" },
    { id: "patient_name", label: "Patient name", filter: true, type: "input" },
    { id: "doctor", label: "DOB", filter: true, type: "input" },
    { id: "recall_date", label: "Gender", filter: true, type: "date" },
    { id: "Plan_of_care", label: "Nationality", filter: false },
    { id: "status", label: "Status", filter: true, type: "select" },
    { id: "actions", label: "Options", filter: false },
  ];
  return (
    <Box width={"100%"}>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table>
          <TableHead sx={{ height: "1em" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell padding="8px">
                  {column.filter && column.type === "input" && (
                    <TextField
                      size="small"
                      className="filter-input"
                      id={column.id}
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
                      sx={{ width: "130px" }}
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
                        {/* {status.map((option, index) => {
                          return (
                            <MenuItem
                              key={`${option.id}_${index}`}
                              value={option.label}
                            >
                              {option.label}
                            </MenuItem>
                          );
                        })} */}
                      </Select>
                    </FormControl>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {filteredData?.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => {
                return (
                  column.id !== "actions" && (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  )
                );
              })} */}
            <TableRow>
              <TableCell>No Data</TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PatientList;
