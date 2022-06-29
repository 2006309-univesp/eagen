import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Translate
import {t} from '../../i18n';

import {UserContext} from '../../contexts/UserContext';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

import SignInput from '../../components/SignInput';

import Api from '../../Api';

import EagenLogo from '../../assets/real-logo.svg';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = async () => {
    if (nameField != '' && emailField != '' && passwordField != '') {
      let res = await Api.signUp(nameField, emailField, passwordField);

      if (res.token) {
        await AsyncStorage.setItem('token', res.token);

        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: res.data.avatar,
          },
        });

        navigation.reset({
          routes: [{name: 'MainTab'}],
        });
      } else {
        alert('Erro: ' + res.error);
      }
    } else {
      alert(t('fill_fields'));
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <EagenLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder={t('type_name')}
          value={nameField}
          onChangeText={t => setNameField(t)}
        />

        <SignInput
          IconSvg={EmailIcon}
          placeholder={t('type_email')}
          value={emailField}
          onChangeText={t => setEmailField(t)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeholder={t('type_password')}
          value={passwordField}
          onChangeText={t => setPasswordField(t)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>{t('sign_up')}</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>{t('already_account')}</SignMessageButtonText>
        <SignMessageButtonTextBold>{t('log_in')}</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
