export interface Booking {
  id?: number
  title: string
  eventType: string
  date: string
  startTime: string
  endTime: string
  responsiblePerson: string
  comment?: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export interface Employee {
  id: number
  name: string
  email: string
  avatar?: string
  description?: string
  isInvited?: boolean
}

export interface TimeSlot {
  time: string
  isBooked: boolean
  bookingId?: number
}