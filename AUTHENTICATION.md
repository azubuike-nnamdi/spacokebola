# Email Allowlisting Authentication System

This CMS implements a secure email allowlisting system that restricts access to only authorized email addresses.

## How It Works

1. **Email Validation**: When a user attempts to sign in, their email is checked against the allowed list
2. **Access Control**: Only emails in the allowed list can access the dashboard
3. **Persistent Storage**: Allowed emails are stored in `data/allowed-emails.json`

## Features

-  ✅ Email allowlisting with persistent storage
-  ✅ Admin interface to manage allowed emails
-  ✅ Real-time validation during sign-in
-  ✅ Toast notifications for user feedback
-  ✅ API endpoints for CRUD operations

## Setup

### 1. Initial Configuration

The system comes with default allowed emails:

-  `admin@spacokebola.com`
-  `editor@spacokebola.com`

### 2. Managing Allowed Emails

1. Sign in to the dashboard with an allowed email
2. Navigate to **Settings > Allowed Emails**
3. Add or remove email addresses as needed

### 3. API Endpoints

-  `GET /api/auth/allowed-emails` - Get all allowed emails
-  `POST /api/auth/allowed-emails` - Add a new email
-  `DELETE /api/auth/allowed-emails` - Remove an email
-  `PUT /api/auth/allowed-emails` - Update all emails

## File Structure

```
lib/
├── auth.ts                    # Core authentication logic
app/
├── api/auth/allowed-emails/
│   └── route.ts              # API endpoints
├── (admin)/dashboard/settings/
│   └── allowed-emails/
│       └── page.tsx          # Admin interface
components/
└── admin/settings/
    └── allowed-emails-card.tsx # UI component
data/
└── allowed-emails.json       # Persistent storage
```

## Security Considerations

1. **File Permissions**: Ensure `data/allowed-emails.json` has appropriate read/write permissions
2. **Backup**: Regularly backup the allowed emails file
3. **Validation**: All emails are validated for format before being added
4. **Case Insensitive**: Email comparisons are case-insensitive

## Upgrading to Database Storage

For production use, consider upgrading to a database solution:

### Option 1: SQLite (Recommended for small teams)

```bash
npm install better-sqlite3
```

### Option 2: PostgreSQL (Recommended for larger teams)

```bash
npm install @prisma/client prisma
```

### Option 3: MongoDB

```bash
npm install mongodb
```

## Troubleshooting

### Common Issues

1. **"Access denied" error**: Email not in allowed list
2. **File permission errors**: Check `data/` directory permissions
3. **API errors**: Verify API routes are accessible

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment.

## Future Enhancements

-  [ ] Role-based permissions (admin, editor, viewer)
-  [ ] Email verification workflow
-  [ ] Audit logging for access attempts
-  [ ] Rate limiting for sign-in attempts
-  [ ] Two-factor authentication integration
