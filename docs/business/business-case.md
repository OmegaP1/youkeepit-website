# YouKeepIt — Business Case

**Status:** founder go/no-go; pre-funding.
**Last updated:** 2026-04-28.

This is the founder's contract — re-read before any major pivot, change deliberately with a date and reason.

---

## Decisions locked

| Decision | Choice |
|---|---|
| **ICP** | EU mid-market (50–500 employees), regulated industries (finance, legal, healthcare, professional services, software) |
| **Buyer** | IT Director with CISO co-sign |
| **Wedge** | Stay-in-house resale + EU-native, GDPR-first |
| **Geography** | UK + Ireland + Netherlands + Nordics first; DACH expansion follows |
| **Pricing model** | 15% take-rate (free under 100 emp), €99/mo Pro tier above 100 emp, custom Enterprise (SaaS contract) |
| **Funding plan** | Bootstrap to month 12 → pre-seed €600K at ~€4M post-money |
| **Kill criteria** | 10 interviews by month 3, 3 design partners by month 6, 5 paying by month 12 — miss any, reassess |

---

## Wedge statement

> The only EU-native platform that lets your employees buy their own departing devices, instead of shipping them to a third-party reseller. Compliant with GDPR by design — the data and the device never leave your corporate trust boundary.

---

## Market

| Layer | Number | Source / assumption |
|---|---|---|
| EU+UK companies, 50–1000 employees | ~325,000 | Eurostat SBS 2022, ONS 2023 |
| Annual device flow through these companies | ~13.6M | 1.1 device/employee × 25% refresh + 12% churn − 30% overlap |
| **TAM (15% take, €600 avg residual)** | **€1.22B/yr** | Cross-checks vs Mordor Intelligence ITAD 2024 (~€2.1B) |
| **SAM (wedge × regulated × launch geos)** | **€134M/yr** | TAM × 0.55 × 0.50 × 0.40 |
| Year-3 SOM (bottom-up) | €380K take revenue | 100 paying customers × 42 devices/yr × €90 take |

The €1.2B–€2.1B EU ITAD market is real and well-funded — Foxway alone does €200M+ EMEA revenue.

---

## Unit economics

Pro-tier customer (200 employees) baseline:

```
SaaS:        €99/mo × 12 = €1,188/yr
Take-rate:   42 devices × €600 × 10% = €2,520/yr
Total ARR:   €3,708/yr
Gross margin (Stripe + infra): ~85%
Gross profit per customer:     €3,150/yr
```

| Metric | Target | Investor bar |
|---|---|---|
| CAC (blended, post product-market fit) | €1,500–2,000 | < €3,000 for SMB SaaS |
| Payback | ~7 months | < 12 months |
| LTV (3.5yr life × NRR 105%) | ~€11,500 | — |
| LTV:CAC | ~6.4× | > 3× |

The unit economics close. The risk is hitting the CAC assumption — unknown until Phase 2 testing.

---

## Trajectory

| Month | Customers | ARR-eq |
|---|---|---|
| 12 | 5 | €10K |
| 18 (post-raise) | 25 | €75K |
| 24 | 60 | €210K |
| 30 | 120 | €444K |
| 36 | 200 | €760K |

Year-3 below the €1M Series A bar but in the credible zone — Series A in month 30–36 with €500K+ ARR and 15%+ MoM growth.

---

## Validation plan

### Phase 0 — Month 0–3: pain validation (10 interviews)

- 4 IT Directors / 3 CISOs / 2 People-Ops / 1 IT Asset Manager
- Channels: LinkedIn Sales Nav cold outreach, personal network, paid intros via EU ITAD consultants
- Cost: ~€1,000 cash
- **Validated when:** 6 of 10 describe the pain unprompted, 4+ commit to piloting

### Phase 1 — Month 3–6: design partners (3 partners)

- Convert 4+ "would pilot" → 3 signed design partner agreements (free use, biweekly feedback, 10 device list commitment, conditional paid commit)
- Build: company onboarding flow, CSV device import, employee marketplace flow, Blancco/BitRaser wipe partnership, GDPR posture page
- Cost: ~€2,000 cash
- **Validated when:** 3 signed partners, 30+ devices listed, 10+ transactions, named willingness-to-pay

### Phase 2 — Month 6–12: first paying customers (5 paying)

- Convert design partners → paid (≥2/3 at full price minus discount)
- Acquire 2 more via content/SEO + LinkedIn outbound + MSP partnerships
- Prepare pre-seed pitch deck
- Cost: ~€10,000 cash
- **Validated when:** 5 paying, €5–15K MRR-eq, repeatable channel identified

### Cumulative cost of Phase 0–2

**~€13,000 cash + ~1,300 hours of founder time over 12 months.**

---

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| **Demand-side liquidity** — companies sign up but employees don't buy | Design-partner contracts mandate listing volume; case studies showing employee adoption |
| **CAC unknown** | Test 4 channels in parallel from month 6; kill losers fast |
| **Compliance perception** ("you're a startup, we're a regulated bank") | EU data residency from day 1; Blancco partnership for wipe credibility; ISO 27001 readiness in year 2 |
| **Incumbents** (Foxway, Cascade, Back Market for Business) | Wedge: stay-in-house and EU-native are things they can't easily copy without restructuring |

---

## What this case is NOT

- Not a fundraise deck. It's the founder's working memo.
- Not a guarantee. Most pre-seed companies don't reach Series A.
- Not committed to forever. Re-read every quarter; change deliberately, with a date and a reason.
