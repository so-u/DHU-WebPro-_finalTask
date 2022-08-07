import { AppBar, Avatar, Box, Button, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { login } from "./manageState/userSlice";
import logo from './imgs/IMG_0623.jpg'


const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const dispatch = useDispatch()


    const Login = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            dispatch(login({uid: user?.uid, email: user?.email}))
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    const NewCreate = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            dispatch(login({uid: user?.uid, email: user?.email}))
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return ( 
        <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Stack direction="row" spacing={2}>
            <Avatar
                alt="Remy Sharp"
                src={logo}
                sx={{ width: 40, height: 40 }}
                />
            </Stack>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{marginLeft: 20}}>
                俳句の達人
            </Typography>
            </Toolbar>
        </AppBar>
        </Box>
        <h1>{isLogin ? 'ログイン' : '新規作成'}</h1>
        <div style={{textAlign: 'center'}}>
            <TextField
            required
            id="email"
            label="email"
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            focused
            style={{marginRight: 10}}
            />
            <TextField
            required
            id="password"
            label="password"
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            style={{marginRight: 10}}
            />
            {isLogin ?
            <>
            <Button
            variant="outlined"
            onClick={() => Login()}
            style={{marginRight: 10}}
            >ログイン</Button>
            <a onClick={() => setIsLogin(false)}>新規登録の方</a>
            </>
            :
            <>
            <Button
            variant="outlined"
            onClick={() => NewCreate()}
            >新規登録</Button>
            <a onClick={() => setIsLogin(true)}>ログインする</a>
            </>
            }

        </div>
        </>
     );
}
 
export default Auth;