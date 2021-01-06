import React, {useState} from 'react';
import request from '../../services/request';

const Search = ({setShow, setUser}) => {
    const [searchText, setSearchText] = useState('');

    const searchUser = async (data) => 
        request
            .get('/search', {
                params:{
                    searchString:data,
                }
            })
            .then(res => res.data)
            .catch(err => console.log(err));

    const handleSearch = async () => {
        const res = await searchUser(searchText);
        console.log(res);
        setUser(res);
        setShow(true);
    }

    return(
        <div className="search">
            <img src="/search.svg" alt="" onClick={() => handleSearch()}/>
            <div className="search-form">
                <input type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
            </div>
        </div>
    );
};

export default Search;