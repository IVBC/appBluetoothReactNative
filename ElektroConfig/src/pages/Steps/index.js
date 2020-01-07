import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import ShellAssets from './ShellAssets';
import Device from './Device';
import Bluetooth from './Bluetooth';
import Result from './Result';

// const firstIndicatorStyles = {
//     stepIndicatorSize: 30,
//     currentStepIndicatorSize: 40,
//     separatorStrokeWidth: 3,
//     currentStepStrokeWidth: 5,
//     separatorFinishedColor: '#4aae4f',
//     separatorUnFinishedColor: '#a4d4a5',
//     stepIndicatorFinishedColor: '#4aae4f',
//     stepIndicatorUnFinishedColor: '#a4d4a5',
//     stepIndicatorCurrentColor: '#ffffff',
//     stepIndicatorLabelFontSize: 15,
//     currentStepIndicatorLabelFontSize: 15,
//     stepIndicatorLabelCurrentColor: '#000000',
//     stepIndicatorLabelFinishedColor: '#ffffff',
//     stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
//     labelColor: '#666666',
//     labelSize: 12,
//     currentStepLabelColor: '#4aae4f',
// };

const secondIndicatorStyles = {
    stepIndicatorSize: 45,
    currentStepIndicatorSize: 55,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 15,
    currentStepLabelColor: '#fe7013',
};

// const thirdIndicatorStyles = {
//     stepIndicatorSize: 25,
//     currentStepIndicatorSize: 30,
//     separatorStrokeWidth: 2,
//     currentStepStrokeWidth: 3,
//     stepStrokeCurrentColor: '#7eaec4',
//     stepStrokeWidth: 3,
//     stepStrokeFinishedColor: '#7eaec4',
//     stepStrokeUnFinishedColor: '#dedede',
//     separatorFinishedColor: '#7eaec4',
//     separatorUnFinishedColor: '#dedede',
//     stepIndicatorFinishedColor: '#7eaec4',
//     stepIndicatorUnFinishedColor: '#ffffff',
//     stepIndicatorCurrentColor: '#ffffff',
//     stepIndicatorLabelFontSize: 0,
//     currentStepIndicatorLabelFontSize: 0,
//     stepIndicatorLabelCurrentColor: 'transparent',
//     stepIndicatorLabelFinishedColor: 'transparent',
//     stepIndicatorLabelUnFinishedColor: 'transparent',
//     labelColor: '#999999',
//     labelSize: 13,
//     labelFontFamily: 'OpenSans-Italic',
//     currentStepLabelColor: '#7eaec4',
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        marginVertical: 20,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#999999',
    },
    stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#4aae4f',
    },
});

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
        size: 25,
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'web';
            break;
        }
        case 1: {
            iconConfig.name = 'tap-and-play';
            break;
        }
        case 2: {
            iconConfig.name = 'settings-bluetooth';
            break;
        }
        case 3: {
            iconConfig.name = 'receipt';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};

export default class Steps extends Component {
    constructor() {
        super();
        this.state = {
            currentStep: 0,
            dataShellAsset: null,
            dataDevice: null,
            isFinished: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            currentStep,
            dataShellAsset,
            dataDevice,
            isFinished,
        } = this.state;
        // console.tron.log(prevState, this.state);
        if (currentStep === 1) {
            if (!dataShellAsset) {
                this.viewPager.setPage(prevState.currentStep);
                Alert.alert(
                    'The previous step is required.',
                    'Asset Shell data required via QR Code'
                );
            }
        }
        if (currentStep === 2) {
            if (!dataShellAsset && !dataDevice) {
                this.viewPager.setPage(prevState.currentStep);
                if (!dataShellAsset) {
                    this.viewPager.setPage(prevState.currentStep);
                    Alert.alert(
                        'The previous step is required.',
                        'Asset Shell data required via QR Code'
                    );
                } else {
                    Alert.alert(
                        'The previous step is required.',
                        'Device data required via QR Code'
                    );
                }
            }
        }
        if (currentStep === 3) {
            if (!isFinished) {
                this.viewPager.setPage(prevState.currentStep);
                Alert.alert(
                    'The previous step is required.',
                    'The process of connecting and sending data via bluetooth was not done.'
                );
            }
        }
        // if (nextState.currentPage != this.state.currentPage) {
        //     // if (this.viewPager) {
        //     //     this.viewPager.setPage(nextState.currentPage);
        //     // }
        // }
    }

