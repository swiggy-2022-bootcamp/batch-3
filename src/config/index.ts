export const mongoUrl = (): string => {
  const configs = {
    dbAccess: process.env.DB_ACCESS || "local",
    user: process.env.DB_USER || "",
    pass: process.env.DB_PASS || "",
    cluster: process.env.DB_CLUSTER || "",
    db: process.env.DB || "week-0"
  };

  if (configs.dbAccess === "local") {
    return `mongodb://localhost:27017/${configs.db}`;
  }
  return `mongodb+srv://${configs.user}:${configs.pass}@${configs.cluster}.mongodb.net/${configs.db}?retryWrites=true`;
};


export const configCors = {
  // Allow your domains to restrict ill apis.
  allowOrigin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:8081',
  ],
  // Expose additional which are restricted.
  exposedHeaders: ["X-Auth"]
};

export const rateLimitConfig = {
  inTime: process.env.REQUEST_TIME || 60 * 1000,
  maxRequest: process.env.MAX_REQUEST || 60
};

export const commonConfig = {
  jwtSecretKey: process.env.SECRET_KEY || "some-secret-key",
  pageSizeLimit: 15,
};


