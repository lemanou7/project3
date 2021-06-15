import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">POPULAR POSTS</span>
        <img
          src="https://i.ibb.co/f9Wx0sn/denver-wallpaper-preview.jpg"
          alt="Denverimage"
        />
        <p>
        officially the City and County of Denver, is the capital and most populous city of the U.S. State of Colorado. 
        It is located in the South Platte River Valley on the western edge of the High Plains just east of the Front Range of the Rocky Mountains.
         With an estimated population of 735,538 in 2020, Denver is the 19th-most populous city in the United States, 
         the fifth-most populous state capital, and the most populous city located in the Mountain states.
          The metropolitan area surrounding Denver represents a majority of the population and economic activity in the Front Range region, 
          the area where an estimated 85% of Colorado's population lives. 
          The Denver downtown district is immediately east of the confluence of Cherry Creek and the South Platte River, 
          approximately 12 mi (19 km) east of the foothills of the Rocky Mountains. Denver is named
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
