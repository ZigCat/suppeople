import React from 'react';
import Product from '../components/common/Product';

const Main = () => {
  return(
    <div>
      <div className="main-banner"></div>
      <div className="main-product">
        <div className="container">
          <Product />
        </div>
      </div>
    </div>
  );
}

export default Main;