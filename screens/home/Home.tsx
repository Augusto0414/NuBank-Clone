import { COLORS } from 'constants/Colors';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { BACKGROUND_COLOR, DARK_BUTON_TEXT_COLOR, LIGHT_WHITHE } = COLORS;
const Home = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <View style={styles.headContainer}>
        <TouchableOpacity style={styles.buttomUser} activeOpacity={0.7} onPress={() => {}}>
          <Ionicons name="person-outline" size={20} color={DARK_BUTON_TEXT_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttomAddUser} activeOpacity={0.7} onPress={() => {}}>
          <Ionicons name="person-add-outline" size={20} color={DARK_BUTON_TEXT_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpButton} activeOpacity={0.7} onPress={() => {}}>
          <Ionicons name="help" size={20} color={DARK_BUTON_TEXT_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.eyeButton} activeOpacity={0.7} onPress={() => {}}>
          <Ionicons name="eye-outline" size={20} color={DARK_BUTON_TEXT_COLOR} />
        </TouchableOpacity>
        <View style={styles.infoHeaderText}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={BACKGROUND_COLOR}
            style={styles.iconLeft}
          />
          <Text style={styles.text}>{t('message_banner')}</Text>
          <Ionicons
            name="ellipsis-vertical"
            size={22}
            color={BACKGROUND_COLOR}
            style={styles.iconRight}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  infoHeaderText: {
    width: '100%',
    height: 60,
    backgroundColor: DARK_BUTON_TEXT_COLOR,
    marginTop: 20,
    position: 'absolute',
    left: 20,
    right: 20,
    top: 110,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  text: {
    color: BACKGROUND_COLOR,
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
    textAlign: 'justify',
  },

  iconLeft: {
    marginRight: 10,
  },

  iconRight: {
    marginLeft: 10,
  },
  buttomUser: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: LIGHT_WHITHE,
    position: 'absolute',
    top: 53,
    left: 20,
  },
  buttomAddUser: {
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    top: 50,
    right: 20,
  },
  helpButton: {
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    top: 50,
    right: 60,
  },
  eyeButton: {
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    top: 50,
    right: 100,
  },
});
export default Home;
