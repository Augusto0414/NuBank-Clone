import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n';

export type ButtonAction = {
  key: string;
  iconName: string;
  title: string;
  onPress: () => void;
};

export const useActionButtons = (): ButtonAction[] => {
  const navigation = useNavigation();
  return [
    {
      key: i18n.t('detail_account'),
      iconName: 'receipt-outline',
      title: i18n.t('detail_account'),
      onPress: () => {},
    },
    {
      key: i18n.t('my_cards'),
      iconName: 'card-outline',
      title: i18n.t('my_cards'),
      onPress: () => {},
    },
  ];
};
