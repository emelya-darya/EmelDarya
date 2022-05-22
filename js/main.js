'use strict'

//!------------------------------------Появление заголовка-------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function (event) {
	const title = document.querySelector('.presentation__title');

	title.classList.add('_visible')
});

const arrayBulletsClass = ['icon-home', 'icon-astronaut', 'icon-folder', 'icon-whatsapp', 'icon-envelope', 'icon-arrow-up'];



//!--------------------------------------Главный свайпер------------------------------------------------

const pagesSwiper = new Swiper('.main-swiper', {
	// Optional parameters
	direction: 'vertical',

	// Свои классы (без точек)
	wrapperClass: 'main-swiper__pages',
	slideClass: 'main-swiper__page',

	// Количество слайдов для показа (для каждого слайда в css прописано flex: 1 0 100%;)
	slidesPerView: 'auto',

	//------Управление с помощью клавиатуры
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},

	// -------Управление колесом мыши
	mousewheel: {
		sensitivity: 1,

	},

	watchOverflow: true,

	speed: 800,

	// Включить обновление слайдера при изменении его элементов
	observer: true,
	observeParents: true,
	observeSlideChildren: true,


	//-------Пагинация
	pagination: {
		el: '.main-swiper__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: 'main-swiper__bullet',
		bulletActiveClass: 'main-swiper__bullet_active',

		renderBullet: function (index, className) {
			return `<div class="${className}"> <span class="${arrayBulletsClass[index]}"></span> </div>`
		},


	},

	//-----Скроллбар
	scrollbar: {
		el: '.main-swiper__scrollbar',
		dragClass: 'main-swiper__scrollbar-toddler',
		draggable: true,
	},

	ally: {
		enabled: true,
	},
});


// События при скролле свайпера
pagesSwiper.on('slideChange', function () {
	// Skills
	const skillsBlock = document.querySelector('.skills');

	if (document.querySelector('.swiper-slide-next') == skillsBlock && !document.querySelector('.skills.already-anim')) {

		skillsBlock.classList.add('already-anim');

		gsap.fromTo('.greeting__letter',
			{ y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: .3, stagger: .1, repeat: 0, }
		);

		setTimeout(() => {
			document.querySelector('.greeting__paragraph').classList.add('_visible')
		}, 1000);
	};

	// Works
	const worksBlock = document.querySelector('.works');

	if (document.querySelector('.swiper-slide-next') == worksBlock && !document.querySelector('.works.already-anim')) {

		worksBlock.classList.add('already-anim');

		gsap.timeline({ repeat: 0, })
			.fromTo('.works__letter',
				{ y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: .3, stagger: .05, repeat: 0, },
			)
			.fromTo('.works__link',
				{ opacity: 0 }, { opacity: 1, duration: 2, delay: .1, stagger: .05, repeat: 0, }, "-=1"
			)
	};

	// Contacts
	const contactsBlock = document.querySelector('.contacts');

	if (document.querySelector('.swiper-slide-next') == contactsBlock && !document.querySelector('.contacts.already-anim')) {

		contactsBlock.classList.add('already-anim');

		gsap.timeline({ repeat: 0, })
			.fromTo('.contacts__letter',
				{ y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: .3, stagger: .05, repeat: 0, },
			)

	};

	// email-form
	const emailBlock = document.querySelector('.form-email');

	if (document.querySelector('.swiper-slide-next') == emailBlock && !document.querySelector('.form-email.already-anim')) {

		emailBlock.classList.add('already-anim');

		gsap.timeline({ repeat: 0, })
			.fromTo('.form-email__letter',
				{ y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: .3, stagger: .05, repeat: 0, },
			)
	};

})


//Скролл к первому слайду
const scrollUp = document.querySelector('.scroll-up__arrow');

scrollUp.addEventListener('click', (event) => {
	pagesSwiper.slideTo(0, 1000, true);
})


//!-----------------------------------------------------------------Анимация космос на главной-----------------------------------------------
const canvasContainer = document.querySelector('.presentation');
const canvas = document.querySelector('.presentation__canvas');
const contextC = canvas.getContext('2d');
let wCan = canvas.width = canvasContainer.offsetWidth - 40;
let hCan = canvas.height = canvasContainer.offsetHeight - 30;

window.addEventListener('resize', () => {
	wCan = canvas.width = canvasContainer.offsetWidth - 40;
	hCan = canvas.height = canvasContainer.offsetHeight - 30;
});
// Массив с частицами
const particlesC = [];
//Объект с характеристиками частиц (скрость, размер и тп)
const propertiesC = {
	bgColor: 'rgba(0, 0, 0, 0)', // цвет фона
	particleColor: 'rgba(255, 40, 40, 1)', // цвет цастицы
	particleRadius: 3, //радиус частицы
	particleCount: 70, // количество частиц
	particleMaxSpeed: 0.5, // свойство, которое будет использоваться для генерации скорости
	lineLength: 150, // максимальная длина одной соединяющей линии
	particleLive: 25, // максимальная продолжительность жизни частицы 25 секунд
};

// Класс для экземпляров частиц
class ParticleC {
	constructor() {
		this.x = Math.random() * wCan;
		this.y = Math.random() * hCan;

		this.speedX = Math.random() * (propertiesC.particleMaxSpeed * 2) - propertiesC.particleMaxSpeed;
		this.speedY = Math.random() * (propertiesC.particleMaxSpeed * 2) - propertiesC.particleMaxSpeed;

		this.live = Math.random() * propertiesC.particleLive * 60;
	}

