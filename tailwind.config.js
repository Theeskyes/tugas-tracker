/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0c0d10',
        surface: '#15171c',
        surface2: '#1c1f26',
        border: '#26292f',
        borderStrong: '#34373e',
        textMain: '#e9eaec',
        textSecondary: '#9a9da4',
        textMuted: '#6b6e75',
        sekolah: '#7f9cf5',
        sekolahBg: '#1a2236',
        freelance: '#3ddc97',
        freelanceBg: '#15291f',
        pribadi: '#f5a87f',
        pribadiBg: '#2a1f17',
        danger: '#f0656b',
      },
    },
  },
  plugins: [],
}
