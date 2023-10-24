import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fecth Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fecth nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -7.0477367,
      longitude: -34.8521541,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -6.9923722,
      longitude: -34.9002232,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.0477367,
      userLongitude: -34.8521541,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  // it('should be able to fetch paginated gyms history', async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymsRepository.create({
  //       title: `Typescript Gym ${i}`,
  //       description: null,
  //       phone: null,
  //       latitude: -7.0477367,
  //       longitude: -34.8521541,
  //     })
  //   }

  //   const { gyms } = await sut.execute({
  //     query: 'Typescript',
  //     page: 2,
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ title: 'Typescript Gym 21' }),
  //     expect.objectContaining({ title: 'Typescript Gym 22' }),
  //   ])
  // })
})
