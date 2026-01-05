import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { HandleBottomSheet } from 'components/BottomSheet';
import { COLORS } from 'constants/Colors';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SigInService } from '../../service/auth/login.service';
const EYE_ICON = require('../../assets/img/eyes.jpg');
const EYE_OFF_ICON = require('../../assets/img/eyes_close.jpg');

const { GRAY_COLOR, BACKGROUND_COLOR, LIGHT_GRAY, GRAY_ARROW_COLOR } = COLORS;
const sigInService = new SigInService();
const PasswordView = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const [isActiveBottomSheet, setIsActiveBottomSheet] = useState<boolean>(false);
  const [isPasswordVisisible, setIsPasswordVisisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const handleOpenBottomSheet = () => setIsActiveBottomSheet((prev) => !prev);
  const login = async ({ password }: { password: string }): Promise<void> => {
    try {
      setIsLoading(true);
      const userEmail = await AsyncStorage.getItem('user_email');
      if (!userEmail) return;
      const { user } = await sigInService.sigIn(userEmail, password);
      if (!user) {
        throw new Error('Login Failed');
      }
      await SecureStore.setItemAsync('user_password', password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error('Login Failed', error as any);
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
        <Text style={styles.titleContente}>{t('password_title')}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="default"
          cursorColor={BACKGROUND_COLOR}
          secureTextEntry={!isPasswordVisisible}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          style={styles.eyeButton}
          activeOpacity={0.7}
          onPress={() => {
            setIsPasswordVisisible(!isPasswordVisisible);
          }}>
          <Image
            source={isPasswordVisisible ? EYE_ICON : EYE_OFF_ICON}
            style={styles.eyeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => {
          handleOpenBottomSheet();
        }}>
        <Text style={styles.forgotPasswordText}>{t('password_forgot')}</Text>
        <Ionicons
          style={[styles.icon, { color: BACKGROUND_COLOR }]}
          name="arrow-forward"
          size={28}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => {
          login({ password });
        }}>
        {isLoading ? (
          <ActivityIndicator
            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 18 }}
            size="large"
            color="#000"
          />
        ) : (
          <Ionicons style={styles.icon} name="arrow-forward" size={28} color="#000" />
        )}
      </TouchableOpacity>

      <HandleBottomSheet
        isVisible={isActiveBottomSheet}
        onClose={() => setIsActiveBottomSheet(false)}>
        <View style={{ paddingVertical: 30 }}>
          <Text style={{ fontSize: 30, fontWeight: '600', color: '#000' }}>
            {t('reset_password')}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10, color: '#666' }}>
            {t('reset_password_info')}
          </Text>
          <View>
            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: BACKGROUND_COLOR,
                paddingVertical: 15,
                borderRadius: 30,
                alignItems: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => {
                setIsActiveBottomSheet(false);
              }}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
                {t('button_submit')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 15,
                paddingVertical: 15,
                borderRadius: 30,
                alignItems: 'center',
                backgroundColor: LIGHT_GRAY,
              }}
              activeOpacity={0.7}
              onPress={() => {
                setIsActiveBottomSheet(false);
              }}>
              <Text style={{ color: '#000', fontSize: 14, fontWeight: '600' }}>
                {t('button_cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </HandleBottomSheet>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 60,
    fontSize: 32,
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
    borderRadius: '100%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 21,
    marginLeft: 21,
    color: GRAY_ARROW_COLOR,
  },
  eyeIcon: {
    width: 32,
    height: 32,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});
