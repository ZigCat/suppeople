import React from 'react';

const UserModal = ({user}) => {
    const userPath = `/user/${user.id}`;
    return(
        <div id="usermodal" className="usermodal">
            <div className="usermodal-inner">
                <div className="usermodal-name">
                    <img src="/avatar.svg" alt=""/>
                    <span>{user ? `${user.fname} ${user.lname}` : null}</span>
                </div>
                <div className="usermodal-settings">
                    <div className="usermodal-settings_block">
                        <a href={userPath}>Мой профиль</a>
                        <a href={userPath}>Посты</a>
                    </div>
                    <a href="">Настройки</a>
                    <div className="usermodal-settings_block">
                        <a href={userPath}>Мои посты</a>
                        <a href={userPath}>Достижения</a>
                    </div>
                </div>
                <div className="usermodal-exit">
                    <a href="/registration" onClick={() => localStorage.clear()}>Выход</a>
                    <img src="/exit.svg" alt=""/>
                </div>
            </div>
        </div>
    );
};

export default UserModal;