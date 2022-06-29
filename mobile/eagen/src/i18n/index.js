import {Platform, NativeModules} from 'react-native';
import I18n from 'i18n-js';
import en from './translations/en-US'; // importa o objeto de traduções para o idioma inglês
import pt from './translations/pt-BR'; // importa o objeto de traduções para o idioma português

// Função que irá nos auxiliar a normalizar as traduções que serão recebidas pela função getLanguageByDevice
// Isso é necessário pois no android e no iOS o retorno do mesmo idioma pode ser diferente
// Exemplo: no iOS podemos receber pt_US e no android pt_BR para o idioma português Brasil.
const normalizeTranslate = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  pt_US: 'pt_BR',
};

// Função responsável por verificar o idioma utilizado no device
const getLanguageByDevice = () => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale // Verifique o idioma no device iOS
    : NativeModules.I18nManager.localeIdentifier; // Verifique o idioma no device Android
};

// Setar os idiomas que o I18N irá dar suporte
I18n.translations = {
  en_US: en,
  pt_BR: pt,
};

// Função responsável por verificar se o idioma atual do divice está sendo
// suportado, caso não ele irá setar como padrão 'pt_BR'
const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage =
    I18n.translations.hasOwnProperty(translateNormalize);
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'pt_BR');
};

setLanguageToI18n();

export const t = key => I18n.t(key);
