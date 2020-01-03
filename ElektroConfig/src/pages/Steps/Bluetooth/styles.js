import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    // container: {
    //     // flex: 1,
    //     alignSelf: 'stretch',
    //     backgroundColor: '#0061a8',
    // },
    scrollViewStyle: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#045b9b',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white',
    },
    textSetup: {
        padding: 30,
        paddingTop: 0,
        textAlign: 'center',
        fontSize: 25,
    },

    toolbar: {
        backgroundColor: '#fe7013',
        paddingTop: 2,
        paddingBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbarButton: {
        width: 50,
        marginRight: 5,
        flex: 1,
    },
    toolbarIcon: {
        width: 30,
        height: 30,
    },
    toolbarTitle: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 15,
        color: '#FFF',
        // flex: 1,
        // marginTop: 6,
    },
    body: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSeaching: {
        paddingBottom: 16,
        textAlign: 'justify',
        fontSize: 25,
    },
    textDevice: {
        textAlign: 'justify',
        fontSize: 20,
    },
    contentDevice: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTouchable: {
        flexDirection: 'row',
        fontSize: 21,
        backgroundColor: '#0061a8',
        marginTop: 32,
        borderRadius: 15,
        width: 105,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 5,
    },

    cardView: {
        // flex: 1,
        width: deviceWidth - 32,
        height: deviceHeight / 2,
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
    spinner: {
        alignSelf: 'center',
        marginTop: 30,
    },
});

export default styles;
