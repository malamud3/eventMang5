import React, { useState } from 'react';
import { View,Text, Alert, StyleSheet } from 'react-native';
import LinearGradientBackground from "../../../components/Views/Colors/LinearGradientBackground";
import AuthButton from "../../../components/Views/Buttons/AuthButton";
import AuthInput from "../../../components/Views/TextInput/AuthInput";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {NavigationProp} from "@react-navigation/native";
import styles from "./LoginScreenStyles";

type LoginScreenProps = {
    navigation: NavigationProp<any>;
};
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigation.navigate('MainNav', { screen: 'Home' });
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(error.message);
            });
    };

    return (
        <LinearGradientBackground>
        <View style={styles.container}>

            <AuthInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                accessible={true} />

            <AuthInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessible={true}
            />

            {error && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}
            <View style={{ marginTop: 30 }}>

            <AuthButton
                text="Login "
                textColor="#0039C0"
                backgroundColor="#fff"
                textSize={18}
                onPress={handleLogin}
            />
            </View>
        </View>
    </LinearGradientBackground>
    );
};

export default LoginScreen;
