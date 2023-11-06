import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            boxShadow: {
                'outline': '0 0 0 2px border-cyan-600',
            }
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
            },
        },
        animation: {
            'fade-in': 'fadeIn 0.3s ease-in',
        },
    },
    plugins: [],
}
export default config
