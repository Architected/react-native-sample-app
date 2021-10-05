// import React from 'react';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FileScreen from './main/files';
// import SearchScreen from './main/search';
// import EmptyScreen from './main/empty';
// import ProfileScreen from './main/profile';
// // Remove after logic check
// const Tab = createMaterialBottomTabNavigator();

// const MainScreen = ({ navigation }) => {
//   return (
//     <Tab.Navigator initialRouteName="Files" labeled={false}>
//       <Tab.Screen
//         name="Files"
//         component={FileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={26} />
//           ),
//         }}
//       />
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
