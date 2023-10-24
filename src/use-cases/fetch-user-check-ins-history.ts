import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'

interface FetchUserCheckInsHistoryCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryCaseRequest): Promise<FetchUserCheckInsHistoryCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
