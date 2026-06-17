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
        <h2 className="low-poly-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {SITE.contact.title}
        </h2>
        <p className="mt-3 text-ink-dim">{SITE.contact.subtitle}</p>

        <form
          className="low-poly-panel mt-8 space-y-4 p-6"
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
          <button type="button" onClick={handleSend} className="low-poly-btn">
            <Mail size={16} />
            {SITE.contact.labels.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
