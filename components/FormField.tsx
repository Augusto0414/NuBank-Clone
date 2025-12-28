import { COLORS } from 'constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { BACKGROUND_COLOR, DARK_BLACK, GRAY_COLOR } = COLORS;

type FormFieldProps = {
  icon: string;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e?: any) => void;
  error?: string;
  touched?: boolean;
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  editable?: boolean;
  [key: string]: any;
};

export const FormField = ({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  editable = true,
  ...props
}: FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={styles.fieldWrapper}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          touched && error && styles.inputContainerError,
        ]}>
        <Ionicons name={icon} size={20} color={isFocused ? BACKGROUND_COLOR : GRAY_COLOR} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={GRAY_COLOR}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          cursorColor={BACKGROUND_COLOR}
          value={value}
          onChangeText={onChangeText}
          onBlur={() => {
            onBlur();
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={editable}
          {...props}
        />
        {secureTextEntry && (
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color={GRAY_COLOR}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>
      {touched && error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={14} color="#E74C3C" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
