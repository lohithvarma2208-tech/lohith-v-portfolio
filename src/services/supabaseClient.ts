import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20
)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface SupabaseContactMessage {
  name: string
  email: string
  message: string
}

/**
 * Submit a visitor message to Supabase.
 * If Supabase is not configured, logs to console and returns simulated success.
 */
export async function submitContactMessage(
  msg: SupabaseContactMessage
): Promise<{ success: boolean; error?: string; viaSupabase: boolean }> {
  if (!supabase || !isSupabaseConfigured) {
    console.info(
      'ℹ️ [Supabase] Message stored locally (Supabase keys not yet configured in .env).',
      msg
    )
    return { success: true, viaSupabase: false }
  }

  try {
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: msg.name,
        email: msg.email,
        message: msg.message,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null
      }
    ])

    if (error) {
      console.error('[Supabase] Insert error:', error.message)
      return { success: false, error: error.message, viaSupabase: true }
    }

    return { success: true, viaSupabase: true }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error('[Supabase] Submission error:', errorMsg)
    return { success: false, error: errorMsg, viaSupabase: true }
  }
}

/**
 * Fetch visitor messages for Admin CMS display
 */
export async function fetchContactMessages(): Promise<
  Array<{
    id: string
    name: string
    email: string
    message: string
    created_at: string
  }>
> {
  if (!supabase || !isSupabaseConfigured) return []

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id, name, email, message, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (err) {
    console.warn('[Supabase] Fetch messages failed:', err)
    return []
  }
}
