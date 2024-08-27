import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getTopicByUID, getNotesByTopic } from '../services/api';

import PageHeader from '../components/PageHeader';
import Note from '../components/Note';
import NoteModal from '../components/NoteModal';
import './TopicPage.css';

const TopicPage = () => {
    const { topicuid } = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loadingNotes, setLoadingNotes] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const fetchTopicAndNotes = async () => {
            var topicResponse = '';
            try {
                topicResponse = await getTopicByUID(topicuid);
                setTopic(topicResponse.data);
            } catch (error) {
                console.error('Error fetching topic or notes:', error);
                navigate('/404');
            }
            
            try {
                setLoadingNotes(true);
                const notesResponse = await getNotesByTopic(topicResponse.data.TopicUID);
                setNotes(notesResponse.data);
            }
            catch (error) {
                setNotes([]);
                console.error('Error fetching topic or notes:', error);
            }
            finally {
                setLoadingNotes(false);
            }
        };

        fetchTopicAndNotes();
    }, [topicuid, navigate]);

    if (!topic) return <p>Loading...</p>;

    return (
        <div>
            <PageHeader/>
            <div className='container'>
                <span className='main-column'>
                    <h2 className='notesTitle'>{topic.TopicName} Notes</h2>
                    {loadingNotes ? (
                        <p>Loading notes...</p>
                    ) : (
                        <div className="notes-list">
                            {notes.length ? (
                                notes.map((note) => (
                                    <Note 
                                        key={note.noteUID} 
                                        note={note} 
                                        onClick={() => setSelectedNote(note)} 
                                    />
                                ))
                            ) : (
                                <p>No notes found.</p>
                            )}
                        </div>
                    )}
                </span>
                <span className='side-column'>
                    <h2 className='topicTitle'>{topic.TopicName}</h2>
                    <p>{topic.Description}</p>
                    {topic.RelatedTopics && topic.RelatedTopics.length > 0 && (
                        <div>
                            <h4>Related Topics:</h4>
                            <ul>
                                {topic.RelatedTopics.map((related, index) => (
                                    <li key={index}>{related}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </span>
            </div>
            <NoteModal 
                note={selectedNote} 
                onClose={() => setSelectedNote(null)} 
            />
        </div>
    );
};

export default TopicPage;
