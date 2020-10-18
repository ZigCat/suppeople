import React from 'react';
import Search from '../components/common/Search';

const Layout = ({children}) => {
    return(
        <div className="layout">
            <div className="layout-top">
                <div className="container">
                    <div className="layout-top_inner">
                        <div className="layout-top_item">
                            <div className="layout-top_logo">
                                <a href="/"><img src="/logo.svg" alt="suppeople.kz"/></a>
                            </div>
                            <Search />
                        </div>
                        <div className="layout-top_item">
                            <div className="layout-top_about">
                                <a href="#">О проекте</a>
                            </div>
                            <div className="layout-top_profile">
                                <img src="/avatar.svg" alt=""/>
                                <span>John Dodstermester</span>
                            </div>
                            <div className="layout-top_reg">
                                <button>Регистрация</button>
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