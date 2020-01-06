/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

class Result extends Component {
    static propTypes = {
        data: PropTypes.shape({
            dataShellAsset: PropTypes.object,
            dataDevice: PropTypes.object,
        }).isRequired,
        navigation: PropTypes.shape({
            goBack: PropTypes.func.isRequired,
        }).isRequired,
    };

    state = {
        dataDevice: {
            id: 'unknow',
        },
        dataShellAsset: {
            ssid: 'unknow',
            ssid_key: 'unknow',
            topic: 'unknow',
            port: 'unknow',
        },
    };

    UNSAFE_componentWillReceiveProps(props) {
        if (props.data.dataDevice && props.data.dataShellAsset)
            this.setState({
                dataDevice: props.data.dataDevice,
                dataShellAsset: props.data.dataShellAsset,
            });
    }

    render() {
        const { dataDevice, dataShellAsset } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.scrollViewStyle}>
                <>
                    <View>
                        <View>
                            <Text style={styles.textTitle}>
                                Finished Firmware Configuration Process
                            </Text>
                        </View>

                        <View style={styles.cardView}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-around',
                                }}
                            >
                                {/* <View
                                    style={{
                                        width: '100%',
                                        height: '60%',
                                        padding: 20,
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}
                                > */}
                                <View
                                    style={{
                                        Maxheight: 200,
                                        backgroundColor: '#fff',
                                        padding: 20,
                                        borderColor: '#c8c8c8',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 30,
                                            // width: 300,
                                            backgroundColor: '#ccc',
                                            justifyContent: 'center',
                                            padding: 15,
                                            borderRadius: 3,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text style={styles.toolbarTitle}>
                                            Shell Asset
                                        </Text>
                                    </View>

                                    <FlatList
                                        style={{}}
                                        data={Object.keys(dataShellAsset)}
                                        renderItem={({ item }) => (
                                            <View
                                                style={{
                                                    flexDirection: 'row',

                                                    alignItems: 'center',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        textTransform:
                                                            'uppercase',
                                                        fontWeight: 'bold',
                                                        color: '#0061A8',
                                                    }}
                                                >
                                                    {item} :{' '}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                    }}
                                                >
                                                    {dataShellAsset[item]}
                                                </Text>
                                            </View>
                                        )}
                                        keyExtractor={item => item}
                                    />
                                </View>
                                <View style={styles.iconReceive}>
                                    <Icon
                                        size={100}
                                        color="#0061A8"
                                        name="keyboard-tab"
                                    />
                                </View>
                                <View
                                    style={{
                                        Maxheight: 300,
                                        backgroundColor: '#fff',
                                        padding: 20,
                                        borderColor: '#c8c8c8',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 30,
                                            width: 200,
                                            backgroundColor: '#ccc',
                                            justifyContent: 'center',
                                            padding: 15,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <Text style={styles.toolbarTitle}>
                                            Device
                                        </Text>
                                    </View>

                                    <FlatList
                                        style={{}}
                                        data={Object.keys(dataDevice)}
                                        renderItem={({ item }) => (
                                            <View
                                                style={{
                                                    flexDirection: 'row',

                                                    alignItems: 'center',
                                                    marginVertical: 8,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        textTransform:
                                                            'uppercase',
                                                        fontWeight: 'bold',
                                                        color: '#0061A8',
                                                    }}
                                                >
                                                    {item} :{' '}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                    }}
                                                >
                                                    {dataDevice[item]}
                                                </Text>
                                            </View>
                                        )}
                                        keyExtractor={item => item}
                                    />
                                </View>
                                {/* </View> */}
                            </View>
                            <View style={styles.toolbar}>
                                <Text style={styles.toolbarTitle}>
                                    Firmware settings were successfully sent to
                                    the device.
                                </Text>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                    style={styles.buttonTouchable}
                                >
                                    <Icon
                                        name="settings-applications"
                                        size={30}
                                        color="#FFF"
                                    />
                                    <Text style={styles.buttonTextStyle}>
                                        New Settings
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </>
            </View>
        );
    }
}

export default withNavigation(Result);
