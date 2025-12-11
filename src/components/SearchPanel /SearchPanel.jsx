import React, { useState, useEffect } from 'react';
import './SearchPanel.css'; // Імпорт стилів
import Input from '../Input/Input.jsx'; // Імпорт вашого кастомного компонента

/**
 * Окремий компонент для відображення одного результату пошуку.
 */
const SearchPanelItem = ({ avatarSrc, username, profileUrl }) => {
    return (
        <a href={profileUrl} className="search-item-link">
            <div className="search-item">
                {/* Аватар користувача */}
                <img className="user-avatar" src={avatarSrc} alt={`${username}'s avatar`} />
                {/* Ім'я користувача */}
                <p className="username">{username}</p>
            </div>
        </a>
    );
};

/**
 * Основний компонент "Панель пошуку".
 * @param {Object} props
 * @param {Array<Object>} props.items - Масив об'єктів для пошуку.
 */
const SearchPanel = ({ items = [] }) => {
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Дебаунс-значення для фільтрації
    const [filteredItems, setFilteredItems] = useState([]);

    // Ефект для затримки пошуку (debounce)
    useEffect(() => {
        const timerId = setTimeout(() => {
            setSearchTerm(inputValue);
        }, 300); // Затримка 300 мс

        return () => {
            clearTimeout(timerId);
        };
    }, [inputValue]);

    // Фільтруємо елементи, коли змінюється дебаунс-значення
    useEffect(() => {
        if (searchTerm) {
            const results = items.filter(item =>
                item.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(results);
        } else {
            setFilteredItems([]); // Очищуємо результати, якщо поле пошуку порожнє
        }
    }, [searchTerm, items]);

    // Обробник зміни значення в полі пошуку
    const handleSearchChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="search-panel">
            <h2 className="search-panel-title">Search</h2>

            <div className="search-input-wrapper">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleSearchChange} // Передаємо обробник
                />
            </div>

            <div className="search-results">
                {/* Показуємо результати тільки якщо є введений текст */}
                {inputValue && filteredItems.length > 0 && (
                    filteredItems.map((item) => (
                        <SearchPanelItem 
                            key={item.id} // Використовуємо унікальний ID
                            avatarSrc={item.avatarSrc}
                            username={item.username}
                            profileUrl={`/profile/${item.username}`} // Генеруємо URL профілю
                        />
                    ))
                )}
                {/* Показуємо повідомлення, якщо нічого не знайдено */}
                {inputValue && filteredItems.length === 0 && (
                    <p className="no-results">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPanel;