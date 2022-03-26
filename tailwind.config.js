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
        electric: "#db00ff",
        ribbon: "#0047ff",
        primary: "#08bd80",
      },
      gridTemplateColumns: {
        authContainer: "3fr 3fr",
        dashboardContainer: "200px 1fr",
      },
    },
  },
  plugins: [],
};
