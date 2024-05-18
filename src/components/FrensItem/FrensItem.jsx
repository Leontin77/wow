import "./FrensItem.scss";

const FransItem = () => {
  const data = [
    {
      name: "CLeonyn",
      amount: 1200,
    },
    {
      name: "FEugen",
      amount: 1500,
    },
    {
      name: "SDmytro",
      amount: 1400,
    },
  ];

  return (
    <section className="frensItem">
      <ul className="frensItem-list">
        {data?.map((item) => {
          return (
            <li className="frensItem-list__item">
              <div className="avatar">{item.name.slice(0,1).toUpperCase()}</div>
              <div className="name">{item.name}</div>
              <div className="amount">{item.amount}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FransItem;
