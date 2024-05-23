import React  from "react";

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
  <div className="form-control">
    {label && <label htmlFor="input-field label">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className=" input input-bordered w-full"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default InputField;