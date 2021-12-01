$(document).ready(function () {
  var people = [
    {
      name: "Bruce Wayne",
      image: "./src/img/avatar01.png",
      lastChatTime: "20:00",
      lastMsg: "Ciao! Come va?",
    },
    {
      name: "Samantha Nicole",
      image: "./src/img/avatar04.png",
      lastChatTime: "20:00",
      lastMsg: "Ciao! Come va?",
    },
    {
      name: "John Paul",
      image: "./src/img/avatar05.png",
      lastChatTime: "20:00",
      lastMsg: "Ciao! Come va?",
    },
    {
      name: "Miguel Santos",
      image: "./src/img/avatar06.png",
      lastChatTime: "20:00",
      lastMsg: "Ciao! Come va?",
    },
    {
      name: "Angelo Brunetta",
      image: "./src/img/avatar07.png",
      lastChatTime: "20:00",
      lastMsg: "Ciao! Come va?",
    },
  ];
  people.forEach((person) => {
    $("#ulContacts").append(
      "<li>" +
        '<div id="contact-04" class="user not-selected">' +
        '<img class="contacts-avatar" src=' +
        person.image +
        ' alt="" />' +
        "<div>" +
        '<h2 class="names">' +
        person.name +
        "</h2>" +
        '<h3 class="messaggio">' +
        person.lastMsg +
        "</h3>" +
        "</div>" +
        '<div class="time-arrow">' +
        "<p>20.00</p>" +
        '<i id="contactDD" class="fas fa-chevron-down"></i>' +
        '<ul class="drop">' +
        "<li>" +
        '<a href="#">Archivia chat</a>' +
        "</li>" +
        "<li>" +
        '<a href="#">Disattiva notifiche</a>' +
        "</li>" +
        "<li>" +
        '<a href="#">Ellimina chat</a>' +
        "</li>" +
        "<li>" +
        '<a href="#">Fissa chat</a>' +
        "</li>" +
        "<li>" +
        '<a href="#">Segna come da leggere</a>' +
        "</li>" +
        "</ul>" +
        "</div>" +
        "</div>" +
        "</li>"
    );
  });
  //Faccio la ricerca dei nomi dei contatti nell'input di sinistra.
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#divContacts #ulContacts li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });

    //Quando scrivo la lente di ricerca sparisce ed appare invece la freccia.
    if ($("#search").val().length === 0) {
      $("#arrow").hide();
      $("#srch-lent").show();
    } else {
      $("#srch-lent").hide();
      $("#arrow").show();
    }
  });

  //Si ripulisce l'input una volta cliccato la freccia.
  $("#arrow").click(function () {
    $("#search").val("");
  });

  $("#contactDD").on("click", function () {
    $(this).siblings("ul.drop").toggleClass("active");
  });

  //HOVER nelle frecce
  $(".bubble").mouseenter("handlerIn", function () {
    $(this).children(".menu .left-arrow").show();
  });

  $(".bubble").mouseleave("handlerOut", function () {
    $(this).children(".menu .left-arrow").hide();
  });

  //FUNZIONE per ogni attività che necessita il KEYUP.
  $(".inputMessage").bind("keyup", function (e) {
    //Se scrivo nell'input l'icona del microfono scompare lasciando visibile il paper plane per inviare.
    //Dopo che l'input si ripulisce torna l'icona del microfono.
    if ($(".selected .right-footer .inputMessage").val().length === 0) {
      $(".invio").hide();
      $(".microfono").show();
    } else {
      $(".microfono").hide();
      $(".invio").show();
    }

    //Invio il messaggio premendo tasto INVIO della tastiera.
    if (e.keyCode === 13) {
      invioMsg();
    }
  }); // /FINE FUNZIONE KEYUP

  //FUNZIONE per il click sul paper plane per inviare il messaggio.
  $(".invio").click(function () {
    invioMsg();
  }); // /FINE FUNZIONE CLICK.

  function invioMsg() {
    //Ottengo ora(h) e minuto(m) attuale.
    var t = new Date();
    var hm = t.getHours() + ":" + t.getMinutes();

    var messaggio = $(".selected .inputMessage").val();
    $(".selected .chat-user").append(
      '<div class="bubble sent"> <p> ' +
        messaggio +
        ' </p> <span class="right">' +
        hm +
        '</span>  <i class="fas fa-chevron-down left-arrow"></i>  </div>'
    );
    //Cancello il contenuto dell'input una volta inviato il messaggio
    $(".selected .inputMessage").val("");

    //Dopo 2 sec. che ho inviato un msg, il computer mi risponde automaticamente.
    setTimeout(function () {
      var risposta = new String("Ciao");
      $(".selected .chat-user").append(
        '<div class="bubble receive"> <p> ' +
          risposta +
          ' </p> <span class="right">' +
          hm +
          '</span>  <i class="fas fa-chevron-down left-arrow"></i>  </div>'
      );
    }, 2000);
  }

  // noi dobbiamo capirela posizione del div

  // del li index()

  $("#ulContacts li").on("click", function () {
    $(".first-page").hide();
    $("#chatside div").removeClass("selected");
    var clickedBtnID = $(this).index();
    // console.log(clickedBtnID);
    $("#chatside").find(".chat").eq(clickedBtnID).addClass("selected");

    $(this).siblings().removeClass("changeColor");
    $(this).addClass("changeColor");
  });

  $(".left-arrow").on("click", function () {
    $(this).siblings(".dropdown").toggleClass("active");
  });
});
