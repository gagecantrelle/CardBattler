/** @type {import{`tailwindcss`}.config}*/
module.exports = {
  content: ['./Client/**/*.{html,js,ts,tsx}'], 
  theme: {
    extend: {
      fontFamily: {
        bubblegum: ['"Bubblegum Sans"', 'cursive'],
        Caveat: ['"Caveat"', 'cursive']
      },
      colors:{
        softblue: '#B9D6F2'
      },
    },
  },
};