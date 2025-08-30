import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import CategoryPickerModal from '~/app/appContainer/Expense/CategoryPickerModal';
import AnimatedHeaderWrapper from '~/components/AnimatedHeader';
import CalendarPickerField from '~/components/CalendarPickerField';
import CustomTextInput from '~/components/CustomTextInput';
import TimePickerField from '~/components/TimePickerField';
import { alertBox } from '~/utils/helpers';

const AnimatedScrollView = Animated.ScrollView;

type Mode = 'Income' | 'Expense' | 'Transfer';

const marked = {
  '2025-08-30': { marked: true, dotColor: '#FF4D4D' },
  '2025-08-25': { marked: true, dotColor: 'green' },
};

export default function Home() {
  const [mode, setMode] = useState<Mode>('Expense');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:09 pm');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [note, setNote] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <AnimatedHeaderWrapper
      title="Tab Two"
      leftIcon="arrow-back-outline"
      rightIcon="alert-circle-outline"
      onLeftPress={() => alertBox('Back', 'You pressed the left icon!', { positiveText: 'OK' })}
      onRightPress={() =>
        alertBox('Alert', 'You pressed the right icon!', { positiveText: 'Got it' })
      }>
      {(scrollHandler, headerHeight) => (
        <AnimatedScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.container}
          contentContainerStyle={{
            paddingTop: headerHeight,
            paddingBottom: 40,
          }}>
          <View style={styles.toggleRow}>
            {(['Income', 'Expense', 'Transfer'] as Mode[]).map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.toggleButton, mode === item && styles.toggleButtonActive]}
                onPress={() => setMode(item)}>
                <Text style={[styles.toggleText, mode === item && styles.toggleTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.fieldRow}>
            <CalendarPickerField date={date} onChange={setDate} markedDates={marked} />
            <TimePickerField date={date} onChange={setDate} />
          </View>

          {/* Amount */}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Amount</Text>
            <CustomTextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor="#777"
            />
          </View>

          {/* Category */}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity style={styles.inputBox} onPress={() => setShowCategoryModal(true)}>
              <Text style={{ color: category ? '#fff' : '#777' }}>
                {category || 'Select category'}
              </Text>
            </TouchableOpacity>

            <CategoryPickerModal
              visible={showCategoryModal}
              onClose={() => setShowCategoryModal(false)}
              onSelect={(cat) => setCategory(cat)}
            />
          </View>

          {/* Account */}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Account</Text>
            <CustomTextInput
              style={styles.input}
              value={account}
              onChangeText={setAccount}
              placeholder="Select account"
              placeholderTextColor="#777"
            />
          </View>

          {/* Note */}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Note</Text>
            <CustomTextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder="Add note"
              placeholderTextColor="#777"
            />
          </View>

          {/* Description */}
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Description</Text>
            <CustomTextInput
              style={[styles.input, { height: 80 }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Add description"
              placeholderTextColor="#777"
              multiline
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueBtn}>
              <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </AnimatedScrollView>
      )}
    </AnimatedHeaderWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#FF4D4D',
  },
  toggleText: {
    color: '#ccc',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
  },
  fieldRow: {
    marginBottom: 12,
  },
  fieldColumn: {
    marginBottom: 16,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 16,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#2A2A2A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#2A2A2A',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#FF4D4D',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  continueBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#666',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  continueBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
