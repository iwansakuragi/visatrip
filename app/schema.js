export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Visa Trip',
  image: 'https://visatrip.com/logo.png', // Update pas deploy
  '@id': 'https://visatrip.com',
  url: 'https://visatrip.com',
  telephone: '+6281234567890',
  priceRange: 'Rp 1,800,000 - Rp 45,000,000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Sudirman No. 123',
    addressLocality: 'Jakarta Selatan',
    addressRegion: 'DKI Jakarta',
    postalCode: '12190',
    addressCountry: 'ID'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.2088, // Update dengan koordinat real
    longitude: 106.8456
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '15:00'
    }
  ],
  sameAs: [
    'https://www.facebook.com/visatrip', // Update dengan real URLs
    'https://www.instagram.com/visatrip',
    'https://www.twitter.com/visatrip'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '500'
  }
}