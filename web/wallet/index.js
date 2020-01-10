// switching the top url works if in an iframe or not.
// form post works if in the iframe or not
(async function() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("client_id");

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

  window.authenticate = function authenticate(event) {
    window.top.location.replace(redirect + "?id_token=" + signedToken);
  };
})();
