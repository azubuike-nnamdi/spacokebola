import { createClient } from '@supabase/supabase-js';

// Server-side environment variables (not exposed to client)
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!


if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
}

// Server-side client with service role key (full access)
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Database table name
export const ALLOWED_EMAILS_TABLE = 'allowed_emails'

// Get all allowed emails
export async function getAllowedEmails(): Promise<string[]> {
  try {
    console.log('Fetching allowed emails from table:', ALLOWED_EMAILS_TABLE)

    const { data, error } = await supabaseServer
      .from(ALLOWED_EMAILS_TABLE)
      .select('email')
      .order('created_at')

    if (error) {
      console.error('Error fetching allowed emails:', error)
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      return []
    }

    console.log('Successfully fetched emails:', data?.length || 0)
    return data?.map(row => row.email) || []
  } catch (error) {
    console.error('Unexpected error fetching allowed emails:', error)
    return []
  }
}

// Check if email is allowed
export async function isEmailAllowed(email: string): Promise<boolean> {
  try {
    console.log('Checking if email is allowed:', email)

    const { data, error } = await supabaseServer
      .from(ALLOWED_EMAILS_TABLE)
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking email:', error)
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      return false
    }

    const isAllowed = !!data
    console.log('Email allowed:', isAllowed)
    return isAllowed
  } catch (error) {
    console.error('Unexpected error checking email:', error)
    return false
  }
}

// Add email to allowed list
export async function addAllowedEmail(email: string): Promise<boolean> {
  try {
    console.log('Adding email to allowed list:', email)

    const { data, error } = await supabaseServer
      .from(ALLOWED_EMAILS_TABLE)
      .insert([{ email: email.toLowerCase() }])
      .select()

    if (error) {
      console.error('Error adding email:', error)
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      return false
    }

    console.log('Successfully added email:', data)
    return true
  } catch (error) {
    console.error('Unexpected error adding email:', error)
    return false
  }
}

// Remove email from allowed list
export async function removeAllowedEmail(email: string): Promise<boolean> {
  try {
    console.log('Removing email from allowed list:', email)

    const { data, error } = await supabaseServer
      .from(ALLOWED_EMAILS_TABLE)
      .delete()
      .eq('email', email.toLowerCase())
      .select()

    if (error) {
      console.error('Error removing email:', error)
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      return false
    }

    console.log('Successfully removed email:', data)
    return true
  } catch (error) {
    console.error('Unexpected error removing email:', error)
    return false
  }
}
