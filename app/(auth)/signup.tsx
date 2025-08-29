import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';
import CustomTextInput from '~/components/CustomTextInput';
import { Button } from '~/components/Button';

export default function SignupScreen() {
  const { signup, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onSubmit = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return Alert.alert('Invalid email');
    if (password.length < 6) return Alert.alert('Use at least 6 characters');
    if (password !== confirm) return Alert.alert('Passwords do not match');
    await signup(email.trim(), password);
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Create Account 🚀</Text>
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomTextInput
        placeholder="Confirm Password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />
      {error ? <Text style={s.error}>{error}</Text> : null}
      <Button title="Sign Up" onPress={onSubmit} />
      <View style={s.rowCenter}>
        <Text>Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text style={s.link}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#0A84FF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  error: { color: 'red', marginTop: 8 },
  rowCenter: { flexDirection: 'row', marginTop: 16, alignItems: 'center' },
  link: { color: '#0A84FF', fontWeight: '600' },
});
