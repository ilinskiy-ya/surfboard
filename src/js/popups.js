const popupLinks = document.querySelectorAll('.popup-link'); //получаем все переменные с классом попаплинк
const body = document.querySelector('body'); //блокирует скрол внутри боди
const lockPadding = document.querySelectorAll(".lock-padding"); //получает все объекты с классом лок паддинг

let unlock = true; //чтобы не было двойных нажатий

const timeout = 800; //вылезает из св-ва transition в css св-ва должны быть равны

if (popupLinks.length > 0) { //проверка существования запрашиваемых ссылок
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) { //при нахождении на событие вешается ссылка
			const popupName = popupLink.getAttribute('href').replace('#', ''); //с href убирается хэш (зачем?)
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault(); //зпрещает перезагружать страницу по ссылке
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup'); //закрывает popup
if (popupCloseIcon.length > 0) { //поиск объектов popupCloseIcon
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {  //вешается событие click
			popupClose(el.closest('.popup')); //вешается объект с ближайшим родителем и классом popup
			e.preventDefault(); //зпрещает перезагружать страницу по ссылке
		});
	}
}

function popupOpen(curentPopup) { //передаётся готовый объект по id
	if (curentPopup && unlock) { //приверка есть-ли такой объект и запрещает двойное нажатие
		const popupActive = document.querySelector('.popup.open'); //ищем обьект popup с классом open
		if (popupActive) {
			popupClose(popupActive, false); //если он сущетсвует, то мы закрываем его
		} else {
			bodyLock(); //блокируе скрол в body
		}
		curentPopup.classList.add('open'); //к popup добавляется класс open
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) { //если у родителя нет класса popup__content тогда poup закрывается
				popupClose(e.target.closest('.popup')); //если нажать на тёмную область вне контента, то ссылка закрооется
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {  //убирает скролл слева и контент не скачет как бешенный
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) { //ставит проверку, есть-ли такие объекты
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
