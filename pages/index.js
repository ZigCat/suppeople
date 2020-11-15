import React, {useState} from 'react';
import BlockPage from '../components/common/Block-Page';
import Product from '../components/common/Product';
import Select from '../components/common/Select';

const Main = () => {
  const [filter, changeFilter] = useState([]);

  return(
    <div>
      <div className="main-banner"></div>
      <div className="main-product">
        <div className="container">
          <BlockPage />
        </div>
      </div>
    </div>
  );
}

export default Main;