import { useNavigation } from '@react-navigation/native';
import { FormField } from 'components/FormField';
import { showToast } from 'components/Toast';
import { COLORS } from 'constants/Colors';
import { useFormik } from 'formik';
import { useRegister } from 'hooks/useRegister';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';

const { BACKGROUND_COLOR, WHITE, LIGHT_GRAY } = COLORS;

const RegisterDetailsView = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { createUser } = useRegister();

  const validateFormik = Yup.object({
    password: Yup.string().min(8, t('password_input_error')).required(t('password_required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('confirm_password_mismatch'))
      .required(t('confirm_password_required')),
  });

  const form = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: validateFormik,
    onSubmit: (values) => {
      try {
        const { password } = values;
        createUser({ passWord: password });
        navigation.navigate('RegisterPin' as never);
      } catch (error: Error | any) {
        showToast({
          title: t('error'),
          message: t('error_password', { error: error.message }),
        });
      }
    },
  });

  const { password, confirmPassword } = form.values;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          marginHorizontal: 20,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          {/* Header con botón atrás */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color={BACKGROUND_COLOR} />
          </TouchableOpacity>

          {/* Título */}
          <View style={styles.header}>
            <Text style={styles.textContainer}>
              <Text style={styles.title}>{t('registration_almost_complete_text')} </Text>
              <Text style={styles.titleFix}>{t('registration_almost_complete_suffix')}</Text>
            </Text>
          </View>

          {/* Barra de progreso */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>

          {/* Campos de contraseña */}
          <FormField
            icon="lock-closed"
            label="password"
            placeholder={t('password_input_placeholder')}
            value={password}
            onChangeText={form.handleChange('password')}
            onBlur={() => form.handleBlur('password')}
            error={form.errors.password}
            touched={form.touched.password}
            secureTextEntry={true}
          />

          <FormField
            icon="lock-open"
            label="confirmPassword"
            placeholder={t('confirm_password_input_label')}
            value={confirmPassword}
            onChangeText={form.handleChange('confirmPassword')}
            onBlur={() => form.handleBlur('confirmPassword')}
            error={form.errors.confirmPassword}
            touched={form.touched.confirmPassword}
            secureTextEntry={true}
          />
        </View>

        {/* Botón continuar */}
        <TouchableOpacity
          onPress={() => form.handleSubmit()}
          activeOpacity={0.8}
          style={styles.button}>
          <Text style={styles.buttonText}>{t('continue')}</Text>
          <Ionicons name="arrow-forward" size={18} color={WHITE} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: 20,
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  textContainer: {
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    color: BACKGROUND_COLOR,
  },
  titleFix: {
    color: BACKGROUND_COLOR,
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
  button: {
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 12,
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

export default RegisterDetailsView;
