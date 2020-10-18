import React from 'react';

const Select = (
    options = [],
    selectedItem,
    changeSelect,
) => {
    const [isActive, setActive] = useState(false);

    return(
        <div className="select">
            <div className="select-show">
                <img className={`select-show_arrow${isActive ? '_rotated': ''}`} src="/arrow_left.svg" alt="" onClick={() => setActive(!isActive)}/>
                <span>{selectedItem}</span>
            </div>
            <div className={`select-hidden ${isActive ? 'active' : ''}`}>
                <div className="select-hidden_items">
                    {options.map(item => (
                        <div className="select-hidden_item">
                            <span onClick={() => changeSelect(item)}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Select;