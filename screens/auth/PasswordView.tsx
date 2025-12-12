import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'constants/Colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
const EYE_ICON = require('../../assets/img/eyes.jpg');
const EYE_OFF_ICON = require('../../assets/img/eyes_close.jpg');


const {GRAY_COLOR, BACKGROUND_COLOR, LIGHT_GRAY, GRAY_ARROW_COLOR} = COLORS; 
const PasswordView = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets(); 
  const navigate = useNavigation();
const [isPasswordVisisible, setIsPasswordVisisible] = useState<boolean>(false);
  return (
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, paddingHorizontal: 25, backgroundColor: "#FFFFFF"}}>
      <View style={{marginTop: 30}}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {navigate.goBack()}}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      </View>

       <View style={{marginTop: 20}}>
        <Text style={styles.titleContente}>{t('password_title')}</Text>
       </View>

       <View style={styles.inputContainer}>
         <TextInput style={styles.input}
          keyboardType="default"
          cursorColor={BACKGROUND_COLOR}
          secureTextEntry={!isPasswordVisisible} 
           />
         
          <TouchableOpacity style={styles.eyeButton} activeOpacity={0.7} onPress={() => {setIsPasswordVisisible(!isPasswordVisisible)}}>
                     <Image source={isPasswordVisisible ? EYE_ICON : EYE_OFF_ICON} style={styles.eyeIcon} resizeMode="contain" />
          </TouchableOpacity>
       </View>
       
       <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={styles.forgotPasswordText}>{t("password_forgot")}</Text>
        <Ionicons style={[styles.icon, {color: BACKGROUND_COLOR}]} name="arrow-forward" size={28} />
       </View>
       
       <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => {}}>
         <Ionicons style={styles.icon} name="arrow-forward" size={28} color="#000" />
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
  width: "100%", 
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
 }, 
 input: {
  width: "100%",
  height: 60, 
  fontSize: 32,
  color: "#000",
  borderBottomWidth: 1, 
  borderBottomColor: GRAY_COLOR,
 }, 
 forgotPasswordText: {
  marginTop: 21, 
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
}, 
icon: {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 21,
  marginLeft: 21,
  color: GRAY_ARROW_COLOR
}, 
eyeIcon: {
  width: 32,
  height: 32,
}, 
eyeButton: {
  position: "absolute",
  right: 0,
  bottom: 10,
}
})