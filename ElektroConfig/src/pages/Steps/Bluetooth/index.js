/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
    Platform,
    PermissionsAndroid, // for checking if certain android permissions are enabled
    StyleSheet,
    Text,
    View,
    NativeEventEmitter, // for emitting events for the BLE manager
    NativeModules, // for getting an instance of the BLE manager module
    Button,
    FlatList, // for creating lists
    Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import BleManager from 'react-native-ble-manager'; // create an event emitter for the BLE Manager module

import { stringToBytes } from 'convert-string'; // for converting string to byte array
import RandomId from 'random-id'; // for generating random user ID
import bytesCounter from 'bytes-counter'; // for getting the number of bytes in a string
import Spinner from 'react-native-spinkit'; // for showing a spinner when loading something
// import Prompt from 'react-native-prompt';
// for talking to BLE peripherals
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule); // for showing an input prompt

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#0061a8',
    },
    header: {
        // flex: 1,
        backgroundColor: '#3037C2',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    app_title: {
        // flex: 7,
        padding: 10,
    },
    cardView: {
        width: 500,
        height: 500,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white',
    },
    header_button_container: {
        // flex: 2,
        justifyContent: 'center',
        paddingRight: 5,
    },
    header_text: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    body: {
        // flex: 19,
    },
    list_item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        // flex: 1,
        flexDirection: 'row',
    },
    list_item_text: {
        // flex: 8,
        color: '#575757',
        fontSize: 18,
    },
    list_item_button: {
        // flex: 2,
    },
    spinner: {
        alignSelf: 'center',
        marginTop: 30,
    },
    attendees_container: {
        // flex: 1,
    },
});

// next: create main component

export default class Bluetooth extends Component {
    constructor() {
        super();
        this.state = {
            is_scanning: false, // whether the app is currently scanning for peripherals or not
            enable: false,
            peripherals: null, // the peripherals detected
            connected_peripheral: null, // the currently connected peripheral
            // eslint-disable-next-line react/no-unused-state
            user_id: null, // the ID of the current user
            attendees: null, // the attendees currently synced with the app
            promptVisible: false, // whether the prompt for the user's name is visible or not
            has_attended: false, // whether the current user has already attended
        };

        this.peripherals = []; // temporary storage for the detected peripherals

        // this.startScan = this.startScan.bind(this); // function for scanning for peripherals
        // this.openBox = this.openBox.bind(this); // function for opening the prompt box]
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        BleManager.enableBluetooth()
            .then(() => {
                console.log('Bluetooth is already enabled');
                this.setState({ enable: true });
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                Alert.alert('You need to enable bluetooth to use this app.');
                this.setState({ enable: false });
            });

        // initialize the BLE module
        BleManager.start({ showAlert: false }).then(() => {
            console.log('Module initialized');
        });

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
            ).then(result => {
                if (!result) {
                    PermissionsAndroid.requestPermission(
                        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
                    ).then(res => {
                        if (!res) {
                            Alert.alert(
                                'You need to give access to coarse location to use this app.'
                            );
                        }
                    });
                }
            });
        }
    }

    render() {
        const { enable } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.app_title}>
                        <Text style={styles.header_text}>
                            You need to enable bluetooth to use this app
                        </Text>
                    </View>
                    {/* <View style={styles.header_button_container}>
                        {!connected_peripheral && (
                            <Button
                                title="Scan"
                                color="#1491ee"
                                onPress={this.startScan}
                            />
                        )}
                    </View> */}
                </View>

                <View style={styles.cardView}>
                    <Spinner
                        size={50}
                        type="Wave"
                        color="#6097FC"
                        isVisible
                        style={styles.spinner}
                    />
                    <Icon
                        name="bluetooth"
                        size={100}
                        color="#6097FC"
                        borderRadius="8"
                        borderColor="#6097FC"
                    />
                    <View />
                </View>
            </View>
        );
    }
}
