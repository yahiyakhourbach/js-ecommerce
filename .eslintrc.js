module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
  },

  rules: {
    'no-console': 0,
    'linebreak-style': 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'no-nested-ternary': 0,
    'import/prefer-default-export':0,
    'prefer-const':0,
     'no-undef': 0,
     'no-unused-expressions':0,
     'no-use-before-define':0,
     'no-underscore-dangle':0

  }
};
