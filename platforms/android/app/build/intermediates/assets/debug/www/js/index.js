window.fn = {};

window.fn.open = function() {
	console.log("test")
  var menu = document.getElementById('menu');
  console.log(menu)
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



	// Je récupère la page qui vient de s'afficher
	let page = e.target.id;
	// Si cette page est destination, j'exécute le code correspondant
	if(page === "destinations"){

		let selectedClass = "";
		$(".fil-cat").click(function(){ 
			
			selectedClass = $(this).attr("data-rel"); 
	     	$("#portfolio").fadeTo(100, 0.1);
			$("#portfolio div").not("."+selectedClass).fadeOut().removeClass('scale-anm');
	    	setTimeout(function() {

	      		$("."+selectedClass).fadeIn().addClass('scale-anm');

	      		// On retire la class "active" à tous les boutons
	      		$("#sectionFolio .toolbar button").removeClass("active");
	      		// On ajoute la classe "active" au bouton qui est sélectionné
	      		$("button[data-rel='" + selectedClass + "']").addClass("active");
	      			
	      		$("#portfolio").fadeTo(300, 1);

	    	}, 300); 
			
		});	
	}else if(page == "maps"){
		// Si je suis sur écran map alors j'exécute la fonction permettant
		// de l'afficher. 
		showMap();
	}
})

/* *********** */	
// SECTION MAP 
/* *********** */

// Declare User object 
let user = {};
// Declare Map Object
let map = {};

// agencies list
let agencies = [ {name : "Agence 1", lat : 43.602664, lon : 3.912220 }, 
				 {name : "Agence 2", lat : 43.622886, lon : 3.900274 },
				 {name : "Agence 3", lat : 43.588328, lon : 3.953201 }];

function showMap(){
	// Initiate Map
	map = L.map("mapCanvas");

	// Add tiles to the map
	L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    	attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    	minZoom: 1,
    	maxZoom: 20
	}).addTo(map);

	map = map.setView([43.602664, 3.912220], 10);

	mapAgencies();
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
		iconUrl: "img/store.png",
		iconSize: [32,32],
		iconAnchor: [16,32],
		popupAnchor: [0, -32]
	});

	agencies.forEach(function(agence){
		let marker = L.marker( [agence.lat, agence.lon], {icon: agenceIcon} );
		marker.bindPopup("Notre agence : " + agence.name);
		marker.addTo(map);
	})
}




















