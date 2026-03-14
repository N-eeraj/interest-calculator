const NAME_VALIDATIONS = {
  required: "Please enter a name",
} as const;

const EMAIL_VALIDATIONS = {
  required: "Please enter an email",
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
} as const;
