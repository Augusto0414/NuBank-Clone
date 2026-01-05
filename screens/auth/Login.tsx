import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'constants/Colors';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SigInService } from 'service/auth/login.service';
import * as Yup from 'yup';
const EYE_ICON = require('../../assets/img/eyes.jpg');
const EYE_OFF_ICON = require('../../assets/img/eyes_close.jpg');

const { GRAY_COLOR, BACKGROUND_COLOR, LIGHT_GRAY, GRAY_ARROW_COLOR } = COLORS;
const signInService = new SigInService();

const PasswordView = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const [isPasswordVisisible, setIsPasswordVisisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateLogin = Yup.object().shape({
    email: Yup.string().email(t('invalid_email')),
    password: Yup.string().min(6, t('password_min_length')),
  });

  const handleSubmit = async () => {
    console.log('handleSubmit called');
    setIsLoading(true);
    try {
      setErrors({});
      await validateLogin.validate({ email, password }, { abortEarly: false });
      const login = await signInService.sigIn(email.trim(), password);
      if (!login) return;

      await AsyncStorage.setItem('user_email', email.trim());
      await SecureStore.setItemAsync('user_password', password);
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { email?: string; password?: string } = {};
        error.inner.forEach((issue) => {
          if (issue.path && !validationErrors[issue.path as 'email' | 'password']) {
            validationErrors[issue.path as 'email' | 'password'] = issue.message;
          }
        });
        setErrors(validationErrors);
        return;
      }
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      console.error('Login error:', errorMessage);
      setErrors({ password: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: '#FFFFFF',
      }}>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigate.goBack();
          }}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.titleContente}>{t('login_title')}</Text>
      </View>

      <View style={[styles.inputContainer, { marginTop: 40, marginBottom: 20 }]}>
        <Text style={styles.label}>{t('email')}</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          cursorColor={BACKGROUND_COLOR}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('password')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            cursorColor={BACKGROUND_COLOR}
            secureTextEntry={!isPasswordVisisible}
            onChangeText={(value) => {
              setPassword(value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            value={password}
            editable={!isLoading}
          />

          <TouchableOpacity
            style={styles.eyeButton}
            activeOpacity={0.7}
            onPress={() => {
              setIsPasswordVisisible(!isPasswordVisisible);
            }}
            disabled={isLoading}>
            <Image
              source={isPasswordVisisible ? EYE_ICON : EYE_OFF_ICON}
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="large" color={GRAY_ARROW_COLOR} />
        ) : (
          <Ionicons style={styles.icon} name="arrow-forward" size={28} color="#000" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PasswordView;

const styles = StyleSheet.create({
  titleContente: {
    textAlign: 'justify',
    fontSize: 32,
    fontWeight: '500',
  },

  inputContainer: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: 6,
  },
  label: {
    width: '100%',
    fontSize: 14,
    color: GRAY_COLOR,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 60,
    fontSize: 22,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: GRAY_COLOR,
  },
  forgotPasswordText: {
    marginTop: 21,
    color: BACKGROUND_COLOR,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    position: 'absolute',
    right: 25,
    bottom: 45,
    width: 70,
    height: 70,
    marginTop: 40,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: GRAY_ARROW_COLOR,
  },
  eyeIcon: {
    width: 32,
    height: 32,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 15,
  },
  errorText: {
    marginTop: 6,
    color: '#d00000',
    fontSize: 13,
  },
});
