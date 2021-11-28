module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/script-setup-uses-vars':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-backreference':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-backreferencer':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unsafe-optional-chaining':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-nonoctal-decimal-escape':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-loss-of-precision':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-default-export': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
