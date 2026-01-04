import { COLORS } from 'constants/Colors';
import { AccountContext } from 'context/AccountContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { LIGHT_GRAY, WHITE, DARK_BLACK, BACKGROUND_COLOR } = COLORS;

const DetailView = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { account, loading } = useContext(AccountContext);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: insets.bottom }}>
      <View style={[styles.headerContainer]}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-outline" size={26} color={DARK_BLACK} />
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userName}>
            {loading
              ? 'Cargando...'
              : `${account?.profiles.name} ${account?.profiles.last_name}` || 'N/A'}
          </Text>

          <Text style={styles.userInfo}>
            Cédula de ciudadanía:{' '}
            <Text style={styles.bold}>
              {loading ? 'Cargando...' : account?.profiles.numero_documento || 'N/A'}
            </Text>
          </Text>

          <Text style={styles.userInfo}>
            Mi Nu Placa es:{' '}
            <Text style={styles.bold}>
              {loading ? 'Cargando...' : account?.profiles.phone_number || 'N/A'}
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>Cuenta de ahorros Nu Financiera</Text>

          <Text style={styles.userInfo}>
            Número de cuenta:{' '}
            <Text style={styles.bold}>
              {loading ? 'Cargando...' : account?.profiles.phone_number || 'N/A'}
            </Text>
          </Text>

          <View style={styles.footerHeader}>
            <TouchableOpacity style={styles.copyButton}>
              <Ionicons name="copy-outline" size={18} color={WHITE} />
              <Text style={styles.copyText}>{t('copy')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-social-outline" size={20} />
              <Text>{t('shared')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Detalles</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  headerContainer: {
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  iconContainer: {
    backgroundColor: WHITE,
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  userInfo: {
    fontSize: 13,
    color: DARK_BLACK,
    marginBottom: 2,
  },
  bold: {
    fontWeight: '600',
    color: DARK_BLACK,
  },
  sectionTitle: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '600',
    color: DARK_BLACK,
  },

  footerHeader: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  copyText: {
    color: WHITE,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  detailsContainer: {
    padding: 20,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DetailView;
