import "./FrensPage.scss";
import FransItem from "../../components/FrensItem/FrensItem";
import FrensClaim from "../../components/FrensClaim/FrensClaim";
import BaseButton from "../../components/BaseButton/BaseButton";
import { FaUsersViewfinder } from "react-icons/fa6";


const FrensPage = () => {
  return (
    <div className="frensPage">
      <FaUsersViewfinder size='5em'/>
      <h2>Invite Frens</h2>
      <FrensClaim/>
      <FransItem />
      <BaseButton title="Invite a fren" className="frensPage-button"/>
    </div>
  );
};

export default FrensPage;
