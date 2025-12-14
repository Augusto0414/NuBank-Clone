import { COLORS } from 'constants/Colors';
import React, { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type CircleButtonProps = {
  title?: string;
  icon: React.ReactNode;
  onclick: () => void;
  bannerTitle?: string;
} & TouchableOpacityProps;

const CIRCLE_SIZE = 65;

const { LIGHT_GRAY, DARK_BLACK, BACKGROUND_COLOR, DARK_BUTON_TEXT_COLOR } = COLORS;

export const CircleButton = forwardRef<View, CircleButtonProps>(
  ({ onclick, title, icon, bannerTitle, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onclick}
        activeOpacity={0.8}
        style={styles.touchable}
        {...props}>
        <View style={styles.circleButton}>{icon}</View>

        {bannerTitle && (
          <View style={styles.circleBannerContent}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.circleBannerTitle}>
              {bannerTitle}
            </Text>
          </View>
        )}

        {title && (
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.circleButtonText}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

CircleButton.displayName = 'CircleButton';

const styles = StyleSheet.create({
  touchable: {
    width: CIRCLE_SIZE + 20,
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  circleButton: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CIRCLE_SIZE * 0.25,
  },
  circleButtonText: {
    color: DARK_BLACK,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
  },
  circleBannerContent: {
    position: 'absolute',
    top: CIRCLE_SIZE * 0.75,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 30,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBannerTitle: {
    color: DARK_BUTON_TEXT_COLOR,
    fontWeight: '500',
    fontSize: 13,
  },
});
