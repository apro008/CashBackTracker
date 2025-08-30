import { Alert, AlertButton } from 'react-native';

export type AlertConfig = {
  positiveText?: string;
  onPositiveClick?: () => void;
  middleText?: string;
  onMiddleClick?: () => void;
  negativeText?: string;
  onNegativeClick?: () => void;
  cancelable?: boolean;
};

export const alertBox = (
  alertTitle = '',
  alertMsg = '',
  config: AlertConfig = {
    positiveText: 'OK',
    cancelable: true,
  }
) => {
  let configuration: AlertButton[] = [];

  if (config?.positiveText) {
    configuration.push({
      text: config.positiveText,
      onPress: config.onPositiveClick,
    });
  }

  if (config?.middleText) {
    configuration.push({
      text: config.middleText,
      onPress: config.onMiddleClick,
    });
  }

  if (config?.negativeText) {
    configuration.push({
      text: config.negativeText,
      onPress: config.onNegativeClick,
      style: 'destructive',
    });
  }

  Alert.alert(alertTitle, alertMsg, configuration, {
    cancelable: config?.cancelable ?? true,
  });
};
