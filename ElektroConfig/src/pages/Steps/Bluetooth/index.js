/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
    Platform,
    PermissionsAndroid, // for checking if certain android permissions are enabled
    Text,
    View,
    NativeEventEmitter, // for emitting events for the BLE manager
    NativeModules, // for getting an instance of the BLE manager module
    Alert,
    Switch,
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BleManager from 'react-native-ble-manager'; // create an event emitter for the BLE Manager module

import { stringToBytes } from 'convert-string'; // for converting string to byte array
import RandomId from 'random-id'; // for generating random user ID
import bytesCounter from 'bytes-counter'; // for getting the number of bytes in a string
import Spinner from 'react-native-spinkit'; // for showing a spinner when loading something
import styles from './styles';
// import Prompt from 'react-native-prompt';
// for talking to BLE peripherals
import iconBleON from '../../../assets/bleActive.png';
import iconBleOFF from '../../../assets/bleDisabled.png';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule); // for showing an input prompt

// next: create main component

export default class Bluetooth extends Component {
    static propTypes = {
        data: PropTypes.shape({
            dataShellAsset: PropTypes.object,
            dataDevice: PropTypes.object,
            currentStep: PropTypes.number,
        }).isRequired,
        handleNextPage: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            dataDevice: { id: null },
            dataShellAsset: null,
            nameDevice: null,
            is_scanning: false, // whether the app is currently scanning for peripherals or not
            enable: false,
            peripherals: null, // the peripherals detected
            connected_peripheral: null, // the currently connected peripheral
            connecting: false,
            // eslint-disable-next-line react/no-unused-state
            user_id: null, // the ID of the current user
            attendees: null, // the attendees currently synced with the app
            promptVisible: false, // whether the prompt for the user's name is visible or not
            has_attended: false, // whether the current user has already attended
            done: false,
        };

        this.peripherals = []; // temporary storage for the detected peripherals

