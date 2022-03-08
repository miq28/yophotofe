import "./user.css";

export default function User({user}) {
  return (
    <li className="rightbarUser">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture} alt="" />
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}