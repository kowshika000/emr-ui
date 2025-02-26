import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const DropdownFilter = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  //   const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <Dropdown>
      <DropdownButton
        variant="success"
        id="dropdown-basic"
        title="Select Options"
      >
        {options.map((option) => (
          <div key={option} className="dropdown-item">
            <input
              type="checkbox"
              checked={!!selectedOptions[option]}
              onChange={() => handleCheckboxChange(option)}
            />
            <span className="ms-2">{option}</span>
          </div>
        ))}
      </DropdownButton>
    </Dropdown>
  );
};

export default DropdownFilter;
