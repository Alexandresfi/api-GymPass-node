import { CheckInRepository } from '@/repositories/check-in-repository'

interface GetUserMetricsCaseRequest {
  userId: string
}

interface GetUserMetricsCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsCaseRequest): Promise<GetUserMetricsCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
