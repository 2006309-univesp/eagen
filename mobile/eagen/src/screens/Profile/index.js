import React from 'react';
import {Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Translate
import {t} from '../../i18n';

import {Container} from './styles';

import Api from '../../Api';

export default () => {
  const navigation = useNavigation();

  const handleLogoutClick = async () => {
    await Api.logout();
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <Text>{t('profile')}</Text>
      <Button title={t('leave')} onPress={handleLogoutClick} />
    </Container>
  );
};
