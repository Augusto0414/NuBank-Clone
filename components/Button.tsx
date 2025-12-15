import { COLORS } from 'constants/Colors';
import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ButtonProps = {
  title: string;
  iconName: string;
} & TouchableOpacityProps;

const { LIGHT_GRAY, DARK_BLACK } = COLORS;
export const Button = forwardRef<View, ButtonProps>(
  ({ title, iconName, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity style={styles.button} ref={ref} {...touchableProps}>
        <Ionicons name={iconName} size={26} color={DARK_BLACK} />,
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16, fontWeight: '500' }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,
    paddingVertical: 16,
    borderRadius: 12,
    paddingHorizontal: 20,
  },
});
