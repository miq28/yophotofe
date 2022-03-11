// import "./listContest.css";

// export default function User({contest}) {
//   return (
//     <li className="rightbarContest">
//       <div className="rightbarCoverImgContainer">
//         <img className="rightbarCoverImg" src={contest.photo} alt="" />
//       </div>
//       <span className="rightbarTitle">{contest.title}</span>
//       <span className="righbarDate">{contest.date}</span>
//     </li>
//   );
// }

import "./listContest.css";

export default function User({ contest }) {
  return (
    <li className="flex justify-start items-center my-2">
      <div>
        <img className="w-[100px] h-full object-cover rounded-md" src={contest.photo} alt="" />
      </div>
      <div className="flex flex-col ml-2">
        <p>
          {contest.title}
        </p>
        <p className="text-slate-400 text-xs">
          {contest.date}
        </p>
      </div>
    </li>
  );
}