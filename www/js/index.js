window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {

  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};


//  SECTION PORTFOLIO


// A chaque affichage d'une nouvelle page, on exécute une fonction
// qui va permettre d'exécuter un code précis en fonction de la page
// sur laquelle on se trouve
document.addEventListener("show", function(e){

	// Get User Position
	/* *
	navigator.geolocation.getCurrentPosition(

			function(position){
				user.position = {
					lat : position.coords.latitude,
					lon : position.coords.longitude,
					z : position.coords.altitude,
					speed : position.coords.speed,
					cap : position.coords.heading 
				}
			},
			function(error){
				alert("Code : " + error.code + "\nMessage : " + error.message);
			},
			{enableHighAccury: true}


		);
	/* */


	// Si cette page est destination, j'exécute le code correspondant
	// Je récupère la page qui vient de s'afficher
	let page = e.target.id;
	// Si cette page est destination, j'exécute le code correspondant
	if(page === "programme"){

		let selectedClass = "";
		$(".fil-cat").click(function(){

			selectedClass = $(this).attr("data-rel");
	     	$("#portfolio").fadeTo(100, 0.1);
			$("#portfolio > div").not("."+selectedClass).fadeOut().removeClass('scale-anm');
	    	setTimeout(function() {

	      		$("."+selectedClass).fadeIn().addClass('scale-anm');

	      		// On retire la class "active" à tous les boutons
	      		$("#sectionFolio .toolbar button").removeClass("active");
	      		// On ajoute la classe "active" au bouton qui est sélectionné
	      		$("button[data-rel='" + selectedClass + "']").addClass("active");

	      		$("#portfolio").fadeTo(300, 1);

	    	}, 300);

		});
	} else if(page == "maps"){
		// Si je suis sur écran map alors j'exécute la fonction permettant
		// de l'afficher. 
		showMap();
	} else if(page == "accueil") {
		setTimeout(function() {
			$('#home-slider').slick({
				"autoplay": false,
				"adaptiveHeight": false,
				"arrows": false,
				"dots": true,

			});

			!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
		},250);

	}
})

/* *********** */	
// SECTION MAP 
/* *********** */

// Declare User object 
user = {};
// Declare Map Object
map = {};

// agencies list
agencies = [ {name : "La scène principale", lat : 48.85779, lon : 2.29526 },
				 {name : "La scène N°3", lat : 48.85654, lon : 2.29910 },
				 {name : "La scène N°2", lat : 48.85476, lon : 2.29878 }];
// agencies list
festivals = [ {name : "Le camping", lat : 48.85436, lon : 2.30208 },
				 {name : "Le village", lat : 48.85355, lon : 2.30050 }];

// agencies list
wcs = [ {name : "WC scène principale ", lat : 48.85701, lon : 2.29482 },
			{name : "Le village", lat : 48.85452, lon : 2.29935 }];

function showMap(){
	// Initiate Map
	map = L.map("mapCanvas");

	// Add tiles to the map
	L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    	attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    	minZoom: 1,
    	maxZoom: 20
	}).addTo(map);

	map = map.setView([48.8560663, 2.2980761], 16);

	mapAgencies();
	mapwcs();
	mapfestivals();
	if(user.position.lat){
		mapUser();
	}
}

function mapUser(){
	let userIcon = L.icon({
		iconUrl: "img/boy.png",
		iconSize: [32,32],
		iconAnchor: [16,32],
		popupAnchor: [0, -32]
	});	

	let marker = L.marker( [user.position.lat, user.position.lon], {icon : userIcon} );
	marker.bindPopup("C'est moi !");
	marker.addTo(map);
}

function mapAgencies(){
	// On créer un modèle d'icône
	let agenceIcon = L.icon({
		iconUrl: "img/stage.png",
		iconSize: [32,32],
		iconAnchor: [16,32],
		popupAnchor: [0, -32]
	});

	agencies.forEach(function(agence){
		let marker = L.marker( [agence.lat, agence.lon], {icon: agenceIcon} );
		marker.bindPopup("Trouvez ici : " + agence.name);
		marker.addTo(map);
	})
}

function mapfestivals(){
	// On créer un modèle d'icône
	let festivalIcon = L.icon({
		iconUrl: "img/placeholder.png",
		iconSize: [32,32],
		iconAnchor: [16,32],
		popupAnchor: [0, -32]
	});

	festivals.forEach(function(festival){
		let marker = L.marker( [festival.lat, festival.lon], {icon: festivalIcon} );
		marker.bindPopup(festival.name);
		marker.addTo(map);
	})
}

function mapwcs(){
	// On créer un modèle d'icône
	let wcIcon = L.icon({
		iconUrl: "img/toilet.png",
		iconSize: [32,32],
		iconAnchor: [16,32],
		popupAnchor: [0, -32]
	});

	wcs.forEach(function(wc){
		let marker = L.marker( [wc.lat, wc.lon], {icon: wcIcon} );
		marker.bindPopup(wc.name);
		marker.addTo(map);
	})
}

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
