window.fn = {};

window.fn.open = function () {
    var menu = document.getElementById('menu');
    menu.open();
};

window.fn.load = function (page) {

    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
        .then(menu.close.bind(menu));
};


//  SECTION PORTFOLIO


// A chaque affichage d'une nouvelle page, on exécute une fonction
// qui va permettre d'exécuter un code précis en fonction de la page
// sur laquelle on se trouve
document.addEventListener("show", function (e) {

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
    if (page === "programme") {

        let selectedClass = "";
        $(".fil-cat").click(function () {

            selectedClass = $(this).attr("data-rel");
            $("#portfolio").fadeTo(100, 0.1);
            $("#portfolio > div").not("." + selectedClass).fadeOut().removeClass('scale-anm');
            setTimeout(function () {

                $("." + selectedClass).fadeIn().addClass('scale-anm');

                // On retire la class "active" à tous les boutons
                $("#sectionFolio .toolbar button").removeClass("active");
                // On ajoute la classe "active" au bouton qui est sélectionné
                $("button[data-rel='" + selectedClass + "']").addClass("active");

                $("#portfolio").fadeTo(300, 1);

            }, 300);

        });
    } else if (page == "maps") {
        // Si je suis sur écran map alors j'exécute la fonction permettant
        // de l'afficher.
        showMap();
    } else if (page == "accueil") {
        $('#home-slider').slick({
            "autoplay": false,
            "adaptiveHeight": false,
            "arrows": false,
            "dots": true,
        });
        __weatherwidget_init();
    }
});

/* *********** */
// SECTION MAP 
/* *********** */

// Declare User object 
user = {};
// Declare Map Object
map = {};

// agencies list
agencies = [{name: "La scène principale", lat: 48.85779, lon: 2.29526},
    {name: "La scène N°3", lat: 48.85654, lon: 2.29910},
    {name: "La scène N°2", lat: 48.85476, lon: 2.29878}];
// agencies list
festivals = [{name: "Le camping", lat: 48.85436, lon: 2.30208},
    {name: "Le village", lat: 48.85355, lon: 2.30050}];

// agencies list
wcs = [{name: "WC scène principale ", lat: 48.85701, lon: 2.29482},
    {name: "Le village", lat: 48.85452, lon: 2.29935}];

function showMap() {
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
    if (user.position.lat) {
        mapUser();
    }
}

function mapUser() {
    let userIcon = L.icon({
        iconUrl: "img/boy.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    let marker = L.marker([user.position.lat, user.position.lon], {icon: userIcon});
    marker.bindPopup("C'est moi !");
    marker.addTo(map);
}

function mapAgencies() {
    // On créer un modèle d'icône
    let agenceIcon = L.icon({
        iconUrl: "img/stage.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    agencies.forEach(function (agence) {
        let marker = L.marker([agence.lat, agence.lon], {icon: agenceIcon});
        marker.bindPopup("Trouvez ici : " + agence.name);
        marker.addTo(map);
    })
}

function mapfestivals() {
    // On créer un modèle d'icône
    let festivalIcon = L.icon({
        iconUrl: "img/placeholder.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    festivals.forEach(function (festival) {
        let marker = L.marker([festival.lat, festival.lon], {icon: festivalIcon});
        marker.bindPopup(festival.name);
        marker.addTo(map);
    })
}

function mapwcs() {
    // On créer un modèle d'icône
    let wcIcon = L.icon({
        iconUrl: "img/toilet.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    wcs.forEach(function (wc) {
        let marker = L.marker([wc.lat, wc.lon], {icon: wcIcon});
        marker.bindPopup(wc.name);
        marker.addTo(map);
    })
}

function __weatherwidget_init() {
    var a = document.getElementsByClassName("weatherwidget-io"), i = [];
    if (0 !== a.length) {
        for (var t = function (t) {
            var e = a[t], o = {};
            o.id = "weatherwidget-io-" + t, o.href = e.href, o.label_1 = e.getAttribute("data-label_1"), o.label_2 = e.getAttribute("data-label_2"), o.font = e.getAttribute("data-font"), o.icons = e.getAttribute("data-icons"), o.mode = e.getAttribute("data-mode"), o.days = e.getAttribute("data-days"), o.theme = e.getAttribute("data-theme"), o.basecolor = e.getAttribute("data-basecolor"), o.accent = e.getAttribute("data-accent"), o.textcolor = e.getAttribute("data-textcolor"), o.textAccent = e.getAttribute("data-textAccent"), o.highcolor = e.getAttribute("data-highcolor"), o.lowcolor = e.getAttribute("data-lowcolor"), o.suncolor = e.getAttribute("data-suncolor"), o.mooncolor = e.getAttribute("data-mooncolor"), o.cloudcolor = e.getAttribute("data-cloudcolor"), o.cloudfill = e.getAttribute("data-cloudfill"), o.raincolor = e.getAttribute("data-raincolor"), o.snowcolor = e.getAttribute("data-snowcolor"), o.windcolor = e.getAttribute("data-windcolor"), o.fogcolor = e.getAttribute("data-fogcolor"), o.thundercolor = e.getAttribute("data-thundercolor"), o.hailcolor = e.getAttribute("data-hailcolor"), o.dayscolor = e.getAttribute("data-dayscolor"), o.tempcolor = e.getAttribute("data-tempcolor"), o.desccolor = e.getAttribute("data-desccolor"), o.label1color = e.getAttribute("data-label1color"), o.label2color = e.getAttribute("data-label2color"), o.shadow = e.getAttribute("data-shadow"), o.scale = e.getAttribute("data-scale"), (r = document.getElementById(o.id)) && e.removeChild(r), i[o.id] = document.createElement("iframe"), i[o.id].setAttribute("id", o.id), i[o.id].setAttribute("class", "weatherwidget-io-frame"), i[o.id].setAttribute("scrolling", "no"), i[o.id].setAttribute("frameBorder", "0"), i[o.id].setAttribute("width", "100%"), i[o.id].setAttribute("src", "https://weatherwidget.io/w/"), i[o.id].style.display = "block", i[o.id].style.position = "absolute", i[o.id].style.top = "0", i[o.id].onload = function () {
                i[o.id].contentWindow.postMessage(o, "https://weatherwidget.io")
            }, e.style.display = "block", e.style.position = "relative", e.style.height = "150px", e.style.padding = "0", e.style.overflow = "hidden", e.style.textAlign = "left", e.style.textIndent = "-299rem", e.appendChild(i[o.id])
        }, e = 0, o = Math.min(a.length, 10); e < o; e++) {
            var r;
            t(e)
        }
        window.addEventListener("message", function (t) {
            "https://weatherwidget.io" === t.origin && i[t.data.wwId] && i[t.data.wwId].parentNode && (i[t.data.wwId].style.height = t.data.wwHeight + "px", i[t.data.wwId].parentNode.style.height = t.data.wwHeight + "px")
        })
    } else setTimeout(__weatherwidget_init, 50)
}

setTimeout(__weatherwidget_init, 80);
