//Validacion LOGIN de formulario con Jquery
$("#formulario").validate({
  rules : {
    username : {
      maxlength : 12,
      minlength : 4,
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
      maxlength : "Máximo de 12 caracteres",
      minlength: "Mínimo de 4 carácteres",
      required : "Campo obligatorio"
    },

    password : {
      maxlength : "Máximo de 20 caracteres",
      minlength : "Mínimo de 8 carácteres",
      required : "Campo obligatorio"
    }
}, //fin de los mensajes
}); //fin validate
  