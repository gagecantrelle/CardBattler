/** @type {import{`tailwindcss`}.config}*/
module.exports = {
  content: ['./Client/**/*.{html,js,ts,tsx}'], 
  theme: {
    extend: {
      fontFamily: {
        bubblegum: ['"Bubblegum Sans"', 'cursive'],
      },
    },
  },
};