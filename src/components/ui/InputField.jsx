import React  from "react";

const InputField = ({ value, pattern, max, label, name, placeholder, type, onChange, readOnly, style, labelStyle }) => (
  <div className="form-control">
    {label && <label className={`input-field label!important ${labelStyle}`}>{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      pattern={pattern} 
      max={max}
      className={`input input-bordered focus:border-blue w-full ${style}`}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
    />
  </div>
);

export default InputField;