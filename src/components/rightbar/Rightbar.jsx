import "./rightbar.css";
import { Users , Contests } from "../../dummyData";
import User from "../user/User"
import ListContest from "../listContest/ListContest"

export default function Rightbar() {
  const HomeRightbar = () => {
    return (
      <>
        <img className="rightbarAd" src="assets/ads/ads1.jpg" alt="" />
        <img className="rightbarAd" src="assets/ads/ads2.jpg" alt="" />
        <img className="rightbarAd" src="assets/ads/ads3.jpg" alt="" />
        <img className="rightbarAd" src="assets/ads/ads4.jpg" alt="" />
        <img className="rightbarAd" src="assets/ads/ads5.jpg" alt="" />
        <h4 className="rightbarTitle">LIST TOP PHOTOGRAPHERS</h4>
        <h2 className="rightbarSeeAll">See All</h2>
        <hr className="rightbarHr" />
        <ul className="rightbarUserList">
          {Users.map((u) => (
            <User key={u.id} user={u} />
          ))}
        </ul>
        <h4 className="rightbarTitle">LIST CONTEST</h4>
        <h2 className="rightbarSeeAll">See All</h2>
        <hr className="rightbarHr" />
        <ul className="rightbarUserList">
          {Contests.map((u) => (
            <ListContest key={u.id} contest={u} />
          ))}
        </ul>
        
        
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar/>
      </div>
    </div>
  );
}