import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HandleBottomSheetProps {
  isVisible?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const HandleBottomSheet = ({ isVisible, children, onClose }: HandleBottomSheetProps) => {
  const pointer = useMemo(() => ['50%'], []);
  const refBottomSheet = useRef<BottomSheet>(null);

  const handleVisibility = useCallback(() => {
    if (!refBottomSheet.current) return;
    if (!isVisible) {
      refBottomSheet.current?.close();
      return;
    }
    refBottomSheet.current?.expand();
  }, [isVisible]);

  useEffect(() => {
    handleVisibility();
  }, [isVisible, handleVisibility]);
  return (
    <BottomSheet
      handleIndicatorStyle={{ display: 'none' }}
      handleStyle={{ display: 'none' }}
      index={-1}
      ref={refBottomSheet}
      snapPoints={pointer}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}>
      <BottomSheetView>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: 15, top: 10, zIndex: 10 }}
            onPress={() => {
              onClose?.();
            }}
            activeOpacity={0.7}>
            <Ionicons name="close" size={26} color="#000" />
          </TouchableOpacity>
          <View>{children}</View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
