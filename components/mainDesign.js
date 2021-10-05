// import React from 'react';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SearchScreen from './main/search';
// import EmptyScreen from './main/empty';
// import ProfileScreen from './main/profile';

// const Tab = createMaterialBottomTabNavigator();
// // remove after logic check
// const MainDesign = ({ navigation }) => {
//   return (
//     <Tab.Navigator initialRouteName="Search" labeled={false}>
//       <Tab.Screen
//         name="Search"
//         component={SearchScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="magnify" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="AddContainer"
//         component={EmptyScreen}
//         listeners={({ navigation }) => ({
//           tabPress: (event) => {
//             event.preventDefault();
//             navigation.navigate('Add');
//           },
//         })}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="plus-box" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons
//               name="account-circle"
//               color={color}
//               size={26}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default MainScreen;
