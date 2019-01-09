import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  constructor(private http: Http) { }

  usuario: any = {
    nome: null,
    email: null
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
  }

  consultaCEP(cep, form) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, form) {
    var end = JSON.parse(dados._body);

    form.setValue({
      nome: form.value.nome,
      email: form.value.email,
      cep: end.cep,
      rua: end.logradouro,
      numero: '',
      complemento: end.complemento,
      bairro: end.bairro,
      cidade: end.localidade,
      estado: end.uf

    });
  }

}
