/*creamos el objeto calculadora*/
var Calculadora = {
  /*le damos valor a las teclas*/
	keys: {'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','punto':'.',
	'sign':'s','mas':'+','menos':'-','por':'*','dividido':'/','raiz':'r','igual':'=','on':'o'},
	ids: {'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','.':'punto',
	's':'sign','+':'mas','-':'menos','*':'por','/':'dividido','r':'raiz','=':'igual','o':'on'},
	pantalla: document.getElementById('display'),
	pantallaGuardada: '',
	operacionActual: '',
	operacionAnterior: '',
	init: function() { /*damos inicio a la calculadora*/
		document.onmousedown = this.clickMouseDown;
		document.onmouseup = this.clickMouseUp;
		document.onkeydown = this.clickKeyDown;
		document.onkeyup = this.clickKeyUp;
	},
	clickKeyDown: function(e) {
		Calculadora.oprimirBoton(Calculadora.ids[e.key]);
	},
	clickKeyUp: function(e) {
		console.log('key up');
		Calculadora.levantarBoton();
		Calculadora.manejarEvento(Calculadora.keys[Calculadora.ids[e.key]]);
	},
	clickMouseDown: function(e) {
		Calculadora.oprimirBoton(Calculadora.ids[Calculadora.keys[e.target.id]]);
	},
	clickMouseUp: function(e) {
		Calculadora.levantarBoton();
		Calculadora.manejarEvento(Calculadora.keys[e.target.id]);
	},
	manejarEvento: function(key) {
		var aux = this.pantalla.innerText;
		if (aux != 'Infinity' && aux != '-Infinity' && aux != 'NaN', aux != 'Off Limits') {
			switch (key) { /*seleccionar tecla*/
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					this.manejarNumero(key);
					break;
				case '.':
					this.manejarPunto();
					break;
				case 's':
					this.manejarSign();
					break;
				case '+':
				case '-':
				case '*':
				case '/':
				case 'r':
					this.manejarOperarcion(key);
					break;
				case 'o':
					this.reset();
					break;
				case '=':
					this.manejarIgual();
			}
		} else if (key == 'o') this.reset();
	},
	manejarNumero: function(numero) {
		if (this.operacionActual == '=')
			this.reset();
		else if (this.operacionActual != '') {
			this.pantallaGuardada = this.pantalla.innerText;
			this.pantalla.innerText = '';
		}
		if (this.pantalla.innerText == '0')
			this.pantalla.innerText = numero;
		else if (this.pantalla.innerText.replace('-','').replace('.','').length < 8)
			this.pantalla.innerText += numero;
	},
	manejarPunto: function() {
		if (this.operacionActual == '=')
			this.reset();
		if (this.pantalla.innerText.indexOf('.') == -1) {
			this.pantalla.innerText += '.';
		}
	},
	manejarSign: function() {
		if (this.pantalla.innerText != '0') {
			if (this.pantalla.innerText[0] != "-") {
				this.pantalla.innerText = '-' + this.pantalla.innerText;
			} else {
				this.pantalla.innerText = this.pantalla.innerText.replace('-','');
			}
		}
	},
	manejarOperarcion: function(operacion) {
		if (this.operacionActual == '=') {
			this.operacionAnterior = this.operacionActual;
		}
		else if (operacion == 'r') {
			if (this.pantallaGuardada != '')
				this.pantalla.innerText = sqrt(this.operar(this.operacionActual));
			else
				this.pantalla.innerText = this.operar(operacion);
			this.operacionAnterior = this.operacionActual;
		}
		else if (this.pantallaGuardada != '') {
			this.pantalla.innerText = this.operar(this.operacionActual);
			this.operacionAnterior = this.operacionActual;
		}
		this.operacionActual = operacion;
		this.pantallaGuardada = '';
	},
	manejarIgual: function() {
		if (this.operacionActual == '=') {
			this.pantalla.innerText = this.operar(this.operacionAnterior);
		} else if (this.pantallaGuardada != '') {
			var aux = this.pantalla.innerText;
			this.pantalla.innerText = this.operar(this.operacionActual);
			this.pantallaGuardada = aux;
			this.operacionAnterior = this.operacionActual;
			this.operacionActual = '=';
		} else {

		}
	},
	operar: function(operacion) {
    /*seguir operando con el resultado*/
		switch (operacion) {
			case '+':
				res = Number(this.pantallaGuardada) + Number(this.pantalla.innerText);
				break;
			case '-':
				res = Number(this.pantallaGuardada) - Number(this.pantalla.innerText);
				break;
			case '*':
				res = Number(this.pantallaGuardada) * Number(this.pantalla.innerText);
				break;
			case '/':
				res = Number(this.pantallaGuardada) / Number(this.pantalla.innerText);
				break;
			case 'r':
				res = Math.sqrt(Number(this.pantalla.innerText));
				break;
		} /*resultado*/
		if (res > 99999999 || (res < 0.0000001 && res > -0.0000001))
			res = 'Off Limits'
		else if (res.toString().indexOf('.') != -1 && res.toString().indexOf('-') != -1)
			res = res.toString().slice(0,10);
		else if (res.toString().indexOf('.') != -1 || res.toString().indexOf('-') != -1)
			res = res.toString().slice(0,9);
		else
			res = res.toString().slice(0,8);
		return res;
	},
	oprimirBoton: function(id) {
		if (btn = document.getElementById(id)) {
			btn.style.transform = 'scale(.9,.9)';
			btn.classList.add('activa');
		}
	},
	levantarBoton: function() {
		if (btn = document.querySelector('.tecla.activa')) {
			btn.style.transform = 'scale(1,1)';
			btn.classList.remove('activa');
		}
	},
	reset: function() { /*resetear las operaciones*/
		this.operacionActual = '';
		this.operacionAnterior = '';
		this.pantalla.innerText = '0';
		this.pantallaGuardada = '';
	}
};

window.onload = function() {
	Calculadora.init();5
	console.log('calculadora lista')
};
