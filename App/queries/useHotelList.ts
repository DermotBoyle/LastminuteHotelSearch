import { useQuery } from "react-query"
import { HotelDetails } from "./GetHotelListQuery"

export const useHotelList = () => useQuery<HotelDetails[], Error>('getHotels', getHotels )

const getHotels = async () => {
  const res = await fetch(
    'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507',
  )

  if (!res.ok) {
    throw Error(`Error from [getHotels]; status=${res.status} ${await res.text()} `)
  }

  const data = await res.json()

  return data
}
