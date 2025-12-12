import { COLORS } from 'constants/Colors';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {GRAY_COLOR, BACKGROUND_COLOR, LIGHT_GRAY} = COLORS; 
const PasswordView = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets(); 
  return (
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, paddingHorizontal: 25,}}>
       <View style={{marginTop: 50,}}>
        <Text style={styles.titleContente}>{t('password_title')}</Text>
       </View>

       <View style={styles.inputContainer}>
         <TextInput style={styles.input} keyboardType="default" cursorColor={BACKGROUND_COLOR}/>
       </View>
       <Text style={styles.forgotPasswordText}>{t("password_forgot")}</Text>
       <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => {}}>
      
       </TouchableOpacity>
    </View>
  )
}

export default PasswordView


const styles  = StyleSheet.create({
 titleContente: {
  textAlign: "justify", 
  fontSize: 32,
  fontWeight: "500",
 }, 
 
 inputContainer: {
  marginTop: 20, 
 }, 
 input: {
  width: "100%",
  height: 50, 
  fontSize: 32,
  color: "#000",
  borderBottomWidth: 1, 
  borderBottomColor: GRAY_COLOR,
 }, 
 forgotPasswordText: {
  marginTop: 35, 
  color: BACKGROUND_COLOR,
  fontSize: 16,
  fontWeight: "500",
 },
 button: { 
  position: "absolute",
  right: 25,
  bottom: 45,
  width: 70, 
  height: 70,  
  marginTop: 40, 
  backgroundColor: LIGHT_GRAY, 
  borderRadius: "100%",  
}
})