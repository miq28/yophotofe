import { Link } from "react-router-dom";
import "./contestPost.css";

export default function ContestPost() {
  return (
    <div className="contestPost">
      <div className="contestPostWrapper">
        <img
          className="contestPostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
       <h1 className="contestPostTitle">
         BRIEF
      </h1>
        
        {/* <div className="contestPostInfo">
          <span>
            Author:
            <b className="contestPostAuthor">
              <Link className="link" to="/posts?username=Safak">
                Safak
              </Link>
            </b>
          </span>
          <span>1 day ago</span>
        </div> */}
        <p className="contestPostDesc">
        Welcome to Portraiture’s ‘Nature’ contest for New Joiners! These contests are a chance for new members to introduce their photography to the community, and get a taste of how Portraiture contests work. They can be entered by anyone within their first 28 days of joining Portraiture. After 100 images have been submitted the contest closes and the Crowd will start rating the images. The Expert Judge will also be judging the images and writing reviews at the same time. All the winners, both Crowd and Expert, will be announced after 3 days of judging.

Make sure you also check out our two other New Joiners contests - ‘Animals’ and ‘Landscapes’.

        </p>
      </div>
    </div>
  );
}