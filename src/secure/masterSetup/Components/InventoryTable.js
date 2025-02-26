import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const InventoryTable = () => {
  // JSON Data stored in state
  const [inventoryData, setInventoryData] = useState([
    {
      "Sl No.": 1,
      "Category": "CONSUMABLES",
      "Sub Category": "MEDICAL CONSUMABLE",
      "Item Code": "IMC-00001",
      "Item Name": "GLOVES NITRILE EXAM SIZE:LARGE 100/BOX REF:NGPF7003 SYNGUARD",
      "Manufacturer": "SYNGUARD",
      "Purchase Unit": "BOX",
      "Purchase Price": 8,
      "Units Per Pack": 100,
      "Sale Unit": "PCS",
      "Sale Price": 1,
      "Salable": "Y"
    },
    {
      "Sl No.": 2,
      "Category": "CONSUMABLES",
      "Sub Category": "MEDICAL CONSUMABLE",
      "Item Code": "IMC-00002",
      "Item Name": "GLOVES NITRILE EXAM SIZE:SMALL 100/BOX REF:NGPF7001 SYNGUARD",
      "Manufacturer": "SYNGUARD",
      "Purchase Unit": "BOX",
      "Purchase Price": 8,
      "Units Per Pack": 100,
      "Sale Unit": "PCS",
      "Sale Price": 1,
      "Salable": "Y"
    }
  ]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sl No.</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sub Category</TableCell>
            <TableCell>Item Code</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Purchase Unit</TableCell>
            <TableCell>Purchase Price</TableCell>
            <TableCell>Units Per Pack</TableCell>
            <TableCell>Sale Unit</TableCell>
            <TableCell>Sale Price</TableCell>
            <TableCell>Salable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventoryData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item["Sl No."]}</TableCell>
              <TableCell>{item.Category}</TableCell>
              <TableCell>{item["Sub Category"]}</TableCell>
              <TableCell>{item["Item Code"]}</TableCell>
              <TableCell>{item["Item Name"]}</TableCell>
              <TableCell>{item.Manufacturer}</TableCell>
              <TableCell>{item["Purchase Unit"]}</TableCell>
              <TableCell>${item["Purchase Price"]}</TableCell>
              <TableCell>{item["Units Per Pack"]}</TableCell>
              <TableCell>{item["Sale Unit"]}</TableCell>
              <TableCell>${item["Sale Price"]}</TableCell>
              <TableCell>{item.Salable === "Y" ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
