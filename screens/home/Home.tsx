import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from 'components/Button';
import { CardInfo } from 'components/CardInfo';
import { CircleButton } from 'components/CircleButton';
import { COLORS } from 'constants/Colors';
import { formatMoney } from 'helpers/formarMonet';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getBalance } from 'service/wallet/wallet.service';
import { useActionButtons, useCircleActionButtons } from './hooks';
const BreB = require('../../assets/img/Bre-B.png');
const { BACKGROUND_COLOR, DARK_BUTON_TEXT_COLOR, LIGHT_WHITHE, GRAY_ARROW_COLOR, GRAY_COLOR } =
  COLORS;

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 45;

const Home = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const circleButtonActions = useCircleActionButtons();
  const buttonActions = useActionButtons();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const iconsOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const iconsTranslateY = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const bannerScale = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const bannerHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [60, 45],
    extrapolate: 'clamp',
  });

  const bannerTop = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [120, 70],
    extrapolate: 'clamp',
  });

  const bannerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 80],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const navigate = useNavigation();
  const loadBalance = async () => {
    try {
      setLoadingBalance(true);
      const { error, balance } = await getBalance();
      if (!error) setBalance(balance);
      setLoadingBalance(false);
    } catch (error) {
      setLoadingBalance(false);
      throw error;
    } finally {
      setLoadingBalance(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBalance();
    }, [])
  );

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Animated.View style={[styles.headContainer, { height: headerHeight }]}>
        <Animated.View
          style={{
            opacity: iconsOpacity,
            transform: [{ translateY: iconsTranslateY }],
          }}>
          <TouchableOpacity style={styles.buttomUser}>
            <Ionicons name="person-outline" size={20} color={DARK_BUTON_TEXT_COLOR} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.eyeButton}>
            <Ionicons name="eye-outline" size={20} color={DARK_BUTON_TEXT_COLOR} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help" size={20} color={DARK_BUTON_TEXT_COLOR} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttomAddUser}>
            <Ionicons name="person-add-outline" size={20} color={DARK_BUTON_TEXT_COLOR} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.infoHeaderText,
            {
              height: bannerHeight,
              top: bannerTop,
              opacity: bannerOpacity,
              transform: [{ scale: bannerScale }],
            },
          ]}>
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
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT,
          paddingBottom: 30,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}>
        <View style={styles.buttonAccount}>
          <TouchableOpacity
            style={styles.accountRow}
            onPress={() => navigate.navigate('MotionView' as never)}>
            <View>
              <Text style={styles.textButtonAccount}>{t('Savings account')}</Text>
              {loadingBalance ? (
                <Text style={styles.textButtonAccount}>Cargando...</Text>
              ) : (
                <Text style={styles.textButtonAccount}>{formatMoney(balance ?? 0)}</Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={22} color={GRAY_ARROW_COLOR} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionsRow}>
          {circleButtonActions.map(({ key, icon, titleKey, bannerKey, onPress }) => (
            <View key={key} style={styles.circleWrapper}>
              <CircleButton
                icon={icon}
                title={t(titleKey)}
                bannerTitle={bannerKey ? t(bannerKey) : undefined}
                onclick={onPress}
              />
            </View>
          ))}
        </View>

        {buttonActions.map(({ key, title, iconName, onPress }) => (
          <View key={key} style={styles.buttonWrapper}>
            <Button title={t(title)} iconName={iconName} onPress={onPress} />
          </View>
        ))}
        <View style={[styles.discoverContent, { marginHorizontal: 20 }]} />
        <View>
          <Text style={[styles.textDiscover, { marginHorizontal: 20 }]}>{t('discover_more')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 15,
              gap: 15,
              paddingHorizontal: 14,
            }}>
            <CardInfo
              source={BreB}
              title="Envía dinero"
              content="Envía dinero fácil y rápido desde tu cuenta."
              button
              onPressLink={() => console.log('Link pressed')}
            />
            <CardInfo
              source={BreB}
              title="Envía dinero"
              content="Envía dinero fácil y rápido desde tu cuenta."
              link
              onPressLink={() => console.log('Link pressed')}
            />
          </ScrollView>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: BACKGROUND_COLOR,
  },

  infoHeaderText: {
    backgroundColor: DARK_BUTON_TEXT_COLOR,
    borderRadius: 20,
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  text: {
    color: BACKGROUND_COLOR,
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
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
    top: 50,
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

  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textButtonAccount: {
    fontWeight: '600',
    fontSize: 18,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  circleWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  buttonWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  discoverContent: {
    borderTopColor: GRAY_COLOR,
    borderTopWidth: 1,
    marginTop: 30,
  },

  textDiscover: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default Home;
