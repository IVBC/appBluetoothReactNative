import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default function Result() {
    return (
        <View style={styles.scrollViewStyle}>
            <>
                <Text style={styles.textTitle}>
                    You need to enable bluetooth to use this app
                </Text>
                <View style={styles.cardView}>
                    <Text numberOfLines={8} style={styles.descText}>
                        Results
                    </Text>

                    {/* <TouchableOpacity
                    onPress={this.activeQR}
                    style={styles.buttonTouchable}
                >
                    <Icon name="camera-alt" size={20} color="#FFF" />
                    <Text style={styles.buttonTextStyle}>
                        Click to Scan !
                    </Text>
                </TouchableOpacity> */}
                </View>
            </>
        </View>
    );
}