	// метод reDraw будет отрисовывать частицу
	reDraw() {
		contextC.beginPath();
		contextC.arc(this.x, this.y, propertiesC.particleRadius, 0, Math.PI * 2);
		contextC.closePath();
		contextC.fillStyle = propertiesC.particleColor;
		contextC.fill();
	}

	// Метод, обновляющий позицию
	position() {
		// 2 условия для того, чтобы точки не улетали за пределы блока с анимацией, а "отпружинивались"
		this.x + this.speedX > wCan && this.speedX > 0 || this.x + this.speedX < 0 && this.speedX < 0 ? this.speedX *= -1 : this.speedX;
		this.y + this.speedY > hCan && this.speedY > 0 || this.y + this.speedY < 0 && this.speedY < 0 ? this.speedY *= -1 : this.speedY;

		this.x += this.speedX;
		this.y += this.speedY;
	}

	// метод, отнимающий жизнь у частицы и создающий новую частицу
	recalculateLive() {
		if (this.live < 1) {
			// все свойства из конструктора
			this.x = Math.random() * wCan;
			this.y = Math.random() * hCan;
			this.speedX = Math.random() * (propertiesC.particleMaxSpeed * 2) - propertiesC.particleMaxSpeed;
			this.speedY = Math.random() * (propertiesC.particleMaxSpeed * 2) - propertiesC.particleMaxSpeed;
			this.live = Math.random() * propertiesC.particleLive * 60;
		};

		this.live--
	}
}

function redrawBgC() {
	//цвет заливки
	contextC.fillStyle = propertiesC.bgColor;
	//заливаем прямоугольник (нужно ли это в моем случае?)
	contextC.fillRect(0, 0, wCan, hCan)
};

//функция, соединяющая линии

function drawLines() {
	let x1, y1, x2, y2, length, opacity;

	for (let i in particlesC) {
		for (let j in particlesC) {
			x1 = particlesC[i].x;
			y1 = particlesC[i].y;
			x2 = particlesC[j].x;
			y2 = particlesC[j].y;
			// формула для расчета длины диагонали
			length = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

			// если точки достаточно близко, то нарисуем между ними линию
			if (length < propertiesC.lineLength) {
				opacity = 1 - length / propertiesC.lineLength;
				contextC.lineWidth = '0,5';
				contextC.strokeStyle = 'rgba(255,40,40,' + opacity + ')';
				contextC.beginPath();
				contextC.moveTo(x1, y1);
				contextC.lineTo(x2, y2);
				contextC.closePath();
				contextC.stroke();
			}
		}
	}
}

function redrawParticles() {
	particlesC.forEach(particle => {
		particle.recalculateLive();
		particle.position();
		particle.reDraw();

	})
}

function loopC() {
	contextC.clearRect(0, 0, wCan, hCan);
	redrawBgC()
	redrawParticles()
	drawLines()
	requestAnimationFrame(loopC)
};
// функция обновления canvas
function initC() {
	// наполним массив particles частицами с помощью цикла
	for (let i = 0; i < propertiesC.particleCount; i++) {
		particlesC.push(new ParticleC)
	}
	// она запускает рекурсивную функцию
	loopC()
}

initC();


//!---------------------------------------------Облако тегов-----------------------------------------------------------
let cloudTag = document.querySelector('#SkillsCanvas');

if (innerWidth > 992) {
	cloudTag.width = cloudTag.height = 600;
}

if (innerWidth <= 992) {
	cloudTag.width = cloudTag.height = 300;
}



TagCanvas.Start('SkillsCanvas', 'tags', {
	textColour: '#FF2828',
	textHeight: 19,
	textFont: 'Comic Sans MS, Arial, sans-serif',
	shadow: '#FF2828',
	outlineMethod: 'none',
	wheelZoom: false,
});

//! ----------------------------------------------------------------Валидация и отправка формы----------------------------------------------------------

const thanksWindow = document.querySelector('.thanks-window');
const formMail = new JustValidate('.form-email__form', {
	errorFieldCssClass: 'is-invalid',
});

formMail
	// Класс поля
	.addField('.form-email__name', [
		{ rule: 'required', value: true, errorMessage: 'Insert your name' },
	])

	.addField('.form-email__email', [
		{ rule: 'required', value: true, errorMessage: 'Insert email address' },
		{ rule: 'email', value: true, errorMessage: 'Еnter a valid address' },
	])

	.addField('.form-email__message', [
		{ rule: 'required', value: true, errorMessage: 'Empty field' },
		{ rule: 'minLength', value: 5, errorMessage: 'Too short message(' },
	])

	.onSuccess((event) => {
		console.log('Validation passes and form submitted', event);

		let formData = new FormData(event.target);

		console.log(...formData);

		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					thanksWindow.classList.add('_visible');

					setTimeout(() => { thanksWindow.classList.remove('_visible')}, 15000)
				}
			}
		}

		xhr.open('POST', 'php/sendmail.php', true);
		xhr.send(formData);

		event.target.reset();
	});





const closeThanksWindow = document.querySelector('.thanks-window-close');

closeThanksWindow.addEventListener('click', () => {
	thanksWindow.classList.remove('_visible');
})














