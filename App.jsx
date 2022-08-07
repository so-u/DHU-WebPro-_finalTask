import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPost from './AddPost';
import './App.css';
import Auth from './Auth';
import EditPost from './EditPost';
import { auth } from './firebase';
import Home from './Home';
import { fetchHaikus, fetchMyHaikus } from './manageState/haikuSlice';
import { login, logout, selectUid } from './manageState/userSlice';
import MyProf from './MyProf';
import NotFound from './NotFound';


function App() {
  const uid = useSelector(selectUid)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(
          login({uid: authUser.uid, email: authUser.email})
        )
      }else{
        dispatch(logout())
      }
    })
    return () => {
      unSub();
    }
  },[])
  
  useEffect(() => {
    dispatch(fetchHaikus())
    dispatch(fetchMyHaikus(uid))
  }, [uid])

  return (
    <>
      {uid ? (
        <>
        <BrowserRouter>
        <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/addPost' element={<AddPost/>}/>
              <Route path='/myProf' element={<MyProf/>}/>
              <Route path='/editPost' element={<EditPost/>}/>
              <Route path={`*`} element={<NotFound/>} />
        </Routes>
        </BrowserRouter>
        </>
        ):(
        <Auth/>
      )}
    </>
  );
}

export default App;
