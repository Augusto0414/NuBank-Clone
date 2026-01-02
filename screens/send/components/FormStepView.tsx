import { useNavigation } from '@react-navigation/native';
import { CircleButton } from 'components/CircleButton';
import { COLORS } from 'constants/Colors';
import React, { useState } from 'react';
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

const {
  GRAY_ARROW_COLOR,
  BACKGROUND_COLOR,
  DARK_BLACK,
  GRAY_COLOR,
  DARK_BUTON_TEXT_COLOR,
  BACKGROUND_SECUNDARY,
} = COLORS;

interface FormStepViewProps {
  titlePrimary: string;
  titleSecondary?: string;
  subtitle: string;
  keyboardType?: 'default' | 'numeric';
  maxLength?: number;
  errorText?: string;
  placeHolder?: string;
  skipButton?: boolean;
  buttonText?: string;
  textInput?: string;
  userIcon?: string;
  loading?: boolean;
  onSubmit: (value: string) => void;
}

export const FormStepView = ({
  titlePrimary,
  titleSecondary,
  subtitle,
  keyboardType = 'default',
  maxLength,
  errorText,
  placeHolder,
  textInput,
  skipButton = false,
  onSubmit,
  buttonText,
  userIcon,
  loading,
}: FormStepViewProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [value, setValue] = useState('');

  const isInvalid = maxLength ? value.length > maxLength : false;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        marginHorizontal: 20,
      }}>
      {/* Back */}
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={GRAY_ARROW_COLOR} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.textContainer}>
        <Text style={styles.textSend}>{titlePrimary} </Text>
        {titleSecondary && <Text style={styles.textNu}>{titleSecondary}</Text>}
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitleNu}>{subtitle}</Text>
      {userIcon && (
        <View style={styles.userIconContent}>
          {' '}
          <View style={styles.userIcon}>
            <Text style={styles.userIconText}>{userIcon.slice(0, 2).toUpperCase()}</Text>
          </View>
          <Text style={styles.userText}>{userIcon}</Text>
        </View>
      )}

      {/* Input */}
      {keyboardType === 'numeric' ? (
        <View>
          {textInput && <Text style={styles.textInpunt}>{textInput}</Text>}
          <View style={styles.keyBoardNumeric}>
            <Ionicons name="logo-usd" size={24} color={DARK_BLACK} />
            <TextInput
              style={[styles.input, { flex: 1, marginHorizontal: 10 }]}
              value={value}
              keyboardType="numeric"
              cursorColor={BACKGROUND_COLOR}
              onChangeText={setValue}
            />
            <TouchableOpacity onPress={() => setValue('')}>
              <Ionicons name="close" size={24} color={DARK_BLACK} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          {textInput && <Text style={styles.textInpunt}>{textInput}</Text>}
          <View style={styles.keyBoardNumeric}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={value}
              keyboardType={keyboardType}
              cursorColor={BACKGROUND_COLOR}
              onChangeText={setValue}
              placeholder={placeHolder}
            />
          </View>
        </View>
      )}

      {/* Error */}
      {isInvalid && errorText && <Text style={styles.error}>{errorText}</Text>}

      {/* Button */}
      {skipButton ? (
        <View style={styles.circleButton}>
          <CircleButton
            icon={
              <Ionicons name="arrow-forward" size={28} color={value ? DARK_BLACK : GRAY_COLOR} />
            }
            onclick={() => !isInvalid && value.trim() && onSubmit(value)}
          />
        </View>
      ) : (
        <TouchableOpacity style={styles.btnSend} onPress={() => onSubmit(value)} disabled={loading}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={DARK_BUTON_TEXT_COLOR}
              style={{ alignSelf: 'center' }}
            />
          ) : (
            <Text style={styles.textBtnSend}>{buttonText}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textSend: { color: DARK_BLACK },
  textInpunt: {
    color: GRAY_COLOR,
    fontSize: 16,
    marginTop: 10,

    paddingTop: 10,
  },
  textNu: { color: BACKGROUND_COLOR },
  textContainer: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  subtitleNu: {
    marginTop: 20,
    fontSize: 16,
    color: GRAY_COLOR,
    fontWeight: '500',
  },
  input: {
    fontSize: 18,
    paddingVertical: 8,
  },
  circleButton: {
    position: 'absolute',
    bottom: 50,
    right: 0,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  keyBoardNumeric: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  btnSend: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  textBtnSend: {
    color: DARK_BUTON_TEXT_COLOR,
  },
  userIconContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    paddingBottom: 25,
  },
  userIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_SECUNDARY,
    borderRadius: 50,
    width: 60,
    height: 60,
    borderColor: BACKGROUND_COLOR,
    borderWidth: 1,
  },
  userIconText: {
    color: BACKGROUND_COLOR,
    fontWeight: 'bold',
  },
  userText: {
    color: DARK_BLACK,
    fontWeight: '500',
  },
});
