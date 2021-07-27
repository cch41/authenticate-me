import { useHistory } from "react-router-dom";
import "./HomePage.css";

const Tag = ({ tag, i }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/tags/${tag.id}`);
  };

  return (
    <div
      className="home-picture"
      onClick={handleClick}
      style={{ backgroundImage: `url(${tag.image})` }}
      value={tag.id}
    >
      <div className={`home-name idx${i}`}>{tag.name}</div>
    </div>
  );
};

export default Tag;
