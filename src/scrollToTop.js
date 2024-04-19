import { createElement } from './utilis';

let button;
export default function scrollToTop() {
	button = createElement({
		type: 'button',
		id: 'scrollToTop',
		classes:
			'hidden fixed bottom-12 right-4 z-10 w-10 h-10 rounded-full text-primary bg-secondary outline-none focus:outline-none hover:bg-primary hover:text-secondary',
		content: `
    <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="currentColor">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -1089.000000)"
                    fill="currentColor">
                    <path
                        d="M384.535,1105.54 C384.145,1105.93 383.512,1105.93 383.121,1105.54 L379,1101.41 L379,1112 C379,1112.55 378.553,1113 378,1113 C377.447,1113 377,1112.55 377,1112 L377,1101.41 L372.879,1105.54 C372.488,1105.93 371.854,1105.93 371.465,1105.54 C371.074,1105.14 371.074,1104.51 371.465,1104.12 L377.121,1098.46 C377.361,1098.22 377.689,1098.15 378,1098.21 C378.311,1098.15 378.639,1098.22 378.879,1098.46 L384.535,1104.12 C384.926,1104.51 384.926,1105.14 384.535,1105.54 L384.535,1105.54 Z M378,1089 C369.163,1089 362,1096.16 362,1105 C362,1113.84 369.163,1121 378,1121 C386.837,1121 394,1113.84 394,1105 C394,1096.16 386.837,1089 378,1089 L378,1089 Z"
                        id="arrow-up-circle" sketch:type="MSShapeGroup"> </path>
                </g>
            </g>
        </g>
    </svg>
        `,
	});

	button.addEventListener('click', () => {
		SmoothScrollToTop(600);
	});

	return button;
}

window.addEventListener('scroll', () => {
	revealButton();
});

function revealButton() {
	if (window.scrollY > 300) {
		button.classList.remove('hidden', 'animate-fadeOut');
		button.classList.add('animate-fadeIn');
	} else {
		button.classList.add('animate-fadeOut', 'hidden');
		button.classList.remove('animate-fadeIn');
	}
}

function SmoothScrollToTop(duration) {
	const scrollHeight = window.scrollY;
	const scrollStep = Math.PI / (duration / 15);
	const cosParameter = scrollHeight / 2;

	let scrollCount = 0;
	let scrollMargin;
	let scrollInterval = setInterval(function () {
		if (window.scrollY != 0) {
			scrollCount = scrollCount + 1;
			scrollMargin =
				cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
			window.scrollTo(0, scrollHeight - scrollMargin);
		} else clearInterval(scrollInterval);
	}, 15);
}
