"use client";

import { useState } from "react";

interface ContactFormValues {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

const initialValues: ContactFormValues = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(
  name: keyof ContactFormValues,
  value: string,
): string | undefined {
  const trimmedValue = value.trim();

  switch (name) {
    case "fullName":
      if (trimmedValue.length < 3) {
        return "Full name must be at least 3 characters.";
      }
      return undefined;

    case "subject":
      if (trimmedValue.length < 3) {
        return "Subject must be at least 3 characters.";
      }
      return undefined;

    case "email":
      if (!validateEmail(trimmedValue)) {
        return "Please enter a valid email address.";
      }
      return undefined;

    case "message":
      if (trimmedValue.length < 10) {
        return "Message must be at least 10 characters.";
      }
      return undefined;

    default:
      return undefined;
  }
}

function validateForm(values: ContactFormValues): ContactFormErrors {
  return {
    fullName: validateField("fullName", values.fullName),
    subject: validateField("subject", values.subject),
    email: validateField("email", values.email),
    message: validateField("message", values.message),
  };
}

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target as {
      name: keyof ContactFormValues;
      value: string;
    };

    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    if (isSubmitted) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: validateField(name, value),
      }));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== undefined,
    );

    if (hasErrors) {
      return;
    }

    setIsSubmitted(true);
    setValues(initialValues);
    setErrors({});
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Contact Us
        </h1>
        <p className="mt-2 text-slate-600">
          Have a question? Send us a message.
        </p>
      </div>

      {isSubmitted && (
        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Your message has been sent successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
