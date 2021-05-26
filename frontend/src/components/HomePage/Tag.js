import bigwaves from '../../images/big-waves.jpg';
import hiddengems from '../../images/hidden-gems.jpg';
import warmweather from '../../images/warm-weather.jpeg';
import './HomePage.css';
import { useHistory } from 'react-router-dom';

const Tag = ({ tag }) => {
    const history = useHistory();
    const imageName = () => {
        let tagName = tag.name.toLowerCase();
        tagName = tagName.split(' ');
        tagName = tagName.join('');

        if (tagName === 'bigwaves') return bigwaves;
        if (tagName === 'hiddengems') return hiddengems;
        if (tagName === 'warmweather') return warmweather;
    }
    const image = imageName();

    const handleClick = () => {
        history.push(`/tags/${tag.id}`)
    };

    return (
        <div className="tag-picture" onClick={handleClick} style={{ backgroundImage: `url(${image})` }} value={tag.id}>
            <div className="tag-name">{tag.name}</div>
        </div>
    );
}

export default Tag;
