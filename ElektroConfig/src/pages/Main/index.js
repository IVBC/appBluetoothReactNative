import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {
    Container,
    Logo,
    InitialButton,
    InitialButtonText,
    Version,
    Body,
    VersionText,
} from './styles';
import iconTPV from '../../assets/tpv.png';

export default function Main({ navigation }) {
    return (
        <Container>
            <Body>
                <Logo resizeMode="center" source={iconTPV} />
                <InitialButton onPress={() => navigation.navigate('Steps')}>
                    <Icon name="settings" size={20} color="#FFF" />
                    <InitialButtonText> Start </InitialButtonText>
                </InitialButton>
            </Body>
            <Version>
                <VersionText>V1.0.0</VersionText>
                <VersionText>@HUB - Tecnologia e Inovação</VersionText>
            </Version>
        </Container>
    );
}
Main.navigationOptions = {
    title: 'Firmware Setting',
};

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};
