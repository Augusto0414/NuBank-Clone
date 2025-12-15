import { COLORS } from 'constants/Colors';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CardInfoProps {
  source: ImageSourcePropType;
  title: string;
  content: string;
  button?: boolean;
  onPressButton?: () => void;
  link?: boolean;
  onPressLink?: () => void;
}
const { BACKGROUND_COLOR, DARK_BLACK, LIGHT_GRAY, DARK_BUTON_TEXT_COLOR } = COLORS;
export const CardInfo = ({
  source,
  title,
  content,
  button = false,
  link = false,
  onPressButton,
  onPressLink,
}: CardInfoProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={3} style={styles.content}>
            {content}
          </Text>
        </View>

        {button && (
          <TouchableOpacity style={styles.button} onPress={onPressButton} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        )}

        {link && (
          <TouchableOpacity onPress={onPressLink}>
            <Text style={styles.link}>Ver más</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: 260,
    width: 250,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: LIGHT_GRAY,
  },

  /* 40% */
  imageContainer: {
    flex: 4,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  /* 60% */
  infoContainer: {
    flex: 6,
    padding: 16,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_BLACK,
    marginBottom: 4,
  },

  content: {
    fontSize: 14,
    fontWeight: '300',
    color: DARK_BLACK,
    lineHeight: 18,
  },

  button: {
    marginTop: 12,
    backgroundColor: BACKGROUND_COLOR,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: DARK_BUTON_TEXT_COLOR,
    fontWeight: '600',
  },

  link: {
    marginTop: 12,
    color: DARK_BLACK,
    fontWeight: '500',
  },
});
