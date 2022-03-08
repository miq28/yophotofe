import "./contestEntries.css";
import { Users } from "../../dummyData";
import { Entry } from "../../dummyData";
import Entries from "../entries/Entries";

export default function ContestEntries({ profile }) {
  const HomecontestEntries = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="contestEntriesAd" src="assets/ad.png" alt="" />
        <h4 className="contestEntriesTitle">Online Friends</h4>
        <ul className="contestEntriesFriendList">
          
        </ul>
      </>
    );
  };

  const ProfilecontestEntries = ({profile}) => {
    return (
      <>
        <h4 className="contestEntriesTitle">All Entries So Far</h4>
        <div className="contestEntriesFollowings">
        {Entry.map((u) => (
            <Entries key={u.id} entry={u} />
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="contestEntries">
      <div className="contestEntriesWrapper">
        {profile ? <ProfilecontestEntries /> : <HomecontestEntries />}
      </div>
    </div>
  );
}