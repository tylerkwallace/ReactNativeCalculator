import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ACTIONS } from '../App';

const EvaluateButton = ({ dispatch, operation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.button}
                    onPress={() => dispatch({ type: ACTIONS.EVALUATE, payload: { operation } })}
                >{operation}
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

export default EvaluateButton;