import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { TouchableOpacity, Text, View, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './scanStyle';

class Scan extends Component {
    static propTypes = {
        handleDataShellAsset: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            // result: null,
            dataShellAsset: null,
        };
    }

    onSuccess = async e => {
        const check = e.data.substring(0, 4);
        // console.log(`scanned data${check}`);
        let dataShell = null;
        if (e.data) {
            try {
                dataShell = JSON.parse(e.data);

                await this.setState({
                    // result: e,
                    scan: false,
                    ScanResult: true,
                    dataShellAsset: dataShell,
                });
                const { handleDataShellAsset } = this.props;
                const { dataShellAsset } = this.state;
                handleDataShellAsset(dataShellAsset);
                if (check === 'http') {
                    // Linking.openURL(e.data).catch(err =>
                    //     console.error('An error occured', err)
                    // );
                } else {
                    this.setState({
                        // result: e,
                        scan: false,
                        ScanResult: true,
                        dataShellAsset: dataShell,
                    });
                }
            } catch (error) {
                Alert.alert(
                    'Invalid QR Code',
                    'Please check string if it is in json format'
                );
                await this.setState({
                    // result: e,
                    scan: false,
                    ScanResult: false,
                    dataShellAsset: dataShell,
                });
                // const { handleDataShellAsset } = this.props;
                // const { dataShellAsset } = this.state;
                // handleDataShellAsset(dataShellAsset);
                if (check === 'http') {
                    // Linking.openURL(e.data).catch(err =>
                    //     console.error('An error occured', err)
                    // );
                } else {
                    this.setState({
                        // result: e,
                        scan: false,
                        ScanResult: false,
                        dataShellAsset: dataShell,
                    });
                }
            }
        }
    };

    activeQR = () => {
        this.setState({
            scan: true,
        });
    };

    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false,
        });
    };

    render() {
        const { scan, ScanResult, dataShellAsset } = this.state;
        const desccription =
            'Asset Shell QR Code is an Asset Administration Shell (AAS) identifier required for the firmware settings of a medication or control unit. This identification contains information such as the network ssid and password, the broker URL and port, and the topic for MQTT. Please authorize your device to user the camera and point to AAS QR code.';
        return (
            <View style={styles.scrollViewStyle}>
                <>
                    {/* <StatusBar barStyle="dark-content" /> */}
                    <Text style={styles.textTitle}>
                        Please scan Asset Shell QR code
                    </Text>
                    {!scan && !ScanResult && (
                        <View style={styles.cardView}>
                            <Text numberOfLines={8} style={styles.descText}>
                                {desccription}
                            </Text>

                            <TouchableOpacity
                                onPress={this.activeQR}
                                style={styles.buttonTouchable}
                            >
                                <Icon
                                    name="camera-alt"
                                    size={20}
                                    color="#FFF"
                                />
                                <Text style={styles.buttonTextStyle}>
                                    Click to Scan !
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {ScanResult && (
                        <>
                            {/* <Text style={styles.textTitle1}>Result !</Text> */}
                            <View
                                style={
                                    ScanResult
                                        ? styles.scanCardView
                                        : styles.cardView
                                }
                            >
                                <View
                                    style={{ height: '50%', marginBottom: 15 }}
                                >
                                    <FlatList
                                        style={{}}
                                        data={Object.keys(dataShellAsset)}
                                        renderItem={({ item }) => (
                                            <View
                                                style={{
                                                    flexDirection: 'row',

                                                    borderBottomWidth: 1,
                                                    borderColor: '#c0c0c0',
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

                                {/* <Text numberOfLines={1}>
                                    RawData: {result.rawData}
                                </Text> */}
                                <TouchableOpacity
                                    onPress={this.scanAgain}
                                    style={styles.buttonTouchable}
                                >
                                    <Text style={styles.buttonTextStyle}>
                                        Click to Scan again!
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    {scan && (
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <QRCodeScanner
                                reactivate
                                showMarker
                                style={{}}
                                ref={node => {
                                    this.scanner = node;
                                }}
                                onRead={this.onSuccess}
                                // topContent={
                                //     <Text style={styles.centerText}>
                                //         Go to{' '}
                                //         <Text style={styles.textBold}>
                                //             wikipedia.org/wiki/QR_code
                                //         </Text>{' '}
                                //         on your computer and scan the QR code to
                                //         test.
                                //     </Text>
                                // }
                                bottomContent={
                                    <View>
                                        {/* <TouchableOpacity
                                            style={styles.buttonTouchable}
                                            onPress={() =>
                                                this.scanner.reactivate()
                                            }
                                        >
                                            <Text
                                                style={styles.buttonTextStyle}
                                            >
                                                OK. Got it!
                                            </Text>
                                        </TouchableOpacity> */}

                                        <TouchableOpacity
                                            style={styles.buttonTouchable}
                                            onPress={() =>
                                                this.setState({ scan: false })
                                            }
                                        >
                                            <Text
                                                style={styles.buttonTextStyle}
                                            >
                                                Stop Scan
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        </View>
                    )}
                </>
            </View>
        );
    }
}

export default Scan;
