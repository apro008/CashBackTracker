import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';
import CustomTextInput from '~/components/CustomTextInput';
import { Button } from '~/components/Button';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuthStore();
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return Alert.alert('Invalid email');
    }
    try {
      await resetPassword(email.trim());
      Alert.alert('Check your inbox', 'If that email exists, a reset link was sent.');
    } catch (e: any) {
      Alert.alert('Error', e.message ?? 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={s.container}>
        <Text style={s.title}>Reset Password 🔑</Text>
        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Button title="Send reset link" onPress={onSubmit} />

        <View style={s.rowCenter}>
          <Text>Remembered it? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={s.link}>Back to Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  error: { color: 'red', marginTop: 8 },
  rowCenter: { flexDirection: 'row', marginTop: 16, alignItems: 'center' },
  link: { color: '#0A84FF', fontWeight: '600' },
});
