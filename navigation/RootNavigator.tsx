//RootNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

type RootStackParamList = {
    Auth: undefined;
    MainNav: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="MainNav" component={MainNavigator} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
