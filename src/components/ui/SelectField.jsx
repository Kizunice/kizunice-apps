import React  from "react";

const SelectField = ({ label, name, placeholder, options, onChange}) => (
  <div className="form-control">
    {label && <label htmlFor="input-field label">{label}</label>}
    <select
      name={name}
      className="input input-bordered w-full"
      placeholder={placeholder}
      onChange={onChange}
    >
        {options.map(option =>{
            return (
                <option value={option.value}>{option.label}</option>
            )
        })}
    </select>
  </div>
);

export default SelectField;