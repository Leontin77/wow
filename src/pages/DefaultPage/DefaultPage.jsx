import "./DefaultPage.scss";
import Card from "../../components/Card/Card";
import MenuPages from "../../components/MenuPages/MenuPages";
import { useSocket } from "../../hooks/useSocket.js";

const DefaultPage = () => {
  return (
    <>
      <Card />
      {/* <MenuPages /> */}
    </>
  );
};

export default DefaultPage;
