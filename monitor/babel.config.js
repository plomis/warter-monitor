module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [ 'import', { libraryName: '@ant-design/react-native' }],
    [ 'inline-import', { extensions: [ '.jst', '.tpl', '.svg' ]}]
  ]
};
