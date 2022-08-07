import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppBarButton from "./AppBar";
import { fetchHaikus, fetchMyHaikus, selectSelectedHaiku, updateHaiku } from "./manageState/haikuSlice";
import { selectUid } from "./manageState/userSlice";

const EditPost = () => {
    const selectHaiku = useSelector(selectSelectedHaiku)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [first, setFirst] = useState('')
    const [middle, setMiddle] = useState('')
    const [final, setFinal] = useState('')

    const editPost = () => {
        if(first || middle || final){
            let data = {}
            if(first){data = {first: first}}
            if(middle){data = {...data, middle: middle}}
            if(final){data = {...data, final: final}}
            dispatch(updateHaiku({data: data, id: selectHaiku.id}))
            dispatch(fetchMyHaikus(selectHaiku.uid))
            dispatch(fetchHaikus())
            navigate('/myProf')
        }else{
            alert('編集内容を入力してください')
        }

    }


    return ( 
        <>
        <AppBarButton/>
        <h1>投稿編集ページ</h1>
        {selectHaiku.first ? (
            <>
            <div style={{textAlign: 'center'}}>
                <TextField
                focused
                required
                id="first"
                label="上の句"
                defaultValue={selectHaiku.first}
                onChange={(e) => setFirst(e.target.value)}
                style={{marginRight: 10}}
                />
                <TextField
                focused
                required
                id="middle"
                label="中の句"
                defaultValue={selectHaiku.middle}
                onChange={(e) => setMiddle(e.target.value)}
                style={{marginRight: 10}}
                />
                <TextField
                focused
                required
                id="final"
                label="下の句"
                defaultValue={selectHaiku.final}
                onChange={(e) => setFinal(e.target.value)}
                style={{marginRight: 10}}
                />

                <Button
                    variant="outlined"
                    onClick={() => editPost()}
                >
                    保存する
                </Button>
                </div>
            </>
        ):
            <>
                <h1>編集する俳句を選択してください</h1>
            </>
        }
        </>
     );
}
 
export default EditPost;