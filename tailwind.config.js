import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "on-tertiary-fixed-variant": "#723600",
                "surface-bright": "#f9f9ff",
                "on-primary-fixed-variant": "#004395",
                "surface-container-lowest": "#ffffff",
                "on-secondary-fixed-variant": "#723600",
                "inverse-primary": "#adc6ff",
                "primary": "#3B82F6",
                "secondary-fixed": "#ffdcc6",
                "inverse-surface": "#2a313d",
                "tertiary-fixed-dim": "#ffb786",
                "on-surface-variant": "#6B7280",
                "outline-variant": "#D1D5DB",
                "primary-fixed-dim": "#adc6ff",
                "inverse-on-surface": "#ebf1ff",
                "tertiary": "#D16900",
                "secondary": "#D16900",
                "surface-variant": "#EBF5FF",
                "error-container": "#fee2e2",
                "on-background": "#1F2937",
                "surface-container-low": "#F3F4F6",
                "on-secondary-container": "#642f00",
                "on-error": "#ffffff",
                "tertiary-fixed": "#ffdcc6",
                "background": "#F9FAFB",
                "on-primary-fixed": "#001a42",
                "error": "#ef4444",
                "surface-container-highest": "#E5E7EB",
                "on-error-container": "#991b1b",
                "on-tertiary-container": "#fffbff",
                "primary-container": "#3B82F6",
                "on-tertiary-fixed": "#311400",
                "on-surface": "#1F2937",
                "surface-container-high": "#F3F4F6",
                "primary-fixed": "#DBEAFE",
                "tertiary-container": "#D16900",
                "on-secondary": "#ffffff",
                "surface-tint": "#3B82F6",
                "on-primary-container": "#ffffff",
                "outline": "#6B7280",
                "on-secondary-fixed": "#311400",
                "secondary-container": "#D16900",
                "on-tertiary": "#ffffff",
                "on-primary": "#ffffff",
                "surface-dim": "#F3F4F6",
                "surface-container": "#F3F4F6",
                "secondary-fixed-dim": "#ffb786",
                "surface": "#F9FAFB"
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            spacing: {
                "margin-mobile": "16px",
                "container-max": "1280px",
                "stack-unit": "8px",
                "gutter": "24px",
                "margin-desktop": "40px"
            },
            fontFamily: {
                sans: ['Geist', ...defaultTheme.fontFamily.sans],
                "body-lg": ["Geist"],
                "label-md": ["Geist"],
                "headline-xl": ["Geist"],
                "headline-md": ["Geist"],
                "headline-lg-mobile": ["Geist"],
                "headline-lg": ["Geist"],
                "body-md": ["Geist"],
                "label-sm": ["Geist"]
            },
            fontSize: {
                "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                "headline-xl": ["40px", {"lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "600"}]
            }
        },
    },

    plugins: [forms],
};
