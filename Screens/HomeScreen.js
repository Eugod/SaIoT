import { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import { CompHome } from '../Coponents/CompHome';

import * as firebase from 'firebase';

export default function HomeScreen() {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    carregarInfo();
  }, []);

  const carregarInfo = () => {
    firebase
      .database()
      .ref('Projetos/')
      .on('value', (snapshot) => {
        const informacao = [];
        snapshot.forEach((info) => {
          informacao.push(info.val());
        });

        setInfos(informacao);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>App IoT</Text>
      <FlatList
        style={styles.lista}
        data={infos}
        renderItem={({ item }) => (
          <CompHome
            img={item.img}
            titulo={item.titulo}
            descricao={item.descricao}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between'
  },

  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: '15%'
  },

  lista: {
    height: '70%',
  }
});
