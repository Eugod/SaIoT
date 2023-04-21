import { SafeAreaView, View, StyleSheet, Text, StatusBar, Button } from 'react-native';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!Olá, mundo!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
})