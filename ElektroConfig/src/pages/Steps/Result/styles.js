import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = {
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
    cardView: {
        // flex: 1,
        backgroundColor: '#f5f5f5',
        width: deviceWidth - 32,
        height: deviceHeight / 2.6,
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
    },
    toolbar: {
        // backgroundColor: '#fe7013',
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
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // flex: 1,
        // marginTop: 6,
    },
    buttonTouchable: {
        padding: 5,
        flexDirection: 'row',
        fontSize: 21,
        backgroundColor: '#0061a8',
        marginTop: 32,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    },
};
export default styles;
