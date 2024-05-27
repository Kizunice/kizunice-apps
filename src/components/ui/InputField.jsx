import React  from "react";

const InputField = ({ value, label, name, placeholder, type, onChange, readOnly }) => (
  <div className="form-control">
    {label && <label htmlFor="input-field label">{label}</label>}
    <input
      type={type}
            value={value}
      name={name}
      className=" input input-bordered w-full"
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
    />
  </div>
);

export default InputField;