import "./Card.scss";
import BottomMenu from "../BottomMenu/BottomMenu";
import TopInfo from "../TopInfo/TopInfo";
import goldIcon from '../../assets/gold.png';
// import MenuPages from "../MenuPages/MenuPages";
import Hero from "../Hero/Hero";
import { useSocket } from "../../hooks/useSocket.js";
import { useSocketContext } from "../../providers/SocketContext.jsx";
import { useEffect, useState, useRef, useCallback } from "react";

const Card = () => {
    const { data } = useSocket("getUser");
    const { socket } = useSocketContext();
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [claimTime, setClaimTime] = useState(0);
    const [claimValue, setClaimValue] = useState(0);
    
    const energyRegenerationRef = useRef(0);
    const updateTriggerRef = useRef(0);

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
                socket.emit('updateUser', { energy: energy + energyRegenerationRef.current, score });
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
        setScore(prev => prev + 1);
        setEnergy(prev => prev - (data?.stats?.strength || 1));
    };

    return (
        <div className="mainCard">
            <TopInfo score={score} energy={energy + energyRegenerationRef.current} />
            <div className="rudnik">
                <button onClick={claim}>claim {claimValue || 0}</button>
                <img onClick={tap} className="goldIcon" src={goldIcon} alt="Gold Icon" />
                <button onClick={findReferals}>referalStats</button>

            </div>
            <Hero />
            <BottomMenu />
            {/* <MenuPages/> */}
        </div>
    );
};

export default Card;
