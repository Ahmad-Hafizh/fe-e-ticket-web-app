import React from 'react';

const NewEventPage = () => {
  return (
    <div className="px-10 flex flex-col gap-4">
      <h1 className="text-xl">New Event</h1>
      <label htmlFor="title">Title</label>
      <input type="text" placeholder="title" />

      <label htmlFor="description">Description</label>
      <input type="text" placeholder="description" />

      <label htmlFor="start-date">Start Date</label>
      <input type="date" placeholder="start date" />

      <label htmlFor="start-date">End Date</label>
      <input type="date" placeholder="End date" />

      <label htmlFor="start-time">Start Time</label>
      <input type="time" placeholder="start time" />

      <label htmlFor="start-time">End Time</label>
      <input type="time" placeholder="end time" />

      <label htmlFor="timezone">Timezone</label>
      <input type="text" placeholder="timezone" />

      <label htmlFor="category">Category</label>
      <input type="text" placeholder="category separated with ','" />

      <label htmlFor="eventimg">Event Image</label>
      <input type="file" />
    </div>
  );
};

export default NewEventPage;
// {
//   "eventTitle": "Music Festival 2024",
//   "eventDescription": "lorem ipsum",
//   "eventTimeDate": {
//     "startDate": "2024-12-12",
//     "endDate": "2024-12-15",
//     "startTime": "10:00",
//     "endTime": "18:00",
//     "timezone": "UTC+7"
//   },
//   "eventCategory": ["Music", "Festival"],
//   "eventLocation": {
//     "addressName": "Taman Balaikota",
//     "address": "Jalan Kertajaya",
//     "city": "Surabaya",
//     "country": "Indonesia",
//     "zipcode": "10001"
//   },
//   "ticketTypes": [
//     {
//       "types": "Presale",
//       "price": 100,
//       "quantityAvailable": 500
//     },
//     {
//       "types": "On the Spot",
//       "price": 75,
//       "quantityAvailable": 1000
//     }
//   ],
//   "eventImg": "http://anythinganything.com"
// }
