import { useState, useEffect } from 'react';
import './HomePage.css';
import Tag from './Tag';

const HomePage = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function getTags() {
            const res = await fetch('/api/tags');
            const data = await res.json();
            setTags(data.tags);
            return
        }
        getTags();
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
