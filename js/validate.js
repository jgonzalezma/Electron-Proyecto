//Validacion LOGIN de formulario con Jquery
$("#formulario").validate({
  rules : {
    username : {
      maxlength : 3,
      required : true
    },

    password : {
      maxlength : 20,
      minlength : 8,
      required : true
    }

  }, //fin de las reglas, rules

  messages : {
    username : {
      maxlength : "Máximo 3 caracteres",
  required : "Campo obligatorio"
    },

    password : {
      maxlength : "Máximo 20 caracteres",
      minlength : "Mínimo de 8 carácteres",
      required : "Campo obligatorio"
    }
}, //fin de los mensajes
}); //fin validate
  