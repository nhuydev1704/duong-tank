import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';
import GlobalStyle from './config/global.style';
import { LOADING_COLOR } from './config/theme';
import MainPage from './features/MainPage';
import { setAppLoading } from './redux/slice/root.slice';

function App() {
    const { appLoading } = useSelector((state: { root: { appLoading: boolean } }) => state.root);
    const [role, setRole] = React.useState('admin');

    const dispatch = useDispatch();

    // loading when going to app
    React.useEffect(() => {
        setTimeout(() => {
            dispatch(setAppLoading());
        }, 2000);
    }, []);

    React.useLayoutEffect(() => {
        // if (LocalStorage.getToken()) {
        //     authService.info().then((res) => {
        //         setRole(Object.keys(res.data)[0]);
        //         dispatch({
        //             type: SET_INFO,
        //             payload: { ...res.data[Object.keys(res.data)[0]], role: Object.keys(res.data)[0] },
        //         });
        //     });
        // }
        // chỗ này xử lý info user khi đăng nhập để phân quyền
    }, []);

    return (
        <SpinLoadingStyled spinning={appLoading} indicator={<HashLoader color={LOADING_COLOR} loading size={60} />}>
            <MainPage role={role} />
            {/* define default style */}
            <GlobalStyle />
        </SpinLoadingStyled>
    );
}

const SpinLoadingStyled = styled(Spin)`
    &&& {
        top: 20%;
    }
`;

export default App;
