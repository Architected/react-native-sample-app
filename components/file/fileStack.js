import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilePicker from './filePicker';
import FileListView from './fileList';
import FileView from './fileView';
import FileEdit from './fileEdit';
const Stack = createNativeStackNavigator();

const FileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FileList"
        component={FileListView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="File"
        component={FileView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit"
        component={FileEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Add" component={FilePicker} />
    </Stack.Navigator>
  );
};

export default FileStack;
