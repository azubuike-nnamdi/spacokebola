import { ABOUT_URL, ANNOUNCEMENTS_URL, BRANCHES_URL, CONTACT_URL, EVENTS_URL, GALLERY_URL, HOME_URL } from "@/config/routes";

const links = [
  { path: HOME_URL, label: 'Home' },
  { path: ABOUT_URL, label: 'About' },
  {
    path: BRANCHES_URL,
    label: 'Branches',
    children: [
      { path: `${BRANCHES_URL}/emmanuel`, label: 'Emmanuel Anglican Church' },
      { path: `${BRANCHES_URL}/hosanna`, label: 'Hosanna Anglican Church Joyce B' },
    ]
  },
  { path: ANNOUNCEMENTS_URL, label: 'Announcements' },
  { path: EVENTS_URL, label: 'Events' },
  { path: GALLERY_URL, label: 'Gallery' },
  { path: CONTACT_URL, label: 'Contact' },
];

// Latest announcements data
const announcements = [
  {
    id: 1,
    title: "Community Outreach Program",
    date: "October 15, 2023",
    excerpt: "Join us for our monthly community outreach program where we serve meals to those in need."
  },
  {
    id: 2,
    title: "New Worship Series",
    date: "October 8, 2023",
    excerpt: "Starting this Sunday, we'll begin our new worship series 'Faith in Action'."
  },
  {
    id: 3,
    title: "Youth Group Retreat",
    date: "September 30, 2023",
    excerpt: "Our annual youth retreat is coming up. Register your teens for this life-changing weekend."
  }
];

// Upcoming events data
const events = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "9:00 AM & 11:00 AM"
  },
  {
    id: 2,
    title: "Bible Study Group",
    date: "Every Wednesday",
    time: "7:00 PM"
  },
  {
    id: 3,
    title: "Fall Festival",
    date: "October 22, 2023",
    time: "4:00 PM - 8:00 PM"
  }
];

const leadershipTeam = [
  {
    id: 1,
    name: "Pastor John Smith",
    role: "Senior Pastor",
    bio: "Pastor John has served our congregation for over 15 years. He is passionate about teaching God's word and helping people grow in their faith.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Worship Director",
    bio: "Sarah leads our worship ministry with creativity and devotion. She has been part of our church family for 8 years.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Michael Davis",
    role: "Youth Pastor",
    bio: "Michael is dedicated to helping young people discover their purpose and grow in their relationship with God.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Jennifer Wilson",
    role: "Children's Ministry Director",
    bio: "Jennifer brings joy and creativity to our children's programs, creating a safe and fun environment for kids to learn about God.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

export { announcements, events, leadershipTeam, links };

