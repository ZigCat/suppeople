import React from 'react';

const Product = ({
    username,
    trustLevel,
    city,
    img,
    message
}) =>{
    return(
        <>
            <div className="post">
                <div className='post__top'>
                    <div className="post__top_owner">
                        <img className='post__top_owner-avatar' src='/avatar.svg'/>
                        <div className='post__top_owner-desc'>
                            <h3>{username}</h3>
                            <span className='post__top_owner-desc-trust'>уровень доверия {trustLevel}</span>
                            <span className='post__top_owner-desc-city'><img src="/pin-prod.svg" alt=""/>{city}</span>
                        </div>
                    </div>
                    <img className="post__top_img" src={`/${img}`}/>
                </div>
                <div className="post__desc">
                    <p>{message}</p>
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