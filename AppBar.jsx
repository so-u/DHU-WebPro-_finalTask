import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from './manageState/userSlice';
import { useNavigate } from 'react-router-dom';
import logo from './imgs/IMG_0623.jpg'

const AppBarButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pages = [
        {name: 'ホーム', url: '/'},
        {name: '投稿する', url: '/addPost'},
        {name: 'マイページ', url: '/myProf'},
    ]

    const movePages = (url) => {
        navigate(url)
    } 
    return (
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
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} onClick={() => movePages(pages[0].url)} style={{marginLeft: 20}}>
                俳句の達人
            </Typography>
            {pages.map((page) => (
                <Button key={page.name} color='inherit' onClick={()=> movePages(page.url)}>{page.name}</Button>
            ))}
            <Button color="inherit" onClick={() => dispatch(logout())}>ログアウト</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}
export default AppBarButton