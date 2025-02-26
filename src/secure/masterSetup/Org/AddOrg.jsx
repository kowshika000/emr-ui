import React, { useState } from "react";
import FormInput from "../../../components/FormFields/FormInput";
import { Button } from "@mui/material";

const AddOrg = () => {
  const [showBranch, setShowBranch] = useState(false);
  return (
    <div>
      {!showBranch ? (
        <div className="form-details-section ">
          <FormInput label={" Hospital Name"} />
          <FormInput label={"Address"} />
          <FormInput label={"Zone(district)"} />
          <FormInput label={"City"} />
          <FormInput label={"Postal Code"} />
          <div>
            <Button color="primary" onClick={() => setShowBranch(true)}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="form-details-section mt-4">
          <FormInput label={" No. of Branches"} />
          <FormInput label={"Logo"} type="file" />
          <FormInput label={"TRN No"} />
          <FormInput label={"Location"} />
          <FormInput label={"DHA License No"} />
          <FormInput label={"Address"} />
          <FormInput label={"DHA User Name"} />
          <FormInput label={"Password"} />
          <FormInput label={"Email ID"} />
          <FormInput label={"Mobile No"} />
          <FormInput label={"Website Link"} />
          <div>
            <Button color="primary">Create</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrg;
