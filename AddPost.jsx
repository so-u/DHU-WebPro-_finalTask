import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppBarButton from "./AppBar";
import { fetchHaikus, fetchMyHaikus, postHaiku } from "./manageState/haikuSlice";
import { useSelector } from "./manageState/store";
import { selectUid } from "./manageState/userSlice";

const AddPost = () => {
    const [first, setFirst] = useState('')
    const [middle, setMiddle] = useState('')
    const [final, setFinal] = useState('')
    const uid = useSelector(selectUid)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Post = () => {
        if(first || middle || final){
            const data = {
                first: first,
                middle: middle,
                final: final,
                uid: uid
            }
            dispatch(postHaiku(data))
            dispatch(fetchHaikus())
            dispatch(fetchMyHaikus(uid))
            navigate('/')
        }else{
            alert('文字を記入してください')
        }

    }

    return ( 
        <>
        <AppBarButton/>
        <h1>投稿ページ</h1>
        <div style={{textAlign: 'center'}}>

        <TextField
          focused
          required
          id="first"
          label="上の句"
          onChange={(e) => setFirst(e.target.value)}
          style={{marginRight: 10}}
          />
        <TextField
          focused
          required
          id="middle"
          label="中の句"
          onChange={(e) => setMiddle(e.target.value)}
          style={{marginRight: 10}}
          />
        <TextField
          focused
          required
          id="final"
          label="下の句"
          onChange={(e) => setFinal(e.target.value)}
          style={{marginRight: 10}}
          />

        <Button
            variant="outlined"
            onClick={() => Post()}
            style={{marginRight: 10}}
            >
            投稿する
        </Button>
            </div>
        </>
     );
}
 
export default AddPost;