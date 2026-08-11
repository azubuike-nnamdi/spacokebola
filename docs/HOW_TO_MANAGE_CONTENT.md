# Oke Bola Archdeaconry CMS — Content How-To

This guide explains how to create and publish content in the Payload admin panel so it appears on the public website.

**Admin URL:** [http://localhost:3000/admin](http://localhost:3000/admin)  
**Public site:** [http://localhost:3000](http://localhost:3000)

---

## Draft vs Publish (important)

**Announcements** and **Events** support drafts.

| Action | What it means | Who can see it on the website |
| --- | --- | --- |
| **Save as draft** | Work in progress. Not ready for the public. | Only logged-in admin users |
| **Publish** | Live content. Ready for everyone. | Anyone (visitors, members, search engines) |

### How to save a draft

1. Fill in the fields.
2. Click **Save** / **Save Draft** (do **not** publish yet).
3. Status should show as **Draft**.
4. The item will **not** appear on the public site.

### How to publish (so anyone can read it)

1. Finish editing the content.
2. Click **Publish** (or change status to **Published** and save).
3. Status should show as **Published**.
4. Visit the public site to confirm it appears:
   - Announcements → `/announcements` and the homepage
   - Events → `/events` and the homepage

### How to unpublish

1. Open the published item.
2. Switch it back to **Draft** and save.
3. It disappears from the public site but remains in the admin panel for later.

> **Tip:** Use drafts when you are preparing Christmas programmes, youth retreats, or notices that should not go live yet.

---

## Creating an Announcement

Announcements appear on the homepage (“Latest Announcements”) and on `/announcements`.

1. In admin, open **Announcements**.
2. Click **Create New**.
3. Fill in:

| Field | Required | Meaning |
| --- | --- | --- |
| **Title** | Yes | Headline visitors see first |
| **Excerpt** | Yes | Short teaser (rich text) shown on cards/lists |
| **Content** | Yes | Full announcement body (rich text) |
| **Category** | Yes | Used for filters (Worship, Youth, Outreach, etc.) |
| **Image** | No | Upload from Media library |
| **Image URL** | No | External image link if you prefer not to upload |
| **Published At** | No | Date shown on the site (e.g. 13 Jul 2026) |
| **Slug** | Auto | URL piece, e.g. `youth-group-retreat` → `/announcements/youth-group-retreat` |

4. **Save as draft** while reviewing, or **Publish** when ready for everyone.

### Excerpt vs content

- **Excerpt** = short preview on the homepage and announcements list (supports rich text formatting)
- **Content** = full text when someone opens the announcement (supports headings, bold, lists, links)

All long-form fields (announcement excerpt/content, event description, branch story, leadership bios) use the **Lexical rich text** editor in admin.

---

## Creating an Event

Events appear on the homepage (“Upcoming Events”) and on `/events`.

1. Open **Events** → **Create New**.
2. Fill in:

| Field | Required | Meaning |
| --- | --- | --- |
| **Title** | Yes | Event name |
| **Description** | No | What the event is about |
| **Category** | No | Sunday Service, Bible Study, Youth Program, etc. |
| **Start Date** | Yes | When it starts (date + time) |
| **End Date** | No | When it ends |
| **Display Date** | No | Custom label if needed, e.g. `Every Sunday` or `Last Sunday` |
| **Display Time** | No | Custom time label, e.g. `9:00 AM & 11:00 AM` |
| **Location** | No | e.g. Main Sanctuary, Church Grounds |
| **Virtual Link** | No | Zoom/Facebook link if online |
| **Image / Image URL** | No | Cover image |
| **Featured** | No | Tick to highlight on the events page |
| **Slug** | Auto | Used in URLs |

3. **Save as draft** or **Publish**.

> If **Display Date** / **Display Time** are set, the site prefers those labels over the raw start date.

---

## Editing the About page

The public `/about` page is managed under **Globals → About Page** (Site Content).

There are no drafts — saving updates the live page.

Tabs:

| Tab | What it controls |
| --- | --- |
| **Hero** | Page title, intro, hero image |
| **Our Story** | Story title, two rich-text paragraphs, image |
| **Values** | Section copy + list of values (icon, title, description) |
| **Priest in Charge** | Section headings + priest name, role, bio, photo |
| **Leadership** | Section headings only (team members live in **Leadership**) |
| **What We Believe** | Intro, belief items, CTA, image |
| **CTA** | Bottom call-to-action copy and links |

### Leadership team members

1. Open **Leadership** → **Create New**.
2. Fill in **Name**, **Role**, **Bio**, and optional photo.
3. Set **Order** (sidebar) to control display order (lower numbers first).
4. Save — they appear on `/about` automatically.

---

## Creating Gallery content

Gallery items show on `/gallery`.  
Gallery does **not** use drafts — saving makes it visible to everyone.

1. Open **Gallery** → **Create New**.
2. Enter a **Category** name (e.g. `Worship Services`, `Youth Activities`).
3. Under **Images**, add one or more rows:
   - Upload an **Image**, or paste an **Image URL**
   - Add **Alt** text (short description for accessibility)
4. Save.

---

## Creating a Branch

Branches power pages like `/branches/emmanuel`.  
No drafts — saving makes the branch page public.

1. Open **Branches** → **Create New**.
2. Fill in:

| Field | Meaning |
| --- | --- |
| **Name** | e.g. Emmanuel Anglican Church |
| **Tagline** | Short line under the name |
| **Slug** | URL key, e.g. `emmanuel` → `/branches/emmanuel` |
| **Story** | Title + two paragraphs + optional image |
| **Priest in Charge** | Name, role, bio, photo |

3. Save.

---

## Creating Leadership

Leadership entries appear on the About page under the Leadership section.  
Section headings are edited in **Globals → About Page → Leadership**.  
No drafts — saving makes entries public.

1. Open **Leadership** → **Create New**.
2. Fill in **Name**, **Role**, **Bio**, and optional photo.
3. Set **Order** (sidebar) to control display order (lower numbers first).
4. Save.

---

## Uploading Media (images)

1. Open **Media**.
2. Upload the image file.
3. Add **Alt** text when possible.
4. When editing announcements, events, etc., choose the file from the Media picker.

You can also paste an external **Image URL** on many content types if the image is hosted elsewhere.

---

## Quick checklist before publishing

- [ ] Title is clear
- [ ] For announcements: excerpt is short; content is complete
- [ ] Date / time / location are correct (events)
- [ ] Image looks good on mobile
- [ ] You clicked **Publish** (not only Save Draft)
- [ ] You checked the public page in a normal browser tab (logged out)

---

## Where content appears on the site

| Content | Public pages |
| --- | --- |
| Announcements | `/`, `/announcements`, `/announcements/[slug]` |
| Events | `/`, `/events` |
| Gallery | `/gallery` |
| Branches | `/branches/[slug]` |
| Leadership | `/about`, branch pages |
| Contact | `/contact` (static page text) |

---

## Seeding demo content (optional)

After creating your first admin user, the admin dashboard may show a **Seed your database** button. That loads sample announcements, events, gallery, branches, and leadership so you can explore the site quickly.

Only use seed on a fresh/local database — it adds demo data and is not meant for production cleanup.