        // this.startScan = this.startScan.bind(this); // function for scanning for peripherals
        // this.openBox = this.openBox.bind(this); // function for opening the prompt box]
    }

    // // eslint-disable-next-line react/no-deprecated
    // componentWillMount() {}

    // componentDidMount() {}

    async UNSAFE_componentWillReceiveProps(props) {
        const { done } = this.state;
        // console.tron.log('props new ', props);
        // console.tron.log('state', this.state);
        // console.tron.log(
        //     'if ',
        //     props.data.dataDevice && props.data.currentStep === 2 && !done
        // );
        if (props.data.dataDevice && props.data.currentStep === 2 && !done) {
            await this.setState({
                dataDevice: props.data.dataDevice,
                dataShellAsset: props.data.dataShellAsset,
                done: true,
            });
            // this.setState({ done: true });
            const {
                dataDevice: { id: nameDevice },
            } = this.state;
            // console.tron.log(' nome device ', nameDevice);

            // console.tron.log('state no if', this.state);

            await this.enable();

            bleManagerEmitter.addListener(
                'BleManagerDiscoverPeripheral',
                peripheral => {
                    // console.tron.log(peripheral);
                    const { peripherals } = this; // get the peripherals
                    // check if the peripheral already exists
                    // const el = peripherals.filter(e => {
                    //     return e.id === peripheral.id;
                    // });

                    // if (!el.length) {
                    //     peripherals.push({
                    //         id: peripheral.id, // mac address of the peripheral
                    //         name: peripheral.name, // descriptive name given to the peripheral
                    //     });
                    //     this.peripherals = peripherals; // update the array of peripherals
                    // }
                    if (peripheral.name) {
                        peripherals.push({
                            id: peripheral.id, // mac address of the peripheral
                            name: peripheral.name, // descriptive name given to the peripheral
                        });
                        this.peripherals = peripherals; // update the array of peripherals
                    }

                    this.setState({ peripherals });
                }
            );
            // next: add code for listening for when the peripheral scan has stopped
            bleManagerEmitter.addListener('BleManagerStopScan', () => {
                console.log('scan stopped');
                console.log(this.peripherals);
                if (this.peripherals.length === 0) {
                    Alert.alert(
                        'Nothing found',
                        'Sorry, no peripherals were found'
                    );
                } else {
                    const device = this.peripherals.find(obj => {
                        return obj.name === nameDevice;
                    });
                    console.log(nameDevice);
                    if (device) {
                        this.setState({ connecting: true });
                        this.connect(device.id);
                    }
                }
                this.setState({
                    is_scanning: false,
                    peripherals: this.peripherals,
                });
            });

            // const pusher = new Pusher('YOUR PUSHER APP KEY', {
            //     cluster: 'YOUR PUSHER APP CLUSTER',
            //     encrypted: true,
            // });

            // const channel = pusher.subscribe('attendance-channel');
            // channel.bind('attendance-event', data => {
            //     if (data.is_attendees) {
            //         this.setState({
            //             attendees: data.attendees,
            //         });
            //     } else {
            //         ToastAndroid.show(
            //             `${data.full_name} just entered the room!`,
            //             ToastAndroid.LONG
            //         );
            //         this.setState({
            //             attendees: [...this.state.attendees, data],
            //         });
            //     }
            // });
        }
    }

    enable() {
        console.tron.log('Ativando...', this.state);
        BleManager.enableBluetooth()
            .then(() => {
                console.log('Bluetooth is already enabled');
                this.setState({ enable: true });
                this.startScan();
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                Alert.alert('You need to enable bluetooth to use this app.');
                this.setState({ enable: false });
            });

        // initialize the BLE module
        BleManager.start({ showAlert: true }).then(() => {
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

    // eslint-disable-next-line class-methods-use-this
    disable() {
        Alert.alert('You need to keep bluetooth enabled to use this app');
    }

    toggleBluetooth(value) {
        if (value === true) {
            this.enable();
        } else {
            this.disable();
        }
    }

    startScan() {
        this.peripherals = [];
        this.setState({
            is_scanning: true,
        });

        BleManager.scan([], 5).then(() => {
            console.log('scan started');
        });
    }

    connect(peripheral_id) {
        const { dataShellAsset } = this.state;
        BleManager.connect(peripheral_id)
            .then(() => {
                this.setState({
                    connected_peripheral: peripheral_id,
                    connecting: false,
                });

                Alert.alert(
                    'Connected!',
                    'You are now connected to the peripheral.'
                );

                // retrieve the services advertised by this peripheral
                BleManager.retrieveServices(peripheral_id).then(
                    peripheralInfo => {
                        this.attend.call(this, dataShellAsset);
                        console.log('Peripheral info:', peripheralInfo);
                        console.tron.log(peripheralInfo);
                    }
                );
            })
            .catch(error => {
                Alert.alert(
                    'Err..',
                    'Something went wrong while trying to connect.'
                );
                this.setState({
                    connected_peripheral: null,
                });
            });
    }

    attend(value) {
        const user_id = RandomId(15);

        this.setState({
            // eslint-disable-next-line react/no-unused-state
            user_id,
        });

        const me = {
            id: user_id,
            full_name: value,
        };

        const str = JSON.stringify(value); // convert the object to a string
        const bytes = bytesCounter.count(str); // count the number of bytes
        const data = stringToBytes(str); // convert the string to a byte array

        // construct the UUIDs the same way it was constructed in the server component earlier
        // const BASE_UUID = '-5659-402b-aeb3-d2f7dcd1b999';
        // const PERIPHERAL_ID = '0000';
        // const PRIMARY_SERVICE_ID = '0100';

        // const primary_service_uuid =
        //     PERIPHERAL_ID + PRIMARY_SERVICE_ID + BASE_UUID; // the service UUID
        // const ps_characteristic_uuid = `${PERIPHERAL_ID}0300${BASE_UUID}`; // the characteristic ID to write on

        // write the attendees info to the characteristic
        BleManager.write(
            // eslint-disable-next-line react/destructuring-assignment
            this.state.connected_peripheral,
            '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
            'beb5483e-36e1-4688-b7f5-ea07361b26a8',
            data,
            bytes
        )
            .then(() => {
                this.setState({
                    has_attended: true,
                });

                Alert.alert(
                    'Success',
                    'Asset Shell data has been successfully sent to the device.'
                );
                // disconnect to the peripheral
                // eslint-disable-next-line react/destructuring-assignment
                console.log(this.state.connected_peripheral);

                const { handleNextPage } = this.props;
                handleNextPage(true);
                // BleManager.disconnect(this.state.connected_peripheral)
                //     .then(() => {
                //         Alert.alert(
                //             'Attended',
                //             'You have successfully attended the event, please disable bluetooth.'
                //         );
                //     })
                //     // eslint-disable-next-line no-unused-vars
                //     .catch(e => {
                //         Alert.alert(
                //             'Error disconnecting',
                //             "You have successfully attended the event but there's a problem disconnecting to the peripheral, please disable bluetooth to force disconnection."
                //         );
                //     });
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                Alert.alert(
                    'Error attending',
                    `Something went wrong while trying to attend. Please try again.${error}`
                );
            });
    }

    render() {
        const {
            enable,
            is_scanning,
            connected_peripheral,
            dataDevice: { id: nameDevice },
            dataShellAsset,
            connecting,
        } = this.state;
        return (
            <View style={styles.scrollViewStyle}>
                <>
                    <Text style={styles.textTitle}>
                        Update embedded software via bluetooth
                    </Text>
                    <View style={styles.cardView}>
                        <View style={styles.toolbar}>
                            <Text style={styles.toolbarTitle}>
                                Bluetooth Status:
                            </Text>
                            <Image
                                style={styles.toolbarIcon}
                                source={enable ? iconBleON : iconBleOFF}
                            />
                            <View style={styles.toolbarButton}>
                                <Switch
                                    value={enable}
                                    onValueChange={val =>
                                        this.toggleBluetooth(val)
                                    }
                                />
                            </View>
                        </View>
                        {!enable && (
                            <View style={styles.body}>
                                <Icon size={50} color="red" name="report" />
                                <Text style={styles.textSetup}>
                                    You need to enable bluetooth to proceed with
                                    the setup.
                                </Text>
                            </View>
                        )}

                        {enable && (
                            <>
                                {is_scanning && (
                                    <View style={styles.body}>
                                        <Icon
                                            size={50}
                                            name="bluetooth-searching"
                                        />
                                        <Text style={styles.textSeaching}>
                                            Searching:
                                        </Text>
                                        <Text style={styles.textDevice}>
                                            {nameDevice}
                                        </Text>

                                        <Spinner
                                            size={50}
                                            type="Wave"
                                            color="#045b9b"
                                            isVisible
                                            style={styles.spinner}
                                        />
                                    </View>
                                )}

                                {!is_scanning && connected_peripheral && (
                                    <View style={styles.body}>
                                        <Icon
                                            size={50}
                                            name="bluetooth-connected"
                                        />
                                        <Text style={styles.textSeaching}>
                                            Connected:
                                        </Text>
                                        <View style={styles.contentDevice}>
                                            <Text style={styles.textDevice}>
                                                {nameDevice}
                                            </Text>

                                            <Icon
                                                size={50}
                                                color="#42D335"
                                                name="check-circle"
                                            />
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.attend.call(
                                                        this,
                                                        dataShellAsset
                                                    );
                                                }}
                                                style={styles.buttonTouchable}
                                            >
                                                <Text
                                                    style={
                                                        styles.buttonTextStyle
                                                    }
                                                >
                                                    Send Again
                                                </Text>
                                                <Icon
                                                    name="send"
                                                    size={20}
                                                    color="#FFF"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}

                                {!is_scanning &&
                                    !connected_peripheral &&
                                    !connecting && (
                                        <View style={styles.body}>
                                            <Icon
                                                size={50}
                                                name="phonelink-erase"
                                            />
                                            <Text style={styles.textSeaching}>
                                                Error: Device not found.
                                            </Text>
                                            <View
                                                style={styles.contentDevice}
                                                // style={{
                                                //     flexDirection: 'row',
                                                //     justifyContent: 'center',
                                                //     alignItems: 'center',
                                                //     alignContent: 'center',
                                                // }}
                                            >
                                                <Icon
                                                    size={50}
                                                    color="#F00"
                                                    name="close"
                                                />
                                                <Text style={styles.textDevice}>
                                                    {nameDevice}
                                                </Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.startScan();
                                                    }}
                                                    style={
                                                        styles.buttonTouchable
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.buttonTextStyle
                                                        }
                                                    >
                                                        Try Again
                                                    </Text>
                                                    <Icon
                                                        name="refresh"
                                                        size={20}
                                                        color="#FFF"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}

                                {!is_scanning &&
                                    !connected_peripheral &&
                                    connecting && (
                                        <View style={styles.body}>
                                            <Icon
                                                size={50}
                                                name="bluetooth-searching"
                                            />
                                            <Text style={styles.textSeaching}>
                                                Connecting ... Please wait.
                                            </Text>
                                            <View style={styles.contentDevice}>
                                                <Text style={styles.textDevice}>
                                                    {nameDevice}
                                                </Text>

                                                <Spinner
                                                    size={50}
                                                    type="Pulse" // Pulse
                                                    color="#045b9b"
                                                    isVisible
                                                />
                                            </View>
                                            <View>
                                                <Spinner
                                                    size={50}
                                                    type="Wave"
                                                    color="#045b9b"
                                                    isVisible
                                                    style={styles.spinner}
                                                />
                                            </View>
                                        </View>
                                    )}
                            </>
                        )}
                    </View>
                </>
            </View>

            // <View style={styles.container}>
            //     <View style={styles.header}>
            //         <View style={styles.app_title}>
            //             <Text style={styles.header_text}>
            //                 You need to enable bluetooth to use this app
            //             </Text>
            //         </View>
            //         {/* <View style={styles.header_button_container}>
            //             {!connected_peripheral && (
            //                 <Button
            //                     title="Scan"
            //                     color="#1491ee"
            //                     onPress={this.startScan}
            //                 />
            //             )}
            //         </View> */}
            //     </View>

            //     <View style={styles.cardView}>
            //         <Spinner
            //             size={50}
            //             type="Wave"
            //             color="#6097FC"
            //             isVisible
            //             style={styles.spinner}
            //         />
            //         <Icon
            //             name="bluetooth"
            //             size={100}
            //             color="#6097FC"
            //             borderRadius="8"
            //             borderColor="#6097FC"
            //         />
            //         <View />
            //     </View>
            // </View>
        );
    }
}
