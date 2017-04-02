var Evenement = {
    init: function (event) {
        this.identifiant = (event.uid ? event.uid : "");
        this.lien = (event.link ? event.link : "");
        this.miseAJour = (event.updated_at ? event.updated_at : "");
        this.lieuDate = (event.space_time_info ? event.space_time_info : "");
        this.image = (event.image ? event.image : "");
        this.imageMiniature = (event.image_thumb ? event.image_thumb : "");
        this.urlPartage = (event.share_url ? event.share_url : "");
        this.lang = (event.lang ? event.lang : "");
        this.title = (event.title ? event.title : "");
        this.description = (event.description ? event.description : "");
        this.details = (event.free_text ? event.free_text : "");
        this.tags = (event.tags ? this.getArrayTags(event.tags) : "");
        this.coordonnees = (event.latlon ? event.latlon : "");
        this.lieu = (event.placename ? event.placename : "");
        this.addresse = (event.address ? event.address : "");
        this.departement = (event.department ? event.department : "");
        this.region = (event.region ? event.region : "");
        this.ville = (event.city ? event.city : "");
        this.dateDebut = (event.date_start ? event.date_start : "");
        this.dateFin = (event.date_end ? event.date_end : "");
        this.informationTarifaire = (event.pricing_info ? event.pricing_info : "");
        this.program_uid = (event.program_uid ? event.program_uid : "");
    }
    , getArrayTags: function (tags) {
        var tableauTags = tags.split(",");
        return tableauTags;
    }
    , setInformationCard: function () {
        if (this.image != "") {
            console.log(this);
            var thumbnail = '<img src="' + this.image + '" alt="' + this.title + '" />';
            $("#eventThumbnail").html(thumbnail);
        }
        else {
            $("#eventThumbnail").html("");
        }
        if (this.title != "") {
            $("#eventName").text(this.title);
        }
        else {
            $("#eventName").text("Evenement Sans Titre");
        }
        if (this.lieu != "") {
            var lieu = '<i class="fa fa-map-marker" aria-hidden="true"></i> ' + this.lieuDate;
            $("#eventLieu").css("display", "block")
            $("#eventLieu").html(lieu);
        }
        else {
            $("#eventLieu").css("display", "none");
            $("#eventLieu").html("");
        }
        if (this.description != "") {
            $("#eventDescription").text(this.description);
        }
        else {
            $("#eventDescription").text("");
        }
        if (this.details != "") {
            $("#eventDetails").text(this.details);
        }
        else {
            $("#eventDetails").text("");
        }
        if (this.lien != "") {
            $("#eventReservation").css("display", "block");
            $("#btnReservation").attr("href", this.lien);
        }
        else {
            $("eventReservation").css("display", "none");
        }
    }
};