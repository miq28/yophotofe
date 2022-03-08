import "./entries.css";

export default function Entries({entry}) {
  return (
    <li className="entries">
      <div className="entriesImgContainer">
        <img className="entriesImg" src={entry.photo} alt="" />
      </div>
    </li>
  );
}