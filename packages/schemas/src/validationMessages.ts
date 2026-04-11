import { INVESTMENT_INTERVALS } from "@app/definitions/constants/scheme/amounts";
import { TENURE_MONTHS_INTERVALS } from "@app/definitions/constants/scheme/tenures";

const NAME_VALIDATIONS = {
  required: "Please enter a name",
} as const;

const EMAIL_VALIDATIONS = {
  required: "Please enter an email",
  valid: "Please enter a valid email",
} as const;

const PASSWORD = {
  required: "Please enter a password"
}

const NEW_PASSWORD = {
  ...PASSWORD,
  minLength: "Please enter at least 6 characters",
  lowercaseRequired: "Please include at least 1 lowercase",
  uppercaseRequired: "Please include at least 1 uppercase",
  numberRequired: "Please include at least 1 number",
  format: "Invalid password format",
  passwordReuse: "The new password cannot be the same as the old password",
} as const;

export const AUTH = {
  register: {
    name: {
      ...NAME_VALIDATIONS,
    },
    email: {
      ...EMAIL_VALIDATIONS,
    },
    password: {
      ...NEW_PASSWORD,
    },
  },
  login: {
    email: {
      ...EMAIL_VALIDATIONS,
    },
    password: {
      ...PASSWORD,
    },
  },
} as const;

export const PROFILE = {
  name: {
    ...NAME_VALIDATIONS,
  },
  email: {
    ...EMAIL_VALIDATIONS,
  },
  picture: {
    required: "Please select an image",
    maxSize: "Please use a smaller file (Max 1MB)",
    valid: "Invalid file format, use (jpg, jpeg, png, webp, avif, heic, gif)",
  },
  updatePassword: {
    password: {
      ...PASSWORD,
    },
    newPassword: {
      ...NEW_PASSWORD,
    },
  },
} as const;

const AMOUNT = {
  valid: "Please enter a valid amount",
  required: "Please enter an amount",
} as const;

export const INVESTMENT = {
  create: {
    schemeId: {
      required: "Scheme id is required",
    },
    investment: {
      ...AMOUNT,
      step: `Amount must be in multiples of ${INVESTMENT_INTERVALS}`,
    },
    tenureMonths: {
      required: "Please select a tenure",
      step: `Tenure must be in multiples of ${TENURE_MONTHS_INTERVALS} months.`,
    },
    isSeniorCitizen: {
      valid: "Please select a valid boolean value"
    },
  },
} as const;
