import { View, StyleSheet, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { useAuthStore } from '~/store/useAuthStore';

export default function GlobalLoader() {
  const loading = useAuthStore((s) => s.loading);

  return (
    <Modal visible={loading} transparent animationType="fade">
      <View style={s.overlay}>
        <LottieView
          source={require('~/assets/lottie/loading.json')}
          autoPlay
          loop
          style={s.lottie}
        />
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 170,
    height: 160,
  },
});
