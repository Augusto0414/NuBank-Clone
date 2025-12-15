import { COLORS } from 'constants/Colors';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { DARK_BLACK } = COLORS;

export type ActionType = 'deposit' | 'send' | 'breb' | 'pay_services';

export type HomeAction = {
  key: ActionType;
  icon: React.ReactElement;
  titleKey: string;
  bannerKey?: string;
  onPress: () => void;
};

export const createHomeActions = (): HomeAction[] => [
  {
    key: 'deposit',
    icon: <Ionicons name="wallet-outline" size={24} color={DARK_BLACK} />,
    titleKey: 'deposit',
    onPress: () => {},
  },
  {
    key: 'send',
    icon: <Ionicons name="paper-plane-outline" size={24} color={DARK_BLACK} />,
    titleKey: 'send',
    onPress: () => {},
  },
  {
    key: 'breb',
    icon: <Ionicons name="flash-outline" size={24} color={DARK_BLACK} />,
    titleKey: 'breb',
    bannerKey: 'your_keys',
    onPress: () => {},
  },
  {
    key: 'pay_services',
    icon: <Ionicons name="receipt-outline" size={24} color={DARK_BLACK} />,
    titleKey: 'pay_services',
    bannerKey: 'new',
    onPress: () => {},
  },
];
