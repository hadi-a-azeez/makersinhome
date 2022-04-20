module.exports = {
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#21BF73",
        secondary: "#F9FCFB",
      },
      gridTemplateColumns: {
        authContainer: "3fr 3fr",
        dashboardContainer: "200px 1fr",
      },
    },
  },
  plugins: [],
};
