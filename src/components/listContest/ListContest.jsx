import "./listContest.css";

export default function User({contest}) {
  return (
    <li className="rightbarContest">
      <div className="rightbarCoverImgContainer">
        <img className="rightbarCoverImg" src={contest.photo} alt="" />
      </div>
      <span className="rightbarTitle">{contest.title}</span>
      <span className="righbarDate">{contest.date}</span>
    </li>
  );
}