import { COLORS } from 'constants/Colors';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { BACKGROUND_COLOR } = COLORS;
const FaceID = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        marginHorizontal: 20,
      }}>
      <Text>FaceID Screen</Text>
    </View>
  );
};

export default FaceID;
