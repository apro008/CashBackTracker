import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';
import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

export default function LoginScreen() {
  const { login, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onSubmit = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return Alert.alert('Invalid email');
    if (password.length < 6) return Alert.alert('Password too short');
    const cred = await login(email, password);
    if (cred) router.replace('/'); // triggers index.tsx gate
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Welcome Back 👋</Text>

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

      {error ? <Text style={s.error}>{error}</Text> : null}

      <Button title="Login" onPress={onSubmit} />

      <View style={s.row}>
        <Link href="/(auth)/forgot-password" asChild>
          <TouchableOpacity>
            <Text style={s.link}>Forgot password?</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={s.rowCenter}>
        <Text>New here? </Text>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity>
            <Text style={s.link}>Create an account</Text>
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
  row: { marginTop: 10, alignItems: 'flex-start' },
  rowCenter: { flexDirection: 'row', marginTop: 16, alignItems: 'center' },
  link: { color: '#0A84FF', fontWeight: '600' },
});
