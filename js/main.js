window.addEventListener('DOMContentLoaded', () => {
	headerDropdownSearch();
	headerDropdownMobileNav();
	popups();
	dropdowns();
	singleRangeInput();
	doubleRangeInput();
	readmore();
	tabs();
	playIcon();
	sectionCollectionsCarousel();
	sectionOffersCarousel();
	sectionBanksCarousel();
	sectionRatingsCarousel();
	sectionBlogCarousel();
});

function headerDropdownSearch() {
	const searchButtons = document.querySelectorAll('.search-button');
	const searchInput = document.querySelector('#search-input');

	searchButtons.forEach((searchButton) => {
		searchButton.addEventListener('click', (event) => {
			event.stopPropagation();
			displayDropdown();
			searchInput.focus();
		});
	});

	function displayDropdown() {
		const dropdown = document.querySelector('.header-dropdown-search');
		dropdown.classList.toggle('header-dropdown-search--visible');

		dropdown.addEventListener('click', (event) => {
			event.stopPropagation();
		});

		document.addEventListener('click', (event) => {
			if (event.target !== searchButton) {
				dropdown.classList.remove('header-dropdown-search--visible');
			}
		})

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				dropdown.classList.remove('header-dropdown-search--visible');
			};
		});
	};
};

function headerDropdownMobileNav() {
	const navIcon = document.querySelector('.nav-icon');

	navIcon.addEventListener('click', (event) => {
		event.stopPropagation();
		navIcon.classList.toggle('active');
		displayDropdown();
	});

	function displayDropdown() {
		const dropdown = document.querySelector('.header-dropdown-mobile-nav');
		dropdown.classList.toggle('header-dropdown-mobile-nav--visible');

		dropdown.addEventListener('click', (event) => {
			event.stopPropagation();
		});

		document.addEventListener('click', (event) => {
			if (event.target !== navIcon) {
				dropdown.classList.remove('header-dropdown-mobile-nav--visible');
				navIcon.classList.remove('active');
			}
		})

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				dropdown.classList.remove('header-dropdown-mobile-nav--visible');
				navIcon.classList.remove('active');
			};
		});
	};
};

function popups() {

	document.querySelector('.callback-button').addEventListener('click', () => {
		const popupTitle = 'Обратный звонок';
		const popupFormBtnText = 'Перезвоните мне';
		const popupFormNotice = 'Нажимая кнопку “Получить предложение” Вы даете согласие на обработку своих персональных данных';
		showPopup(popupTitle, popupFormBtnText, popupFormNotice);
	});

	function showPopup(title, btnText, noticeText) {
		const overlay = document.querySelector('.order-popup-overlay');
		const popup = document.querySelector('.order-popup');
		const closeIcon = popup.querySelector('.order-popup__close-icon');
		const formTitle = popup.querySelector('.order-popup-form__title .popup-title');
		const formBtn = popup.querySelector('.order-popup-form__button');
		const formNotice = popup.querySelector('.order-popup-form__notice');

		document.body.classList.add('overflow-hidden');
		overlay.classList.remove('none');
		formTitle.innerText = title;
		formBtn.innerText = btnText;
		formNotice.innerText = noticeText;

		popup.addEventListener('mousedown', (event) => {
			event.stopPropagation();
		});

		document.addEventListener('mousedown', () => {
			overlay.classList.add('none');
			document.body.classList.remove('overflow-hidden');
		});

		closeIcon.addEventListener('click', () => {
			overlay.classList.add('none');
			document.body.classList.remove('overflow-hidden');
		});

		formBtn.addEventListener('click', () => {
			overlay.classList.add('none');
			document.body.classList.remove('overflow-hidden');
		});
	};
};

