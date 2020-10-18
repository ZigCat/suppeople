import React from 'react';

const BlockPage = ({
    title='Посты',
    items=[],
    }) => {
    return(
        <div className="blockpage">
            <div className="container">
                <div className="blockpage-inner">
                    <div className="blockpage-title">
                        <h2>{title}</h2>
                    </div>
                    <div className="blockpage_filter">
                        <h4>Фильтры</h4>
                    </div>
                    <div className="blockpage_items">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlockPage;