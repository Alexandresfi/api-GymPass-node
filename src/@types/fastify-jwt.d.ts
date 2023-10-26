import '@fastify/jwt'

declare module '@fastufy/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
    }
  }
}
