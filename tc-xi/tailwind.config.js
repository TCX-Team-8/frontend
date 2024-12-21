/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        PrimaryBlue: "#03045e",
        SecondaryBlue: "#0077b6",
        ThirdBlue: "#caf0f8",
        FourthBlue:'#00b4d8',
        FifthBlue: '#90e0ef',
        Orange: "#D78336",
        bgWhite: "#fdfdfe",
        bgGray: "#",
      },
      boxShadow: {
        card: "6px 10px 33px -19px rgba(0, 0, 0, 0.42)",
        errorBtn: "6px 10px 0px 0px #165dee",
      },
    },
  },
  plugins: [],
}

