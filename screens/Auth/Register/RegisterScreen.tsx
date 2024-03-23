import React, { useState } from 'react';
import { View, Text } from 'react-native';
import LinearGradientBackground from "../../../components/Views/Colors/LinearGradientBackground";
import AuthInput from "../../../components/Views/TextInput/AuthInput";
import AuthButton from "../../../components/Views/Buttons/AuthButton";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import updateProfile
import { NavigationProp } from "@react-navigation/native";
import styles from "./RegisterScreenView";
import {createUserObject} from "../../../services/FirebaseService";

type RegisterScreenProps = {
    navigation: NavigationProp<any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [name, setName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        if (!email || !password || !name) {
            setError("Please fill in all fields");
            return;
        }

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up successfully
                const user = userCredential.user;
                await createUserObject(user.uid,user.email, name);

                navigation.navigate('MainNav', { screen: 'Home' });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage); // Set error message for display
            });
    };

    return (
        <LinearGradientBackground>
            <View style={styles.container}>
                <AuthInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <AuthInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <AuthInput
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={setName}
                    accessible={true}
                />

                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}

                <View style={{ marginTop: 50 }}>
                    <AuthButton
                        text="Register"
                        textColor="#0039C0"
                        backgroundColor="#fff"
                        textSize={18}
                        onPress={handleRegister}
                    />
                </View>
            </View>
        </LinearGradientBackground>
    );
};

export default RegisterScreen;
