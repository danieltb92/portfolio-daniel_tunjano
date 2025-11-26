module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        //   primary: {
        //     50: 'var(--primary-blue-50)',
        //     100: 'var(--primary-blue-100)',
        //     200: 'var(--primary-blue-200)',
        //     300: 'var(--primary-blue-300)',
        //     400: 'var(--primary-blue-400)',
        //     500: 'var(--primary-blue-500)',
        //     600: 'var(--primary-blue-600)',
        //     700: 'var(--primary-blue-700)',
        //     800: 'var(--primary-blue-800)',
        //     900: 'var(--primary-blue-900)',
        //     950: 'var(--primary-blue-950)',
        //   },
        //   secundary: {
        //     50: 'var(--secundary-slate-50)',
        //     100: 'var(--secundary-slate-100)',
        //     200: 'var(--secundary-slate-200)',
        //     300: 'var(--secundary-slate-300)',
        //     400: 'var(--secundary-slate-400)',
        //     500: 'var(--secundary-slate-500)',
        //     600: 'var(--secundary-slate-600)',
        //     700: 'var(--secundary-slate-700)',
        //     800: 'var(--secundary-slate-800)',
        //     900: 'var(--secundary-slate-900)',
        //     950: 'var(--secundary-slate-950)',
        //   },
        //   neutrals: {
        //     white: 'var(--neutrals-white)',
        //     100: 'var(--neutrals-100)',
        //     200: 'var(--neutrals-200)',
        //     300: 'var(--neutrals-300)',
        //     400: 'var(--neutrals-400)',
        //     500: 'var(--neutrals-500)',
        //     600: 'var(--neutrals-600)',
        //     700: 'var(--neutrals-700)',
        //     800: 'var(--neutrals-800)',
        //     900: 'var(--neutrals-900)',
        //     950: 'var(--neutrals-950)',
        //     black: 'var(--neutrals-black)',
        //   },
        //   acents: {
        //     mint: 'var(--acents-mint)',
        // },
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
      keyframes: {
        "slide-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-left": "slide-left 8s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
