import React, { useState } from "react";
import Pagination from "./Pagination";
import Product from "./Product";
import Select from "./Select";

const BlockPage = ({ title = "Посты", items = [] }) => {
    const option1 = [
        { name: "по дате добавления", id:1 },
        { name: "по возрастанию", id:2 },
        { name: "по убыванию", id:3 },
    ];
    const option2 = [
        { name: "нехватка еды", id:1 },
        { name: "лекарства", id:2 },
        { name: "техника", id:3 },
    ];
    const [select1, changeSelect1] = useState(option1[0]);
    const [select2, changeSelect2] = useState(option2[0]);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);

  const [pagination, changePagination] = useState(2);
  return (
    <div className="blockpage">
      <div className="container">
        <div className="blockpage-inner">
          <div className="blockpage-title">
            <h2>{title}</h2>
          </div>
          <div className="blockpage_filter">
            <h4>Фильтр</h4>
            <Select options={option1} selectedItem={select1} changeSelect={changeSelect1} isActive={active1} setActive={setActive1}/>
            <Select options={option2} selectedItem={select2} changeSelect={changeSelect2} isActive={active2} setActive={setActive2}/>
          </div>
          <div className="blockpage_items">
            <div className="blockpage_item">
              <Product />
            </div>
            <div className="blockpage_item">
              <Product />
            </div>
            <div className="blockpage_item">
              <Product />
            </div>
          </div>
          <Pagination
            length={66}
            selectedItem={pagination}
            changeSelect={changePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
