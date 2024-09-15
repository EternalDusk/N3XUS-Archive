import React, { useState } from 'react';
import { getRecentTopics } from '../services/api';
import './RecentButtons.css';

const RecentButtons = () => {

    // Fetching topics
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getRecentTopics(10).then(response => {
            setTopics(response.data);
        });
    }, []);

    return (
        <div>

        </div>
    );
};