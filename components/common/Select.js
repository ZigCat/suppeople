import React, { useState } from "react";

const Select = ({
  options,
  isActive,
  setActive,
  selectedItem,
  changeSelect,
  valueKey = "name",
  byClick = null,
}) => {
  // if (process.browser && isActive) {
  //   window.addEventListener('click', event => {
  //     const select = document.querySelector('.select')
  //     if (event.target !== select) {
  //       setActive(false);
  //     }
  //   })
  // }

  return (
    <div className="select" onClick={() => setActive(!isActive)}>
      <div className="select-show">
        <span>{selectedItem[valueKey]}</span>
        <div className="select-dropdown">
          <img
            className={`select-dropdown_arrow${isActive ? "_rotated" : ""}`}
            src="/arrow_left.svg"
            alt=""
          />
          <div className={`select-dropdown_inner ${isActive ? "active" : ""}`}>
            <div className="select-dropdown_items">
              {options.map((item) => (
                <div className="select-dropdown_item">
                  <span
                    onClick={() => {
                      changeSelect(item);
                      byClick !== null ? byClick(item.id) : null;
                    }}
                  >
                    {item[valueKey]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
