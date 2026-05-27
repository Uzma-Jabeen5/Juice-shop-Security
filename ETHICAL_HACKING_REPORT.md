# Ethical Hacking Report — OWASP Juice Shop
**Intern:** Uzma Jabeen  
**Organization:** DevelopersHub Corporation  
**Week:** 5  
**Target:** OWASP Juice Shop v19.2.1 — http://localhost:3000  
**Environment:** Kali Linux  

---

## Tools Used
| Tool | Purpose |
|------|---------|
| Nmap | Port scanning & service enumeration |
| Gobuster | Directory & endpoint brute-forcing |
| Nikto | Web vulnerability scanning |
| SQLMap | SQL injection testing |
| Burp Suite | CSRF & request interception testing |
| curl | Manual API endpoint testing |

---

## Findings
| Finding | Severity | Status |
|---------|----------|--------|
| `/ftp` directory publicly exposed | HIGH | Identified |
| `/api/Products` — no auth required | HIGH | Identified |
| `/api/Feedbacks` — no auth required | HIGH | Identified |
| `/api/Challenges` — no auth required | HIGH | Identified |
| `incident-support.kdbx` password DB exposed | CRITICAL | Identified |
| `/dump.pem` certificate file exposed | HIGH | Identified |
| `/site.tar.bz2` backup file exposed | HIGH | Identified |
| SQLMap blocked by rate limiter (429) | HIGH | ✅ Mitigated |
| SQL Injection via `/rest/user/login` | HIGH | ✅ Mitigated |
| CSRF attacks on state-changing requests | HIGH | ✅ Mitigated |

---

## Fixes Implemented

### Week 2
- `inputValidation.js` — Input sanitization
- `passwordSecurity.js` — Password strength enforcement
- `jwtAuth.js` — JWT authentication hardening
- `logger.js` — Security event logging

### Week 4
- `loginTracker.js` — Login attempt tracking
- `rateLimiter.js` — Rate limiting (429 after 10 attempts)
- `apiKeyAuth.js` — API key authentication
- `corsConfig.js` — CORS policy enforcement
- `securityHeaders.js` — HTTP security headers

### Week 5
- `sqlProtection.js` — SQL injection pattern blocking
- `secureQueries.js` — Parameterized query enforcement
- `csrfProtection.js` — CSRF token validation

---

## Verification Results
| Test | Expected | Result |
|------|----------|--------|
| Rate limiter | 429 after 10 attempts | ✅ Confirmed |
| Security headers | Present on all responses | ✅ Confirmed |
| SQL injection | Blocked by middleware | ✅ Confirmed |
| CSRF without token | 403 Forbidden | ✅ Confirmed |
| CSRF with valid token | 401 (passes CSRF, fails auth) | ✅ Confirmed |

---

## Recommendations (Unmitigated)
1. Disable or require authentication for `/ftp` directory
2. Add authentication to `/api/Products`, `/api/Feedbacks`, `/api/Challenges`
3. Remove or secure exposed files: `incident-support.kdbx`, `/dump.pem`, `/site.tar.bz2`
