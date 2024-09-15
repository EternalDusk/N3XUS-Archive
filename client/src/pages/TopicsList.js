import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import './TopicsList.css';

import { getAllTopics } from '../services/api';


const TopicsList = () => {
    // Fetching topics
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getAllTopics().then(response => {
            setTopics(response.data);
        });
    }, []);

    return (
        <div>
            <PageHeader/>
            <h2>All Available Topics</h2>
            <ul>
                {topics.map((topic) => (
                    <li>
                        <a href={'/topic/' + topic.TopicUID}>
                            {topic.TopicName} - {topic.Description}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default TopicsList;