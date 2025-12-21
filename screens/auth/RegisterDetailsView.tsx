import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { BACKGROUND_COLOR, DARK_BLACK, GRAY_ARROW_COLOR, GRAY_COLOR } = COLORS;
const RegisterDetailsView = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={{ paddingTop: insets.top, flex: 1, paddingBottom: insets.bottom }}>
      <TouchableOpacity
        style={{ marginTop: 20, marginHorizontal: 20 }}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={GRAY_ARROW_COLOR} />
      </TouchableOpacity>
      <Text style={styles.textContainer}>
        <Text style={styles.title}>{t('registration_almost_complete_text')} </Text>
        <Text style={styles.titleFix}>{t('registration_almost_complete_suffix')}</Text>
      </Text>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.label}>{t('password_input_label')}</Text>
        <View style={styles.containerInput}>
          <TextInput keyboardType="visible-password" cursorColor={BACKGROUND_COLOR} />
        </View>
        <Text style={[styles.label, { marginTop: 40 }]}>{t('confirm_password_input_label')}</Text>
        <View style={styles.containerInput}>
          <TextInput keyboardType="visible-password" cursorColor={BACKGROUND_COLOR} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    marginTop: 5,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_COLOR,
  },
  label: {
    fontSize: 16,
    color: DARK_BLACK,
    marginHorizontal: 20,
  },
  input: {
    fontSize: 18,
    paddingBottom: 5,
  },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 26,
  },
  title: {
    fontWeight: '500',
    color: DARK_BLACK,
  },
  titleFix: {
    fontWeight: '500',
    color: BACKGROUND_COLOR,
  },
});
export default RegisterDetailsView;
