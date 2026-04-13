# Investment Calculator App

---

### Packages

- **Backend**
  - express
  - cors
  - jsonwebtoken
  - bcrypt
  - drizzle-orm
  - drizzle-kit
  - mysql2
  - papaparse
  - file-type

- **Frontend**
  - react
  - react-dom
  - vite
  - @tanstack/router
  - @tanstack/react-query
  - @tanstack/react-form
  - shadcn
  - tailwindcss
  - storybook
  - clsx

- **Shared**
  - @trpc
  - zod
  - turborepo
  - vitest

---

## 🧭 UI Paths

### 🌐 Public Routes
- `/login`
- `/register`

### 🔒 Protected Routes
- `/` → Dashboard (list investments)
- `/profile` → View & update name, email, avatar
- `/profile/update-password` → Update password
- `/investments/create` → Create investment
- `/investments/$id` → View/Update investment details

---

## 🔌 Procedures

- `ping` (Server status)

### 🔐 Auth
- `auth.register`
- `auth.login`
- `auth.logout`
- `auth.refresh` (returns an updated access token)
- `auth.me`      (returns user)

### 👤 Profile
- `profile.update`         (name, email)
- `profile.passwordUpdate`
- `profile.avatar.update`
- `profile.avatar.delete`

### 💼 Investment
- `investment.scheme.list`
- `investment.scheme.rates`
- `investment.create`
- `investment.list`
- `investment.getById`
- `investment.update`
- `investment.delete`

---

## 🗄️ Database Schema

### 🧑 Users

| Column      | Type        | Notes             |
|------------ |------------ |------------------ |
| id          | UUID (PK)   | Primary key       |
| name        | string      | Required          |
| email       | string      | Unique, required  |
| password    | string      | Required          |
| avatar_url  | string      | Nullable          |
| created_at  | timestamp   | Default now()     |
| updated_at  | timestamp   | Auto-updated      |

---

### 🔐 Tokens

| Column      | Type        | Notes                     |
|------------ |------------ |-------------------------- |
| id          | UUID (PK)   | Primary key               |
| user_id     | UUID (FK)   | References users.id       |
| token       | string      | Refresh token             |
| created_at  | timestamp   | Default now()             |
| updated_at  | timestamp   | Auto-updated              |
| expires_at  | timestamp   | 30 Days                   |

---

### 🏦 Schemes

| Column            | Type       | Notes                   |
|------------------ |----------- |------------------------ |
| id                | UUID (PK)  | Primary key             |
| type              | string     | Type of the scheme      |
| investment_type   | enum       | LUMP_SUM / RECURRING    |
| compounding_type  | enum       | QUARTERLY / NONE        |
| created_at        | timestamp  | Default now()           |
| updated_at        | timestamp  | Auto-updated            |

---

### 📊 Scheme Rates

| Column        | Type       | Notes                   |
|-------------- |----------- |------------------------ |
| id            | UUID (PK)  | Primary key             |
| scheme_id     | UUID (FK)  | References schemes.id   |
| tenure_months | integer    | 3, 6, 9, 12...          |
| regular_rate  | decimal    | e.g. 6.5                |
| senior_rate   | decimal    | e.g. 7.0                |
| created_at    | timestamp  | Default now()           |
| updated_at    | timestamp  | Auto-updated            |

---

### 💼 Investments

| Column               | Type       | Notes                         |
|--------------------- |----------- |------------------------------ |
| id                   | UUID (PK)  | Primary key                   |
| user_id              | UUID (FK)  | References users.id           |
| scheme_id            | UUID (FK)  | References schemes.id         |
| scheme_rate_id       | UUID (FK)  | References scheme_rates.id    |
| tenure_months        | integer    | Selected tenure               |
| is_senior_citizen    | boolean    | Determines rate used          |
| principal_amount     | decimal    | Nullable (FD / MIS)           |
| monthly_deposit      | decimal    | Nullable (RD)                 |
| interest_rate        | decimal    | Stored at creation time       |
| maturity_amount      | decimal    | Final calculated amount       |
| monthly_payout       | decimal    | Nullable (MIS only)           |
| created_at           | timestamp  | Default now()                 |
| updated_at           | timestamp  | Auto-updated                  |

---

## Shared

### Enums

```ts
SchemeType {
  FD,
  RD,
  MIS,
};

InvestmentType {
  LUMP_SUM,
  RECURRING,
};

CompoundingType {
  QUARTERLY,
  NONE,
};

SortByOption {
  DATE,
  RATE,
  AMOUNT,
};
```

### Constants

#### Tenures
- `TENURE_MONTHS_INTERVALS`
- `MIN_TENURE_MONTHS`
- `MAX_TENURE_MONTHS`

##### Amounts
- `MIN_INVESTMENT_AMOUNT`
- `MAX_INVESTMENT_AMOUNT`

##### Maps
- `SCHEMES`
- `COMPOUNDING_TYPE_OPTIONS`
- `INVESTMENT_TYPE_OPTIONS`
- `SORT_BY_OPTIONS`

### Utils
- `getMatchedMonths`
- `resolveInterestRate`
- `calculateFD`
- `calculateRD`
- `calculateMIS`


### Schemas
- Auth
  - `registrationSchema`
  - `loginSchema`
  - `tokensSchema`
  - `authSuccessSchema`
  - `logoutSchema`
  - `refreshSchemaInput`
  - `refreshSchemaOutput`
- Profile
  - `profileSchema`
  - `profileIdSchema`
  - `profileUpdateSchema`
  - `passwordUpdateSchema`
  - `profilePictureSchema`
- Schemes
  - `schemesSchema`
  - `schemeRateSchema`
  - `schemeRateResourceSchema`
  - `schemeRateListSchema`
  - `schemeRateResourceListSchema`
  - `createInvestmentSchema`
  - `investmentFilterSchema`
  - `investmentSchema`
  - `investmentListSchema`
  - `investmentIdSchema`
  - `updateInvestmentSchema`

---

### 📈 Schemes

| Scheme  | Type                                      | Tenure Options | Regular Rate | Senior Rate |
|---------|-------------------------------------------|----------------|--------------|-------------|
| **FD**  | Lump sum (Quarterly compounding)          |  1 yr          | 6.2%         | 6.6%        |
|         |                                           |  2 yrs         | 6.4%         | 6.9%        |
|         |                                           |  3 yrs         | 6.75%        | 7.25%       |
|         |                                           |  5 yrs         | 7.1%         | 7.5%        |
|         |                                           |  7 yrs         | 7.3%         | 7.75%       |
|         |                                           | 10 yrs         | 7.5%         | 8.0%        |
| **RD**  | Monthly deposit (Quarterly compounding)   |  0 yrs 6 mos   | 5.2%         | 5.6%        |
|         |                                           |  1 yr          | 5.4%         | 5.75%       |
|         |                                           |  1 yr  3 mos   | 5.5%         | 5.9%        |
|         |                                           |  1 yr  6 mos   | 5.7%         | 6.2%        |
|         |                                           |  2 yrs         | 5.9%         | 6.4%        |
|         |                                           |  2 yrs 6 mos   | 6.2%         | 6.7%        |
|         |                                           |  3 yrs         | 6.5%         | 7.0%        |
|         |                                           |  5 yrs         | 6.75%        | 7.25%       |
| **MIS** | Lump sum (Monthly payout, no compounding) |  3 yrs         | 6.5%         | 7.0%        |
|         |                                           |  5 yrs         | 6.8%         | 7.25%       |
|         |                                           |  7 yrs         | 7.0%         | 7.5%        |
|         |                                           | 10 yrs         | 7.2%         | 7.7%        |
