var pokemonRepository = (function () {
  var t = [];
  function e(e) {
    "object" == typeof e && "name" in e && "detailsUrl" in e
      ? t.push(e)
      : console.log("add an object");
  }
  function a() {
    return t;
  }
  function i(t) {
    let e = $(".modal-body"),
      a = $(".modal-title");
    $(".modal-header"), a.empty(), e.empty();
    let i = $("<h1>" + t.name + "</h1>"),
      n = $('<img class="modal-img" style="width:50%">');
    n.attr("src", t.imageUrlFront);
    let o = $('<img class="modal-img" style="width:50%">');
    o.attr("src", t.imageUrlBack);
    let l = $("<p>height : " + t.height + "</p>"),
      p = $("<p>weight : " + t.weight + "</p>"),
      r = $("<p>types : " + t.types + "</p>"),
      s = $("<p>abilities : " + t.abilities + "</p>");
    a.append(i),
      e.append(n),
      e.append(o),
      e.append(l),
      e.append(p),
      e.append(r),
      e.append(s);
  }
  return {
    add: e,
    getAll: a,
    addListItem: function t(e) {
      pokemonRepository.loadDetails(e).then(function () {
        var t = $(".list"),
          a = $('<div class="card" style="width:200px"></div>'),
          n = $(
            '<img class="card-img-top" alt="Card image" style="width:50%" />'
          );
        n.attr("src", e.imageUrlFront);
        var o = $('<div class="card-body"></div>'),
          l = $("<h4 class='card-title' >" + e.name + "</h4>"),
          p = $(
            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
          );
        t.append(a),
          a.append(n),
          a.append(o),
          o.append(l),
          o.append(p),
          p.on("click", function (t) {
            (function t(e) {
              pokemonRepository.loadDetails(e).then(function () {
                console.log(e), i(e);
              });
            })(e);
          });
      });
    },
    loadList: function t() {
      return $.ajax("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (t) {
          t.results.forEach(function (t) {
            var a = { name: t.name, detailsUrl: t.url };
            e(a), console.log(a);
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: function t(e) {
      var a = e.detailsUrl;
      return $.ajax(a)
        .then(function (t) {
          (e.imageUrlFront = t.sprites.front_default),
            (e.imageUrlBack = t.sprites.back_default),
            (e.height = t.height),
            (e.types = []);
          for (var a = 0; a < t.types.length; a++)
            e.types.push(t.types[a].type.name);
          e.abilities = [];
          for (var a = 0; a < t.abilities.length; a++)
            e.abilities.push(t.abilities[a].ability.name);
          e.weight = t.weight;
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    showModal: i,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
