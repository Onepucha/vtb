// Add script to head
function addScript(src) {
	var script = document.createElement('script');
	script.src = src;
	script.async = false; // чтобы гарантировать порядок
	document.head.appendChild(script);
}

addScript('./user/js_libs/vue.min.js');
addScript('./user/js_libs/sortable.js');
addScript('./user/js_libs/slick.min.js');
addScript('./user/js_libs/main.js');

// InitModule
function InitModule() {}

// ShutdownModule
function ShutdownModule() {}


/* Обработчики событий на клик, а также инициализация функций находятся в файле main.js
Путь к файлу папка user/js_libs и там файл main.js */