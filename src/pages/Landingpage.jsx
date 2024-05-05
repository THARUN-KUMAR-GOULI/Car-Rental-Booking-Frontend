/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../styles/Landingpage.css";

const Landingpage = () => {

    const [cities, setCities] = useState([]);
    const [showCities, setShowCities] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {

        try {
            const res = await axios.get("http://localhost:8080/api/cities");
            setCities(res.data);
        } catch (error) {
            window.location.href = '/search';
        }
    }

    const handleSearch = async () => {
        setShowCities(true);
    };

    const handleCityClick = (cityName) => {
        // handle here, example, redirect to a city page
        setSearchValue(cityName);
        setShowCities(false);
    }

    return (

        <div>
            <h3>Slogan for our website</h3>

            <div className="bar">

                <input type='text' onClick={handleSearch} placeholder='Search your city' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

                {showCities && (
                    <div className="city-list">
                        <ul>
                            {cities.map(city => (
                                <li key={city.id}>
                                    <a className='city' onClick={() => handleCityClick(city.name)}>{city.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Landingpage