import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';

import { Feather, FontAwesome } from '@expo/vector-icons'; 

export default function ArCondicionadoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.viewInfos}>
        <View style={styles.viewAmbiente}>
          <Text style={styles.txtAmbitente}>Ambiente</Text>

          <Text style={styles.tempAmbiente}>20º</Text>
        </View>

        <View style={styles.viewArCondicionado}>
          <Text style={styles.tempArCondicionado}>21º</Text>
        </View>

        <View style={styles.viewConsumo}>
          <Text style={styles.txtConsumo}>Consumo</Text>

          <Text style={styles.consumo}>13 W</Text>
        </View>
      </View>

      <View style={styles.viewBotoes}>
        <TouchableOpacity>
        <FontAwesome name="arrow-circle-up" size={50} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity>
        <FontAwesome name="arrow-circle-down" size={50} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity>
        <Feather name="power" size={50} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },

  viewInfos: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: '30%',
    justifyContent: 'space-between',
  },

  viewAmbiente: {
    width: '33%',
    borderRightWidth: 2,
    alignItems: 'center',
    padding: 10,
  },

  txtAmbitente: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: '50%',
  },

  tempAmbiente: {
    fontSize: 18
  },

  viewArCondicionado: {
    width: '34%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tempArCondicionado: {
    fontWeight: 'bold',
    fontSize: 65,
  },

  viewConsumo: {
    width: '33%',
    borderLeftWidth: 2,
    alignItems: 'center',
    padding: 10,
  },

  txtConsumo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: '50%',
  },

  consumo: {
    fontSize: 18
  },

  viewBotoes: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: '20%',
    marginBottom: '20%'
  },
})