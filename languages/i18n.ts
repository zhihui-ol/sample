import { I18n } from 'i18n-js';
import en from './en';
import cn from './zh';
import hant from './zh-hant';

export const i18n = new I18n({
  en: en,
  zh: cn,
  'zh-hans': hant,
});