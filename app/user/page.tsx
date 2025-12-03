import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function UserPage() {
  const supabase = await createClient();

  // Get session and user info from Supabase (server-side)
  const { data: userData, error: userError } = await supabase.auth.getUser();
  // const { data: sessionData, error: sessionError } =
  //   await supabase.auth.getSession();
  // const { data: claimsData } = await supabase.auth.getClaims();

  const user = userData?.user ?? null;
  // const session = sessionData?.session ?? null;
  // const claims = claimsData?.claims ?? null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No estás autenticado</h2>
          <p className="mt-2">
            Por favor, inicia sesión para ver tu información.
          </p>
          <div className="mt-4">
            <Link
              href="/login"
              className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
            >
              Ir a Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Información del usuario (Supabase)
      </h1>

      <section className="mb-6">
        <h2 className="font-medium">User</h2>
        <pre className="rounded bg-slate-50 p-4 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </section>

      {/* <section className="mb-6">
        <h2 className="font-medium">Session</h2>
        <pre className="rounded bg-slate-50 p-4 overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </section> */}

      {/* <section className="mb-6">
        <h2 className="font-medium">Claims</h2>
        <pre className="rounded bg-slate-50 p-4 overflow-auto">
          {JSON.stringify(claims, null, 2)}
        </pre>
      </section> */}

      <section className="mt-6">
        <h2 className="font-medium">Debug</h2>
        <ul className="list-disc pl-5">
          {/* <li>
            {sessionError
              ? `Session error: ${String(sessionError.message ?? sessionError)}`
              : 'Session OK'}
          </li> */}
          <li>
            {userError
              ? `User error: ${String(userError.message ?? userError)}`
              : 'User OK'}
          </li>
        </ul>
      </section>
    </div>
  );
}
