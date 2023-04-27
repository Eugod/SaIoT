import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Feather, FontAwesome } from '@expo/vector-icons';

export default function EsteiraScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.viewInfos}>
        <View style={styles.viewConsumo}>
          <Text style={styles.txtInfos}>Consumo:</Text>

          <Text style={styles.valInfos}>30 W</Text>
        </View>

        <View style={styles.viewUsoDiario}>
          <Text style={styles.txtInfos}>Tempo de uso diário:</Text>

          <Text style={styles.valInfos}>05:30 hrs</Text>
        </View>

        <View style={styles.viewUsoTotal}>
          <Text style={styles.txtInfos}>Tempo de uso total:</Text>

          <Text style={styles.valInfos}>30:55 hrs</Text>
        </View>
      </View>

      <View style={styles.viewBotoes}>
        <TouchableOpacity>
          <Feather name="power" size={50} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEmergencia}>
          <Text style={styles.txtBotaoEmergencia}>Emergência</Text>
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
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: '40%',
    justifyContent: 'space-between',
  },

  txtInfos: {
    fontSize: 20
  },

  valInfos: {
    fontSize: 20
  },

  viewConsumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 2,
    height: '33%',
    alignItems: 'center',
  },

  viewUsoDiario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: '33%',
    alignItems: 'center',
  },

  viewUsoTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 2,
    height: '33%',
    alignItems: 'center',
  },

  viewBotoes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: '20%',
    marginBottom: '20%',
    width: '100%'
  },

  botaoEmergencia: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    width:'35%',
    backgroundColor: 'red',
    borderColor: 'red'
  },

  txtBotaoEmergencia: {
    color: 'white'
  },
})