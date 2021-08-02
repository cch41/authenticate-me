import { useHistory } from "react-router-dom";
import "./HomePage.css";

const Tag = ({ tag, i }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/tags/${tag.id}`);
  };

  let subtitle;
  if (i === 0) subtitle = "Sites on the rise";
  else if (i === 1) subtitle = "Privacy and seclusion";
  else if (i === 2) subtitle = "Bring your best friend";

  return (
    <div
      className="home-picture"
      onClick={handleClick}
      style={{ backgroundImage: `url(${tag.image})` }}
      value={tag.id}
    >
      <div className={`home-name idx${i}`}>
        <div className="tag-title">{tag.name}</div>
        <div className="tag-phrase">{tag.phrase}</div>
      </div>
    </div>
  );
};

export default Tag;
