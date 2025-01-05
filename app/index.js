import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Login from '../components/AreaLogin/Login';
import GestorMaterias from '../components/AreaMaterias/GestorMaterias';

export default function index() {
  return (
    <View>
        <StatusBar barStyle="light-content" backgroundColor="rgb(0, 100, 207)'}" />
        <Login />
    </View>
  );
}

