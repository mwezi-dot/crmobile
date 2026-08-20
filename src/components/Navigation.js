import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PeopleList from './PeopleList';
import CompanyList from './CompanyList';
import SchoolList from './SchoolList';
import AddPerson from './AddPerson';
import Settings from './Settings';

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
    return (
        <Tab.Navigator initialRouteName="People" activeColor="#FF7043" barStyle={{ backgroundColor: '#4DB6AC' }}>
            <Tab.Screen name="People" component={PeopleList} options={{ tabBarLabel: 'People', tabBarIcon: ({ color }) => (<Icon name="user" size={30} color={color} />) }} />
            <Tab.Screen name="Add" component={AddPerson} options={{ tabBarLabel: 'Add', tabBarIcon: ({ color }) => (<Icon name="plus" size={30} color={color} />) }} />
            <Tab.Screen name="Company" component={CompanyList} options={{ tabBarLabel: 'Company', tabBarIcon: ({ color }) => (<Icon name="archive" size={30} color={color} />) }} />
            <Tab.Screen name="Schools" component={SchoolList} options={{ tabBarLabel: 'Schools', tabBarIcon: ({ color }) => (<MaterialIcon name="school" size={26} color={color} />) }} />
            <Tab.Screen name="Settings" component={Settings} options={{ tabBarLabel: 'Settings', tabBarIcon: ({ color }) => (<MaterialIcon name="settings" size={26} color={color} />) }} />
        </Tab.Navigator>
    );
};

export default Navigation;
