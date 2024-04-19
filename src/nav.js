import { createElement } from './utilis.js';

export default function nav() {
	const header = createElement({
		type: 'header',
		classes: 'text-primary container mx-auto min-h-10',
		content: `
        <div class="container mx-auto flex flex-wrap p-5 items-center justify-between md:justify-normal">
            <div class="relative flex w-20 h-10">
                <a href="#">
                    <img src="" alt="Icon" class="w-20 absolute">
                </a>
            </div>
                <nav class="md:ml-auto hidden  md:flex flex-wrap items-center text-base justify-center">
                    <a href="#hme" class="mr-5 cursor-pointer noice hover:noice">Link 1</a>
                    <a href="#" class="mr-5 cursor-pointer noice hover:noice">Link 2</a>
                    <a href="#" class="mr-5 cursor-pointer noice hover:noice">Link 3</a>
                    <a href="#" class="mr-5 cursor-pointer noice hover:noice">Link 4</a>
                </nav>
                <div class="relative  flex flex-col md:hidden min-h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2"
                    id="hamburgher">
                    <div class="space-y-2">
                        <span id="line1"
                            class="block h-1 w-10 origin-center rounded-full bg-secondary transition-transform ease-in-out duration-200 "></span>
                        <span id="line2"
                            class="block h-1 w-8 origin-center rounded-full bg-primary transition-transform ease-in-out"></span>
                    </div>
                    <nav id="menu"
                        class="absolute top-20 hidden z-10 flex-col w-40 items-center transition-all ease-in-out animate-fadeIn duration-200">
                        <a href="#" class="mt-5 text-center cursor-pointer noice hover:noice ">Link 1</a>
                        <a href="#" class="mt-5 text-center cursor-pointer noice hover:noice ">Link 2</a>
                        <a href="#" class="mt-5 text-center cursor-pointer noice hover:noice ">Link 3</a>
                        <a href="#" class="mt-5 text-center cursor-pointer noice hover:noice ">Link 4</a>
                    </nav>
                </div>
                <a href="" targer='_blank' class="btn hidden md:inline-flex text-primary">
                    Button
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        class="w-4 h-4 ml-1 mb-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </a>
                <div id="toggle"
                    class="w-12 h-6 flex items-center group relative bg-gray-800 dark:bg-gray-300 rounded-full p-1 cursor-pointer transform duration-200 ease-in-expo hover:scale-105">
                    <div id="circle"
                        class="w-5 h-5 bg-gray-300 dark:bg-gray-800 rounded-full shadow-md shadow-black duration-500 translate-x-5  ease-in-expo">
                    </div>
                    <span
                        class="absolute text-xs bg-gray-700 text-gray-100 dark:bg-gray-100 dark:text-gray-700 p-1 min-w-20 text-center rounded-lg opacity-0  group-hover:opacity-100 -bottom-16 -left-1/3 transition-all duration-200 ease-in-expo"
                        x-show="showTooltip">
                        Toggle dark mode
                    </span>
                </div>
        </div>
        `,
	});

	const hamburgherMenu = header.querySelector('#hamburgher');

	hamburgherMenu.addEventListener('click', toggleMenu);

	function toggleMenu() {
		const line1 = document.getElementById('line1');
		const line2 = document.getElementById('line2');

		line1.classList.toggle('translate-y-1.5');
		line1.classList.toggle('rotate-45');
		line2.classList.toggle('w-10');
		line2.classList.toggle('w-8');
		line2.classList.toggle('-translate-y-1.5');
		line2.classList.toggle('-rotate-45');

		const menu = document.getElementById('menu');
		menu.classList.toggle('hidden');
		menu.classList.toggle('flex');
	}

	return header;
}

//  Import this file into index to make it work
