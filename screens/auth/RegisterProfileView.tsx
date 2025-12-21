import { useNavigation } from '@react-navigation/native';
import { showToast } from 'components/Toast';
import { COLORS } from 'constants/Colors';
import { useFormik } from 'formik';
import { useRegister } from 'hooks/useRegister';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';

const { BACKGROUND_COLOR, DARK_BLACK, GRAY_COLOR, WHITE } = COLORS;

const RegisterProfileView = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const phoneInput = useRef(null);
  const { createUser } = useRegister();
  const navigation = useNavigation();

  const validationSchema = Yup.object({
    name: Yup.string().min(2, t('name_invalid')).required(t('name_required')),
    lastName: Yup.string().min(2, t('last_name_invalid')).required(t('last_name_required')),
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref('email')], t('confirm_email_mismatch'))
      .required(t('confirm_email_required')),
    phone: Yup.string()
      .matches(/^\+?[0-9]{12,15}$/, t('phone_invalid'))
      .required(t('phone_required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        const { phone, email, lastName, name } = values;
        createUser({
          name,
          lastName,
          email,
          phoneNumber: phone,
        });
        navigation.navigate('RegisterDetailsView' as never);
      } catch (error: Error | any) {
        showToast({
          title: t('error'),
          message: t('error_creating_user', { error: error.message }),
        });
      }
    },
  });

  const { name, lastName, email, confirmEmail, phone } = formik.values;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
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

          <View style={styles.inputEmailContainer}>
            <Text style={styles.inputText}>{t('name')}</Text>
            <TextInput
              style={{ fontSize: 16, color: DARK_BLACK }}
              keyboardType="default"
              cursorColor={BACKGROUND_COLOR}
              value={name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
            />
          </View>
          {formik.touched.name && formik.errors.name && (
            <Text style={styles.errorText}>{formik.errors.name}</Text>
          )}

          <View style={styles.inputEmailContainer}>
            <Text style={styles.inputText}>{t('last_name')}</Text>
            <TextInput
              style={{ fontSize: 16, color: DARK_BLACK }}
              keyboardType="default"
              cursorColor={BACKGROUND_COLOR}
              value={lastName}
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
            />
          </View>
          {formik.touched.lastName && formik.errors.lastName && (
            <Text style={styles.errorText}>{formik.errors.lastName}</Text>
          )}

          <View style={[styles.inputEmailContainer, { marginTop: 30 }]}>
            <Text style={styles.inputText}>{t('write_email')}</Text>
            <TextInput
              style={{ fontSize: 16, color: DARK_BLACK }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              cursorColor={BACKGROUND_COLOR}
              value={email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
          </View>
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          )}

          <View style={[styles.inputEmailContainer, { marginTop: 30 }]}>
            <Text style={styles.inputText}>{t('confirm_email')}</Text>
            <TextInput
              style={{ fontSize: 16, color: DARK_BLACK }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              textContentType="none"
              importantForAutofill="no"
              cursorColor={BACKGROUND_COLOR}
              value={confirmEmail}
              onChangeText={formik.handleChange('confirmEmail')}
              onBlur={formik.handleBlur('confirmEmail')}
            />
          </View>
          {formik.touched.confirmEmail && formik.errors.confirmEmail && (
            <Text style={styles.errorText}>{formik.errors.confirmEmail}</Text>
          )}

          <View style={{ marginTop: 30 }}>
            <PhoneInput
              ref={phoneInput}
              value={phone}
              defaultCode="CO"
              layout="first"
              containerStyle={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: GRAY_COLOR,
                backgroundColor: 'transparent',
              }}
              filterProps={{
                placeholder: t('search_country'),
              }}
              placeholder={t('phone_number_placeholder')}
              textContainerStyle={{ paddingVertical: 0, backgroundColor: 'transparent' }}
              textInputStyle={{ color: DARK_BLACK, fontSize: 16 }}
              onChangeFormattedText={(text) => {
                let trimText = text.replace(/\s/g, '');
                formik.setFieldValue('phone', trimText);
              }}
            />
          </View>
          {formik.touched.phone && formik.errors.phone && (
            <Text style={styles.errorText}>{formik.errors.phone}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => formik.handleSubmit()}
            activeOpacity={0.7}>
            <Text style={{ color: WHITE, fontWeight: '400', fontSize: 14 }}>{t('continue')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterProfileView;
