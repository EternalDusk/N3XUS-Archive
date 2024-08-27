import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageHeader.css';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const  PageHeader = () => {

    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        if (inputValue.trim()) {
            navigate(`/topic/${inputValue}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            navigate(`/topic/${inputValue}`);
        }
    };

    return(
        <div className="home-container">
            <h1><a href="/">Welcome to The Library!</a></h1>
            
            <div className='search-bar'>
                <input
                    type="text"
                    placeholder="Search for a topic"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <button className='search-container-button' onClick={handleButtonClick}><FontAwesomeIcon icon={faSearch} className='faIcon' /></button>
            </div>

            <h4>The Library is a community-curated database of resources and websites on many different topics.</h4>
            <h4>Follow your inner polymath!</h4>
        </div>
    );
}

export default PageHeader;