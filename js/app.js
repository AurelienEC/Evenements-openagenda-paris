$(document).foundation()
    // Variable Globale pour la map car elle sera utilisée tout le temps
var map;
//var App qui va gérer l'ensemble de l'application
var App = {
    init: function () {
        // this.evenements = ;
        this.markers = this.createMarkers(this.getEvenements());
    }, // Récupéreation des evenements sur l'API de la ville de paris
    getEvenements: function () {
        var tableauEvents = [];
        // on fait une requête Ajax avec async False
        $.ajax({
            url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=evenements-a-paris&rows=10000&facet=updated_at&facet=tags&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&refine.date_start=2017"
            , method: 'GET'
            , async: false
            , beforeSend: function () {
                console.log("Lancement de la requête");
                // Todo : Afficher fenêtre modale 'chargement en cours'
                $("#eventName").text("Chargement en cours.....");
            }
            , success: function (data) {
                // Je prend la date du jour pour n'enregistrer que les events à venir
                myDate = Date.now();
                console.log(myDate);
                var events = data.records;
                events.forEach(function (event) {
                    console.log(event);
                    var event = event.fields;
                    var evenement = Object.create(Evenement);
                    evenement.init(event);
                    eventDate = evenement.dateDebut.split("-");
                    eventDate = eventDate[0] + "/" + eventDate[1] + "/" + eventDate[2];
                    eventDate = new Date(eventDate).getTime();
                    console.log(eventDate);
                    if (eventDate >= myDate) {
                        tableauEvents.push(evenement);
                    }
                });
            }
        });
        return tableauEvents;
    }
    , createMarkers: function (evenements) {
        var tableauMarkers = [];
        var iw = new google.maps.InfoWindow();
        var oms = new OverlappingMarkerSpiderfier(map, {
            markersWontMove: true
            , markersWontHide: true
            , basicFormatEvents: true
        });
        evenements.forEach(function (evenement) {
            var marker = new google.maps.Marker({
                position: {
                    lat: evenement.coordonnees[0]
                    , lng: evenement.coordonnees[1]
                }
                , map: map
                , title: evenement.title
                , event: evenement
            });
            //marker.setMap(map);
            marker.addListener('spider_click', function () {
                iw.setContent(marker.event.title);
                marker.event.setInformationCard();
                iw.open(map, marker);
                marker.addListener('click', function () {
                    marker.event.setInformationCard();
                });
            });
            oms.addMarker(marker);
            tableauMarkers.push(marker);
        });
        return tableauMarkers;
    }
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.8587741
            , lng: 2.2074759
        }
        , zoom: 8
    });
    application = Object.create(App);
    application.init();
    console.log(application.markers);
    var mcOptions = {
        maxZoom: 15
        , imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    };
    var markerCluster = new MarkerClusterer(map, application.markers, mcOptions);
}