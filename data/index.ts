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

const announcements2 = [
  {
    id: 1,
    title: "Community Outreach Program",
    date: "October 15, 2023",
    category: "Outreach",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "Join us for our monthly community outreach program where we serve meals to those in need.",
    content: "This month, we'll be partnering with the Downtown Shelter to provide meals and essential items for families in need. We need volunteers to help prepare and serve food, as well as donate items such as canned goods, toiletries, and warm clothing. Sign up at the welcome desk or contact Sarah Johnson for more information."
  },
  {
    id: 2,
    title: "New Worship Series",
    date: "October 8, 2023",
    category: "Worship",
    image: "https://images.unsplash.com/photo-1508695666381-69deeaa78ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "Starting this Sunday, we'll begin our new worship series 'Faith in Action'.",
    content: "Pastor John will be leading us through a six-week series titled 'Faith in Action' where we'll explore what it means to live out our faith in practical ways. Each week will focus on a different aspect of putting faith into practice in our daily lives. Small group study materials will be available to continue the discussion throughout the week."
  },
  {
    id: 3,
    title: "Youth Group Retreat",
    date: "September 30, 2023",
    category: "Youth",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "Our annual youth retreat is coming up. Register your teens for this life-changing weekend.",
    content: "The annual youth retreat at Camp Wildwood is scheduled for November 10-12. This year's theme is 'Ignite' and will focus on helping teens discover their purpose and passion. The cost is $150 per student, which includes transportation, lodging, meals, and activities. Scholarships are available. Registration forms are due by October 20."
  },
  {
    id: 4,
    title: "Children's Christmas Program Rehearsals",
    date: "September 25, 2023",
    category: "Children",
    image: "https://images.unsplash.com/photo-1576016770936-dbc4f58e1815?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "Rehearsals for the children's Christmas program will begin next Sunday after the 11:00 service.",
    content: "It's time to start preparing for our annual Children's Christmas Program! Rehearsals will be held on Sundays from 12:30-1:30 PM beginning October 1st. All children ages 4-12 are welcome to participate. We need kids for speaking parts, singing, and behind-the-scenes help. Parent volunteers are also needed. Please contact Mary Williams, our Children's Ministry Director, to sign up."
  },
  {
    id: 5,
    title: "Small Group Sign-Ups",
    date: "September 18, 2023",
    category: "Groups",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "Fall small groups are forming now. Sign up in the lobby or online to join a group.",
    content: "Small groups are a great way to connect with others and grow in your faith. Our fall small groups will begin meeting the first week of October and will run for 10 weeks. Groups meet on various days and times, and there are options for all ages and stages of life. You can view all available groups and sign up in the church lobby after services or on our website."
  },
  {
    id: 6,
    title: "Building Fund Update",
    date: "September 10, 2023",
    category: "Administration",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "We're excited to share that we've reached 75% of our building fund goal!",
    content: "Thank you to everyone who has contributed to our building fund campaign! We're excited to announce that we've reached 75% of our goal to fund the new children's wing. Construction is scheduled to begin in early spring. We'll be holding a special Building Fund Sunday on October 29th with more details about the project and opportunities to give."
  }
];

// Categories for filtering
const categories = [
  "All",
  "Worship",
  "Outreach",
  "Youth",
  "Children",
  "Groups",
  "Administration"
];

export { announcements, announcements2, categories, events, leadershipTeam, links };

