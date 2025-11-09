const { heroui } = require("@heroui/react");

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}',
  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
],
  
  theme: {
    extend: {
      zIndex: {
       '-10': '-10',
       '-20': '-10'
      },
      width:{
        '1/10':'10%',
        '2/10':'20%',
        '3/10':'30%',
        '4/10':'40%',
        '5/10':'50%',
        '6/10':'60%',
        '7/10':'70%',
        '8/10':'80%',
        '9/10':'90%'
      },
      height:{
        '1/10':'10%',
        '2/10':'20%',
        '3/10':'30%',
        '4/10':'40%',
        '5/10':'50%',
        '6/10':'60%',
        '7/10':'70%',
        '8/10':'80%',
        '9/10':'90%',
      },
      minHeight:{        
        "form":"40rem"
      },
      flex:{
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
      }

    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: "#ffffff",
            secondary: "#000000",
            link: "#5E1DAD",
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
    require('@tailwindcss/aspect-ratio'),
  ],

}
