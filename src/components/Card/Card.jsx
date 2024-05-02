import "./Card.scss";
import BottomMenu from "../BottomMenu/BottomMenu";
import TopInfo from "../TopInfo/TopInfo";
import goldIcon from '../../assets/gold.png'
import Hero from "../Hero/Hero";

const Card = () => {
    return (
        <div className="mainCard">
            <TopInfo/>
            {/* <img className="goldIcon" src={goldIcon}/> */}
            <Hero/>
            <BottomMenu/>
        </div>
    )
}

export default Card