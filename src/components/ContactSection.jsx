import { InquiryForm } from "./InquiryForm";
export function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="site-container contact-grid">
        <div className="contact-copy">
          <h2 id="contact-title">
            Не нашли
            <br />
            свой остров?
          </h2>
          <p>
            Расскажите о планах. Поможем разобраться с направлениями и подобрать
            подходящий отдых.
          </p>
        </div>
        <InquiryForm />
      </div>
    </section>
  );
}
