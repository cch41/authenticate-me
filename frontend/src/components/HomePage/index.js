import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './HomePage.css';
import Tag from './Tag';

const HomePage = () => {
    // get the tags and show them, make them clickable
    // render a component for each tag
    // render subcomponents for each
    const [tags, setTags] = useState([]);


    useEffect(async () => {
        const res = await fetch('/api/tags');
        const data = await res.json();
        setTags(data.tags);
    }, []);

    return (
        <div>
            {tags.map((tag, i) => (
                <Tag key={i} tag={tag}/>
            ))}
        </div>
    );
}

export default HomePage;
