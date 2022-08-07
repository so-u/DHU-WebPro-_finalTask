import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
    haiku: [],
    myHaiku: [],
    selectedHaiku: {
        first: '',
        middle: '',
        final: '',
        id: '',
        uid: '',
        createAt: '',
    }
}

export const postHaiku = createAsyncThunk('haiku/post',
async (data) => {
    const date = Timestamp.fromDate(new Date()).seconds
    await addDoc(collection(db, 'haikus'),{
        first: data.first,
        middle: data.middle,
        final: data.final,
        uid: data.uid,
        createAt: date
    })
    return data.value
}
)

export const updateHaiku = createAsyncThunk('haiku/update',
async (data) => {
    await updateDoc(doc(db, 'haikus', data.id),data.data)
})

export const fetchHaikus = createAsyncThunk('haiku/list',
async () => {
    let haikuList = []
    await getDocs(collection(db, 'haikus')).then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
            haikuList.push(doc.data())
        })
    })
    haikuList.sort(function(a, b){
        return b.createAt - a.createAt
    })
    return haikuList
}
)

export const fetchMyHaikus = createAsyncThunk('haiku/myList',
async (uid) => {
    let myHaikuList = []
    await getDocs(collection(db, 'haikus')).then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
            if(doc.data().uid == uid){
                const data = Object.assign(doc.data(), {id: doc.id})
                myHaikuList.push(data)
            }
        })
    })
    myHaikuList.sort(function(a, b){
        return b.createAt - a.createAt
    })
    return myHaikuList
})

export const deleteMyHaiku = createAsyncThunk('haiku/delete',
async (id) => {
    await deleteDoc(doc(db, 'haikus', id))
})

export const haikuSlice = createSlice({
    name: 'haiku',
    initialState,
    reducers: {
        selectPost: (state, action) => {
            state.selectedHaiku = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHaikus.fulfilled, (state, action) => {
            action.payload && (
                state.haiku = action.payload
            )
        })
        builder.addCase(fetchMyHaikus.fulfilled, (state, action)=> {
            action.payload && (
                state.myHaiku = action.payload
            )
        })
    }
})

export const {selectPost} = haikuSlice.actions

export const Haikus = (state) => state.haiku.haiku
export const selectHaikuList = (state) => state.haiku.haiku
export const selectMyHaikuList = (state) => state.haiku.myHaiku
export const selectSelectedHaiku = (state) => state.haiku.selectedHaiku

export default haikuSlice.reducer