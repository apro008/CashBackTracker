import { useMemo } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const email = useMemo(() => user?.email ?? 'Unknown', [user]);

  const onLogout = async () => {
    try {
      // Optional confirm
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // If your index.tsx gate redirects based on user state,
            // you can either rely on that or force navigation to auth:
            router.replace('/(auth)/login');
          },
        },
      ]);
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Could not logout');
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Profile</Text>

      <View style={s.card}>
        <Row label="User ID" value={user?.uid ?? '—'} />
        <Row label="Email" value={email} />
      </View>

      <TouchableOpacity onPress={onLogout} style={s.logoutBtn}>
        <Text style={s.logoutTxt}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.row}>
      <Text style={s.rowLabel}>{label}</Text>
      <Text style={s.rowValue}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  title: { fontSize: 28, fontWeight: '700', marginTop: 4, marginBottom: 8 },
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    gap: 10,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { color: '#6b7280' },
  rowValue: { fontWeight: '600' },
  logoutBtn: {
    marginTop: 'auto',
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
