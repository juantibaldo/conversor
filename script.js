/* currency list: https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json */


$(document).ready(function () {
  $(".toggle-this").hide();
  $(".toggle-this").delay(1000).slideToggle();

  let pesosIngresados = $("#pesosIngresados");
  let boton = $("#botonConversor");
  let impuestoPais = $("#checkImpuesto");
  let monedaSeleccionada = $("#monedaSeleccionada");

  function sumarImpuesto(divisa) {
    return impuestoPais.prop("checked") ? divisa * 0.7 : divisa;
  }

  function convertir(monto, divisa) {
    let newDivisa = sumarImpuesto(divisa);
    return monto * newDivisa;
  }

  function quiereImpuestoPais(impuestoPais) {
    return impuestoPais.prop("checked")
      ? " y quiere sumarle el impuesto PAIS."
      : " y no quiere sumarle el impuesto PAIS.";
  }

  function getCotizacionFromApi(currency) {
    const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/ars/${currency}.json`;

    $.get(url, function (respuesta, estado) {
      if (estado === "success") {
        let valorConvertido = convertir(
          pesosIngresados.val(),
          respuesta[currency]
        );

        $("#value2").val(valorConvertido.toFixed(2));

        console.log(
          "$" +
            pesosIngresados.val() +
            " pesos son $" +
            valorConvertido +
            " " +
            currency
        );
        return respuesta[currency];
      }
    });
  }

  pesosIngresados.click((e) => {
    console.log("'Ingresar pesos' presionado");
  });
  monedaSeleccionada.click((e) => {
    console.log("'Seleccionar moneda'presionado");
  });
  impuestoPais.click((e) => {
    console.log("Seleccionar casilla 'impuesto PAIS' presionado");
  });

  boton.click(function () {
    switch (monedaSeleccionada.val()) {
      case "USD":
        getCotizacionFromApi("usd");
        break;

      case "EUR":
        getCotizacionFromApi("eur");
        break;

      case "CHF":
        getCotizacionFromApi("chf");
        break;

      case "JPY":
        getCotizacionFromApi("jpy");
        break;

      case "GBP":
        getCotizacionFromApi("gbp");
        break;    

      default:
        console.log("No seleccionó divisa");
        alert("Debe seleccionar una divisa!");
    }

    console.log(
      "El usuario ingresó pesos(ARS): $" +
        pesosIngresados.val() +
        ", quiere cambiarlos a " +
        monedaSeleccionada.val() +
        quiereImpuestoPais(impuestoPais)
    );

    const arrayPesos = [];
    arrayPesos.push(
      pesosIngresados.val(),
      monedaSeleccionada.val(),
      impuestoPais.prop("checked")
    );
    console.table(arrayPesos);

    const ultimaCotizacion = {
      value: pesosIngresados.val(),
      divisa: monedaSeleccionada.val(),
      impuesto: impuestoPais.val(),
    };

    localStorage.setItem("pesos", pesosIngresados.val());
    localStorage.setItem("divisa", monedaSeleccionada.val());
    localStorage.setItem("impuesto PAIS", impuestoPais.prop("checked"));

    const guardado = JSON.stringify(ultimaCotizacion);
    console.log(guardado);
  });
});
