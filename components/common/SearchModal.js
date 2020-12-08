import React from "react";

const SearchModal = ({ data = [] }) => {
  console.log(data);
  return (
    <div className="searchmodal">
      <div className="searchmodal-inner">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <div className="searchmodal-item">
                <div className="searchmodal-item-name">
                  <a href={`/user/${item.id}`}>{item.fname + " " + item.lname}</a>
                </div>
                <div className="searchmodal-item-city">
                  <img src="/pin-prod.svg" alt="" />
                  {item.city.city}
                </div>
              </div>
            );
          })
        ) : (
          <div className="searchmodal-empty">Ничего не найдено!</div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
