"use client";

import { useState } from "react";
import { SITE } from "@/content/site";
import { Mail, CheckCircle, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mvznnbgq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json?.errors?.[0]?.message ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
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

        {status === "success" ? (
          <div className="low-poly-panel mt-8 flex flex-col items-center gap-4 p-10 text-center">
            <CheckCircle size={48} className="text-green-500" />
            <h3 className="text-xl font-semibold text-ink">Message sent!</h3>
            <p className="text-sm text-ink-dim">
              Thanks for reaching out — I'll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="low-poly-btn mt-2"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            className="low-poly-panel mt-8 space-y-4 p-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="contact-email" className="text-sm text-ink-dim">
                {SITE.contact.labels.email}
              </label>
              <input
                id="contact-email"
                name="email"
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
                id="contact-subject"
                name="subject"
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
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder={SITE.contact.placeholders.message}
                className="mt-1 w-full rounded-lg border border-line bg-base/50 px-3 py-2 text-ink outline-none focus:border-grape"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="low-poly-btn disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Mail size={16} />
              )}
              {status === "loading" ? "Sending…" : SITE.contact.labels.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
