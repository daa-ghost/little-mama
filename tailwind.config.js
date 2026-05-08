/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Little Mamma Brand Palette ──────────────────────────────────
        red:        "#E53935",   // Primary Brand Red — CTAs, hovers, highlights
        "deep-red": "#C62828",   // Deep Premium Red — hover states, accents
        cream:      "#FAF7F2",   // Soft Cream White — page backgrounds
        white:      "#FFFFFF",   // Pure White — cards, panels
        beige:      "#EFE7DC",   // Warm Light Beige — subtle bg, borders
        charcoal:   "#2A2A2A",   // Soft Charcoal — main typography
        dark:       "#1A1A1A",   // Deepest dark — premium overlays
        warm:       "#E0957A",   // Warm terracotta — minimal decorative use
        muted:      "#6B6560",   // Warm gray — secondary text
        gold:       "#C7A46C",   // Muted Gold — ornaments, eyebrow labels
        // ────────────────────────────────────────────────────────────────
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      fontFamily: {
        script: ["'Great Vibes'", "cursive"],
        brand:  ["'Italiana'", "serif"],
        display: ["'Playfair Display'", "serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fadeIn": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fadeInUp": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fadeInScale": {
          from: { opacity: "0", transform: "scale(0.95) translateY(12px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "slideDown": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        "lineGrow": {
          from: { transform: "scaleX(0)", opacity: "0" },
          to: { transform: "scaleX(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fadeIn": "fadeIn 0.9s cubic-bezier(0.22,1,0.36,1) both",
        "fadeInUp": "fadeInUp 1s cubic-bezier(0.22,1,0.36,1) both",
        "fadeInScale": "fadeInScale 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "slideDown": "slideDown 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "float": "float 7s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "lineGrow": "lineGrow 1s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}