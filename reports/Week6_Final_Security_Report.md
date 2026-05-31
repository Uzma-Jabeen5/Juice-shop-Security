# Week 6 Final Security Audit Report
## OWASP Juice Shop v19.2.1
## Student: Uzma Jabeen | DevelopersHub Corporation
## Date: 31 May 2026

---

## 1. Executive Summary
This report documents the complete security audit performed
on OWASP Juice Shop v19.2.1 during Week 6. All major 
vulnerability categories were tested and mitigated.

- Total Tests Performed: 5
- Tests Passed: 5/5
- Hardening Score: 62/100 (Lynis)
- Overall Risk: LOW (after fixes)

---

## 2. Tools Used
| Tool | Version | Purpose |
|------|---------|---------|
| OWASP ZAP | 2.17.0 | Web app scanning |
| Nikto | 2.5.0 | Web server scanning |
| Lynis | 3.1.6 | System hardening |
| Burp Suite | 2025.10.6 | Penetration testing |
| UFW | - | Firewall |
| ClamAV | 1.4.4 | Malware scanner |

---

## 3. ZAP Scan Results
| Finding | Risk | Status |
|---------|------|--------|
| CSP unsafe-inline | Medium | FIXED |
| Cookie No HttpOnly | Low | FIXED |
| Timestamp Disclosure | Low | FIXED |
| HSTS | Info | PRESENT |

---

## 4. Nikto Scan Results
| Finding | Risk | Status |
|---------|------|--------|
| /ftp exposed | Medium | Documented |
| /public exposed | Low | Documented |
| Backup cert file | Medium | Documented |
| 77 items reported | - | Reviewed |

---

## 5. Lynis Audit Results
- Hardening Index: 62/100
- Tests Performed: 270
- Firewall: ENABLED (UFW)
- Malware Scanner: INSTALLED (ClamAV)
- Intrusion Software: PRESENT

---

## 6. Penetration Test Results
| Test | Method | Result | Status |
|------|--------|--------|--------|
| XSS | Burp Browser | Script blocked | PASS ✅ |
| SQL Injection | Burp Intercept | 403 Forbidden | PASS ✅ |
| IDOR | Direct URL | 401 Unauthorized | PASS ✅ |
| Rate Limiting | curl x15 | 403 all requests | PASS ✅ |
| Security Headers | HTTP History | All present | PASS ✅ |

---

## 7. Security Fixes Applied (Weeks 1-6)
1. helmet.js - Security headers
2. cspConfig.js - Content Security Policy
3. corsConfig.js - CORS configuration
4. rateLimiter.js - Rate limiting
5. csrfProtection.js - CSRF tokens
6. inputValidation.js - Input sanitization
7. jwtAuth.js - JWT authentication
8. securityHeaders.js - Additional headers
9. UFW Firewall - Ports 22, 3000
10. ClamAV - Malware scanning
11. Dependabot - Dependency scanning

---

## 8. OWASP Top 10 Compliance
| # | Vulnerability | Status |
|---|--------------|--------|
| A01 | Broken Access Control | FIXED ✅ |
| A02 | Cryptographic Failures | FIXED ✅ |
| A03 | Injection | FIXED ✅ |
| A05 | Security Misconfiguration | FIXED ✅ |
| A07 | Auth Failures | FIXED ✅ |

---

## 9. Conclusion
All critical security vulnerabilities identified during
Weeks 1-6 have been successfully mitigated. The application
now implements defense-in-depth security with multiple
layers of protection including input validation, CSRF
protection, rate limiting, security headers, and firewall.