function dropdowns() {
	document.querySelectorAll('.dropdown').forEach(function (dropdown) {
		const dropdownButton = dropdown.querySelector('.dropdown__button');
		const dropdownList = dropdown.querySelector('.dropdown__list');
		const dropdownListItems = dropdown.querySelectorAll('.dropdown__list li');
		const dropdownInputHidden = dropdown.querySelector('.dropdown__input-hidden');

		dropdownButton.addEventListener('click', (event) => {
			event.preventDefault();
			dropdownList.classList.toggle('dropdown__list--visible');
			dropdownButton.classList.toggle('dropdownButton--active');
		});

		dropdownListItems.forEach((item) => {
			item.addEventListener('click', (event) => {
				dropdownButton.innerText = item.innerText;
				dropdownInputHidden.value = item.dataset.value;
				dropdownList.classList.remove('dropdown__list--visible');
				dropdownButton.classList.remove('dropdownButton--active');
				dropdownButton.focus();
				event.stopPropagation();
			});
		});

		document.addEventListener('click', (event) => {
			if (event.target !== dropdownButton) {
				dropdownList.classList.remove('dropdown__list--visible');
				dropdownButton.classList.remove('dropdownButton--active');
			};
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Tab' || event.key === 'Escape') {
				dropdownList.classList.remove('dropdown__list--visible');
				dropdownButton.classList.remove('dropdownButton--active');
				dropdownButton.blur();
			};
		});
	});
};

function singleRangeInput() {
	document.querySelectorAll('.single-range-input').forEach((input) => {
		const range = input.querySelector('[data-name="range"]');
		const track = input.querySelector('[data-name="track"]');
		const value = input.querySelector('[data-name="value"]');

		range.addEventListener('input', () => {
			value.textContent = range.value;
			const percent = (range.value - range.min) / (range.max - range.min) * 100;
			track.style.background = `linear-gradient(to right, #CA0100 ${percent}%, #E1E1E1 ${percent}%)`;
		});
	})
};

function doubleRangeInput() {
	const input = document.querySelector('.double-range-input');
	const rangeOne = input.querySelector('[data-name="range-1"]');
	const rangeTwo = input.querySelector('[data-name="range-2"]');
	const valueOne = input.querySelector('[data-name="value-1"]');
	const valueTwo = input.querySelector('[data-name="value-2"]');
	const minGap = 0;
	const track = input.querySelector('[data-name="track"]');
	const maxValue = rangeOne.max;

	slideOne();
	slideTwo();

	rangeOne.addEventListener('input', slideOne);
	rangeTwo.addEventListener('input', slideTwo);

	function slideOne() {
		if (parseInt(rangeTwo.value) - parseInt(rangeOne.value) <= minGap) {
			rangeOne.value = parseInt(rangeTwo.value) - minGap;
		}
		valueOne.textContent = formatValue(rangeOne.value);
		fillColor();
	};

	function slideTwo() {
		if (parseInt(rangeTwo.value) - parseInt(rangeOne.value) <= minGap) {
			rangeTwo.value = parseInt(rangeOne.value) - minGap;
		}
		valueTwo.textContent = formatValue(rangeTwo.value);
		fillColor();
	};

	function fillColor() {
		const percent1 = rangeOne.value / maxValue * 100;
		const percent2 = rangeTwo.value / maxValue * 100;
		track.style.background = `linear-gradient(to right, #E1E1E1 ${percent1}%,  #CA0100 ${percent1}%,
			#CA0100 ${percent2}%,  #E1E1E1 ${percent2}%)`;
	};

	function formatValue(value) {
		return value < 1000000 ? value / 1000 + 'т' : value / 1000000 + 'м';
	};
};

function readmore() {
	document.querySelectorAll('.review-card').forEach((card) => {
		const button = card.querySelector('.review-card__readmore');
		const background = card.querySelector('.review-card__content');
		const longTextBlock = card.querySelector('.review-card__text-full');
		const longText = longTextBlock.innerText;
		const shortTextBlock = card.querySelector('.review-card__text-short');

		let shortText = longText.slice(0, 220).trim();
		if (shortText.length < longText.length) shortText += '...';
		shortTextBlock.innerText = shortText;

		longTextBlock.classList.add('none');

		button.addEventListener('click', () => {
			console.log(button.innerText);
			if (button.innerText == 'Подробнее') {
				button.innerText = 'Свернуть';
			} else if (button.innerText == 'Свернуть') {
				button.innerText = 'Подробнее';
			}
			button.classList.toggle('active');
			background.classList.toggle('active');
			shortTextBlock.classList.toggle('none');
			longTextBlock.classList.toggle('none');
		});
	});
};

