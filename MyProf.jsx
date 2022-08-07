import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppBarButton from "./AppBar";
import { deleteMyHaiku, fetchHaikus, fetchMyHaikus, selectMyHaikuList, selectPost } from "./manageState/haikuSlice";
import { selectEmail, selectUid } from "./manageState/userSlice";

const MyProf = () => {
    const email = useSelector(selectEmail)
    const uid = useSelector(selectUid)
    const myHaikuList = useSelector(selectMyHaikuList)
    const dispatch = useDispatch()

    const deletePost = (id) => {
        dispatch(deleteMyHaiku(id))
        dispatch(fetchMyHaikus(uid))
        dispatch(fetchHaikus())
    }

    const selectHaiku = (list) => {
        dispatch(selectPost(list))

    }

    return ( 
        <>
        <AppBarButton/>
        <h1>マイページ</h1>
        <p>メールアドレス : {email}</p>
        <hr />
        {myHaikuList[0] &&
            myHaikuList.map((list) => (
                <div key={list.createAt} style={{textAlign: 'center'}}>
                    <p>{list.first} {list.middle} {list.final}</p>
                    <button onClick={()=>deletePost(list.id)}>削除</button>
                    <button onClick={()=>selectHaiku(list)}>
                        <Link to={'/editPost'}>編集</Link>
                    </button>
                    <hr />
                </div>
            ))
        }
        </>
     );
}
 
export default MyProf;