import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FormField } from 'components/FormField';
import { showToast } from 'components/Toast';
import { COLORS } from 'constants/Colors';
import { useFormik } from 'formik';
import { useRegister } from 'hooks/useRegister';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  checkDuplicateProfile,
  createAccount,
  createProfile,
  supabaseAuth,
} from 'service/auth/register.service';
import { supabase } from 'utils/supabase';
import * as Yup from 'yup';

const { BACKGROUND_COLOR, GRAY_COLOR, WHITE, LIGHT_GRAY } = COLORS;
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
        const duplicate = await checkDuplicateProfile({
          email: userRegister?.email!,
          phoneNumber: userRegister?.phoneNumber!,
          numeroDocumento: userRegister?.numeroDocumento!,
        });

        if (!duplicate.error && duplicate.data.hasDuplicate) {
          const { duplicateEmail, duplicatePhone } = duplicate.data;
          const message = duplicateEmail
            ? t('duplicate_email')
            : duplicatePhone
              ? t('duplicate_phone')
              : t('duplicate_document');

          showToast({ title: t('error'), message });
          return;
        }
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
        await AsyncStorage.setItem('user_email', userRegister?.email!);
        const accountResult = await createAccount({
          userID: authResult.user.id,
          pin: values.pin,
        });

        if (accountResult.error) {
          await AsyncStorage.removeItem('user_email');
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
        navigation.navigate('Login' as never);
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
            disabled={isLoader}
            activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color={BACKGROUND_COLOR} />
          </TouchableOpacity>

          {/* Título */}
          <View style={styles.header}>
            <Text style={styles.textContainer}>
              <Text style={styles.primaryText}>{t('finish_registration_text')} </Text>
              <Text style={styles.secondaryText}>{t('finish_registration_suffix')}</Text>
            </Text>
          </View>

          {/* Barra de progreso */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>

          {/* Campo PIN */}
          <FormField
            icon="key"
            label="pin"
            placeholder={t('pin_placeholder')}
            value={pin}
            onChangeText={form.handleChange('pin')}
            onBlur={() => form.handleBlur('pin')}
            error={form.errors.pin}
            touched={form.touched.pin}
            keyboardType="number-pad"
            maxLength={4}
            editable={!isLoader}
          />
        </View>

        {/* Botón continuar */}
        <TouchableOpacity
          onPress={() => form.handleSubmit()}
          activeOpacity={0.8}
          style={[styles.button, isLoader && styles.buttonDisabled]}
          disabled={isLoader}>
          {isLoader ? (
            <ActivityIndicator color={WHITE} size="small" />
          ) : (
            <>
              <Text style={styles.buttonText}>{t('save')}</Text>
              <Ionicons name="arrow-forward" size={18} color={WHITE} />
            </>
          )}
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
  primaryText: {
    color: '#000',
  },
  secondaryText: {
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RegisterPin;
