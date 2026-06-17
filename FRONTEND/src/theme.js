import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4F46E5', // Indigo 600
      light: '#818CF8', // Indigo 400
      dark: '#3730A3', // Indigo 800
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3B82F6', // Blue 500
      light: '#60A5FA', // Blue 400
      dark: '#2563EB', // Blue 600
      contrastText: '#ffffff',
    },
    background: {
      default: '#030712', // Very dark slate (near black) for deep space look
      paper: 'rgba(17, 24, 39, 0.7)', // Slate 900 with transparency for glass effect
    },
    text: {
      primary: '#F9FAFB', // Gray 50
      secondary: '#9CA3AF', // Gray 400
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.04em' },
    h2: { fontWeight: 800, letterSpacing: '-0.03em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#030712', // Solid flat dark background
        },
        '*::-webkit-scrollbar': {
          display: 'none',
        },
        '*': {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          padding: '8px 20px',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#3B82F6', // Solid blue
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#2563EB', // Solid darker blue on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#111827', // Solid flat card color
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
          borderRadius: 12,
          transition: 'border-color 0.2s',
          '&:hover': {
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#030712',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#030712',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
