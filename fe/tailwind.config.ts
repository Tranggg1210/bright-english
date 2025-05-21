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
                selfPrimary: "#FF8944",
                danger: "#dc3545",
                secondarys: "#3F4254",
                tertiary: "#fff3e0",
                softOrange: '#FFE5B4',
                superSoftOrange: '#FFF2E0',
                peachPuff: '#FFDAB9',
                apricot: '#FBCEB1',
                lightOrange: '#FFEDD5',
                linen: '#FAE5D3',
                mellowApricot: '#F8CFA9',
            },
        },
    },
    plugins: [],
}

export default config
