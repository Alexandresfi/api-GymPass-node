import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'

import { InMemoryChekInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let chekInsRepository: InMemoryChekInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    chekInsRepository = new InMemoryChekInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(chekInsRepository, gymsRepository)

    vi.useFakeTimers()

    gymsRepository.items.push({
      description: '',
      id: 'gym-01',
      latitude: new Decimal(-7.15173),
      longitude: new Decimal(-34.8513787),
      phone: '',
      title: '',
    })
  })

  afterEach(() => {
    vi.useFakeTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.15173,
      userLongitude: -34.8513787,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in in twice bu in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.15173,
      userLongitude: -34.8513787,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -7.15173,
        userLongitude: -34.8513787,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.15173,
      userLongitude: -34.8513787,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.15173,
      userLongitude: -34.8513787,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      description: '',
      id: 'gym-02',
      latitude: new Decimal(-7.1469596),
      longitude: new Decimal(-34.8493869),
      phone: '',
      title: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -7.0477367,
        userLongitude: -34.8521541,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
