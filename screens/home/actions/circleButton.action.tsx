import { COLORS } from 'constants/Colors';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { BACKGROUND_COLOR } = COLORS;

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
    icon: <Ionicons name="wallet-outline" size={24} color={BACKGROUND_COLOR} />,
    titleKey: 'deposit',
    onPress: () => {},
  },
  {
    key: 'send',
    icon: <Ionicons name="paper-plane-outline" size={24} color={BACKGROUND_COLOR} />,
    titleKey: 'send',
    onPress: () => {},
  },
  {
    key: 'breb',
    icon: <Ionicons name="flash-outline" size={24} color={BACKGROUND_COLOR} />,
    titleKey: 'breb',
    bannerKey: 'your_keys',
    onPress: () => {},
  },
  {
    key: 'pay_services',
    icon: <Ionicons name="receipt-outline" size={24} color={BACKGROUND_COLOR} />,
    titleKey: 'pay_services',
    bannerKey: 'new',
    onPress: () => {},
  },
];
