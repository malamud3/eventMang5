import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    descriptionText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20, // Adjust as needed
    },
    logo: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        marginBottom: 20,
        resizeMode: 'contain'
    },
    linkText:{
    color: 'blue',
     fontSize: 16,
    textDecorationLine: 'underline',
        marginTop:2
    }
});

export default styles;
