"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type FormState } from "@/app/actions/nl_actions";

const INITIAL_STATE: FormState = { message: "", success: false };

export default function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="schrodinger@gmail.com"
          disabled={isPending || state.success}
          className="flex-1 px-5 py-3 rounded-xl bg-[var(--color-giq-light)]/30 border border-[var(--color-giq-main)]/20 text-[var(--color-giq-deep)] placeholder-[var(--color-giq-dark)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-giq-main)] transition-all disabled:opacity-60"
        />
        {/* Honeypot for bots; hidden from people and screen readers */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={isPending || state.success}
          className="px-8 py-3 rounded-xl bg-[var(--color-giq-deep)] text-white font-bold hover:bg-[var(--color-giq-purple)] transition-all shadow-md whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
        >
          {isPending ? "Subscribing…" : state.success ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      {state.message && (
        <p
          role="status"
          className={`text-sm font-medium ${state.success ? "text-[var(--color-giq-dark)]" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
