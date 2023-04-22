import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export function CompHome({ img, titulo, descricao, nome }) {
  const navigation = useNavigation();

  navegacao = () => {
    navigation.navigate(nome);
  }

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.container} onPress={navegacao}>
        <Image
          style={styles.img}
          source={{
            uri: img,
          }}
        />

        <View style={styles.viewTxt}>
          <Text style={styles.titulo}>{titulo}</Text>

          <Text style={styles.descricao}>{descricao}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginBottom: 30
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  img: {
    width: '35%',
    height: '100%',
    borderRadius: 15,
  },

  viewTxt: {
    width: '60%',
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15
  },

  descricao: {
    fontSize: 12,
    textAlign: 'justify'
  },
});
