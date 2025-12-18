import React, { useState, useEffect } from 'react';
import './SearchPanel.css';
import Input from '../Input/Input.jsx';
import axios from '../../api/axios.js';

/**
 * Оновлений компонент результату пошуку з підтримкою SPA-кліку.
 */
const SearchPanelItem = ({ avatarSrc, username, onClick }) => {
    return (
        <div className="search-item-link" onClick={() => onClick(username)} style={{ cursor: 'pointer' }}>
            <div className="search-item">
                <img className="user-avatar" src={avatarSrc} alt={`${username}'s avatar`} />
                <p className="username">{username}</p>
            </div>
        </div>
    );
};

const SearchPanel = ({ onUserClick }) => { 
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setSearchTerm(inputValue);
        }, 500);
        return () => clearTimeout(timerId);
    }, [inputValue]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredItems([]);
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                // Використовуємо виправлений шлях /user/search
                const { data } = await axios.get(`/user/search?q=${searchTerm}`);
                setFilteredItems(data);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [searchTerm]);

    return (
        <div className="search-panel">
            <h2 className="search-panel-title">Search</h2>
            <div className="search-input-wrapper">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div className="search-results">
                {loading && <p className="search-info">Loading...</p>}
                {error && <p className="search-info error">{error}</p>}
                
                {!loading && !error && filteredItems.map((item) => (
                    <SearchPanelItem 
                        key={item._id}
                        avatarSrc={item.avatarUrl}
                        username={item.username}
                        onClick={onUserClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchPanel;