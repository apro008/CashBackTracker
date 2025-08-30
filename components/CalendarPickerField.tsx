import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

type Props = {
  date: Date;
  onChange: (d: Date) => void;
  markedDates?: Record<string, any>;
};

export default function CalendarPickerField({ date, onChange, markedDates = {} }: Props) {
  const [show, setShow] = useState(false);

  const handleDayPress = (day: any) => {
    const selected = new Date(day.dateString);
    const newDate = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate(),
      date.getHours(),
      date.getMinutes()
    );
    onChange(newDate);
    setShow(false);
  };

  return (
    <View style={styles.fieldRow}>
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.valueBox}>
        <Text style={styles.value}>{moment(date).format('DD/MM/YY (ddd)')}</Text>
      </TouchableOpacity>

      <Modal visible={show} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setShow(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              {/* prevent closing when tapping inside */}
              <View style={styles.modalBox}>
                <Calendar
                  markedDates={{
                    [moment(date).format('YYYY-MM-DD')]: {
                      selected: true,
                      selectedColor: '#FF4D4D',
                    },
                    ...markedDates,
                  }}
                  onDayPress={handleDayPress}
                  theme={{
                    calendarBackground: '#1E1E1E',
                    dayTextColor: '#fff',
                    monthTextColor: '#fff',
                    textSectionTitleColor: '#aaa',
                    selectedDayTextColor: '#fff',
                  }}
                />
                <TouchableOpacity style={styles.doneBtn} onPress={() => setShow(false)}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldRow: { marginBottom: 12 },
  label: { color: '#aaa', fontSize: 14, marginBottom: 10 },
  valueBox: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#2C2C2C',
  },
  value: { color: '#fff', fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  doneBtn: {
    marginTop: 12,
    backgroundColor: '#FF4D4D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
