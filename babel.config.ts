module.exports = {
    presets: [
      // Add other presets if needed
      '@babel/preset-typescript',
      ['@babel/preset-env', {targets: {node: 'current'}}]
    ],
    plugins: [
      // Add other plugins if needed
      '@babel/plugin-syntax-jsx'
    ]
  };
  