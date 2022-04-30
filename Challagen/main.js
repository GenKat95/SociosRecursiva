const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
let EDAD =[];
const csvToArray =(str, delimiter = ",")=>{

  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
        
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

let cabecera = {
    nombre: "",
    edad: "",
    equipo: "",
    estado: "",
    estudio: ""
}
let arrayList = [];
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();
 
  reader.onload = function (e) {
    const text = e.target.result;
      const data = csvJson(text);
      data.pop() 
      
      data.forEach(x => {

         
          
          currentline = x.split(";");
        
          cabecera.nombre = quitarAcentos(currentline[0]);
          cabecera.edad = currentline[1];
          cabecera.equipo = quitarAcentos(currentline[2]);
          cabecera.estado = currentline[3];
          cabecera.estudio = currentline[4].trim();
        
          arrayList.push(cabecera);
          
         
          cabecera = {};
         
      })   
     //Un listado con las 100 primeras personas casadas, con estudios 
     //Universitarios, ordenadas de menor a mayor según su edad. Por 
     //cada persona, mostrar: nombre, edad y equipo. 
      let filtro= arrayList.filter(x=> x.estado === 'Casado'&& x.estudio ==='Universitario' ).sort(x=> x.edad).splice(0,100);
     listarSocioFiltro(filtro);
  
     //Un listado con los 5 nombres más comunes entre los hinchas de River
      let registroRepetidos= arrayList.filter(x=> x.equipo === 'River');
      NombreRepetidoLista(registroRepetidos);
  
      //El promedio de edad de los socios de Racing.
      const promedio =Promedio(arrayList);
      $("#promedio").html('Promedio : ' + promedio);

      //Cantidad total de personas registradas.
      $("#cantida").html('la cantidad es : ' + arrayList.length);
    

        //Un listado, ordenado de mayor a menor según la cantidad de 
        //socios, que enumere, junto con cada equipo, el promedio de edad 
        //de sus socios, la menor edad registrada y la mayor edad registrada.
        const listadoOrdenado =  arrayList.filter(x=> x.edad ).sort((a, b) => b.edad - a.edad);
        const menor= listadoOrdenado.forEach(y=>{

    
            EDAD.push(y.edad);
        });
        const edadMin =MyMin(EDAD);
        const edadMax =MyMax(EDAD);
        $("#edadmin").html('la Edad Minima de los socios es : ' + edadMin);
        $("#edadmax").html('la Edad Maxima de los socios es : ' + edadMax);
        
        listarSocio(listadoOrdenado);
      
      
   
  };
  reader.readAsText(input);
  
  
});
function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('�').map( letra => acentos[letra] || letra).join('').toString();	
}
const MyMax =(myarr) =>{
    var al = myarr.length;
    maximum = myarr[al-1];
    while (al--){
        if(myarr[al] > maximum){
            maximum = myarr[al]
        }
    }

            return maximum;
};
const MyMin = (myarr) =>{
    var al = myarr.length;
    minimum = myarr[al-1];
    while (al--){
        if(myarr[al] < minimum){
            minimum = myarr[al]
        }
    }
    return minimum;
};
const nombreRepetido =(registroRepetidos)=>{
   
    const nombre =registroRepetidos.reduce((prev, value) =>  { 

        prev[value.nombre] = ++prev[value.nombre] || 1 ;
      
       
    })
    return nombre;
}
const Promedio =(myArray) =>{
    let sum = 0;
    myArray.forEach(element => {
        if(element.equipo == 'Racing') sum += element.edad;
    })
  
    return sum/myArray.length;
}
const csvJson = (csv) =>{

    var lines = csv.split("\n")
    var result = []
    var headers = lines[0].split(";")

    lines.map(x => {
       // if (indexLine < 1) return // Jump header line

       

        result.push(x)
    
    })

    //result.pop() // remove the last item because undefined values

    return result // JavaScript object
}
const listarSocio =(data)=>{
   
    $('#datos').DataTable({

            destroy: true,
            data: data,
            dom: 'lBfrtip',
            order: [[0, "desc"]],
            ordering: true,
            buttons: [],
            columns: [

                { data: "nombre", title: 'Nombre' },
                { data: "edad", title: 'Edad' },
                { data: "equipo", title: 'Equipo' },
                { data: "estado", title: 'Estado Civil' },
                { data: "estudio", title: 'Estudio Realizado' },

        ],
        "columnDefs": [
            {

            },

            //{ className: "dt-head-center", targets: [1] }
        ],

        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
    });
 
}
const listarSocioFiltro =(data)=>{
   
    $('#datosList').DataTable({

            destroy: true,
            data: data,
            dom: 'lBfrtip',
            order: [[0, "desc"]],
            ordering: true,
            buttons: [],
            columns: [

                { data: "nombre", title: 'Nombre' },
                { data: "edad", title: 'Edad' },
                { data: "equipo", title: 'Equipo' }
               

        ],
        "columnDefs": [
            {

            },

            //{ className: "dt-head-center", targets: [1] }
        ],

        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
    });
 
}
const NombreRepetidoLista =(data)=>{
   
    $('#datosNombre').DataTable({

            destroy: true,
            data: data,
            dom: 'lBfrtip',
            order: [[0, "desc"]],
            ordering: true,
            buttons: [],
            columns: [

                { data: "nombre", title: 'Nombre' }
               

        ],
        "columnDefs": [
            {

            },

            //{ className: "dt-head-center", targets: [1] }
        ],

        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
    });
 
}

