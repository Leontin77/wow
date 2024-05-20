import { useEffect, useState } from "react";
import "./FrensItem.scss";
import { useSocketContext } from "../../providers/SocketContext.jsx";
import { useSocket } from "../../hooks/useSocket";

const FransItem = () => {
  const { socket } = useSocketContext();
  const { data } = useSocket("getUser");
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    if (socket && data) {
      console.log('Fetching referral stats for:', data.referrals);
      socket.emit("getReferralStats", data.referrals);

      const handleReferralStats = (referrals) => {
        setReferrals(referrals);
      };

      socket.on("referralStats", handleReferralStats);

      // Cleanup the event listener on component unmount or dependencies change
      return () => {
        socket.off("referralStats", handleReferralStats);
      };
    }
  }, [socket, data]);

  return (
    <section className="frensItem">
      <div className="frensItem-quantity">{referrals.length} frens</div>
      <ul className="frensItem-list">
        {referrals.map((item) => (
          <li key={item._id} className="frensItem-list__item">
            <div className="avatar">{item.username.slice(0, 2).toUpperCase()}</div>
            <div className="name">{item.username}</div>
            <div className="amount">{item.score}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FransItem;
