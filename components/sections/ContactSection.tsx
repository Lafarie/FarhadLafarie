"use client";

import { useRef } from "react";
import { SITE } from "@/content/site";
import { Mail } from "lucide-react";

export function ContactSection() {
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const subject = encodeURIComponent(subjectRef.current?.value ?? "");
    const body = encodeURIComponent(messageRef.current?.value ?? "");
    window.location.href = `mailto:${SITE.contact.recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="snap-section flex min-h-[100dvh] flex-col justify-center px-6 py-24"
    >
      <div className="section-reveal mx-auto w-full max-w-xl">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {SITE.contact.title}
        </h2>
        <p className="mt-3 text-ink-dim">{SITE.contact.subtitle}</p>

        <form
          className="mt-8 space-y-4 rounded-2xl border border-line bg-surface/30 p-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="contact-email" className="text-sm text-ink-dim">
              {SITE.contact.labels.email}
            </label>
            <input
              ref={emailRef}
              id="contact-email"
              type="email"
              required
              placeholder={SITE.contact.placeholders.email}
              className="mt-1 w-full rounded-lg border border-line bg-base/50 px-3 py-2 text-ink outline-none focus:border-grape"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="text-sm text-ink-dim">
              {SITE.contact.labels.subject}
            </label>
            <input
              ref={subjectRef}
              id="contact-subject"
              type="text"
              required
              placeholder={SITE.contact.placeholders.subject}
              className="mt-1 w-full rounded-lg border border-line bg-base/50 px-3 py-2 text-ink outline-none focus:border-grape"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="text-sm text-ink-dim">
              {SITE.contact.labels.message}
            </label>
            <textarea
              ref={messageRef}
              id="contact-message"
              rows={5}
              placeholder={SITE.contact.placeholders.message}
              className="mt-1 w-full rounded-lg border border-line bg-base/50 px-3 py-2 text-ink outline-none focus:border-grape"
            />
          </div>
          <button
            type="button"
            onClick={handleSend}
            className="inline-flex items-center gap-2 rounded-full bg-grape px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-grape/80"
          >
            <Mail size={16} />
            {SITE.contact.labels.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
