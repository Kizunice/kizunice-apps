import React  from "react";

const SelectField = ({ label, name, defaultValue, placeholder, options, onChange}) => (
  <div className="form-control">
    {label && <label htmlFor="input-field label">{label}</label>}
    <select
      name={name}
      defaultValue={defaultValue}
      className="input input-bordered w-full"
      placeholder="category"
      onChange={onChange}
    >
        {options.map(option =>{
            return (
                <option key={option.value} value={option.value}>{option.label}</option>
            )
        })}
    </select>
  </div>
);

export default SelectField;