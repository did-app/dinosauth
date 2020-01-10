// switching the top url works if in an iframe or not.
// form post works if in the iframe or not
(async function() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("client_id");
  const responseMode = params.get("response_mode") || "form_post";

  const keyPair = await Keypairs.generate({
    kty: "ECDSA",
    namedCurve: "P-256"
  });

  var kid = keyPair.public.kid;
  delete keyPair.public.kid;

  const signedToken = await Keypairs.signJwt({
    jwk: keyPair.private,
    iss: "https://self-issued.me",
    // NOTE at this point there is no revoktion so no expiry process.
    exp: "1h",

    claims: {
      aud: redirect,
      sub: kid,
      sub_jwk: keyPair.public
    }
  });

  if (responseMode == "form_post") {
    window.authenticate = function authenticate(event) {
      formPost(signedToken, redirect);
    };
  } else {
    throw "unknown response mode";
  }
})();

function formPost(signedToken, callbackUrl) {
  var $form = document.createElement("form");
  var $input = document.createElement("input");

  $form.method = "POST";
  $form.action = callbackUrl;

  $input.type = "hidden";
  $input.name = "id_token";
  $input.value = signedToken;
  $form.appendChild($input);

  // https://stackoverflow.com/a/27386102/1187299
  // form must be appended to body to post
  document.body.appendChild($form);

  $form.submit();
}
