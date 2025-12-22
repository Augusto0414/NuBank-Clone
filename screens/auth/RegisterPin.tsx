import { showToast } from 'components/Toast';
import { COLORS } from 'constants/Colors';
import { useFormik } from 'formik';
import { useRegister } from 'hooks/useRegister';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';
const { BACKGROUND_COLOR, GRAY_COLOR, WHITE } = COLORS;
const RegisterPin = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const validateFormik = Yup.object({
    pin: Yup.string().length(4, t('pin_error')).required(t('pin_required')),
  });
  const { createUser } = useRegister();
  const form = useFormik({
    initialValues: { pin: '' },
    validationSchema: validateFormik,
    onSubmit: (values) => {
      try {
        createUser({ pin: values.pin });
      } catch (error: any | Error) {
        showToast({
          title: t('error'),
          message: t('error_pin', { error: error.message }),
        });
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
            value={pin}
            onChangeText={form.handleChange('pin')}
            onBlur={form.handleBlur('pin')}
            secureTextEntry={true}
          />
        </View>
      </View>
      {form.errors.pin && form.touched.pin && (
        <Text style={{ color: 'red', marginTop: 5 }}>{form.errors.pin}</Text>
      )}
      <TouchableOpacity
        onPress={() => form.handleSubmit()}
        activeOpacity={0.7}
        style={styles.button}>
        <Text style={{ color: WHITE, fontWeight: '400', fontSize: 14 }}>{t('save')}</Text>
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
});
export default RegisterPin;
