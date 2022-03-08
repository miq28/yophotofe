import "./contest.css"
import Header from "../../components/Header";
import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import ContestBar from "../../components/contestBar/ContestBar";
import ContestPost from "../../components/contestPost/ContestPost"
import ContestEntries from "../../components/contestEntries/ContestEntries"

export default function Contest() {
  return (
    <>
            <Header/>
            <div className="background-wrapper">
              {/* <HeaderHome headerHeight={350} /> */}
               <div className="galleryall-wrapper">
              <div className="gallery-title">New Joiners - Nature #020</div>
              <div className="galleryall-cards-container">
                <ContestPost/>
                <ContestBar/>
              </div>
              <div className="galleryall-card-container">
              <ContestEntries profile/>
              </div>
             </div>
            <Footer />
            </div>
        </>
  )
}
