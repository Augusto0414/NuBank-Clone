import { COLORS } from 'constants/Colors';
import { useFormik } from 'formik';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';

const { BACKGROUND_COLOR, DARK_BLACK, GRAY_COLOR, WHITE } = COLORS;
const WelComeView = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const phoneInput = useRef(null);

  const validationSchema = Yup.object({
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref('email')], t('confirm_email_mismatch'))
      .required(t('confirm_email_required')),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, t('phone_invalid'))
      .required(t('phone_required')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      confirmEmail: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { email, confirmEmail, phoneNumber } = formik.values;
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

      <View style={{ flex: 1 }}>
        <View style={styles.inputEmailContainer}>
          <Text style={styles.inputText}>{t('write_email')}</Text>
          <TextInput
            style={{ fontSize: 16, color: DARK_BLACK }}
            keyboardType="email-address"
            cursorColor={BACKGROUND_COLOR}
            value={email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
        </View>
        <View style={[styles.inputEmailContainer, { marginTop: 30 }]}>
          <Text style={styles.inputText}>{t('confirm_email')}</Text>
          <TextInput
            style={{ fontSize: 16, color: DARK_BLACK }}
            keyboardType="email-address"
            cursorColor={BACKGROUND_COLOR}
            value={confirmEmail}
            onChangeText={formik.handleChange('confirmEmail')}
            onBlur={formik.handleBlur('confirmEmail')}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <PhoneInput
            ref={phoneInput}
            value={phoneNumber}
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
            onChangeFormattedText={(text) => {
              formik.setFieldValue('phone', text);
            }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => formik.handleSubmit()}>
        <Text style={{ color: WHITE, fontWeight: '400', fontSize: 14 }}>{t('continue')}</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
    marginBottom: 20,
  },
});
export default WelComeView;
