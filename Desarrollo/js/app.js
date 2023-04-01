let personasIngresadas = [];
let formulario = document.getElementById('formulario');
formulario.addEventListener('submit', compruebaDatos);

class Persona
{
    #dni;
    constructor(nombre, edad, sexo, peso, altura)
    {
        this.nombre = nombre;
        this.edad = edad;
        this.#dni = this.#generaDNI();
        this.sexo = sexo;
        this.peso = peso;
        this.altura = altura;
        const anioActual = new Date();
        this.anioNacimiento = anioActual.getFullYear() - this.edad;
    }
    //Metodos getter
    getNombre()
    {
        return this.nombre;
    }
    getEdad()
    {
        return this.edad;
    }
    getSexo()
    {
        return this.sexo;
    }
    getPeso()
    {
        return this.peso;
    }
    getAltura()
    {
        return this.altura;
    }
    getAnioNace()
    {
        return this.anioNacimiento;
    }
    get dni()
    {
        return this.#dni;
    }
    mostrarGeneracion()
    {
        let respuesta;
        if(1930 <= parseInt(this.anioNacimiento) && parseInt(this.anioNacimiento) <= 1948)
        {
            respuesta = 'Austeridad';
        }else if(1949 <= parseInt(this.anioNacimiento) && parseInt(this.anioNacimiento) <= 1968)
        {
            respuesta = 'Ambición';
        }else if(1969 <= parseInt(this.anioNacimiento) && parseInt(this.anioNacimiento) <= 1980)
        {
            respuesta = 'Obsesión por el exito';
        }else if(1981 <= parseInt(this.anioNacimiento) && parseInt(this.anioNacimiento) <= 1993)
        {
            respuesta = 'Frustración';
        }else if(1994 <= parseInt(this.anioNacimiento) && parseInt(this.anioNacimiento) <= 2010)
        {
            respuesta = 'Irreverencia';
        }else
        {
            respuesta = 'Taxonomía no identificada para la edad solicitada :(';
        }
        return respuesta;
    }
    esMayorDeEdad()
    {
        if(parseInt(this.edad) >= 18)
        {
            return true;
        }else
        {
            return false;
        }
    }
    mostrarDatos()
    {
        return 'Nombre: '+this.nombre+' - Edad: '+this.edad+' - Año de nacimiento: '+this.anioNacimiento+' - Sexo: '+this.sexo+' - DNI: '+this.#dni;
    }
    #generaDNI()
    {
        return Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
    }
}

function compruebaDatos(e)
{
    e.preventDefault();
    let datoNombre = document.getElementById('ingresaNombre');
    let nombre = datoNombre.value;
    let datoEdad = document.getElementById('ingresaEdad');
    let edad = parseInt(datoEdad.value);
    let datoSexo = document.getElementById('ingresaSexo');
    let sexo = datoSexo.value;
    let datoPeso = document.getElementById('ingresaPeso');
    let peso = parseInt(datoPeso.value);
    let datoAltura = document.getElementById('ingresaAltura');
    let altura = parseInt(datoAltura.value);
    formulario.reset();

    if(nombre.length > 5 && edad > 0 && edad < 110 && peso > 10 && peso < 590 && altura > 50 && altura < 251)
    {
        //El record de la persona mas pesada es de 590kg ._.
        let persona = new Persona(nombre, edad, sexo, peso, altura);
        personasIngresadas.push(persona);
        agregaATabla(persona);
    }else
    {
        alert('Se ingreso incorrectamente alguno de los datos. Por favor intente nuevamente.');
    }
}

function agregaATabla(persona)
{
    let contenedor = document.getElementById('tablaPersonas');
    let nuevaLinea = document.createElement('tr');
    let nombre = document.createElement('th');
    let datoEdad = document.createElement('th');
    let edad = document.createElement('p');
    let determinaMayor = document.createElement('button');
    let anioNace = document.createElement('th');
    let sexo = document.createElement('th');
    let dni = document.createElement('th');
    let taxonomia = document.createElement('th');
    nombre.innerHTML = persona.getNombre();
    datoEdad.className = 'contenedorEdadMas';
    edad.innerHTML = persona.getEdad();
    determinaMayor.innerHTML = '+';
    determinaMayor.onclick = function()
    {
        if(persona.getEdad() >= 18)
        {
            alert('Es mayor de edad');
        }else
        {
            alert('Es menor de edad');
        }
    };
    determinaMayor.className = 'btn btn-outline-success btn-sm ms-1';
    determinaMayor.setAttribute('style','--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;');
    anioNace.innerHTML = persona.getAnioNace();
    sexo.innerHTML = persona.getSexo();
    dni.innerHTML = persona.dni;
    taxonomia.innerHTML = persona.mostrarGeneracion();
    nuevaLinea.appendChild(nombre);
    datoEdad.appendChild(edad);
    datoEdad.appendChild(determinaMayor);
    nuevaLinea.appendChild(datoEdad);
    nuevaLinea.appendChild(anioNace);
    nuevaLinea.appendChild(sexo);
    nuevaLinea.appendChild(dni);
    nuevaLinea.appendChild(taxonomia);
    contenedor.appendChild(nuevaLinea);
}