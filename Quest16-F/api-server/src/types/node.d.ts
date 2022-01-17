declare namespace NodeJS {
  interface Process {
    isServer: boolean
  }
  interface ProcessEnv {
    JWT_KEY : string
    DB_NAME : string
    DB_USER : string
    DB_PASSWORD : string
  }
}
