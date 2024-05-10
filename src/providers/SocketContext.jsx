import React, {createContext, useState, useEffect, useContext} from "react";
import io from "socket.io-client";
import * as SocketIOClient from "socket.io-client";
import axios from "axios";
import {apiUrl} from "../config/api.js";

const SocketContext = createContext({
    socket: null,
    user: null,
});

export const useSocketContext = () => useContext(SocketContext);

export const config = {
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
};

export const axiosInstance = axios.create(config);

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(null);
    const tg = window.Telegram.WebApp;


    useEffect(() => {
        if (true) {
            const socket = io(apiUrl, {
                query: {
                    userId: 877649424,
                },
            });

            setSocket(socket);
            console.log("!!!!!!!!!! soket")


            socket.on("getUser", (user) => {
                console.log("!!!!!!!!!! soket", user)
            });
            socket.on("offlineGold", (golg) => {
                console.log("!!!!!!!!!! offlineGold", golg)
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, []);

    return <SocketContext.Provider value={{socket, user}}>{children}</SocketContext.Provider>;
};
