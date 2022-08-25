// JQUERY
$(document).ready(function () {
	// Slider Principal cfg
	$(".sliderPrincipal").slick({
		mobileFirst: true,
		prevArrow:
			'<div class="principal--prev principal--icon"><img class="slider--icon" src="./assets/iconos/angle-left-solid.svg"></div>',
		nextArrow:
			'<div class="principal--next principal--icon"><img class="slider--icon" src="./assets/iconos/angle-right-solid.svg"></div>',
	});
	// Slider Martcas cfg
	$(".sliderMarcas").slick({
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 300,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
		prevArrow:
			'<div class="marcas--prev marcas--icon"><img class="slider--icon" src="./assets/iconos/angle-left-solid.svg"></div>',
		nextArrow:
			'<div class="marcas--next marcas--icon"><img class="slider--icon" src="./assets/iconos/angle-right-solid.svg"></div>',
	});
});

// JS vanilla
const navList = document.querySelector(".navList");
const toggleIcon = document.getElementById("icon-menu");

// Toggling navlist's class for the responsive
toggleIcon.addEventListener("click", () => {
	navList.classList.toggle("active");
});

// Variables
const productsContainer = document.getElementById("productsContainer");
const prods = [];
// fetching products
$.ajax({
	url: "https://api.mercadolibre.com/items?ids=MLA863712882#json",
	type: "GET",
	success: data => {
		const {
			id,
			title,
			price,
			pictures,
			shipping: { free_shipping },
			base_price,
			original_price,
		} = data[0].body;
		prods.push({
			id,
			title,
			price,
			pictures: pictures[0].url,
			free_shipping,
			base_price,
			original_price,
		});
	},
});
$.ajax({
	url: "https://api.mercadolibre.com/items/MLA646715969",
	type: "GET",
	success: data => {
		const {
			id,
			title,
			price,
			base_price,
			original_price,
			pictures,
			shipping: { free_shipping },
		} = data;
		prods.push({
			id,
			title,
			price,
			pictures: pictures[0].url,
			free_shipping,
			base_price,
			original_price,
		});
	},
});

function prueba() {
	return prods;
}

// Iterating the prods
setTimeout(() => {
	prueba().map(el => {
		const randomDiscount = Math.round(Math.random() * (30 - 5) + 5);
		const tomorrow = Math.round(Math.random() * 1);
		console.log(randomDiscount);
		const div = document.createElement("div");
		div.classList.add("product");
		div.innerHTML += `
										<div class='product__imgContainer'>
											<img class='product__img' src='${el.pictures}' alt=${el}>
											${el.free_shipping ? '<div class="free"></div>' : ""}

										</div>
										<div class="product__information">
											<p class='product__price'>
											<span class='product__prevPrice'>$ ${el.price}</span>
											$ ${(el.price - (el.price * randomDiscount) / 100).toFixed(2)}
											<span class='product__discount ${
												randomDiscount >= 25 ? "superOFF" : "normalOFF"
											}'>${randomDiscount} % OFF</span>
											</p>
											<div>
											${tomorrow ? '<p class="tomorrow">Llega mañana</p>' : ""}
											</div>
											<p class='product__title'>${el.title}</p>
										</div>
										`;
		productsContainer.appendChild(div);
	});
}, 500);
