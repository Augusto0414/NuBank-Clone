import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface EyeProps {
  icon: string;
  color: string;
  onPress: () => void;
}

export const BottomEye = ({ icon, onPress, color }: EyeProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
      <Ionicons name={icon} size={24} color={color} />
    </TouchableOpacity>
  );
};
