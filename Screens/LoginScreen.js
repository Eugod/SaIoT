import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as firebase from 'firebase';

export default function LoginScreen() {
  const navigation = useNavigation();

  login = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>App IoT</Text>

      <Image style={styles.logo} source={require('../Assets/logo.png')} />

      <View style={styles.viewTxtInputs}>
        <Text>Login:</Text>
        <TextInput style={styles.txtInputs} />

        <Text>Senha:</Text>
        <TextInput style={styles.txtInputs} />
      </View>

      <TouchableOpacity style={styles.botaoEntrar} onPress={login}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.gambiarra}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },

  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
  },

  logo: {
    height: 150,
    width: '80%',
    borderRadius: 10,
  },

  viewTxtInputs: {
    gap: 10,
    width: '60%',
  },

  txtInputs: {
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    borderRadius: 5,
    marginBottom: 15,
  },

  botaoEntrar: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    width: '35%',
    alignItems: 'center',
  },

  gambiarra: {
    height: '20%',
  },
});
