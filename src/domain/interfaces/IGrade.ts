export interface IGrade {
  readonly id: number|null
  readonly student: string
  readonly subject: string
  readonly type: string
  readonly value: number
  readonly timestamp: string
}
