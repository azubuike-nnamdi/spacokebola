import { vicarImage } from "@/config/images";
import { ABOUT_URL, ANNOUNCEMENTS_URL, BRANCHES_URL, CONTACT_URL, DASHBOARD_ANNOUNCEMENTS_URL, DASHBOARD_EVENTS_URL, DASHBOARD_URL, EVENTS_URL, GALLERY_URL, HOME_URL, SETTINGS_URL } from "@/config/routes";
import { Bell, Calendar, LayoutDashboard, Settings, ShieldX, Users } from "lucide-react";

const links = [
  { path: HOME_URL, label: 'Home' },
  { path: ABOUT_URL, label: 'About' },
  {
    path: BRANCHES_URL,
    label: 'Branches',
    children: [
      { path: `${BRANCHES_URL}/emmanuel`, label: 'Emmanuel Anglican Church' },
      { path: `${BRANCHES_URL}/hosanna`, label: 'Hosanna Anglican Church Joyce B' },
      { path: `${BRANCHES_URL}/michael`, label: 'St. Michael & All Angles' },
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
    title: "Combined Service",
    date: "Last Sunday",
    time: "9:00 AM"
  },
  {
    id: 2,
    title: "Ash Wednesday",
    date: "Februrary 18",
    time: "5:00 PM"
  },
  {
    id: 3,
    title: "Easter",
    date: "April 12, 2026",
    time: "10:00 AM"
  }
];

const leadershipTeam = [
  {
    id: 1,
    name: "Ven. Sunday D. Ezeike",
    role: "Venerable/Archdeacon",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image: vicarImage
  },

];

const message = [
  {
    id: 1,
    path: "https://web.facebook.com/OKEBOLAARCHDEACONRY/videos/33533906146253329"
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

const eventsData = [
  {
    id: 1,
    title: "Sunday Worship Service",
    description: "Join us for our weekly worship service with inspiring music and a message from Pastor John Smith.",
    date: "Every Sunday",
    time: "9:00 AM & 11:00 AM",
    location: "Main Sanctuary",
    image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Bible Study Group",
    description: "Dive deeper into God's word with our community Bible study. This week we'll be exploring the book of James.",
    date: "Every Wednesday",
    time: "7:00 PM",
    location: "Fellowship Hall",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Fall Festival",
    description: "Annual community festival with games, food, music, and activities for all ages. Invite your friends and neighbors!",
    date: "October 22, 2023",
    time: "4:00 PM - 8:00 PM",
    location: "Church Grounds",
    image: "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Youth Group Meeting",
    description: "Weekly gathering for teens to connect, worship, and grow in their faith together.",
    date: "Every Friday",
    time: "6:30 PM",
    location: "Youth Center",
    image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Prayer Meeting",
    description: "Join us as we gather to pray for our church, community, and world needs.",
    date: "Every Tuesday",
    time: "6:00 AM",
    location: "Prayer Chapel",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Community Service Day",
    description: "Help us serve our local community through various outreach projects and initiatives.",
    date: "November 5, 2023",
    time: "9:00 AM - 2:00 PM",
    location: "Meet at Church Parking Lot",
    image: "https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const galleryItems = [
  {
    id: 1,
    category: 'Worship Services',
    images: [
      { url: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Sunday worship service' },
      { url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Congregation singing' },
      { url: 'https://images.unsplash.com/photo-1574185649768-3a4a13c38f6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Pastor preaching' },
    ]
  },
  {
    id: 2,
    category: 'Community Events',
    images: [
      { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Community gathering' },
      { url: 'https://images.unsplash.com/photo-1546984575-757f4f7c13cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Food drive volunteers' },
      { url: 'https://images.unsplash.com/photo-1505155485412-30b3a45080ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Family picnic' },
    ]
  },
  {
    id: 3,
    category: 'Youth Activities',
    images: [
      { url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Youth group meeting' },
      { url: 'https://images.unsplash.com/photo-1602873689523-b2c167e85522?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Youth retreat' },
      { url: 'https://images.unsplash.com/photo-1528834342297-fdefb9a5a92b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Teen worship' },
    ]
  }
];

const userData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

}

const sideItem = [
  {
    title: "Dashboard",
    url: DASHBOARD_URL,
    icon: LayoutDashboard,
  },
  {
    title: "Announcements",
    url: DASHBOARD_ANNOUNCEMENTS_URL,
    icon: Bell,
  },
  {
    title: "Events",
    url: DASHBOARD_EVENTS_URL,
    icon: Calendar,
  },
  {
    title: "Settings",
    url: SETTINGS_URL,
    icon: Settings,
  },
  {
    title: "Allowed Emails",
    url: "/dashboard/settings/allowed-emails",
    icon: Users,
  },
  {
    title: "Blocked Users",
    url: "/dashboard/settings/blocked-users",
    icon: ShieldX,
  },
]

export { announcements, announcements2, branches, categories, events, eventsData, galleryItems, leadershipTeam, links, sideItem, userData, message};
