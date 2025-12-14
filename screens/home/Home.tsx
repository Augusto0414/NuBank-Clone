import { CircleButton } from 'components/CircleButton';
import { COLORS } from 'constants/Colors';
import { formatMoney } from 'helpers/formarMonet';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createHomeActions } from './home.action';
const { BACKGROUND_COLOR, DARK_BUTON_TEXT_COLOR, LIGHT_WHITHE, GRAY_ARROW_COLOR } = COLORS;
const Home = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const actions = createHomeActions();

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
      <View style={styles.buttonAccount}>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          onPress={() => {}}>
          <View>
            <Text style={styles.textButtonAccount}>{t('Savings account')}</Text>
            <Text style={styles.textButtonAccount}>{`${formatMoney(10000)}`}</Text>
          </View>
          <View>
            <Ionicons
              name="chevron-forward"
              size={22}
              color={GRAY_ARROW_COLOR}
              style={styles.iconRight}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {actions.map(({ key, icon, titleKey, bannerKey, onPress }) => (
          <CircleButton
            key={key}
            icon={icon}
            title={t(titleKey)}
            bannerTitle={bannerKey ? t(bannerKey) : undefined}
            onclick={onPress}
          />
        ))}
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
  buttonAccount: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textButtonAccount: {
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: 18,
  },
});
export default Home;
