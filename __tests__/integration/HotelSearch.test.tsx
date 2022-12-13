import * as React from 'react'
import HotelSearchPage from '../../App/domains/HotelSearchPage'
import { fireEvent, render, screen } from '../test-utils'
import { useHotelList } from "../../App/queries/useHotelList"
import { SortSelectionLabels } from '../../App/types/SortTypes'

// Solves TypeScript Errors
const mockedUseHotelList = useHotelList as jest.Mock<any>

// Mock the module
jest.mock("../../App/queries/useHotelList")

describe("<HotelSearch />", () => {
  beforeEach(() => {
    mockedUseHotelList.mockImplementation(() => ({ isLoading: true }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    render(<HotelSearchPage />)
  })

  it("calls the useHoteList hook", () => {
    render(<HotelSearchPage />)
    expect(useHotelList).toHaveBeenCalled()
  })

  it("Displays loading indicator", () => {
    const { getByText } = render(<HotelSearchPage />)
    expect(getByText(/Loading.../i)).toBeDefined()
  })

  it("Displays error message", () => {
    mockedUseHotelList.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      error: { message: "Unable to fetch the hotel data" },
    }))
    const { getByText, queryByText } = render(<HotelSearchPage />)

    expect(queryByText(/fetching data/i)).toBeFalsy() // We don't want the loading flag to be displayed
    getByText(/Request Failed/i)
  })

  it("Displays data", () => {
    const mockedHotelData = [ {
      id: 12321,
      name: "Park Plaza London Waterloo",
      location: {
        address: "6 Hercules Road",
        city: "London",
        latitude: 51.49845,
        longitude: -0.11343,
      },
      stars: 4,
      checkIn: {
        from: "14:00",
        to: "20:00",
      },
      checkOut: {
        from: "07:00",
        to: "10:00",
      },
      contact: {
        phoneNumber: "+39 24322342",
        email: "park_plaza@gmail.com",
      },
      gallery: [
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1499779963/Swindon_yjsrwz.jpg",
      ],
      userRating: 9.8,
      price: 120,
      currency: "EUR",
    } ]
    mockedUseHotelList.mockImplementation(() => ({ isLoading: false, data: mockedHotelData }))

    const { getByText, queryByText } = render(<HotelSearchPage />)

    // We don't want the loading flag to be displayed
    expect(queryByText(/Loading.../i)).toBeFalsy()

    getByText(mockedHotelData[0].name)
    getByText(new RegExp(mockedHotelData[0].price.toString()))
  })

  it("Displays correct hotel star icons", () => {
    const mockedHotelData = [ {
      id: 12321,
      name: "Park Plaza London Waterloo",
      location: {
        address: "6 Hercules Road",
        city: "London",
        latitude: 51.49845,
        longitude: -0.11343,
      },
      stars: 4,
      checkIn: {
        from: "14:00",
        to: "20:00",
      },
      checkOut: {
        from: "07:00",
        to: "10:00",
      },
      contact: {
        phoneNumber: "+39 24322342",
        email: "park_plaza@gmail.com",
      },
      gallery: [
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1499779963/Swindon_yjsrwz.jpg",
      ],
      userRating: 9.8,
      price: 120,
      currency: "EUR",
    } ]
    mockedUseHotelList.mockImplementation(() => ({ isLoading: false, data: mockedHotelData }))

    const { getAllByTestId, queryByText } = render(<HotelSearchPage />)

    // We don't want the loading flag to be displayed
    expect(queryByText(/Loading.../i)).toBeFalsy()

    const res = getAllByTestId('achieved-star')
    expect(res.length).toStrictEqual(mockedHotelData[0].stars)
  })
})