function tabs() {
	const tabs = document.querySelectorAll('[data-tab]');
	const contentBlocks = document.querySelectorAll('[data-tab-content]');

	tabs.forEach(function (tab) {
		tab.addEventListener('click', function (event) {
			contentBlocks.forEach((contentBlock) => contentBlock.classList.add('none'));
			document.querySelector(`[data-tab-content="${this.dataset.tab}"]`).classList.remove('none');

			tabs.forEach((tab) => tab.classList.remove('active'));
			event.target.classList.add('active');
		});
	});
};

function playIcon() {
	document.querySelectorAll('.play-icon').forEach((play) => {
		const video = play.parentElement.querySelector('video');

		play.addEventListener('click', (event) => {
			console.log(play);
			event.stopPropagation();
			video.paused ? video.play() : video.pause();
		});

		video.addEventListener('play', () => play.classList.add('none'))
		video.addEventListener('pause', () => play.classList.remove('none'))
		video.addEventListener('ended', () => play.classList.remove('none'))
	});
};

function sectionCollectionsCarousel() {
	const owl = $(".section-collections .owl-carousel");
	const btnPrev = $(".section-collections .slider__btn--left");
	const btnNext = $(".section-collections .slider__btn--right");

	owl.owlCarousel(
		{
			loop: true,
			nav: false,
			dots: false,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
				},
				768: {
					items: 2,
					margin: 14,
				},
				1430: {
					items: 3,
					margin: 30,
				}
			}
		}
	);

	btnPrev.click(() => owl.trigger('prev.owl.carousel'));
	btnNext.click(() => owl.trigger('next.owl.carousel'));
};

function sectionOffersCarousel() {
	const owl = $(".section-offers .owl-carousel");
	const btnPrev = $(".section-offers .slider__btn--left");
	const btnNext = $(".section-offers .slider__btn--right");

	owl.owlCarousel(
		{
			loop: true,
			nav: false,
			dots: false,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
				},
				768: {
					items: 2,
					margin: 14,
				},
				1430: {
					items: 3,
					margin: 30,
				}
			}
		}
	);

	btnPrev.click(() => owl.trigger('prev.owl.carousel'));
	btnNext.click(() => owl.trigger('next.owl.carousel'));
};

function sectionBanksCarousel() {
	const owl = $(".section-banks .owl-carousel");
	const btnPrev = $(".section-banks .slider__btn--left");
	const btnNext = $(".section-banks .slider__btn--right");

	owl.owlCarousel(
		{
			loop: true,
			nav: false,
			dots: false,
			responsiveClass: true,
			responsive: {
				0: {
					items: 2,
					margin: 10,
				},
				768: {
					items: 4,
					margin: 14,
				},
				1430: {
					items: 4,
					margin: 30,
				}
			}
		}
	);

	btnPrev.click(() => owl.trigger('prev.owl.carousel'));
	btnNext.click(() => owl.trigger('next.owl.carousel'));
};

function sectionRatingsCarousel() {
	const owl = $(".section-ratings .owl-carousel");
	const btnPrev = $(".section-ratings .slider__btn--left");
	const btnNext = $(".section-ratings .slider__btn--right");

	owl.owlCarousel(
		{
			loop: true,
			nav: false,
			dots: false,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
				},
				768: {
					items: 2,
					margin: 30,
				},
				1430: {
					items: 4,
					margin: 30,
				}
			}
		}
	);

	btnPrev.click(() => owl.trigger('prev.owl.carousel'));
	btnNext.click(() => owl.trigger('next.owl.carousel'));
};

function sectionBlogCarousel() {
	const owl = $(".section-blog .owl-carousel");
	const btnPrev = $(".section-blog .slider__btn--left");
	const btnNext = $(".section-blog .slider__btn--right");

	owl.owlCarousel(
		{
			loop: true,
			nav: false,
			dots: false,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
				},
				768: {
					items: 2,
					margin: 14,
				},
				1430: {
					items: 4,
					margin: 30,
				}
			}
		}
	);

	btnPrev.click(() => owl.trigger('prev.owl.carousel'));
	btnNext.click(() => owl.trigger('next.owl.carousel'));
};