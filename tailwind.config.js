/** @type {import('tailwindcss').Config} */

module.exports = {
	mode: 'jit',
	content: [
		'./dist/*.html',
		'./src/*.js',
		{
			safelist: [
				'w-64',
				'w-1/2',
				'rounded-l-lg',
				'rounded-r-lg',
				'bg-gray-200',
				'grid-cols-4',
				'grid-cols-7',
				'h-6',
				'leading-6',
				'h-9',
				'leading-9',
				'shadow-lg',
			],
		},
	],
	darkMode: 'class',

	theme: {
		extend: {
			gridTemplateRows: {
				autoFill: 'repeat(auto-fill, minmax(200px, 1fr))',
			},
			gridTemplateColumns: {
				autoFill: 'repeat(auto-fill, minmax(200px, 1fr))',
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
			},
			animation: {
				fadeOut: 'fadeOut 0.5s ease-in-out',
				fadeIn: 'fadeIn 0.5s ease-in-out',
				'pulsate-fwd': 'pulsate-fwd 3s ease-in-out infinite both',
				flicker: 'flicker-1 2s linear 3 both',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
				'pulsate-fwd': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' },
				},
				'flicker-1': {
					'0%': { opacity: 1 },
					'41.99%': { opacity: 1 },
					'42%': { opacity: 0 },
					'43%': { opacity: 0 },
					'43.01%': { opacity: 1 },
					'47.99%': { opacity: 1 },
					'48%': { opacity: 0 },
					'49%': { opacity: 0 },
					'49.01%': { opacity: 1 },
					'100%': { opacity: 1 },
				},
			},
			colors: {
				dark: '#171717',
				primary: '#EBBE7D',
				primaryHover: '#c7a27d',
				secondary: '#4F4F4F',
				secondaryHover: '#464545',
			},
			fontFamily: {
				josefin: 'Josefin Sans, sans-serif',
				nunito: 'Nunito, sans-serif',
				montserrat: 'Montserrat, sans-serif',
			},
			boxShadow: {
				button: '0 0 64px -10px rgba(0,0,0,0.7)',
			},
			variants: {
				extend: {
					opacity: ['hover', 'focus'],
				},
			},
		},
	},
	content: ['./dist/**/*.html', './src/**/*.js'],
	plugins: [
		//! Plugin to add text-shadow class with the existing colors
		function ({ addUtilities, theme, variants }) {
			const colors = theme('colors');
			const textShadowColors = Object.keys(colors).reduce((acc, key) => {
				if (typeof colors[key] === 'string') {
					return {
						...acc,
						[`.text-shadow-${key}`]: {
							textShadow: `0 2px 5px ${colors[key]}`,
						},
					};
				}

				const shades = Object.keys(colors[key]);
				const colorShades = shades.reduce((acc, shade) => {
					return {
						...acc,
						[`.text-shadow-${key}-${shade}`]: {
							textShadow: `0 2px 5px ${colors[key][shade]}`,
						},
					};
				}, {});

				return { ...acc, ...colorShades };
			}, {});

			addUtilities(textShadowColors, variants('textShadow'));
		},
	],
};
