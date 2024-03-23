import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "../screens/Auth/Welcome/WelcomeScreen";
import LoginScreen from "../screens/Auth/Login/LoginScreen";
import RegisterScreen from "../screens/Auth/Register/RegisterScreen";


type AuthStackParamList = {
    Welcome:  (screen: string) => void;
    Login:    (screen: string) => void;
    Register: (screen: string) => void;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ title: 'Welcome' }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'Login' }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: 'Register' }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
