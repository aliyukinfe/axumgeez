import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { faqs } from "@/lib/site";
import { submitSupportRequest } from "./actions";

export const metadata: Metadata = {
  title: "Support",
  description: "Contact AxumGeez support and read frequently asked questions."
};

const issueTypes = ["Installation", "Typing", "Activation", "Billing", "Other"];

export default function SupportPage() {
  return (
    <main className="bg-surface-light">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-primary">Support</p>
          <h1 className="mt-3 text-4xl font-black text-ink sm:text-5xl">We can help you type with confidence.</h1>
          <p className="mt-5 text-lg leading-8 text-ink/68">Send a message about installation, typing behavior, activation, or future subscription questions.</p>
          <div className="mt-8 space-y-4 text-sm font-semibold text-ink/72">
            <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-blue-primary" aria-hidden="true" /> support@axumgeez.com</p>
            <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-blue-primary" aria-hidden="true" /> Phone support coming soon</p>
          </div>
        </div>
        <form action={submitSupportRequest} className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold text-ink">
              Name
              <input name="name" required className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-blue-primary" />
            </label>
            <label className="block text-sm font-bold text-ink">
              Email
              <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-blue-primary" />
            </label>
            <label className="block text-sm font-bold text-ink">
              Phone
              <input name="phone" className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-blue-primary" />
            </label>
            <label className="block text-sm font-bold text-ink">
              Issue type
              <select name="issueType" className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-blue-primary">
                {issueTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-5 block text-sm font-bold text-ink">
            Message
            <textarea name="message" required rows={6} className="mt-2 w-full resize-none rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-blue-primary" />
          </label>
          <button className="mt-6 rounded-full bg-blue-primary px-6 py-3.5 font-bold text-white shadow-blue transition-colors hover:bg-blue-deep" type="submit">
            Send request
          </button>
        </form>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-ink">FAQ</h2>
          <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-6">
                <summary className="cursor-pointer list-none font-bold text-ink transition-colors group-open:text-blue-primary">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-ink/68">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
