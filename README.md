# Dinosauth

**In browser authentication secured using asymmetric key cryptography.**

We are currently setting up for stage 1, watch this space.

## Stage 1, Open ID connect (OIDC) browser compatibility

OpenID Connect 1.0 is a simple identity layer on top of the OAuth 2.0 protocol.
Self-Issued OpenID Providers allow a client to authenticate without any reliance on a server based service.

Reference: https://openid.net/specs/openid-connect-core-1_0.html#SelfIssued

#### Goals

- [x] Authenticate in multipage applications using the `form_post` response mode.
- [ ] Authenticate in Single Page Applications (SPA) using the `fragment` response mode.
