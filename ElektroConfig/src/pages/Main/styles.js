import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    padding: 30px;
    /* flex-direction: column; */
    justify-content: center;
    /* align-items: center; */
`;

export const Body = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: 430px;
    height: 200px;
`;
export const InitialButton = styled(RectButton)`
    flex-direction: row;
    background: #0061a8;
    border-radius: 4px;
    margin-top: 80px;
    padding: 12px 100px;
`;
export const InitialButtonText = styled.Text`
    color: #fff;
`;

export const Version = styled.View`
    flex: 0.1;
    justify-content: flex-end;
    align-items: center;
`;

export const VersionText = styled.Text`
    font-size: 15px;
    line-height: 18px; /* Distancia entre linhas */
    color: #999;
    margin-top: 5px;
    text-align: center;
`;
