import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'constants/Colors';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { BACKGROUND_COLOR, WHITE, DARK_BLACK, BACKGROUND_SECUNDARY } = COLORS;

export default function WelcomeView() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLogin = () => {
    navigation.navigate('Login' as never);
  };

  const handleRegister = () => {
    navigation.navigate('RegisterProfileView' as never);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.logoSection}>
        <View style={styles.logoCircle}>
          <Ionicons name="card" size={60} color={BACKGROUND_COLOR} />
        </View>
        <Text style={styles.title}>{t('welcome_title')}</Text>
        <Text style={styles.subtitle}>{t('welcome_subtitle')}</Text>
      </View>

      <View style={styles.featuresSection}>
        <Feature
          icon="flash"
          title={t('welcome_fast')}
          description={t('welcome_fast_description')}
        />
        <Feature
          icon="shield-checkmark"
          title={t('welcome_secure')}
          description={t('welcome_secure_description')}
        />
        <Feature
          icon="trending-up"
          title={t('welcome_smart')}
          description={t('welcome_smart_description')}
        />
      </View>

      <View style={styles.buttonsSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>{t('welcome_create_account')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
          <Text style={styles.secondaryButtonText}>{t('welcome_already_account')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={28} color={BACKGROUND_COLOR} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: BACKGROUND_SECUNDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: DARK_BLACK,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 40,
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: BACKGROUND_SECUNDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_BLACK,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  buttonsSection: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: BACKGROUND_COLOR,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: BACKGROUND_SECUNDARY,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BACKGROUND_COLOR,
  },
  secondaryButtonText: {
    color: BACKGROUND_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});
