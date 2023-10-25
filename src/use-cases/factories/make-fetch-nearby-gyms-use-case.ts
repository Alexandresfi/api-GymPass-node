import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFecthNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const UseCase = new FetchNearbyGymsUseCase(gymsRepository)

  return UseCase
}
