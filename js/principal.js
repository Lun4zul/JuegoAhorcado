var canvas = document.getElementById("cvDraw");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#E0DDAA";
        ctx.strokeStyle = "#E0DDAA";

window.onload = function() {
    const  ctn = document.getElementById("juego");
    ctn.style.display = "none"
	
};

function upper(){
	var input = document.getElementById('palabra');
		input.onkeyup = function(){
			this.value = this.value.toUpperCase();
			var ip = document.getElementById('palabra').value;
		}
}

function valida(){
	var p = document.getElementById("palabra").value;
	if(!p.match(/[A-Z\u00D1]/g)){
		alert("Revisa el formato solicitado...");
	}else{
		alert("La palabra se ha guardado");
	guarda(p);
	
	}
}

function guarda(p){
	/*Guardar Nueva Palabra y Empezar a Jugar*/
	palabras[palabras.length] = p;
	/*Activar key event y iniciar juego*/
	ctrl = true;
	jugar();
}


function jugar(){
    /* activar keypressed */
    ctrl=true;
    /*mostrar juego*/
    var ctn = document.getElementById("juego");
	ctn.style.display = "block"
    /* Vuelve visible el juego y oculta los botones de inicio e imagen*/
    var btn1 = document.getElementById('inicio').style.display = "none";
	var btn1 = document.getElementById('toast-qr').style.display = "none";
	var btn1 = document.getElementById('ahorcado').style.display = "none";
    
}


// JavaScript Document
agregarEvento(window,'load',iniciar,false);
function iniciar(){
	var letra='';
	errores=0;
	intentos=6;
	noIntentos=document.getElementById('noIntentos');
	for(var i=65;i<91;i++){
		var contenedorLetras=document.getElementById('contenedorLetras');
		var letra=letra+'<div class="botonLetra alinearHorizontal cursorPointer centrarTexto borderBox" id="letra'+String.fromCharCode(i)+'">'+String.fromCharCode(i)+'</div>';
		contenedorLetras.innerHTML=letra;
	}
	letras=document.getElementsByClassName('botonLetra');
	for(var i=0;i<letras.length;i++){
		agregarEvento(letras[i],'click',jugar,false);
	}
	palabras=new Array('carro','pez','gato','silla','rosa','caballo','caja','vaso','bolsa','juego');
	numeroAzar=Math.floor(Math.random()*10);
	palabraSecreta=document.getElementById('palabraSecreta');
	respuesta=[];
	palabra='';
	divClassLetra='<div class="letra alinearHorizontal centrarDiv">';
	for(var i=0;i<palabras[numeroAzar].length;i++){
		respuesta[i]=divClassLetra+'_</div> ';
		palabra=palabra+respuesta[i];
		
	}
	palabraSecreta.innerHTML=palabra;
	var botonJugar=document.getElementById('botonJugar');
	agregarEvento(botonJugar,'click',function(){ location.href='index.html';},false);

	function jugar(e){
		if(e){
			id=e.target.id;
		}else{
			if(window.event){
				id=window.event.srcElement.id;
			}
		}
		var letraCorrecta=false;
		var palabra='';
		var letraPulsada=id.charAt(5);
		for(var i=0;i<palabras[numeroAzar].length;i++){
			if(palabras[numeroAzar].toUpperCase().charAt(i)==letraPulsada){
				respuesta[i]=divClassLetra+letraPulsada+'</div>';	
				letraCorrecta=true;
			}
			palabra=palabra+respuesta[i];
			//contenedorPalabra.innerHTML=respuesta[i];
		}
		var imagen=document.getElementById('imagen');
		palabraSecreta.innerHTML=palabra;
		if(letraCorrecta==false){
			colorLetra='';
			errores++;
			intentos=intentos-1;
			noIntentos.innerHTML=intentos;
			img=errores+1;
			imagen.src='img/a'+img+'.jpg';
			if(errores==6){
				alert('Has perdido. \nPulsa finalizar juego para volver al inicio.');
				for(var i=0;i<letras.length;i++){	
					removerEvento(letras[i],'click',jugar);
				}
				palabra='';
				for(var i=0;i<palabras[numeroAzar].length;i++){
					if(divClassLetra+palabras[numeroAzar].toUpperCase().charAt(i)+'</div>'==respuesta[i]){
						colorLetra='<div style="color:blue;" class="letra alinearHorizontal">'+respuesta[i]+'</div>';
						respuesta[i]=colorLetra;	
					}else{
						respuesta[i]=divClassLetra+palabras[numeroAzar].toUpperCase().charAt(i)+'</div>';
					}
					palabra=palabra+respuesta[i];
				}
				palabraSecreta.innerHTML=palabra;
			}
		}else{
			var palabraCompleta=true;
			for(var i=0;i<palabras[numeroAzar].length;i++){
				if(respuesta[i]==divClassLetra+'_</div> '){
					palabraCompleta=false;
				}
			}
			if(palabraCompleta){
				alert('Felicidades!! \nHas ganado el juego.');
				for(var i=0;i<letras.length;i++){	
					removerEvento(letras[i],'click',jugar);
				}
			}
		}
	}
}


	function agregarEvento(elemento,evento,funcion,captura){
		if(window.addEventListener){
			elemento.addEventListener(evento,funcion,captura);
		}else if(window.attachEvent){
			elemento.attachEvent('on'+evento,captura);
		}else{
			alert('Error al agregar el evento');
		}
	}
	function removerEvento(elemento,evento,funcion){
		if(window.removeEventListener){
			elemento.removeEventListener(evento,funcion);
		}else if(window.detachEvent){
			elemento.detachEvent(evento,funcion);
		}else{
			alert('Error al remover el evento');
		}
	}

	function addWord(){
		
		/*mostrar juego*/
		var ctn = document.getElementById("toast-qr");
		ctn.style.display = "block"
		var y = document.getElementById("toast-qr");
		y.className = "show";
		 /* Vuelve visible el juego y oculta los botones de inicio e imagen*/
		 var btn1 = document.getElementById('inicio').style.display = "none";
		 var btn1 = document.getElementById('imagen').style.display = "none";
		 
	}

	function cancelAdd(){
		var y = document.getElementById("toast-qr");
		y.className = "hide";
		location.reload();
		
	}
	
	
	

