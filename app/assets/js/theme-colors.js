const html = document.querySelector("html");
const themes = {
  light: {
    background: '#FDFDFD',
    background_alt: 'rgba(218, 214, 214, 0.3)',
    text: '#25262a',
  },
  dark: {
    background: '#25262a',
    background_alt: 'rgba(218, 214, 214, 0.1)',
    text: '#FFFFFF',
  }
};

// Tenta buscar a opção de tema do usuário
try {
  window.__theme = localStorage.getItem('theme');
} catch (err) { }

/**
 * Seta o tema preferido do usuário
 */
 function setPreferredTheme(newTheme) {
  const themeColors = themes[newTheme];

  // Altera as variáveis do thema
  html.style.setProperty(`--background`, themeColors['background']);
  html.style.setProperty(`--background_alt`, themeColors['background_alt']);
  html.style.setProperty(`--text`, themeColors['text']);

  window.__theme = newTheme;
  try {
    localStorage.setItem('theme', newTheme);
  } catch (err) {}
}

setPreferredTheme(window.__theme || (isPreferredThemeDark.matches ? 'dark' : 'light'));
