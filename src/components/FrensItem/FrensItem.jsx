import "./FrensItem.scss";

const FrensItem = ({referrals} = []) => {
console.log("🚀 ~ FrensItem ~ referrals:", referrals)


  return (
    <section className="frensItem">
      <div className="frensItem-quantity">{referrals?.length} frens</div>
      <ul className="frensItem-list">
        {referrals?.length && referrals?.map((item) => (
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

export default FrensItem;
