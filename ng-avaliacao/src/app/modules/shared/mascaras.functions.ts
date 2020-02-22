
export class MascarasFunctions {

  public static telefone = function (valor: string) {
    var tamanho = valor ? valor.match(/\d/g) ? valor.match(/\d/g).length : 0 : 0;
    if (tamanho <= 10) {
      return ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    } else {
      return ['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    }
  }


  public static numerico = function (valor: string) {
    var tamanho = valor ? valor.match(/\d/g) ? valor.match(/\d/g).length : 0 : 0;
    let mask = [];
    for (let i = 0; i < tamanho; i++) {
      mask.push(/[0-9]/);
    }
    return mask;
  }

  public static data = function (valor: string) {
    return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  }

  public static cpf = function (valor: string) {
    return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  }

  public static semEspaco = function (valor: string) {
    var tamanho = valor ? valor.match(/[^\s]/g) ? valor.match(/[^\s]/g).length : 0 : 0;
    let mask = [];
    for (let i = 0; i < tamanho; i++) {
      mask.push(/[^\s]/);
    }
    return mask;
  }


}
