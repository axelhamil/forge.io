import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [addVariablesForColors],
  theme: {
    extend: {},
  },
};

function addVariablesForColors({ addBase, theme }): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  addBase({
    ":root": newVars,
  });
}
