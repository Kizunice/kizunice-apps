import React  from "react";
import Select from 'react-select';

const customStyles = {
  control: base => ({
    ...base,
    height: '3rem',
    minHeight: 35,
    borderRadius:'0.5rem'
  })
};

const SelectField = ({ label, name, isMulti, defaultValue, placeholder, options, onChange, value}) => (
  // <div className="form-control">
  //   {label && <label htmlFor="input-field label">{label}</label>}
  //   <select
  //     name={name}
  //     defaultValue={defaultValue}
  //     className="input input-bordered w-full"
  //     placeholder={placeholder}
  //     onChange={onChange}
  //   >
  //       <option disabled selected>{optionName}</option>
  //       {options.map(option =>{
  //           return (
  //             <option key={option.value} value={option.value}>{option.label}</option>
  //           )
  //       })}
  //   </select>
  // </div>
  <div className="form-control">
    {label && <label htmlFor="input-field label">{label}</label>}
    <Select
      isMulti={isMulti}
      name={name}
      placeholder={<div>{placeholder}</div>} 
      options={options}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      className="!h-[3rem] w-full basic-multi-select"
      styles={customStyles}
    />
  </div>
);

export default SelectField;