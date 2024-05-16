import {useEffect, useState} from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Miner from "./components/Miner";
import MultiplicatorStore from "./components/CountStore";
import {axiosInstance} from "./config/api.js";
import DefaultPage from "./pages/DefaultPage/DefaultPage";

function App() {
    const [user, setUser] = useState(null)

  const tg = window.Telegram.WebApp;

  // console.log("!!!!!!!! tg", tg);

  tg.expand(); //расширяем на все окно

  // tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
  // tg.MainButton.textColor = "#F55353"; //изменяем цвет текста кнопки
  // tg.MainButton.color = "#143F6B"; //изменяем цвет бэкграунда кнопки
  // tg.MainButton.setParams({ color: "#143F6B" }); //так изменяются все параметры

    const getUser = async () => {
        const user = await axiosInstance.get('/api/user/' + ( tg?.initDataUnsafe?.user?.id || 877649424));
        // const user = await axiosInstance.get('/api/user/' + 877649424);
        console.log("!!!!!!!!!", user)
        setUser(user.data);
    }


    // console.log("!!!!!!!!!", tg)

    useEffect(() => {
        // axiosInstance.post('/api/user', tg)
        getUser()

    }, []);






// tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
// tg.MainButton.textColor = "#F55353"; //изменяем цвет текста кнопки
// tg.MainButton.color = "#143F6B"; //изменяем цвет бэкграунда кнопки
// tg.MainButton.setParams({"color": "#143F6B"}); //так изменяются все параметры
//
//
// tg.onEvent('mainButtonClicked', function(){
// 	tg.sendData("some string that we need to send");
// 	tg.sendMessage("!@!@!@!@!@!@ send");
// 	//при клике на основную кнопку отправляем данные в строковом виде
// });

  //   return (
  //       <>
  //           <div className="card">
  //               <div className="count">{count}</div>
  //               <div className="count">{user?.id}</div>
  //               <MultiplicatorStore count={count} setCount={setCount} multiplicator={multiplicator}
  //                                   setMultiplicator={setMultiplicator}/>
  //               <Miner setCount={setCount} multiplicator={multiplicator}/>
  //           </div>
  //       </>
  //   );
  // tg.onEvent("mainButtonClicked", function () {
  //   tg.sendData("some string that we need to send");
  //   tg.sendMessage("!@!@!@!@!@!@ send");
  //   //при клике на основную кнопку отправляем данные в строковом виде
  // });

  return (
    <>
        {tg && <div>{tg.initData.user}zalss</div>}
        {<div>{JSON.stringify(tg)}222</div>}
      <DefaultPage />


      {/* <div className="card">
        <div className="count">{count}</div>
        <MultiplicatorStore count={count} setCount={setCount} multiplicator={multiplicator} setMultiplicator={setMultiplicator} />
        <Miner setCount={setCount} multiplicator={multiplicator} />
      </div> */}
    </>
  );
}

export default App;