describe("<SortModal />", () => {

  beforeEach(() => {
    mockedUseHotelList.mockImplementation(() => ({ isLoading: true }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should sort the data by stars DESCENDING", async () => {
    const mockedHotelData = [ {
      id: 12321,
      name: "Park Plaza London Waterloo",
      location: {
        address: "6 Hercules Road",
        city: "London",
        latitude: 51.49845,
        longitude: -0.11343,
      },
      stars: 4,
      checkIn: {
        from: "14:00",
        to: "20:00",
      },
      checkOut: {
        from: "07:00",
        to: "10:00",
      },
      contact: {
        phoneNumber: "+39 24322342",
        email: "park_plaza@gmail.com",
      },
      gallery: [
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1499779963/Swindon_yjsrwz.jpg",
      ],
      userRating: 9.8,
      price: 120,
      currency: "EUR",
    },
    {
      id: 12325,
      name: "The Z Hotel Shoreditch",
      location: {
        address: "136-144 City Road",
        city: "London",
        latitude: 51.52684,
        longitude: -0.08857,
      },
      stars: 5,
      checkIn: {
        from: "11:00",
        to: "20:00",
      },
      checkOut: {
        from: "07:00",
        to: "10:00",
      },
      contact: {
        phoneNumber: "+44 435432",
        email: "the_z_hotel@gmail.com",
      },
      gallery: [
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487613/Exterior_ajaxnb.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487565/Dining_uili4h.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487564/Dining_2_eobvne.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487564/Dining_1_aijns9.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487580/Lounge_1_qakzs8.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487579/Reception_t5mjkp.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487578/Lounge_gzoj1o.jpg",
      ],
      userRating: 7.4,
      price: 200,
      currency: "EUR",
    } ]

    mockedUseHotelList.mockImplementation(() => ({ isLoading: false, data: mockedHotelData }))

    const { getByText } = render(<HotelSearchPage />)
    const sortButton = getByText('Sort')
    fireEvent.press(sortButton)

    const starsSortButton = getByText(SortSelectionLabels.STARS)
    fireEvent.press(starsSortButton)

    expect(screen).toMatchSnapshot()
  })

  it("should sort the data by price ASCENDING", async () => {
    const mockedHotelData = [ {
      id: 12321,
      name: "Park Plaza London Waterloo",
      location: {
        address: "6 Hercules Road",
        city: "London",
        latitude: 51.49845,
        longitude: -0.11343,
      },
      stars: 4,
      checkIn: {
        from: "14:00",
        to: "20:00",
      },
      checkOut: {
        from: "07:00",
        to: "10:00",
      },
      contact: {
        phoneNumber: "+39 24322342",
        email: "park_plaza@gmail.com",
      },
      gallery: [
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1499779963/Swindon_yjsrwz.jpg",
      ],
      userRating: 9.8,
      price: 120,
      currency: "EUR",
    },
    {
      id: 12325,
      name: "The Z Hotel Shoreditch",
      location: {
        address: "136-144 City Road",
        city: "London",
        latitude: 51.52684,
        longitude: -0.08857,
      },
      stars: 5,
      checkIn: {
        from: "11:00",
        to: "20:00",
      },
      checkOut: {
        from: "07:00",
        to: "10:00",
      },
      contact: {
        phoneNumber: "+44 435432",
        email: "the_z_hotel@gmail.com",
      },
      gallery: [
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487613/Exterior_ajaxnb.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487565/Dining_uili4h.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487564/Dining_2_eobvne.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487564/Dining_1_aijns9.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487580/Lounge_1_qakzs8.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487579/Reception_t5mjkp.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487578/Lounge_gzoj1o.jpg",
      ],
      userRating: 7.4,
      price: 200,
      currency: "EUR",
    },
    {
      id: 24234,
      name: "The Z Hotel Shoreditch",
      location: {
        address: "136-144 City Road",
        city: "London",
        latitude: 51.52684,
        longitude: -0.08857,
      },
      stars: 5,
      checkIn: {
        from: "11:00",
        to: "20:00",
      },
      checkOut: {
        from: "07:00",
        to: "10:00",
      },
      contact: {
        phoneNumber: "+44 435432",
        email: "the_z_hotel@gmail.com",
      },
      gallery: [
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487613/Exterior_ajaxnb.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487565/Dining_uili4h.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487564/Dining_2_eobvne.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487564/Dining_1_aijns9.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487580/Lounge_1_qakzs8.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487579/Reception_t5mjkp.jpg",
        "https://res.cloudinary.com/lastminute/image/upload/t_OSE_redes_item_view/v1430487578/Lounge_gzoj1o.jpg",
      ],
      userRating: 7.4,
      price: 160,
      currency: "EUR",
    } ]

    mockedUseHotelList.mockImplementation(() => ({ isLoading: false, data: mockedHotelData }))

    const { getByText, getAllByTestId } = render(<HotelSearchPage />)
    const sortButton = getByText('Sort')
    fireEvent.press(sortButton)

    const starsSortButton = getByText(SortSelectionLabels.PRICE)
    fireEvent.press(starsSortButton)

    const eles = getAllByTestId('price-test')

    const arrayOfPrices = eles.flatMap((el) => el.children)

    expect(screen).toMatchSnapshot()
    expect(arrayOfPrices).toEqual([ '€120 ','€160 ','€200 '  ])
  })
})
