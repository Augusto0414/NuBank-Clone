import { useNavigation } from '@react-navigation/native';
import { HandleBottomSheet } from 'components/BottomSheet';
import { FormField } from 'components/FormField';
import { COLORS } from 'constants/Colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { BACKGROUND_COLOR, LIGHT_GRAY, WHITE } = COLORS;

const PasswordView = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const [isActiveBottomSheet, setIsActiveBottomSheet] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const handleOpenBottomSheet = () => setIsActiveBottomSheet((prev) => !prev);

  const handleContinue = () => {
    if (password.trim()) {
      navigate.navigate('Login' as never);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          {/* Header con botón atrás */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigate.goBack()}
            activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color={BACKGROUND_COLOR} />
          </TouchableOpacity>

          {/* Título */}
          <View style={styles.header}>
            <Text style={styles.titleContent}>{t('password_title')}</Text>
          </View>

          {/* Campo de contraseña */}
          <FormField
            icon="lock-closed"
            label="password"
            placeholder={t('password_input_placeholder')}
            value={password}
            onChangeText={setPassword}
            onBlur={() => {}}
            secureTextEntry={true}
          />

          {/* Botón olvidé contraseña */}
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={handleOpenBottomSheet}
            activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>{t('password_forgot')}</Text>
            <Ionicons name="arrow-forward" size={20} color={BACKGROUND_COLOR} />
          </TouchableOpacity>
        </View>

        {/* Botón continuar */}
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>{t('continue')}</Text>
          <Ionicons name="arrow-forward" size={18} color={WHITE} />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet para recuperar contraseña */}
      <HandleBottomSheet
        isVisible={isActiveBottomSheet}
        onClose={() => setIsActiveBottomSheet(false)}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>{t('reset_password')}</Text>
          <Text style={styles.bottomSheetDescription}>{t('reset_password_info')}</Text>

          <View style={styles.bottomSheetButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.7}
              onPress={() => setIsActiveBottomSheet(false)}>
              <Text style={styles.primaryButtonText}>{t('button_submit')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.7}
              onPress={() => setIsActiveBottomSheet(false)}>
              <Text style={styles.secondaryButtonText}>{t('button_cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </HandleBottomSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
  },
  titleContent: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  forgotPasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  forgotPasswordText: {
    color: BACKGROUND_COLOR,
    fontSize: 15,
    fontWeight: '600',
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
  bottomSheetContent: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  bottomSheetDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 30,
  },
  bottomSheetButtons: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: BACKGROUND_COLOR,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: LIGHT_GRAY,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default PasswordView;
