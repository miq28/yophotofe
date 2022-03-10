import "./userAll.css"
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../../helper/url";
import { toastError } from "../../redux/actions";
import Pagination from '@material-ui/lab/Pagination';
import UserCard from "../../components/userCard/UserCard";


export default function UserAll() {
    const [collections, setCollections] = useState([])
    const [userAll, storeUserAll] = useState([])
    const [pageNumber, setPageNumber] =useState([])
    const [page, setPage] = useState([])

    const dispatch = useDispatch

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = async () => {
        try{
            const res = await axios.get(`${URL_API}/users/nested?skip=0&take=50`)
            const userAll = res.data.result

            storeUserAll(userAll)
            let numTotal = userAll.length
            setPageNumber(Math.ceil(numTotal/15))
            let slicedUser = []
            slicedUser = userAll.slice(0,15)
            setCollections(slicedUser)
        } catch (error) {
            if (error.response) {
                dispatch(toastError(`${error.response.data.message}`))
                console.log(error.response.data.message)
            } else {
                console.log(`Error`, error.message)
            }
        }
    } 

    const pageChange = async (value) => {
        setPage(value)
        try{
            const numTotal = userAll.length
            let slicedUser = []
            if (numTotal > 15) slicedUser = userAll.slice(15 * (value-1), 15 * value)
            setCollections(slicedUser)
        } catch (error) {
            dispatch(toastError(`${error.response.data.message}`))
        }
    }


  return (
    <>
            <Header/>
            <div className="userAll">          
                <div className="userAllContainer">
                    {collections.map((p) => (
                    <UserCard key={p.id} post={p} />
                    ))}
                    <div className="userall-pagination">
                    <Pagination
                        count={pageNumber}
                        page={page}
                        onChange={pageChange}
                        shape="rounded"
                    />
                    </div>
                </div>
                
            </div>
        </>
  )
}
