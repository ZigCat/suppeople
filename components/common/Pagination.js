import React from 'react';

const Pagination = ({
    selectedItem,
    changeSelect,
    length,
}) => {
    return(
        <div className="pagination">
            <div className="pagination_inner">
                <img className="pagination_arrow-left" src="/arrow_left.svg" alt="" onClick={() => {selectedItem-1 > 0 ? changeSelect(selectedItem - 1) :null}}/>
                <span onClick={() => changeSelect(selectedItem-1)}>{selectedItem-1 > 0 ? selectedItem-1 : null}</span>
                <span className="pagination_current">{selectedItem}</span>
                <span onClick={() => changeSelect(selectedItem+1)}>{selectedItem+1 < length ? selectedItem+1 : null}</span>
                <div className="pagination_circles">
                    <div className="pagination_circle"></div>
                    <div className="pagination_circle"></div>
                    <div className="pagination_circle"></div>
                </div>
                <span onClick={() => changeSelect(length)}>{length}</span>
                <img className="pagination_arrow-right" src="/arrow_left.svg" alt="" onClick={() => {selectedItem+1 <= length ? changeSelect(selectedItem + 1) : null}}/>
            </div>
        </div>
    );
};

export default Pagination;