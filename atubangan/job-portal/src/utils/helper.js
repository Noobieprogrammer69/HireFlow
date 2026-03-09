export const cleanErrors = (errors) => {
  const cleaned = { ...errors };

  Object.keys(cleaned).forEach((key) => {
    const value = cleaned[key];

    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete cleaned[key];
    }
  });

  return cleaned;
};

export const validateEmail = (email) => {
  if (!email.trim()) return ["Email is required"];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email))
    return ["Please enter a valid email address"];

  return [];
};

export const validatePassword = (password) => {
  const passwordRules = [
    { regex: /.{8,}/, message: "Must be at least 8 characters" },
    { regex: /[a-z]/, message: "Must include a lowercase letter" },
    { regex: /[A-Z]/, message: "Must include an uppercase letter" },
    { regex: /\d/, message: "Must include a number" },
    {
      regex: /[@$!%*?&]/,
      message: "Must include a special character (@$!%*?&)",
    },
  ];

  if (!password) return ["Password is required"];

  return passwordRules
    .filter((rule) => !rule.regex.test(password))
    .map((rule) => rule.message);
};

export const validateAvatar = (file) => {
  if (!file) return "";

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.type)) {
    return "Avatar must be a JPG or PNG file";
  }

  const maxSize = 2 * 1024 * 1024;

  if (file.size > maxSize) {
    return "Avatar must be less than 2MB";
  }

  return "";
};

export const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);

export const getInitials = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};