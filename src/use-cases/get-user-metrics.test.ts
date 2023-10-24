import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryChekInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { GetUserMetricsCase } from './get-user-metrics'

let chekInsRepository: InMemoryChekInRepository
let sut: GetUserMetricsCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    chekInsRepository = new InMemoryChekInRepository()
    sut = new GetUserMetricsCase(chekInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await chekInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await chekInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
