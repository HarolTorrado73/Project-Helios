# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅        |
| 0.6.x   | ✅        |
| < 0.6   | ❌        |

## Reporting a Vulnerability

Please report security vulnerabilities to security@sentinelrecon.io.

## Security Measures

- CodeQL Analysis on all PRs
- Automated dependency scanning
- Regular security audits
- JWT-based authentication
- Role-based access control
- Audit logging

## Security Best Practices

### For Users

- Use strong passwords
- Enable 2FA
- Keep software updated
- Follow least privilege principle

### For Developers

- Never commit secrets
- Use environment variables
- Validate all inputs
- Sanitize scan outputs
- Follow OWASP guidelines