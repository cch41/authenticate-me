import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Location from './Location';


const TagPage = () => {
    const { tagId } = useParams();
    const [tag, setTag] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(async () => {
        const res = await fetch(`/api/tags/${tagId}`);
        const data = await res.json();
        setTag(data.tags);
        setLocations(data.tags.Locations);
    }, [tagId])

    return (
        <>
            <h1>{tag.name}</h1>
            {locations.map((location, i) => (
                <Location key={i} location={location} />
            ))}
        </>
    );
}

export default TagPage;
