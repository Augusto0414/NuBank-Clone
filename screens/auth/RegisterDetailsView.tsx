import { useNavigation } from '@react-navigation/native';
import { BottomEye } from 'components/BottomEye';
import { showToast } from 'components/Toast';
import { COLORS } from 'constants/Colors';
import { useFormik } from 'formik';
import { useRegister } from 'hooks/useRegister';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';

const { BACKGROUND_COLOR, DARK_BLACK, GRAY_ARROW_COLOR, GRAY_COLOR, WHITE } = COLORS;
const RegisterDetailsView = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { createUser } = useRegister();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

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
    <View style={{ paddingTop: insets.top, flex: 1, paddingBottom: insets.bottom }}>
      <View>
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
            <TextInput
              style={{ flex: 1 }}
              cursorColor={BACKGROUND_COLOR}
              value={password}
              onChangeText={form.handleChange('password')}
              onBlur={form.handleBlur('password')}
              secureTextEntry={visiblePassword}
            />
            <BottomEye
              icon={visiblePassword ? 'eye-off' : 'eye'}
              onPress={() => setVisiblePassword(!visiblePassword)}
              color={GRAY_COLOR}
            />
          </View>
          {form.touched.password && form.errors.password && (
            <Text style={{ color: 'red', marginHorizontal: 20, marginTop: 5 }}>
              {form.errors.password}
            </Text>
          )}
          <Text style={[styles.label, { marginTop: 40 }]}>{t('confirm_password_input_label')}</Text>
          <View style={styles.containerInput}>
            <TextInput
              style={{ flex: 1 }}
              cursorColor={BACKGROUND_COLOR}
              value={confirmPassword}
              onChangeText={form.handleChange('confirmPassword')}
              onBlur={form.handleBlur('confirmPassword')}
              secureTextEntry={visibleConfirmPassword}
            />
            <BottomEye
              icon={visibleConfirmPassword ? 'eye-off' : 'eye'}
              onPress={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
              color={GRAY_COLOR}
            />
          </View>
        </View>
        {form.touched.confirmPassword && form.errors.confirmPassword && (
          <Text style={{ color: 'red', marginHorizontal: 20, marginTop: 5 }}>
            {form.errors.confirmPassword}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => form.handleSubmit()}
        activeOpacity={0.7}
        style={styles.button}>
        <Text style={{ color: WHITE, fontWeight: '400', fontSize: 14 }}>{t('continue')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    marginTop: 5,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
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
  button: {
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
    marginBottom: 60,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default RegisterDetailsView;
