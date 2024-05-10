import {useEffect, useState} from "react";
import {useSocketContext} from "../providers/SocketContext.jsx";


export const useSocket = (query) => {
    const [data, setData] = useState([]);
    const {socket, user} = useSocketContext();
    const connect = () => {

        if (socket) {
            socket.on(query , (data) => {
                setData(data)
            });
        }
    }

    useEffect(() => {
        connect();
    }, [socket])

    return {data, user};
};
