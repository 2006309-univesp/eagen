import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './style';
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import EagenLogo from '../../assets/real-logo.svg';


export default () => {

  const navigation = useNavigation();

useEffect(()=>{
const checkToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if(token) {
    //validar o token
     }else {
       navigation.navigate('SignIn');
}
}
checkToken();
}, []);

  return (
    
      <Container>
        <EagenLogo width="100%" height="160" />
        <LoadingIcon size="large" color="#FFFFFF" />
      </Container>
    
  );
}
