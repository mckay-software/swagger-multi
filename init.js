$(function () {
  $('#input_baseUrl').html(apis.map(function (api) {
    return '<option value="$url">$name</option>'
      .replace('$url', api.url)
      .replace('$name', api.name);
  }).join());

  window.swaggerUi = new SwaggerUi({
    url: apis[0].url,
    validatorUrl: null,
    dom_id: "swagger-ui-container",
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    onComplete: function(swaggerApi, swaggerUi){
      $('pre code').each(function(i, e) {
        hljs.highlightBlock(e)
      });

      addApiKeyAuthorization();
    },
    onFailure: function(data) {
      log("Unable to Load SwaggerUI");
    },
    docExpansion: "none",
    apisSorter: "alpha",
    showRequestHeaders: false
  });

  function addApiKeyAuthorization(){
    var key = encodeURIComponent($('#input_apiKey')[0].value);
    if(key && key.trim() != "") {
        var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("api_key", key, "query");
        window.swaggerUi.api.clientAuthorizations.add("api_key", apiKeyAuth);
        log("added key " + key);
    }
  }

  $('#input_apiKey').change(addApiKeyAuthorization);

  // if you have an apiKey you would like to pre-populate on the page for demonstration purposes...
  /*
    var apiKey = "myApiKeyXXXX123456789";
    $('#input_apiKey').val(apiKey);
  */

  window.swaggerUi.load();

  function log() {
    if ('console' in window) {
      console.log.apply(console, arguments);
    }
  }
});

