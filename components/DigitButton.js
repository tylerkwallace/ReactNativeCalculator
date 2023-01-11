import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ACTIONS } from '../App';

const DigitButton = ({ dispatch, digit }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.button}
                    onPress={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
                >{digit}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: 'white',
        textAlign: 'center',
        padding: 10,
        margin: 1,
        color: 'black'
    },
});

export default DigitButton;