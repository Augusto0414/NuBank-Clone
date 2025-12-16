import { useNavigation } from '@react-navigation/native';
import { ButtonIcon } from 'components/ButtonIcon';
import { COLORS } from 'constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSendAction } from './hooks/useSendAction';
const { DARK_BLACK, GRAY_ARROW_COLOR } = COLORS;
const SendView = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigate = useNavigation();
  const buttonAction = useSendAction();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, marginHorizontal: 20 }}>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigate.goBack()}>
          <Ionicons name="chevron-back" size={28} color={GRAY_ARROW_COLOR} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContent}>
        <Text style={styles.titleContentText}>{t('send_title')}</Text>
        <Text style={styles.subtitleContent}>{t('You_can_do_it_at')}</Text>
      </View>
      <View style={styles.buttonContente}>
        {buttonAction.map(({ title, subtitle, iconLeft, iconRight, bannerKey, onPress }, index) => (
          <ButtonIcon
            key={title + index + Date.now()}
            title={title}
            subtitle={subtitle}
            iconLeft={iconLeft}
            iconRight={iconRight}
            bannerInfo={bannerKey}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContent: {
    marginTop: 20,
  },
  buttonContente: {
    marginTop: 30,
  },
  titleContentText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: DARK_BLACK,
    marginBottom: 38,
  },
  subtitleContent: {
    fontSize: 18,
    color: GRAY_ARROW_COLOR,
    fontWeight: '400',
  },
});
export default SendView;
