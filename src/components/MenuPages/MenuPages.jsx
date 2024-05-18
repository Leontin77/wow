import "./MenuPages.scss";
import { Link } from "react-router-dom";
import { SiBoosty } from "react-icons/si";
import { MdHome } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const MenuPages = () => {
  return (
    <section className="menuPages">
      <ul className="menuPages-list">
        <li className="menuPages-list__item">
          <Link to="/wow">
            <MdHome color="white" size="1.5em" />
            <div className="linkName">Home</div>
          </Link>
        </li>
        <li className="menuPages-list__item">
          <Link to="/wow/boost">
            <SiBoosty color="white" size="1.5em" />
            <div className="linkName">Boost</div>
          </Link>
        </li>
        <li className="menuPages-list__item">
          <Link to="/wow/frens">
            <FaUserFriends color="white" size="1.5em" />
            <div className="linkName">Frens</div>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default MenuPages;
