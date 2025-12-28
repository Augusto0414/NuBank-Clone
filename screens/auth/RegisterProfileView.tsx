import { useNavigation } from '@react-navigation/native';
import { FormField } from 'components/FormField';
import { showToast } from 'components/Toast';
import { COLORS } from 'constants/Colors';
import { useFormik } from 'formik';
import { useRegister } from 'hooks/useRegister';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';

const { BACKGROUND_COLOR, DARK_BLACK, GRAY_COLOR, WHITE, LIGHT_GRAY } = COLORS;

const RegisterProfileView = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const phoneInput = useRef(null);
  const { createUser } = useRegister();
  const navigation = useNavigation();
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    documentNumber: Yup.string().required(t('document_number_required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      phone: '',
      documentNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        const { phone, email, lastName, name, documentNumber } = values;
        createUser({
          name,
          lastName,
          email,
          phoneNumber: phone,
          numeroDocumento: documentNumber,
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

  const { name, lastName, email, confirmEmail, phone, documentNumber } = formik.values;

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
          <View style={styles.header}>
            <Text style={styles.textContent}>
              <Text style={styles.primaryTitle}>
                {t('continue_your_application')} {''}
              </Text>
              <Text style={styles.secundaryText}>{t('using_email_and_phone')}</Text>
            </Text>
            <Text style={styles.subtitle}>{t('your_application')}</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <FormField
            icon="id-card"
            label="documentNumber"
            placeholder={t('document_number')}
            value={documentNumber}
            onChangeText={formik.handleChange('documentNumber')}
            onBlur={() => formik.handleBlur('documentNumber')}
            error={formik.errors.documentNumber}
            touched={formik.touched.documentNumber}
            keyboardType="number-pad"
          />

          <FormField
            icon="person"
            label="name"
            placeholder={t('name')}
            value={name}
            onChangeText={formik.handleChange('name')}
            onBlur={() => formik.handleBlur('name')}
            error={formik.errors.name}
            touched={formik.touched.name}
          />

          <FormField
            icon="person-add"
            label="lastName"
            placeholder={t('last_name')}
            value={lastName}
            onChangeText={formik.handleChange('lastName')}
            onBlur={() => formik.handleBlur('lastName')}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />

          <FormField
            icon="mail"
            label="email"
            placeholder={t('write_email')}
            value={email}
            onChangeText={formik.handleChange('email')}
            onBlur={() => formik.handleBlur('email')}
            error={formik.errors.email}
            touched={formik.touched.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormField
            icon="mail-unread"
            label="confirmEmail"
            placeholder={t('confirm_email')}
            value={confirmEmail}
            onChangeText={formik.handleChange('confirmEmail')}
            onBlur={() => formik.handleBlur('confirmEmail')}
            error={formik.errors.confirmEmail}
            touched={formik.touched.confirmEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.fieldWrapper}>
            <View
              style={[
                styles.phoneContainer,
                focusedField === 'phone' && styles.inputContainerFocused,
                formik.touched.phone && formik.errors.phone && styles.inputContainerError,
              ]}
              onTouchStart={() => setFocusedField('phone')}
              onTouchEnd={() => {
                formik.handleBlur('phone');
                setFocusedField(null);
              }}>
              <Ionicons
                name="call"
                size={20}
                color={focusedField === 'phone' ? BACKGROUND_COLOR : GRAY_COLOR}
              />
              <PhoneInput
                ref={phoneInput}
                value={phone}
                defaultCode="CO"
                layout="first"
                containerStyle={styles.phoneInputContainer}
                filterProps={{
                  placeholder: t('search_country'),
                }}
                placeholder={t('phone_number_placeholder')}
                textContainerStyle={styles.phoneTextContainer}
                textInputStyle={styles.phoneInput}
                onChangeFormattedText={(text) => {
                  let trimText = text.replace(/\s/g, '');
                  formik.setFieldValue('phone', trimText);
                }}
              />
            </View>
            {formik.touched.phone && formik.errors.phone && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={14} color="#E74C3C" />
                <Text style={styles.errorText}>{formik.errors.phone}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => formik.handleSubmit()}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>{t('continue')}</Text>
            <Ionicons name="arrow-forward" size={18} color={WHITE} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 20,
  },
  textContent: {
    marginBottom: 8,
  },
  primaryTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: BACKGROUND_COLOR,
  },
  secundaryText: {
    fontSize: 24,
    fontWeight: '600',
    color: DARK_BLACK,
  },
  subtitle: {
    fontSize: 14,
    color: GRAY_COLOR,
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 2,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 2,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: 10,
  },
  inputContainerFocused: {
    borderColor: BACKGROUND_COLOR,
    backgroundColor: '#F5ECFF',
    borderWidth: 1.5,
  },
  inputContainerError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FADBD8',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: DARK_BLACK,
    fontWeight: '500',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: 10,
  },
  phoneInputContainer: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  phoneTextContainer: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  phoneInput: {
    color: DARK_BLACK,
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
    paddingHorizontal: 4,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 20,
    gap: 8,
    shadowColor: BACKGROUND_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RegisterProfileView;
