import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to gym', async () => {
    const { gym } = await sut.execute({
      title: 'Teste Gym',
      description: null,
      phone: null,
      latitude: -7.0477367,
      longitude: -34.8521541,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
