/*Query con prefissi per interrogare GRAPDB*/
var q0 = "PREFIX arc: <http://www.semanticweb.org/bernardi/progetto2021/architettoniche#> SELECT ?opera ?epoca WHERE { ?opera arc:haStile arc:Neo_Futurismo; arc:inEpoca ?epoca.}"
var q1 = "PREFIX arc: <http://www.semanticweb.org/bernardi/progetto2021/architettoniche#> SELECT ?opera WHERE { ?opera arc:operaSituataInCitta arc:Londra. FILTER NOT EXISTS {?opera rdf:type arc:Grattacielo}}"
var q2 = "PREFIX arc: <http://www.semanticweb.org/bernardi/progetto2021/architettoniche#> SELECT ?architetto WHERE { ?architetto arc:architettoNatoIn arc:Inghilterra.} "
var q3 = "PREFIX arc: <http://www.semanticweb.org/bernardi/progetto2021/architettoniche#> SELECT ?architetto (COUNT(?opera) AS ?quante_opere) WHERE { ?architetto arc:haProgettato ?opera.} GROUP BY ?architetto"
var q4 = "PREFIX arc: <http://www.semanticweb.org/bernardi/progetto2021/architettoniche#> SELECT ?opera ?anno WHERE { ?opera arc:annoApertura ?anno. FILTER(?anno > 1800)}"


/*Indirizzo dell'endpoint*/
var url = "http://localhost:7200/repositories/architetture?query=";


/*Wrapper per async requests*/
function requestData(num){
      if(num==1)
        httpGetAsync(url + encodeURIComponent(q0));
      if(num==2)
        httpGetAsync(url + encodeURIComponent(q1));
      if(num==3)
        httpGetAsync(url + encodeURIComponent(q2));
      if(num==4)
        httpGetAsync(url + encodeURIComponent(q3));
      if(num==5)
        httpGetAsync(url + encodeURIComponent(q4));


}

/*Funzione per le async requests tramite HTTP GET, ritorna un file json per ogni chiamata*/
function httpGetAsync(theUrl) {
   $.ajax({
      url: theUrl,
      data: {
         format: 'json'
      },
      error: function() {
         document.write("error");
      },
      dataType: 'json',
      success: function(data) {
       
     
          populate(data);
        
        
      },
      type: 'GET'
   });
}

/*Funzione per passare alla modalità eslporazione opere*/ 
function toggleOpere() {
   var opere = document.getElementById("div-opere");
   var architetti = document.getElementById("div-architetti");

   $(`#${"contenitore"} tr`).remove();
   if (opere.style.display === "none") {
     opere.style.display = "block";
     architetti.style.display = "none";

   }
 } 
 /*Funzione per passare alla modalità eslporazione architetti*/ 
 function toggleArchitetti() {
   var opere = document.getElementById("div-opere");
   var architetti = document.getElementById("div-architetti");

   $(`#${"contenitore"} tr`).remove();
   if (architetti.style.display === "none") {
     architetti.style.display = "block";
     opere.style.display = "none";

   } 
 } 

/*Popolamento della HTML table con i risultati della query*/
function populate(json) {
  $(`#${"contenitore"} tr`).remove();
   console.log(json);
   var table = document.getElementById("contenitore").getElementsByTagName('tbody')[0];
   var indici = table.insertRow();

   for (var i = -1; i < json.results.bindings.length; i++) {
      var newRow = table.insertRow();
      for (var j = 0; j < json.head.vars.length; j++) {
         var newCell = newRow.insertCell();
         newCell.setAttribute('class',"thead-dark ");
         if (i != -1){
            newCell.setAttribute('class', 'header')
            var newText = document.createTextNode(stringAfter(json.results.bindings[i][json.head.vars[j]].value, "#"));

         }
         else
            var newText = document.createTextNode(json.head.vars[j]);
            
         newCell.appendChild(newText);
      }
   }
}
function stringAfter(string, character) {
   return string.substring(string.indexOf(character) + 1);
}