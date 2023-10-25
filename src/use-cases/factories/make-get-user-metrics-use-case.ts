import { GetUserMetricsCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const UseCase = new GetUserMetricsCase(checkInsRepository)

  return UseCase
}
