import { useNavigation } from '@react-navigation/native';
import { CircleButton } from 'components/CircleButton';
import { COLORS } from 'constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { GRAY_ARROW_COLOR, BACKGROUND_COLOR, DARK_BLACK, GRAY_COLOR } = COLORS;
const PlateView = () => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        marginHorizontal: 20,
      }}>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigate.goBack()}>
          <Ionicons name="chevron-back" size={28} color={GRAY_ARROW_COLOR} />
        </TouchableOpacity>
      </View>
      <Text style={styles.textContainer}>
        <Text style={styles.textSend}>{t('send_new')} </Text>
        <Text style={styles.textNu}>{t('Placa Nu')}</Text>
      </Text>
      <Text style={styles.subtitleNu}>{t('digit_nu_plate')}</Text>
      <TextInput cursorColor={BACKGROUND_COLOR} keyboardType="default" style={styles.input} />
      <View style={styles.circleButton}>
        <CircleButton
          icon={<Ionicons name="arrow-forward" size={28} color={GRAY_COLOR} />}
          onclick={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textSend: {
    color: DARK_BLACK,
  },
  textNu: {
    color: BACKGROUND_COLOR,
  },
  textContainer: {
    marginTop: 20,
    fontSize: 34,
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  subtitleNu: {
    marginTop: 20,
    fontSize: 16,
    color: GRAY_COLOR,
    fontWeight: '500',
  },
  input: {
    marginTop: 20,
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  circleButton: {
    position: 'absolute',
    bottom: 50,
    right: 0,
  },
});
export default PlateView;
