import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

type Props = {
  date: Date;
  onChange: (d: Date) => void;
};

export default function TimePickerField({ date, onChange }: Props) {
  const [show, setShow] = useState(false);

  const handleTimeChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (selectedDate) {
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        selectedDate.getHours(),
        selectedDate.getMinutes()
      );
      onChange(newDate);
    }
  };

  return (
    <View style={styles.fieldRow}>
      <Text style={styles.label}>Time</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.valueBox}>
        <Text style={styles.value}>{moment(date).format('hh:mm A')}</Text>
      </TouchableOpacity>

      {show && (
        <TouchableWithoutFeedback onPress={() => setShow(false)}>
          <DateTimePicker value={date} mode="time" display="default" onChange={handleTimeChange} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldRow: { marginBottom: 6 },
  label: { color: '#aaa', fontSize: 14, marginBottom: 10 },
  valueBox: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#2C2C2C',
  },
  value: { color: '#fff', fontSize: 16 },
});
