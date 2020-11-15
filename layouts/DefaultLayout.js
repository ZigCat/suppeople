import React from 'react';
import Search from '../components/common/Search';

const Layout = ({children}) => {
    return(
        <div className="layout">
            <div className="layout-top">
                <div className="container-head">
                    <div className="layout-top_inner">
                        <div className="layout-top_item">
                            <div className="layout-top_logo">
                                <a href="/"><img src="/logo-lay.svg" alt="suppeople.kz"/></a>
                            </div>
                            <Search />
                        </div>
                        <div className="layout-top_item">
                            <div className="layout-top_about">
                                <a href="#">О проекте</a>
                            </div>
                            <div className="layout-top_profile">
                                <a href="/user/user">
                                    <img src="/avatar.svg" alt=""/>
                                    <span>Dodstermester</span>
                                </a>
                            </div>
                            <div className="layout-top_reg">
                                <a href="/registration">Регистрация</a>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <div className="layout-inner">{children}</div>
        </div>
    );
}

export default Layout;