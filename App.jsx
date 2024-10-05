import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/global.css'; // Import global styles

import Home from "./components/Home";
import Character from "./components/Character";
import CharacterDetail from "./components/CharacterDetail";
import Episodes from "./components/Episodes";
import Header from "./components/Header"; 


function App() {
    const [characters, setCharacters] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [loadingCharacters, setLoadingCharacters] = useState(true);
    const [loadingEpisodes, setLoadingEpisodes] = useState(true);
    const [charactersError, setCharactersError] = useState(null);
    const [episodesError, setEpisodesError] = useState(null);

    useEffect(() => {
        const fetchAllCharacters = async () => {
            // console.log('Fetching characters started.');
            
            // Check localStorage for cached characters
            const cachedCharacters = localStorage.getItem('characters');
            if (cachedCharacters) {
                setCharacters(JSON.parse(cachedCharacters));
                setLoadingCharacters(false);
                // console.log('Characters loaded from cache.');
                return;
            }

            let url = 'https://rickandmortyapi.com/api/character';
            const allCharacters = [];
            let delay = 0;

            try {
                while (url) {
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    // console.log(`Fetching from URL: ${url}`);
                    const response = await fetch(url);
                    const data = await response.json();

                    allCharacters.push(...data.results);
                    setCharacters((prev) => [...prev, ...data.results]);

                    // console.log(`Fetched ${data.results.length} characters.`);
                    url = data.info.next;
                    delay = 100; // Introduce small delay for subsequent fetches
                }

                localStorage.setItem('characters', JSON.stringify(allCharacters));
                setLoadingCharacters(false);
                // console.log(`Finished fetching all characters. Total: ${allCharacters.length}`);
            } catch (error) {
                setCharactersError('Failed to fetch characters');
                setLoadingCharacters(false);
                console.error('Error fetching characters:', error);
            }
        };

        fetchAllCharacters();
    }, []);

    useEffect(() => {
        const fetchAllEpisodes = async () => {
            // console.log('Fetching episodes started.');

            // Check localStorage for cached episodes
            const cachedEpisodes = localStorage.getItem('episodes');
            if (cachedEpisodes) {
                setEpisodes(JSON.parse(cachedEpisodes));
                setLoadingEpisodes(false);
                // console.log('Episodes loaded from cache.');
                return;
            }

            const allEpisodes = [];
            let url = 'https://rickandmortyapi.com/api/episode';

            try {
                while (url) {
                    const response = await fetch(url);
                    const data = await response.json();

                    allEpisodes.push(...data.results);
                    url = data.info.next;
                }

                localStorage.setItem('episodes', JSON.stringify(allEpisodes));
                setEpisodes(allEpisodes);
                setLoadingEpisodes(false);
                // console.log(`Finished fetching all episodes. Total: ${allEpisodes.length}`);
            } catch (error) {
                setEpisodesError('Failed to fetch episodes');
                setLoadingEpisodes(false);
                console.error('Error fetching episodes:', error);
            }
        };

        fetchAllEpisodes();
    }, []);

    return (
        <Router>
            <Header />
            {loadingCharacters || loadingEpisodes ? (
                <div className="loadingMessage">Loading data...</div>
            ) : (
                <>
                    {charactersError && <div>{charactersError}</div>}
                    {episodesError &&  <div>{episodesError}</div>}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/characters" element={<Character characters={characters} />} />
                        <Route path="/episodes" element={<Episodes episodes={episodes} />} />
                        <Route path="/characters/:id" element={<CharacterDetail characters={characters} />} />
                    </Routes>
                </>
            )}
        </Router>
    );
}

export default App;
