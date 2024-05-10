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


    useEffect(() => {
        if (data?.stats?.energy && energy === 0 && score === 0) {
            setEnergy(data?.energyTemp.value)
        }
    }, [data]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setUpdateTrigger(prevCount => prevCount + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
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
        if (socket) {
            socket.emit('claim');
        }
    };
    const tap = () => {
        setScore(prevState => prevState + 1)
        setEnergy(prevState => prevState - data?.stats?.strength || 1)
    };


    return (
        <div className="mainCard">
            <TopInfo score={score + data?.score} energy={energy + energyRegeneration}/>
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
