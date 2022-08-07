import { useDispatch, useSelector } from "react-redux";
import AppBarButton from "./AppBar";
import { selectHaikuList } from "./manageState/haikuSlice";

const Home = () => {
    const haikuList = useSelector(selectHaikuList)
    const dispatch = useDispatch()
    
    return ( 
        <>
        <AppBarButton/>
        <h1>ホーム</h1>
        {haikuList[0] &&
            haikuList.map((list) => (
                <div key={list.createAt} style={{textAlign: 'center'}}>
                <p>{list.first}　　{list.middle}　　{list.final}</p>
                <hr />
                </div>
            ))
        }
        </>
     );
}

export default Home;