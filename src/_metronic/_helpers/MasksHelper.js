export const number_format = (number, decimals, dec_point, thousands_sep) => {
  var n = number,
    prec = decimals;
  var toFixedFix = function(n, prec) {
    var k = Math.pow(10, prec);
    return (Math.round(n * k) / k).toString();
  };
  n = !isFinite(+n) ? 0 : +n;
  prec = !isFinite(+prec) ? 0 : Math.abs(prec);
  var sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep;
  var dec = typeof dec_point === 'undefined' ? '.' : dec_point;
  var s = prec > 0 ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec);
  //fix for IE parseFloat(0.55).toFixed(0) = 0;
  var abs = toFixedFix(Math.abs(n), prec);
  var _, i;
  if (abs >= 1000) {
    _ = abs.split(/\D/);
    i = _[0].length % 3 || 3;
    _[0] =
      s.slice(0, i + (n < 0)) + _[0].slice(i).replace(/(\d{3})/g, sep + '$1');
    s = _.join(dec);
  } else {
    s = s.replace('.', dec);
  }
  var decPos = s.indexOf(dec);
  if (prec >= 1 && decPos !== -1 && s.length - decPos - 1 < prec) {
    s += new Array(prec - (s.length - decPos - 1)).join(0) + '0';
  } else if (prec >= 1 && decPos === -1) {
    s += dec + new Array(prec).join(0) + '0';
  }
  return s;
};

export const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }
  export const cnpjMask = value => {
    const x = value
    .replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    return !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '')

    
  }
  export const phoneMask = value => {
      var v;
    v=value.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
        
  }

  export const phoneUyMask = (text) => {
      let retorno = text.replace(/\D/g, '');
      return retorno;
  }

  export const cepMask = value => {
      var v;
      v=value.replace(/\D/g,"");
      v=v.replace(/^(\d{2})(\d)/,"$1.$2");
      v=v.replace(/\.(\d{3})(\d)/,".$1-$2");
      return v;
  
  }

  export const cepMask2 = value => {
    let x = value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
    let retorno = x[1] + '-' + x[2];

    return retorno;
  
  }

  export const cardMask = value => {
    var v;
    v=value.replace(/\D/g,"");
    v= v.match(/(\d{0,4})/g).join(" ").trim() 
    return v;
}

export const timeMas = (text) => {
    let x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
    let retorno = x[1] + ':' + x[2];

    return retorno;
}

export const cCExpiryMask = (text) => {
  let x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
  let retorno = x[1] + '/' + x[2];

  return retorno;
}

export const numberMask = (text) => {
    return text.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
}

export const moneyMask = (text) => {
    let numberPattern = /\d+/g;
    let formated = text.match(numberPattern).join('');
    formated = formated / 100;
    formated = number_format(formated, 2, ',', '.');
    formated = 'R$ ' + formated;

    if (formated == 'R$ 0,00') {
      formated = '';
    }

    return formated;
}