    onStepPress = position => {
        // console.tron.log('apertou -->', position);
        this.setState({ currentStep: position });
        this.viewPager.setPage(position);
    };

    // renderViewPagerPage = data => {
    //     return (
    //         <View key={data} style={styles.page}>
    //             <Text>{data}</Text>
    //         </View>
    //     );
    // };

    renderStepIndicator = params => (
        <MaterialIcon {...getStepIndicatorIconConfig(params)} />
    );

    handleDataShellAsset = async data => {
        // console.tron.log('settandoo dado no handleDataSheelAsset:', data);
        this.setState({ dataShellAsset: data });
    };

    handleDataDevice = async data => {
        // console.tron.log(data);
        this.setState({ dataDevice: data });
    };

    handleNextPage = async is => {
        if (is) {
            const { currentStep } = this.state;
            this.setState({ currentStep: currentStep + 1 });
            this.viewPager.setPage(currentStep + 1);
        }
    };

    handleIsFinished = async is => {
        this.setState({ isFinished: is });
    };

    // renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    //     return (
    //         <Text
    //             style={
    //                 position === currentPosition
    //                     ? styles.stepLabelSelected
    //                     : styles.stepLabel
    //             }
    //         >
    //             {label}
    //         </Text>
    //     );
    // };

    render() {
        const { currentStep, dataShellAsset, dataDevice } = this.state;
        return (
            <View style={styles.container}>
                {/* <View style={styles.stepIndicator}>
                    <StepIndicator
                        customStyles={firstIndicatorStyles}
                        currentPosition={this.state.currentPage}
                        labels={[
                            'Account',
                            'Profile',
                            'Band',
                            'Membership',
                            'Dashboard',
                        ]}
                        renderLabel={this.renderLabel}
                        onPress={this.onStepPress}
                    />
                </View> */}
                <View style={styles.stepIndicator}>
                    <StepIndicator
                        stepCount={4}
                        renderStepIndicator={this.renderStepIndicator}
                        customStyles={secondIndicatorStyles}
                        currentPosition={currentStep}
                        onPress={this.onStepPress}
                        labels={[
                            'Asset Shell',
                            'Device',
                            'Update Firmware',
                            'Result',
                        ]}
                    />
                </View>
                {/* <View style={styles.stepIndicator}>
                    <StepIndicator
                        stepCount={4}
                        customStyles={thirdIndicatorStyles}
                        currentPosition={this.state.currentPage}
                        onPress={this.onStepPress}
                        labels={[
                            'Approval',
                            'Processing',
                            'Shipping',
                            'Delivery',
                        ]}
                    />
                </View> */}
                <ViewPager
                    style={{ flex: 1, backgroundColor: 'red' }}
                    ref={viewPager => {
                        this.viewPager = viewPager;
                    }}
                    onPageSelected={page => {
                        this.setState({
                            currentStep: page.nativeEvent.position,
                        });
                    }}
                >
                    {/* {PAGES.map(page => this.renderViewPagerPage(page))} */}
                    <ShellAssets
                        handleDataShellAsset={this.handleDataShellAsset}
                        key="shell"
                    />
                    <Device
                        handleDataDevice={this.handleDataDevice}
                        key="device"
                    />
                    <Bluetooth
                        key="bluetooth"
                        data={{ dataShellAsset, dataDevice, currentStep }}
                        handleNextPage={this.handleNextPage}
                        handleIsFinished={this.handleIsFinished}
                    />
                    <Result
                        key="result"
                        data={{ dataShellAsset, dataDevice }}
                    />
                </ViewPager>
            </View>
        );
    }
}
