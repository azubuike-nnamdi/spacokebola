import { HOME_URL, ABOUT_URL, ANNOUNCEMENTS_URL, EVENTS_URL, GALLERY_URL, CONTACT_URL, BRANCHES_URL } from "@/config/routes";

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

export { links };