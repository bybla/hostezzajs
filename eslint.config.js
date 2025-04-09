import { configs } from '@eslint/js';

export default [
  configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
    },
    plugins: ['jsdoc'],  // Добавляем плагин jsdoc
    rules: {
      'jsdoc/check-alignment': 'warn',  // Проверка выравнивания комментариев
      'jsdoc/check-param-names': 'warn',  // Проверка правильности имен параметров
      'jsdoc/check-types': 'warn',  // Проверка типов
      'jsdoc/require-jsdoc': 'off',  // Не требуем обязательного наличия JSDoc
      // Добавьте другие правила по желанию
    },
  },
];
