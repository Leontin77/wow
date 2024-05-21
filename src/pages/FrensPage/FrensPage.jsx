import "./FrensPage.scss";
import { useEffect, useState } from "react";
import FrensItem from "../../components/FrensItem/FrensItem";
import FrensClaim from "../../components/FrensClaim/FrensClaim";
import BaseButton from "../../components/BaseButton/BaseButton";
import { FaUsersViewfinder } from "react-icons/fa6";
import { useSocketContext } from "../../providers/SocketContext.jsx";


const FrensPage = () => {

  const { socket } = useSocketContext();
  const [user, setUser] = useState([]);
  const [amountToClaim, setAmountToClaim] = useState(0)
  const [referralRewardsArray, setReferralRewardsArray] = useState(0)

  console.log("🚀 ~ FransItem ~ referrals:", user)

  useEffect(() => {
    if (socket) {
      console.log('Fetching referral stats for:');
      socket.emit("getReferralStats");

      const handleReferralStats = (user) => {
        setUser(user);
      };

      socket.on("referralStats", handleReferralStats);

      // Cleanup the event listener on component unmount or dependencies change
      return () => {
        socket.off("referralStats", handleReferralStats);
      };
    }
  }, [socket]);


  const countRefferalRewards = () => {
    if (user?.referrals?.length > 0) {
      let totalRewards = 0;
      let referralRewardsTemp = [];
      user?.referrals?.forEach(({score, _id}) => {
        const oneRef = user?.referralRewards?.find(one => one._id === _id)
        if(oneRef) {
          totalRewards += (score - oneRef.score) * 0.1
          
        } else {

          totalRewards += score * 0.1
        }
        referralRewardsTemp.push({_id, score})

      });
      console.log('@@@@@@@@@@@', totalRewards, referralRewardsTemp)
      setAmountToClaim(Math.round(totalRewards))
      setReferralRewardsArray(referralRewardsTemp)
    }
  }
  useEffect(() => {
    countRefferalRewards();
  }, [user?.referrals?.length]);


  const claimRefRewards = () => {
    console.log('claimRefRewards', referralRewardsArray, amountToClaim)
    socket.emit("claimRefRewards", {referralRewardsArray, amountToClaim});
  }
  

  return (
    <div className="frensPage">
      <FaUsersViewfinder size='5em'/>
      <h2>Invite Frens</h2>
      <FrensClaim amountToClaim={amountToClaim} claimRefRewards={claimRefRewards}/>
      <FrensItem referrals={user?.referrals}/>
      <BaseButton title="Invite a fren" className="frensPage-button"/>
    </div>
  );
};

export default FrensPage;
