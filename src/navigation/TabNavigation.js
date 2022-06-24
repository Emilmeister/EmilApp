import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StockDetailsScreen from "../screens/StockDetailsScreen"
import StocksScreen from "../screens/StockList/StocksScreen"
import SettingsScreen from "../screens/SettingsScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const StocksNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Stocks"
                component={StocksScreen}
            />
            <Stack.Screen
                name="StocksDetail"
                component={StockDetailsScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
        </Stack.Navigator>
    )
}


const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={Icons} >
                <Tab.Screen name="StocksNav" component={StocksNavigation} options={{
                    title: 'Stocks',
                }}/>
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>

    );
}

const Icons = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'StocksNav') {
            iconName = focused
                ? 'reorder-four'
                : 'reorder-four-outline';
        }
        if (route.name === 'Settings') {
            iconName = focused
                ? 'list-outline'
                : 'list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    headerShown: false
})

export default TabNavigation