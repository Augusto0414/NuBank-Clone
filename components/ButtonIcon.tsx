import { COLORS } from 'constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ButtonIconProps {
  iconLeft?: string;
  iconRight?: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  bannerInfo?: string;
}
const { GRAY_ARROW_COLOR, LIGHT_GRAY, DARK_BLACK, BACKGROUND_COLOR, DARK_BUTON_TEXT_COLOR } =
  COLORS;
export const ButtonIcon: React.FC<ButtonIconProps> = ({
  iconLeft,
  iconRight,
  title,
  subtitle,
  onPress,
  bannerInfo,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.buttonIcon} onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {iconLeft && (
            <Ionicons style={styles.iconLeft} name={iconLeft} size={24} color={GRAY_ARROW_COLOR} />
          )}
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              {title}
            </Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
        {bannerInfo && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
            }}>
            <Text
              style={{
                color: DARK_BUTON_TEXT_COLOR,
                fontSize: 12,
                fontWeight: '600',
                paddingHorizontal: 5,
                backgroundColor: BACKGROUND_COLOR,
                borderRadius: 5,
              }}>
              {bannerInfo}
            </Text>
          </View>
        )}
        {iconRight && (
          <Ionicons style={styles.iconRight} name={iconRight} size={28} color={GRAY_ARROW_COLOR} />
        )}
      </TouchableOpacity>
      <View style={styles.lineBottom} />
    </>
  );
};
const styles = StyleSheet.create({
  buttonIcon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  lineBottom: {
    borderBottomWidth: 2,
    borderBottomColor: LIGHT_GRAY,
    paddingVertical: 10,
  },
  title: {
    width: '90%',
    fontSize: 16,
    fontWeight: '600',
    color: DARK_BLACK,
  },
  subtitle: {
    fontSize: 14,
    paddingTop: 10,
    color: GRAY_ARROW_COLOR,
    fontWeight: '400',
  },
  iconLeft: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: LIGHT_GRAY,
    marginRight: 15,
    padding: 16,
  },
  iconRight: {
    width: 30,
    height: 30,
  },
});
