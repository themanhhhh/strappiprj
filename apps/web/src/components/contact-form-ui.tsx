"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/catalog";

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

type FieldErrors = Partial<
  Record<"fullName" | "phone" | "email" | "message", string>
>;

type ContactFormUiProps = {
  locale?: string;
};

export function ContactFormUi({ locale = 'en' }: ContactFormUiProps) {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      serviceInterestSlug: String(formData.get("serviceInterest") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    const nextErrors: FieldErrors = {};

    if (!payload.fullName) {
      nextErrors.fullName = locale === 'vi' ? "Vui lòng nhập tên của bạn." : "Please enter your name.";
    }

    if (!payload.phone && !payload.email) {
      nextErrors.phone = locale === 'vi' ? "Cần số điện thoại hoặc email." : "Add a phone number or email.";
      nextErrors.email = locale === 'vi' ? "Cần số điện thoại hoặc email." : "Add an email or phone number.";
    }

    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      nextErrors.email = locale === 'vi' ? "Định dạng email không hợp lệ." : "Email format is invalid.";
    }

    if (!payload.message) {
      nextErrors.message = locale === 'vi' ? "Vui lòng mô tả tóm tắt dự án của bạn." : "Please describe the project brief.";
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormState({
        status: "error",
        message: locale === 'vi' ? "Vui lòng kiểm tra các trường bị tô đỏ." : "Please review the highlighted fields.",
      });
      return;
    }

    setFormState({ status: "submitting", message: locale === 'vi' ? "Đang gửi thông tin..." : "Sending enquiry..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || (locale === 'vi' ? "Không thể gửi yêu cầu lúc này." : "Unable to submit enquiry."));
      }

      form.reset();
      setFieldErrors({});
      setFormState({
        status: "success",
        message: result.message || (locale === 'vi' ? "Yêu cầu của bạn đã được gửi thành công." : "Your enquiry has been sent successfully."),
      });
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error ? error.message : (locale === 'vi' ? "Không thể gửi yêu cầu lúc này." : "Unable to submit enquiry."),
      });
    }
  }

  return (
    <div className="maestro-contact-wrapper">
      <div className="maestro-contact-header">
        <h2>{locale === 'vi' ? 'LIÊN HỆ VỚI CHÚNG TÔI' : 'CONTACT US'}</h2>
        <p>{locale === 'vi' ? 'Vui lòng điền vào biểu mẫu dưới đây và chúng tôi sẽ phản hồi sớm nhất.' : 'Please fill out the form below and we will get back to you shortly.'}</p>
      </div>

      <form className="maestro-contact-form" onSubmit={handleSubmit} noValidate>
        <div className="field-row">
          <label className="field maestro-field">
            <span className="field-label">
              {locale === 'vi' ? 'HỌ VÀ TÊN' : 'COMPANY / INDIVIDUAL NAME'}
              <span className="required-marker"> (required)</span>
            </span>
            <input
              className="field-input maestro-input"
              name="fullName"
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.fullName)}
            />
            {fieldErrors.fullName ? <span className="field-error">{fieldErrors.fullName}</span> : null}
          </label>
          
          <label className="field maestro-field">
            <span className="field-label">
              {locale === 'vi' ? 'SỐ ĐIỆN THOẠI' : 'PHONE NUMBER'}
              <span className="required-marker"> (required)</span>
            </span>
            <input
              className="field-input maestro-input"
              name="phone"
              autoComplete="tel"
              aria-invalid={Boolean(fieldErrors.phone)}
            />
            {fieldErrors.phone ? <span className="field-error">{fieldErrors.phone}</span> : null}
          </label>
        </div>

        <div className="field-row">
          <label className="field maestro-field">
            <span className="field-label">
              {locale === 'vi' ? 'ĐỊA CHỈ EMAIL' : 'EMAIL ADDRESS'}
              <span className="required-marker"> (required)</span>
            </span>
            <input
              className="field-input maestro-input"
              type="email"
              name="email"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
            />
            {fieldErrors.email ? <span className="field-error">{fieldErrors.email}</span> : null}
          </label>

          <label className="field maestro-field">
            <span className="field-label">
              {locale === 'vi' ? 'LOẠI YÊU CẦU' : 'ENQUIRY TYPE'}
              <span className="required-marker"> (required)</span>
            </span>
            <select
              className="field-select maestro-input"
              name="serviceInterest"
              defaultValue=""
            >
              <option value="" disabled hidden>
                {locale === 'vi' ? 'Tư vấn dự án' : 'Project Enquiry'}
              </option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="field visually-hidden" aria-hidden="true">
          <span className="field-label">Website</span>
          <input className="field-input maestro-input" name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="field maestro-field full-width">
          <span className="field-label">
            {locale === 'vi' ? 'TÓM TẮT YÊU CẦU' : 'MESSAGE / BRIEF INTRODUCTION'}
          </span>
          <textarea
            className="field-textarea maestro-textarea"
            name="message"
            aria-invalid={Boolean(fieldErrors.message)}
          />
          {fieldErrors.message ? <span className="field-error">{fieldErrors.message}</span> : null}
        </label>

        <div className="maestro-form-footer">
          <p className="vendor-links">
            {locale === 'vi' ? 'Đối tác nhà thầu/nhà cung cấp vui lòng truy cập trang Đăng ký đối tác' : 'For business partnership or vendor registration, please visit our Vendor Registration page'}
          </p>
          <button
            className="maestro-submit-button"
            type="submit"
            disabled={formState.status === "submitting"}
          >
            {formState.status === "submitting" 
              ? (locale === 'vi' ? "Đang gửi…" : "Sending…") 
              : (locale === 'vi' ? "Gửi thông tin" : "Send Message")}
          </button>
          
          {formState.status !== "idle" ? (
            <p className={`form-status form-status-${formState.status}`}>
              {formState.message}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
