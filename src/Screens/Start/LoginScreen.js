import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class LoginScreen extends React.Component {
    componentDidMount() { }

    render() {
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 10 }}>
            <TouchableOpacity style={styles.buttonStyle}
                onPress={() => navigation.navigate('HomeScreen')}></TouchableOpacity>
            <Text>Log in</Text>
        </View>
    }
}

const styles = {
    buttonStyle: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginRight: 5,
        borderRadius: 50,
        borderWidth: 2,
        width: '100%',
        justifyContent: 'center',
    },
};
export default LoginScreen;
