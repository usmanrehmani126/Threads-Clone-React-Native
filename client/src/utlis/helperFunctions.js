import FlashMessage, {showMessage} from 'react-native-flash-message';
export const showError = message => {
    showMessage({
      type: 'danger',
      icon: 'danger',
      message,
      duration: 2500,
    });
  };
  
  export const showSucess = message => {
    showMessage({
      type: 'success',
      icon: 'success',
      message,
      duration: 2500,
    });
  };
  