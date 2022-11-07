export const applicationConfig = {
  env: process.env,
  port: "3000",

  // Matrix
  matrix: {
    homeServerUrl:
      process.env.NEXT_PUBLIC_MATRIX_HS_URL || "https://matrix.org",
    username: process.env.NEXT_PUBLIC_MATRIX_USER,
    password: process.env.NEXT_PUBLIC_MATRIX_PASSWORD,
  },
};
