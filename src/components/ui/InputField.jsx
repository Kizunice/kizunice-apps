import React  from "react";

const InputField = ({ value, label, name, placeholder, type, onChange, readOnly, style }) => (
  <div className="form-control">
    {label && <label htmlFor="input-field label!important">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className={`input input-bordered w-full ${style}`}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
    />
  </div>
);

export default InputField;