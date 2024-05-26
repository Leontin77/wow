import "./MenuPage.scss";
import chainIcon from '../../assets/menu/chain.png';
import bordIcon from '../../assets/menu/bord.png';
import menuItemIcon from '../../assets/menu/menuItem.png';
import menuItemInfoIcon from '../../assets/menu/menuItemInfo.png';
import arrowIcon from '../../assets/menu/arrow.png';
import {useEffect, useState} from "react";
import {useSocketContext} from "../../providers/SocketContext.jsx";


const MenuPage = () => {

    const {socket} = useSocketContext();
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (socket) {
            console.log('Fetching referral stats for:');
            socket.emit("getReferralStats");

            const handleReferralStats = (user) => {
                setUser(user);
            };

            socket.on("referralStats", handleReferralStats);

            return () => {
                socket.off("referralStats", handleReferralStats);
            };
        }
    }, [socket]);

    return (
        <div className="menuPage">
            <div className="chain">
                <img src={chainIcon} alt="chainIcon"/>
            </div>
            <div className="bord">
                <img src={bordIcon} alt="chainIcon"/>
                <div className="bord__menuItems">
                    <div className="bord__menuItem">
                        <img src={menuItemIcon} alt="chainIcon"/>
                        <div className="bord__menuItem-content">
                            <div
                                className="bord__menuItem-text">{user && "https://t.me/developWow_bot/?start=" + user.id}</div>
                        </div>
                    </div>
                    <div className="bord__menuItem-info">
                        <img src={menuItemInfoIcon} alt="chainIcon"/>
                        {user?.referrals?.length && <div className="bord__menuItem-content">
                            <div className="bord__menuItem-text">{user.referrals.length} workers</div>
                            <div className="bord__menuItem-text">{user.referrals.length} windings</div>
                            <div className="bord__menuItem-text">0 premium</div>
                        </div>}
                    </div>
                </div>


            </div>
            <div className="chain">
                <img src={chainIcon} alt="chainIcon"/>
            </div>
            <div className="bord">
                <img src={bordIcon} alt="chainIcon"/>
                <div className="bord__menuItems">
                    {user?.referrals && user?.referrals?.slice(0, 2).map((one) =>
                        <div key={one._id} className="bord__menuItem">
                            <img src={menuItemIcon} alt="chainIcon"/>
                            <div className="bord__menuItem-content">
                                <div className="bord__menuItem-text">{one.first_name}</div>
                                <div className="bord__menuItem-text">{one.last_name}</div>
                                <img src={arrowIcon} alt="chainIcon"/>
                            </div>
                        </div>
                    )}
                    {user?.referrals?.length > 2 && <div className="bord__menuItem-more">
                        <img src={menuItemIcon} alt="chainIcon"/>
                        <div className="bord__menuItem-content">
                            <div className="bord__menuItem-text">more</div>
                        </div>
                    </div>}
                </div>
            </div>

        </div>
    );
};

export default MenuPage;
