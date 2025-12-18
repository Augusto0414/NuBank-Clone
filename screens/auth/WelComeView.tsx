import { COLORS } from 'constants/Colors';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { BACKGROUND_COLOR, DARK_BLACK, GRAY_COLOR, WHITE } = COLORS;
const WelComeView = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const phoneInput = useRef(null);
  const [number, setNumber] = useState('');
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        marginHorizontal: 20,
      }}>
      <Text style={styles.textContent}>
        <Text style={styles.primaryTitle}>
          {t('continue_your_application')} {''}
        </Text>
        <Text style={styles.secundaryText}>{t('using_email_and_phone')}</Text>
      </Text>
      <Text style={styles.subtitle}>{t('your_application')}</Text>
      <View>
        <View style={styles.inputEmailContainer}>
          <Text style={styles.inputText}>{t('write_email')}</Text>
          <TextInput
            style={{ fontSize: 16, color: DARK_BLACK }}
            keyboardType="email-address"
            cursorColor={BACKGROUND_COLOR}
          />
        </View>
        <View style={[styles.inputEmailContainer, { marginTop: 30 }]}>
          <Text style={styles.inputText}>{t('confirm_email')}</Text>
          <TextInput
            style={{ fontSize: 16, color: DARK_BLACK }}
            keyboardType="email-address"
            cursorColor={BACKGROUND_COLOR}
          />
        </View>
        <View>
          <View style={{ marginTop: 30 }}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={number}
              defaultCode="CO"
              layout="first"
              containerStyle={{
                width: '100%',
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: GRAY_COLOR,
                backgroundColor: 'transparent',
              }}
              placeholder={t('phone_number_placeholder')}
              textContainerStyle={{ paddingVertical: 0, backgroundColor: 'transparent' }}
              textInputStyle={{ color: DARK_BLACK, fontSize: 16 }}
              onChangeFormattedText={(text) => setNumber(text)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContent: {
    marginTop: 30,
  },
  primaryTitle: {
    fontSize: 26,
    fontWeight: '500',
    color: BACKGROUND_COLOR,
  },
  secundaryText: {
    fontSize: 26,
    fontWeight: '500',
    color: DARK_BLACK,
  },
  subtitle: {
    fontSize: 16,
    color: DARK_BLACK,
    marginTop: 10,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    color: GRAY_COLOR,
    marginTop: 20,
  },
  inputEmailContainer: {
    borderBottomWidth: 1,
    borderBottomColor: GRAY_COLOR,
  },
});
export default WelComeView;
