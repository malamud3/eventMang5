import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import CreateScreen from "../screens/CreateEvent/CreateScreen";
import ConfirmScreen from "../screens/ConfirmScreen/ConfirmScreen";
import HeaderRightButton from "../components/HeaderRightButton";

type Stack2ParamList = {
    Create: undefined;
    Home: undefined;
    Confirm: undefined;
};

const Stack = createStackNavigator<Stack2ParamList>();

const MainNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerLeft: () => null, // Remove the back button
                    headerRight: () => <HeaderRightButton navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="Create"
                component={CreateScreen}
                options={({ navigation }) => ({
                    title: 'Create',
                    headerRight: () => <HeaderRightButton navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="Confirm"
                component={ConfirmScreen}
                options={({ navigation }) => ({
                    title: 'Confirm',
                    headerRight: () => <HeaderRightButton navigation={navigation} />,
                })}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;
