import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        margin: 10,
        width: '80%'
    },
    errorText: {
        color: 'rgb(150,0,0)',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'normal', // Make the text bold for emphasis
        textTransform: 'capitalize', // Capitalize the text for better visual distinction

    },
});

export default styles;
