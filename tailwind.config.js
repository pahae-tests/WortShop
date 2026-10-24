module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './data/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        blinkColor: {
          '0%': { color: '#ffff00', opacity: '1' },
          '25%': { color: '#ff00ff', opacity: '0' },
          '50%': { color: '#00ffff', opacity: '1' },
          '75%': { color: '#ff0000', opacity: '0.2' },
          '100%': { color: '#00ff00', opacity: '1' }
        },
        hueSpin: {
          from: { filter: 'hue-rotate(0deg)' },
          to: { filter: 'hue-rotate(360deg)' }
        },
        bgRgb: {
          '0%': { backgroundColor: '#ff00aa' },
          '20%': { backgroundColor: '#00ffee' },
          '40%': { backgroundColor: '#ffee00' },
          '60%': { backgroundColor: '#7a00ff' },
          '80%': { backgroundColor: '#00ff40' },
          '100%': { backgroundColor: '#ff00aa' }
        },
        textRgb: {
          '0%': { color: '#ff0000' },
          '33%': { color: '#00ff00' },
          '66%': { color: '#0000ff' },
          '100%': { color: '#ff0000' }
        },
        borderRgb: {
          '0%': { borderColor: '#ff0080' },
          '25%': { borderColor: '#00ffff' },
          '50%': { borderColor: '#ffff00' },
          '75%': { borderColor: '#9d00ff' },
          '100%': { borderColor: '#ff0080' }
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '40%': { opacity: '0.4' },
          '45%': { opacity: '1' },
          '80%': { opacity: '0.6' },
          '85%': { opacity: '1' }
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-14px) rotate(-2deg)' },
          '40%': { transform: 'translateX(14px) rotate(2deg)' },
          '60%': { transform: 'translateX(-10px)' },
          '80%': { transform: 'translateX(10px)' }
        }
      },
      animation: {
        blinkColor: 'blinkColor 1.1s steps(1) infinite',
        textRgb: 'textRgb 0.9s linear infinite',
        borderRgb: 'borderRgb 0.8s linear infinite',
        rgbCard: 'borderRgb 0.8s linear infinite, flicker 2.2s steps(2) infinite',
        rgbOverdose: 'hueSpin 5s linear infinite, bgRgb 3s steps(1) infinite',
        wobble: 'wobble 0.25s ease-in-out infinite',
        marquee: 'marquee 12s linear infinite',
        shake: 'shake 0.5s ease-in-out 1'
      }
    }
  },
  plugins: []
};
