<View
    style={
        {
            // width: '100%',
            // height: '60%',
            // padding: 20,
            // flexDirection: 'row',
            // justifyContent: 'space-around',
        }
    }
>
    <View
        style={
            {
                // height: '100%',
                // backgroundColor: '#fff',
                // padding: 20,
                // borderColor: '#c8c8c8',
                // borderWidth: 1,
                // borderRadius: 5,
            }
        }
    >
        <View
            style={
                {
                    // height: 30,
                    // backgroundColor: '#ccc',
                    // justifyContent: 'center',
                    // padding: 15,
                    // borderRadius: 3,
                    // marginBottom: 10,
                }
            }
        >
            <Text style={styles.toolbarTitle}>Shell Asset</Text>
        </View>

        <FlatList
            style={{}}
            data={Object.keys(dataShellAsset)}
            renderItem={({ item }) => (
                <View
                    style={
                        {
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            // marginBottom: 5,
                        }
                    }
                >
                    <Text
                        style={
                            {
                                // fontSize: 20,
                                // textTransform: 'uppercase',
                                // fontWeight: 'bold',
                                // color: '#0061A8',
                            }
                        }
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
    <View
        style={
            {
                // justifyContent: 'center',
            }
        }
    >
        <Icon size={100} color="#0061A8" name="keyboard-tab" />
    </View>
    <View
        style={
            {
                // height: '100%',
                // backgroundColor: '#fff',
                // padding: 20,
                // borderColor: '#c8c8c8',
                // borderWidth: 1,
                // borderRadius: 5,
            }
        }
    >
        <View
            style={
                {
                    // height: 30,
                    // backgroundColor: '#ccc',
                    // justifyContent: 'center',
                    // padding: 15,
                    // borderRadius: 3,
                }
            }
        >
            <Text style={styles.toolbarTitle}>Device</Text>
        </View>

        <FlatList
            style={{}}
            data={Object.keys(dataDevice)}
            renderItem={({ item }) => (
                <View
                    style={
                        {
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            // marginVertical: 8,
                        }
                    }
                >
                    <Text
                        style={
                            {
                                // fontSize: 20,
                                // textTransform: 'uppercase',
                                // fontWeight: 'bold',
                                // color: '#0061A8',
                            }
                        }
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
</View>;
