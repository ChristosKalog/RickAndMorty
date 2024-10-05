import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Locations({ locations }) {
    const [backgroundImages, setBackgroundImages] = useState([]);
    const [state, setState] = useState(false);

    useEffect(() => {
        // Function to fetch a random image for each location
        const fetchBackgroundImages = async () => {
            setState(true);
            const promises = locations.map(location =>
                axios.get("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=space")
            );
            const responses = await Promise.all(promises);
            const images = responses.map(response => response.data.urls.regular);
            setState(false)
            setBackgroundImages(images);
        };

        fetchBackgroundImages();
    }, [locations]);

    return (
        <>

            <h1>Locations</h1>
            {state && <p>Loading Locations...</p>}
            <div className="locations-container">
                {locations.map((location, index) => (
                    <div
                        className="location-container"
                        key={location.id}
                        style={{ backgroundImage: `url(${backgroundImages[index]})` }}
                    >
                        <h3>{location.name}</h3>
                        <p>Dimension: {location.dimension}</p>
                        <p>Type: {location.type}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
