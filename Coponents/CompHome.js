import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export function CompHome({ img, titulo, descricao }) {
  const navigation = useNavigation();

  navegacao = () => {
    navigation.navigate(titulo);
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
    marginBottom: 30,
    backgroundColor: '#06283D',
    borderColor: '#DFF6FF'
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  img: {
    width: '35%',
    height: '100%',
    borderRadius: 5,
  },

  viewTxt: {
    width: '60%',
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    color: '#DFF6FF'
  },

  descricao: {
    fontSize: 12,
    textAlign: 'justify',
    color: '#DFF6FF'
  },
});
