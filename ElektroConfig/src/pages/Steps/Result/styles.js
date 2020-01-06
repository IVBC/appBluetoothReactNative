import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = {
    iconReceive: {
        justifyContent: 'center',
        width: 225,
        alignItems: 'center',
    },
    scrollViewStyle: {
        // justifyContent: 'center',

        flexDirection: 'row',
        backgroundColor: '#045b9b',
        alignItems: 'stretch',
        justifyContent: 'center',
    },

    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white',
        height: 60,
    },
    cardView: {
        backgroundColor: '#f5f5f5',
        marginLeft: 10,
        marginRight: 10,
        padding: 20,
        // alignSelf: 'center',
        // justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth: 1,
        // borderRadius: 2,
        // borderColor: '#ddd',
        // borderBottomWidth: 0,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 4,
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: 10,
    },
    toolbar: {
        // backgroundColor: '#fe7013',
        paddingTop: 30,
        paddingBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbarButton: {
        // width: 50,
        // marginRight: 5,
        // flex: 1,
    },
    toolbarIcon: {
        // width: 30,
        // height: 30,
    },
    toolbarTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // flex: 1,
        // marginTop: 30,
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
