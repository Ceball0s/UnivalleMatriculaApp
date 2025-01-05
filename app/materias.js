import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import GestorMaterias from '../components/AreaMaterias/GestorMaterias';

export default function index() {
  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="rgb(0, 100, 207)'}" />
        <GestorMaterias />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: ' rgb(255, 255, 255)',
    justifyContent: 'center',
  },
});