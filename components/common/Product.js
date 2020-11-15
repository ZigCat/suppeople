import React from 'react';

const Product = ({
    
}) =>{
    return(
        <>
            <div className="post">
                <div className='post__top'>
                    <div className="post__top_owner">
                        <img className='post__top_owner-avatar' src='/mistake.jpg'/>
                        <div className='post__top_owner-desc'>
                            <h3>John Dodster</h3>
                            <span className='post__top_owner-desc-trust'>уровень доверия 10</span>
                            <span className='post__top_owner-desc-city'><img src="/pin-prod.svg" alt=""/>Алматы</span>
                        </div>
                    </div>
                    <img className="post__top_img" src='/mistake.jpg'/>
                </div>
                <div className="post__desc">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquid. Soluta ipsam quidem dicta, modi nulla dolorum fugit officia ex, deserunt veritatis quo suscipit, hic illo sunt in! Ad, libero!</p>
                </div>
                <div className="post__buttons">
                    <div className="post__button">
                        <img src="/cross-sign.svg" alt=""/>
                        Пожаловаться
                    </div>
                    <div className="post__button">
                        <img src="/like.svg" alt=""/>
                        Избранное
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;