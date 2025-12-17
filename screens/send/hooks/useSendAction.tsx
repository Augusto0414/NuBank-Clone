import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n';

interface SendActionProps {
  title: string;
  subtitle: string;
  iconLeft: string;
  iconRight: string;
  bannerKey?: string;
  onPress: () => void;
}

export const useSendAction = (): SendActionProps[] => {
  const route = useNavigation();
  return [
    {
      title: i18n.t('institution_key'),
      subtitle: i18n.t('subtitile_send'),
      iconLeft: 'key-outline',
      iconRight: 'chevron-forward',
      bannerKey: 'Bre-B',
      onPress: () => {},
    },
    {
      title: i18n.t('client_nu'),
      subtitle: i18n.t('subtitile_send'),
      iconLeft: 'flash-outline',
      iconRight: 'chevron-forward',
      onPress: () => {
        route.navigate('PlateView' as never);
      },
    },
    {
      title: i18n.t('institutions'),
      subtitle: i18n.t('subtitle_send_entity'),
      iconLeft: 'business-outline',
      iconRight: 'chevron-forward',
      onPress: () => {},
    },
  ];
};
