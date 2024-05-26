import "./MainPage.scss";
import {useSocket} from "../../hooks/useSocket.js";
import {useSocketContext} from "../../providers/SocketContext.jsx";
import {useCallback, useEffect, useRef, useState} from "react";
import TopInfo from "../../components/TopInfo/TopInfo.jsx";
import goldIcon from "../../assets/sticker.webp";
import StrengthAnimation from "../../components/StrengthAnimation/StrengthAnimation.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import panelIcon from "../../assets/main/main_menu.png";
import menuItemIcon from "../../assets/menu/menuItem.png";
import mineIcon from "../../assets/main/mine.png";
import homeIcon from "../../assets/main/home.png";
import roadIcon from "../../assets/main/road.png";
import cartIcon from "../../assets/main/cart.png";

const MainPage = () => {
    const {data} = useSocket("getUser");
    const {socket} = useSocketContext();
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [claimTime, setClaimTime] = useState(0);
    const [claimValue, setClaimValue] = useState(0);
    const [animations, setAnimations] = useState([]);

    const energyRegenerationRef = useRef(0);
    const updateTriggerRef = useRef(0);

    useEffect(() => {
        if (socket) {
            socket.emit('getUser');
        }
    }, [socket]);

    const addAnimation = () => {
        const id = Date.now();
        setAnimations((prev) => [...prev, id]);
        setTimeout(() => {
            setAnimations((prev) => prev.filter((animationId) => animationId !== id));
        }, 400);
    };

    const initializeData = useCallback(() => {
        if (data?.stats?.energy && energy === 0 && score === 0) {
            setEnergy(data.energyTemp.value);
            setScore(data.score);
            setClaimTime(data.lastClime);
            setClaimValue(Math.round((Date.now() - data.lastClime) / 1000, data.stats.strength * 3600));
        }
    }, [data, energy, score]);

    useEffect(() => {
        initializeData();
        console.log("Data:", data);
    }, [data, initializeData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateTriggerRef.current += 1;

            if (updateTriggerRef.current % 3 === 0 && data?.stats?.energy) {
                socket.emit('updateUser', {energy: energy + energyRegenerationRef.current, score});
            }

            if (energy + energyRegenerationRef.current < data?.stats?.energy) {
                energyRegenerationRef.current += data.stats.speed;
            }

            if (claimTime) {
                setClaimValue(Math.round((Date.now() - new Date(claimTime)) / 1000 * 0.5, data.stats.strength * 3600));
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [energy, claimTime, data, socket, score]);

    const claim = () => {
        const now = Date.now();
        const lastUpdate = new Date(claimTime).getTime();
        const timeDifference = Math.min((now - lastUpdate) / 1000, 7200);
        const claimingScore = data.stats.strength * timeDifference * 0.5;

        if (socket) {
            socket.emit('claim', now);
            setScore(prev => Math.round(prev + claimingScore));
            setClaimTime(now);
        }
    };

    const findReferals = () => {
        let referalStats
    }

    const tap = () => {
        if (navigator.vibrate) {
            navigator.vibrate(50); // Vibrate for 50 milliseconds
        }
        addAnimation();
        setScore(prev => prev + 1);
        setEnergy(prev => prev - (data?.stats?.strength || 1));
    };

    return (
        <div className="main-page">
            <div className="main-page__header">
                <div className="main-page__header-item">
                    <img src={menuItemIcon} alt="chainIcon"/>
                    <div className="main-page__header-item-text">energy</div>
                </div>
                <div className="main-page__header-item">
                    <img src={menuItemIcon} alt="chainIcon"/>
                    <div className="main-page__header-item-text">gold</div>
                </div>
                <div className="main-page__header-item">
                    <img src={menuItemIcon} alt="chainIcon"/>
                    <div className="main-page__header-item-text">menu</div>
                </div>
            </div>
            <div className="main-page__content">
                <div className="main-page__content-item home">
                    <img src={homeIcon} alt="homeIcon"/>
                </div>
                <div className="main-page__content-item road">
                    <img className="roadIcon" src={roadIcon} alt="roadIcon"/>
                    <img className="cardIcon" src={cartIcon} alt="cartIcon"/>
                </div>
                <div className="main-page__content-item mine">
                    <img src={mineIcon} alt="mineIcon"/>
                </div>
            </div>
            <div className="main-page__panel">
                <img src={panelIcon} alt="panelIcon"/>
            </div>
        </div>
    );
};

export default MainPage;
