import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from './WelcomeScreenView';
import LinearGradientBackground from "../../../components/Views/Colors/LinearGradientBackground";
import AuthButton from "../../../components/Views/Buttons/AuthButton";
import WebViewModal from "../../../components/WebViewModal";

type WelcomeScreenProps = {
    navigation: NavigationProp<any>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const [modalContent, setModalContent] = useState<{ isVisible: boolean; url: string } | null>(null);

    const toggleModal = (url: string) => {
        setModalContent({ isVisible: true, url });
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return (
        <LinearGradientBackground>
            <View style={styles.container}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.descriptionText}>
                    By tapping Create Account or Sign In, you agree to our Terms.
                    Learn how we process your data in our{' '}
                    <TouchableOpacity onPress={() => toggleModal("https://sites.google.com/view/gatherly/home")}>
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    {'  '}and{'  '}
                    <TouchableOpacity onPress={() => toggleModal("https://sites.google.com/view/gatherly-tou/home")}>
                        <Text style={styles.linkText}>Terms of Use</Text>
                    </TouchableOpacity>.
                </Text>
                <AuthButton
                    text="Login"
                    textColor="#FFFFFF"
                    textSize={18}
                    onPress={() => navigation.navigate('Login')}
                />
                <AuthButton
                    text="Register"
                    textColor="#FFFFFF"
                    textSize={18}
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
            {modalContent && (
                <WebViewModal
                    isVisible={modalContent.isVisible}
                    onClose={closeModal}
                    url={modalContent.url}
                />
            )}
        </LinearGradientBackground>
    );
};

export default WelcomeScreen;
