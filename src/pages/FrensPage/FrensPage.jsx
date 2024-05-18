import "./FrensPage.scss";
import FransItem from "../../components/FrensItem/FrensItem";
import FrensClaim from "../../components/FrensClaim/FrensClaim";
import BaseButton from "../../components/BaseButton/BaseButton";

const FransPage = () => {
  return (
    <>
      <h2>Invite Frens</h2>
      <FrensClaim/>
      <FransItem />
      <BaseButton title="Invite a fren" className="frensPage-button"/>
    </>
  );
};

export default FransPage;
