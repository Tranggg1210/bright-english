import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ff8400",
                danger: "#dc3545",
                secondarys: "#3F4254",
                tertiary: "#fff3e0",
            },
        },
    },
    plugins: [],
}

export default config
