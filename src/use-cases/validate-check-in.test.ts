import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryChekInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let checkInsRepository: InMemoryChekInRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryChekInRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    // gymsRepository.items.push({
    //   description: '',
    //   id: 'gym-01',
    //   latitude: new Decimal(-7.15173),
    //   longitude: new Decimal(-34.8513787),
    //   phone: '',
    //   title: '',
    // })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useFakeTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('sohul not be able to validate the check-in after 20 minutes of ots creatiion', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOnewMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOnewMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
