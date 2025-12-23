import { useNavigation } from '@react-navigation/native';
import { showToast } from 'components/Toast';
import { COLORS } from 'constants/Colors';
import { useFormik } from 'formik';
import { useRegister } from 'hooks/useRegister';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAccount, createProfile, supabaseAuth } from 'service/auth/register.service';
import { supabase } from 'utils/supabase';
import * as Yup from 'yup';
const { BACKGROUND_COLOR, GRAY_COLOR, WHITE, GRAY_ARROW_COLOR } = COLORS;
const RegisterPin = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const { createUser, userRegister } = useRegister();
  const validateFormik = Yup.object({
    pin: Yup.string().length(4, t('pin_error')).required(t('pin_required')),
  });
  const form = useFormik({
    initialValues: { pin: '' },
    validationSchema: validateFormik,

    onSubmit: async (values) => {
      try {
        setIsLoader(true);
        createUser({ pin: values.pin });
        const authResult = await supabaseAuth({
          email: userRegister?.email!,
          password: userRegister?.passWord!,
        });

        if (authResult.error) {
          const errorMessage =
            authResult.errorCode === 'DUPLICATE_ACCOUNT'
              ? t('existing_account')
              : authResult.message;

          showToast({
            title: t('error'),
            message: errorMessage,
          });
          return;
        }

        const accountResult = await createAccount({
          userID: authResult.user.id,
          pin: values.pin,
        });

        if (accountResult.error) {
          await supabase.auth.admin.deleteUser(authResult.user.id);
          showToast({
            title: t('error'),
            message: accountResult.message,
          });
          return;
        }

        const profileResult = await createProfile({
          email: userRegister?.email!,
          userID: authResult.user.id,
          name: userRegister?.name!,
          lastName: userRegister?.lastName!,
          phoneNumber: userRegister?.phoneNumber!,
          numeroDocumento: userRegister?.numeroDocumento!,
        });

        if (profileResult.error) {
          await supabase.from('accounts').delete().eq('user_id', authResult.user.id);
          await supabase.auth.admin.deleteUser(authResult.user.id);
          showToast({
            title: t('error'),
            message: profileResult.message,
          });
          return;
        }

        showToast({
          title: t('success'),
          message: t('registration_complete'),
        });
        navigation.navigate('Home' as never);
      } catch (error: any) {
        showToast({
          title: t('error'),
          message: error.message || t('unexpected_error'),
        });
      } finally {
        setIsLoader(false);
      }
    },
  });
  const { pin } = form.values;
  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        paddingBottom: insets.bottom,
        marginHorizontal: 20,
      }}>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.goBack()}
        disabled={isLoader}>
        <Ionicons name="chevron-back" size={28} color={GRAY_ARROW_COLOR} />
      </TouchableOpacity>

      <View>
        <Text style={styles.textContainer}>
          <Text>{t('finish_registration_text')} </Text>
          <Text style={styles.secondaryText}>{t('finish_registration_suffix')}</Text>
        </Text>
        <Text style={styles.labelText}>{t('pin_label')}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ fontSize: 18, paddingVertical: 10 }}
            placeholder={t('pin_placeholder')}
            cursorColor={BACKGROUND_COLOR}
            keyboardType="numeric"
            maxLength={4}
            value={pin}
            onChangeText={form.handleChange('pin')}
            onBlur={form.handleBlur('pin')}
            secureTextEntry={true}
            editable={!isLoader}
          />
        </View>
      </View>

      {form.errors.pin && form.touched.pin && (
        <Text style={{ color: 'red', marginTop: 5 }}>{form.errors.pin}</Text>
      )}

      <TouchableOpacity
        onPress={() => form.handleSubmit()}
        activeOpacity={0.7}
        style={[styles.button, isLoader && styles.buttonDisabled]}
        disabled={isLoader}>
        {isLoader ? (
          <ActivityIndicator color={WHITE} />
        ) : (
          <Text style={{ color: WHITE, fontWeight: '400', fontSize: 14 }}>{t('save')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    fontSize: 26,
    fontWeight: '500',
    marginTop: 20,
  },
  primaryText: {},
  secondaryText: {
    color: BACKGROUND_COLOR,
  },
  labelText: {
    marginTop: 50,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '400',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: GRAY_COLOR,
    fontSize: 18,
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
    marginBottom: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
export default RegisterPin;
