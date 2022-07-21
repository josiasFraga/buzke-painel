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

  export const cepMask = value => {
      var v;
      v=value.replace(/\D/g,"");
      v=v.replace(/^(\d{2})(\d)/,"$1.$2");
      v=v.replace(/\.(\d{3})(\d)/,".$1-$2");
      return v;
  
  }

  export const cardMask = value => {
    var v;
    v=value.replace(/\D/g,"");
    v= v.match(/(\d{0,4})/g).join(" ").trim() 
    return v;
}