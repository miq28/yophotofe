import "./contest.css"
import Footer from "../../components/Footer";
import ContestBar from "../../components/contestBar/ContestBar";
import ContestPost from "../../components/contestPost/ContestPost"
import ContestEntries from "../../components/contestEntries/ContestEntries"
import HeaderLogin from './../../components/HeaderLogin';

export default function Contest() {
  return (
    <>
      <HeaderLogin />
      <div className="background-wrapper">
        <div className="galleryall-wrapper">
          <div className="gallery-title">New Joiners - Nature #020</div>
          <div className="galleryall-cards-container">
            <ContestPost />
            <ContestBar />
          </div>
          <div className="galleryall-card-container">
            <ContestEntries profile />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
