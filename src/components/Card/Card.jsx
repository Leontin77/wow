import "./Card.scss";
import BottomMenu from "../BottomMenu/BottomMenu";
import TopInfo from "../TopInfo/TopInfo";
import goldIcon from '../../assets/gold.png'
import Hero from "../Hero/Hero";
import {useSocket} from "../../hooks/useSocket.js";
import {useSocketContext} from "../../providers/SocketContext.jsx";
import {useEffect, useState} from "react";

const Card = () => {
    const {data} = useSocket("getUser");
    const {socket} = useSocketContext();
    const [score, setScore] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [energyRegeneration, setEnergyRegeneration] = useState(0);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [claimTime, setClaimTime] = useState(0);


    useEffect(() => {
        if (data?.stats?.energy && energy === 0 && score === 0) {
            setEnergy(data?.energyTemp.value)
            setScore(data?.score)
            setClaimTime(data?.lastClime)
        }
    }, [data]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setUpdateTrigger(prevCount => prevCount + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        console.log('@@@', score)
        if (updateTrigger % 3 === 0) {
            if (data?.stats?.energy) {
                socket.emit('updateUser', {energy: energy + energyRegeneration, score});
            }
        }

        if ((energy + energyRegeneration) < data?.stats?.energy) {
            setEnergyRegeneration(prevState => prevState + data?.stats?.speed)
        }

    }, [updateTrigger]);


    const claim = () => {
        console.log("!!!!!!!!!!!!!!!!!!!! claim")
            const now = Date.now();
            const lastUpdate = new Date(claimTime).getTime();
            const timeDifference = Math.min((now - lastUpdate) / 1000, 7200);
            console.log("🚀 ~ claim ~ now - lastUpdate:", now, lastUpdate)
            console.log("🚀 ~ claim ~ timeDifference:", timeDifference)
    
            const claimingScore = data?.stats?.strength * timeDifference * 0.5;

            setScore(Math.round(score + claimingScore));
    
            // if ((+energyToAdd + user?.energyTemp?.value) > user?.stats?.energy) {
            //     user.energyTemp = {value: user?.stats?.energy, time: Date.now()};
            // } else {
            //     user.energyTemp = {value: user?.energyTemp?.value + +energyToAdd.toFixed(1), time: Date.now()};
            // }
    
        if (socket) {
            socket.emit('claim', now)
                setClaimTime(now);
                console.log('@@',' time setted')
        }
    };
    const tap = () => {
        setScore(prevState => prevState + 1)
        setEnergy(prevState => prevState - data?.stats?.strength || 1)
    };


    return (
        <div className="mainCard">
            <TopInfo score={score} energy={energy + energyRegeneration}/>
            <div className="rudnik">
                <button onClick={() => claim()}>claim</button>
                <img onClick={() => tap()} className="goldIcon" src={goldIcon}/>
            </div>
            <Hero/>
            <BottomMenu/>
        </div>
    )
}

export default Card
