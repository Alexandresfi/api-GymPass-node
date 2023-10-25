import { FetchUserCheckInsHistoryCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const UseCase = new FetchUserCheckInsHistoryCase(checkInsRepository)

  return UseCase
}
