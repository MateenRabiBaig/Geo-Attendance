export const getThemeColors = (theme: 'light' | 'dark') => {
  if (theme === 'dark') {
    return {
      // Background colors - softer dark colors
      bgPrimary: '#1a1a1a',
      bgSecondary: '#242424',
      bgTertiary: '#2e2e2e',
      bgCard: '#242424',

      // Text colors
      textPrimary: '#ffffff',
      textSecondary: '#b0b0b0',
      textTertiary: '#909090',

      // Border colors - more visible borders
      borderPrimary: '#404040',
      borderSecondary: '#353535',

      // Accent colors
      accent: '#ffffff',
      accentText: '#1a1a1a',

      // Status colors
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',

      // Component specific
      inputBg: '#2e2e2e',
      inputBorder: '#404040',
      tableHover: '#2e2e2e',
    };
  } else {
    return {
      // Background colors
      bgPrimary: '#ffffff',
      bgSecondary: '#f5f5f5',
      bgTertiary: '#e8e8e8',
      bgCard: '#ffffff',

      // Text colors
      textPrimary: '#000000',
      textSecondary: '#666666',
      textTertiary: '#999999',

      // Border colors
      borderPrimary: '#000000',
      borderSecondary: '#e0e0e0',

      // Accent colors
      accent: '#000000',
      accentText: '#ffffff',

      // Status colors
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',

      // Component specific
      inputBg: '#ffffff',
      inputBorder: '#e0e0e0',
      tableHover: '#f5f5f5',
    };
  }
};
