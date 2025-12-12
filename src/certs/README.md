# JWT Certificates

This directory contains RSA key pairs for JWT token signing.

## Files

- `private.pem` - Private key for signing JWT tokens (RS256)
- `public.pem` - Public key for verifying JWT tokens (RS256)

## Security

**IMPORTANT**: Never commit these files to version control. They are included in `.gitignore`.

## Generating New Keys

To generate a new RSA key pair:

```bash
# Generate private key
openssl genrsa -out private.pem 2048

# Generate public key from private key
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

## Usage

These keys are used by `src/utils/jwt.ts` for:
- Signing access tokens (using private key)
- Verifying access tokens (using public key)

Refresh tokens use HMAC-SHA256 with the `JWT_SECRET` from environment variables.
