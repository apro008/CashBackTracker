import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { CATEGORIES } from '~/utils/const';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
};

export default function CategoryPickerModal({ visible, onClose, onSelect }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Category</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Grid of categories */}
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item.key}
              numColumns={3}
              contentContainerStyle={styles.grid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item.label);
                    onClose();
                  }}>
                  <Text style={styles.icon}>{item.icon}</Text>
                  <Text style={styles.label}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: { fontSize: 16, color: '#fff', fontWeight: '600' },
  closeBtn: { color: '#fff', fontSize: 18 },
  grid: { padding: 12 },
  item: {
    flex: 1,
    margin: 8,
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 24, marginBottom: 8 },
  label: { color: '#fff', fontSize: 14 },
});
