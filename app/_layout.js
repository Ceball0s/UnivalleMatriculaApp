import { Slot } from 'expo-router';
import { StyleSheet, View} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
            <Slot/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#fff', // Asegura que el fondo también cubra el área segura
  },
});