$(document).foundation()
    // Variable Globale pour la map car elle sera utilisée tout le temps
var map;
//var App qui va gérer l'ensemble de l'application
var App = {
    init: function () {
        this.evenements = this.getEvenements();
        this.markers = this.createMarkers(this.evenements);
    }, // Récupéreation des evenements sur l'API de la ville de paris
    getEvenements: function () {
        var tableauEvents = [];
        // on fait une requête Ajax avec async False
        $.ajax({
            url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=evenements-a-paris&rows=10000&facet=updated_at&facet=tags&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&refine.date_start=2017-06-22"
            , method: 'GET'
            , async: false
            , beforeSend: function () {
                console.log("Lancement de la requête");
                // Todo : Afficher fenêtre modale 'chargement en cours'
            }
            , success: function (data) {
                console.log(data);
                var events = data.records;
                events.forEach(function (event) {
                    console.log(event);
                    var event = event.fields;
                    var evenement = Object.create(Evenement);
                    evenement.init(event);
                    tableauEvents.push(evenement);
                });
            }
        });
        return tableauEvents;
    }
    , createMarkers: function (evenements) {
        var tableauMarkers = [];
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
            marker.setMap(map);
            marker.addListener('click', function () {
                marker.event.setInformationCard();
            });
            tableauMarkers.push(marker);
        });
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
}