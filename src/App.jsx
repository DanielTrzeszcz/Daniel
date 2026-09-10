import "./App.css";
import profilePhoto from "./assets/ADO.png";
import { useState } from "react";
import {
  Heart,
  ShieldCheck,
  Home,
  UsersRound,
  Building2,
  Users,
  Umbrella,
} from "lucide-react";
function ContactForm() {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  console.log("Endpoint Formspree:", endpoint);

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!endpoint) {
      setStatus("error");
      setErrorMessage(
        "Brak konfiguracji formularza. Skontaktuj się telefonicznie."
      );
      return;
    }

    const form = event.target;
    const data = new FormData(form);

    // --- Walidacja telefonu w JS (zamiast pattern w inpucie) ---
    const phone = (data.get("phone") || "").toString().trim();
    const phoneRegex = /^[0-9+\s()-]{9,}$/;

    if (!phoneRegex.test(phone)) {
      setStatus("error");
      setErrorMessage(
        "Podaj poprawny numer telefonu (min. 9 znaków, cyfry, spacje, myślniki)."
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    data.append(
      "_subject",
      `Nowe zapytanie ze strony – ${data.get("name") || "brak imienia"}`
    );

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await response.json().catch(() => null);
        const message =
          json?.errors?.map((e) => e.message).join(", ") ||
          "Nie udało się wysłać wiadomości. Spróbuj ponownie.";
        setErrorMessage(message);
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage(
        "Wystąpił błąd połączenia. Sprawdź internet i spróbuj ponownie."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form-wrapper">
        <div className="contact-form contact-form--success">
          <div className="contact-form__success-icon">✓</div>
          <h3>Dziękuję za wiadomość!</h3>
          <p>
            Odezwę się do Ciebie najszybciej, jak to możliwe — zwykle
            w ciągu 24 godzin.
          </p>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setStatus("idle")}
          >
            Wyślij kolejną wiadomość
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__heading">
          <span>BEZPŁATNA KONSULTACJA</span>
          <h3>Zostaw kontakt</h3>
          <p>Oddzwonię, aby spokojnie porozmawiać o Twoich potrzebach.</p>
        </div>

        <label>
          Imię
          <input
            type="text"
            name="name"
            placeholder="Jak masz na imię?"
            required
            minLength={2}
            disabled={status === "sending"}
          />
        </label>

        <label>
          Numer telefonu
          <input
            type="tel"
            name="phone"
            placeholder="Np. 500 000 000"
            required
            disabled={status === "sending"}
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            name="email"
            placeholder="Twój adres e-mail"
            required
            disabled={status === "sending"}
          />
        </label>

        <label>
          W czym mogę pomóc?
          <select
            name="topic"
            defaultValue=""
            required
            disabled={status === "sending"}
          >
            <option value="" disabled>
              Wybierz temat
            </option>
            <option>Ubezpieczenie życia</option>
            <option>Ubezpieczenie zdrowia</option>
            <option>Ubezpieczenie majątku</option>
            <option>Zabezpieczenie rodziny</option>
            <option>Ubezpieczenie dla firmy</option>
            <option>Ubezpieczenie grupowe</option>
            <option>Ubezpieczenie wakacyjne</option>
            <option>Inny temat</option>
          </select>
        </label>

        <label>
          Wiadomość (opcjonalnie)
          <textarea
            name="message"
            rows={4}
            placeholder="Możesz dopisać kilka słów o swojej sytuacji…"
            disabled={status === "sending"}
          />
        </label>

        <label className="contact-form__checkbox">
          <input
            type="checkbox"
            name="consent"
            required
            disabled={status === "sending"}
          />
          <span>
            Wyrażam zgodę na kontakt w celu przedstawienia informacji
            dotyczących oferty.
          </span>
        </label>

        {status === "error" && (
          <div className="contact-form__error" role="alert">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="button button--primary button--full"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            "Wysyłanie…"
          ) : (
            <>
              Wyślij wiadomość <span>→</span>
            </>
          )}
        </button>

        <small className="contact-form__privacy">
          Twoje dane wykorzystamy wyłącznie w celu kontaktu w sprawie
          zapytania.
        </small>
      </form>
    </div>
  );
}


function App() {
  return (
    <div className="page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container navbar__inner">

          <a href="#home" className="logo">
            <span className="logo__mark">D</span>

            <div className="logo__text">
              <strong>Daniel Trzeszczkowski</strong>
              <span>Doradca ubezpieczeniowy</span>
            </div>
          </a>

          <nav className="nav">
            <a href="#o-mnie">O mnie</a>
            <a href="#ubezpieczenia">Ubezpieczenia</a>
            <a href="#jak-dzialam">Jak działam</a>
            <a href="#opinie">Opinie</a>
            <a href="#kontakt">Kontakt</a>
          </nav>

          <a href="#kontakt" className="navbar__button">
            Umów konsultację
          </a>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <main>

        <section className="hero" id="home">
          <div className="container hero__inner">

            <div className="hero__content">

              <div className="eyebrow">
                <span className="eyebrow__dot"></span>
                Doradca ubezpieczeniowy
              </div>

              <h1>
                Zadbaj o to,
                <span> co naprawdę ważne.</span>
              </h1>

              <p className="hero__description">
                Pomagam dobrać ubezpieczenia życia, zdrowia, rodziny
                i majątku dopasowane do Twojej sytuacji oraz rzeczywistych potrzeb.
              </p>

              <div className="hero__buttons">
                <a href="#kontakt" className="button button--primary">
                  Umów bezpłatną konsultację
                  <span>→</span>
                </a>

                <a href="#ubezpieczenia" className="button button--secondary">
                  Zobacz zakres ochrony
                </a>
              </div>

              <div className="hero__trust">

                <div className="trust-item">
                  <div className="trust-icon">✓</div>
                  <div>
                    <strong>Indywidualne podejście</strong>
                    <span>Rozwiązanie dopasowane do Ciebie</span>
                  </div>
                </div>

                <div className="trust-item">
                  <div className="trust-icon">✓</div>
                  <div>
                    <strong>Jasne zasady</strong>
                    <span>Bez skomplikowanego języka</span>
                  </div>
                </div>

              </div>

            </div>


            <div className="hero__visual">

              <div className="hero__background-circle"></div>

              <div className="hero__photo-wrapper">
                <img
                  src={profilePhoto}
                  alt="Daniel Trzeszczkowski - doradca ubezpieczeniowy"
                  className="hero__photo"
                />
              </div>

              <div className="hero__card hero__card--top">
                <div className="hero__card-icon">✓</div>
                <div>
                  <strong>Sprawdzone rozwiązania</strong>
                  <span>Nationale-Nederlanden</span>
                </div>
              </div>

              <div className="hero__card hero__card--bottom">
                <span className="hero__card-number"></span>
                <div>
                  <strong>Porozmawiajmy</strong>
                  <span>o Twojej ochronie</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ================= STATISTICS ================= */}
        <section className="stats">
          <div className="container stats__grid">

            <div className="stat">
              <strong>1+</strong>
              <span>rok doświadczenia</span>
            </div>

            <div className="stat">
              <strong>100%</strong>
              <span>indywidualnego podejścia</span>
            </div>

            <div className="stat">
              <strong>∞</strong>
              <span>możliwości dopasowania ochrony</span>
            </div>

            <div className="stat">
              <strong>1:1</strong>
              <span>bezpośredni kontakt z doradcą</span>
            </div>

          </div>
        </section>


        {/* ================= O MNIE ================= */}
        <section className="about section" id="o-mnie">
          <div className="container about__grid">

            <div className="about__image">

              <div className="about__image-frame">
                <img
                  src={profilePhoto}
                  alt="Daniel Trzeszczkowski"
                />
              </div>

              <div className="about__badge">
                <span className="about__badge-icon">★</span>

                <div>
                  <strong>Daniel Trzeszczkowski</strong>
                  <span>Doradca ubezpieczeniowy</span>
                </div>
              </div>

            </div>


            <div className="about__content">

              <div className="section-label">
                <span></span>
                O MNIE
              </div>

              <h2>
                Ubezpieczenia zaczynają się
                <span> od dobrej rozmowy.</span>
              </h2>

              <p>
                Nazywam się Daniel Trzeszczkowski i jestem doradcą
                ubezpieczeniowym Nationale-Nederlanden.
              </p>

              <p>
                W swojej pracy skupiam się przede wszystkim na tym,
                aby najpierw poznać sytuację klienta, a dopiero później
                przedstawić możliwe rozwiązania.
              </p>

              <p>
                Wierzę, że dobre ubezpieczenie nie powinno być przypadkowym
                produktem. Powinno odpowiadać na konkretne potrzeby
                i zapewniać poczucie bezpieczeństwa wtedy, kiedy jest
                naprawdę potrzebne.
              </p>
            </div>

          </div>
        </section>


       {/* ================= SERVICES ================= */}
<section className="services section" id="ubezpieczenia">

  <div className="container">

    <div className="section-heading">

      <div className="section-label">
        <span></span>
        W CZYM MOGĘ POMÓC
      </div>

      <h2>
        Ochrona dopasowana
        <span> do Twojego życia.</span>
      </h2>

      <p>
        Każda sytuacja jest inna. Dlatego zamiast proponować
        wszystkim to samo, zaczynam od poznania Twoich potrzeb.
      </p>

    </div>


    <div className="services__grid">

      <article className="service-card">
        <div className="service-card__number">01</div>
        <div className="service-card__icon">
          <Heart size={24} strokeWidth={2} />
        </div>

        <h3>Ubezpieczenie życia</h3>

        <p>
          Zabezpieczenie finansowe bliskich na wypadek
          najtrudniejszych sytuacji.
        </p>

        <a href="#kontakt">Dowiedz się więcej →</a>
      </article>


      <article className="service-card service-card--featured">
        <div className="service-card__number">02</div>
        <div className="service-card__icon">
          <ShieldCheck size={24} strokeWidth={2} />
        </div>

        <h3>Ubezpieczenie zdrowia</h3>

        <p>
          Ochrona na wypadek poważnych chorób, pobytu w szpitalu
          czy innych nieprzewidzianych sytuacji zdrowotnych.
        </p>

        <a href="#kontakt">Dowiedz się więcej →</a>
      </article>


      <article className="service-card">
        <div className="service-card__number">03</div>
        <div className="service-card__icon">
          <Home size={24} strokeWidth={2} />
        </div>

        <h3>Ubezpieczenie majątku</h3>

        <p>
          Ochrona domu, mieszkania i tego, na co pracujesz
          przez lata.
        </p>

        <a href="#kontakt">Dowiedz się więcej →</a>
      </article>


      <article className="service-card">
        <div className="service-card__number">04</div>
        <div className="service-card__icon">
          <UsersRound size={24} strokeWidth={2} />
        </div>

        <h3>Zabezpieczenie rodziny</h3>

        <p>
          Pomagam stworzyć ochronę odpowiadającą potrzebom
          Twoim i Twoich najbliższych.
        </p>

        <a href="#kontakt">Dowiedz się więcej →</a>
      </article>


      <article className="service-card">
        <div className="service-card__number">05</div>
        <div className="service-card__icon">
          <Building2 size={24} strokeWidth={2} />
        </div>

        <h3>Ubezpieczenia dla firm</h3>

        <p>
          Rozwiązania pomagające zabezpieczyć właścicieli,
          pracowników i najważniejsze osoby w firmie.
        </p>

        <a href="#kontakt">Dowiedz się więcej →</a>
      </article>


      <article className="service-card">
        <div className="service-card__number">06</div>
        <div className="service-card__icon">
        <Umbrella size={24} strokeWidth={2} />
        </div>

        <h3>Ubezpieczenia Wakacyjne</h3>

        <p>
          Ochrona siebie i bliskich na czas podróży, wyjazdów i wakacji, aby cieszyć się spokojem i bezpieczeństwem.`
        </p>

        <a href="#kontakt">Dowiedz się więcej →</a>
      </article>

    </div>

  </div>

</section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="process section" id="jak-dzialam">

          <div className="container">

            <div className="section-heading section-heading--center">

              <div className="section-label">
                <span></span>
                JAK WYGLĄDA WSPÓŁPRACA
              </div>

              <h2>
                Prosto. Konkretnie.
                <span> Bez presji.</span>
              </h2>

              <p>
                Moim zadaniem jest pomóc Ci zrozumieć dostępne możliwości.
                Ostateczna decyzja zawsze należy do Ciebie.
              </p>

            </div>


            <div className="process__grid">

              <div className="process-item">
                <div className="process-item__top">
                  <span>01</span>
                  <div className="process-item__line"></div>
                </div>

                <div className="process-item__icon">💬</div>

                <h3>Rozmowa</h3>

                <p>
                  Poznaję Twoją sytuację, potrzeby i to,
                  co jest dla Ciebie najważniejsze.
                </p>
              </div>


              <div className="process-item">
                <div className="process-item__top">
                  <span>02</span>
                  <div className="process-item__line"></div>
                </div>

                <div className="process-item__icon">⌕</div>

                <h3>Analiza</h3>

                <p>
                  Sprawdzamy, co już posiadasz i gdzie mogą
                  znajdować się obszary wymagające ochrony.
                </p>
              </div>


              <div className="process-item">
                <div className="process-item__top">
                  <span>03</span>
                  <div className="process-item__line"></div>
                </div>

                <div className="process-item__icon">◇</div>

                <h3>Rozwiązanie</h3>

                <p>
                  Przedstawiam możliwości dopasowane do
                  wcześniej określonych potrzeb.
                </p>
              </div>


              <div className="process-item">
                <div className="process-item__top">
                  <span>04</span>
                  <div className="process-item__line"></div>
                </div>

                <div className="process-item__icon">✓</div>

                <h3>Decyzja</h3>

                <p>
                  To Ty decydujesz, czy przedstawione rozwiązanie
                  jest dla Ciebie odpowiednie.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="cta">

          <div className="container cta__inner">

            <div className="cta__content">

              <div className="section-label section-label--light">
                <span></span>
                POROZMAWIAJMY
              </div>

              <h2>
                Nie czekaj na moment,
                <span> w którym ochrona będzie potrzebna.</span>
              </h2>

              <p>
                Umów bezpłatną rozmowę i sprawdź,
                jakie rozwiązania mogą odpowiadać Twojej sytuacji.
              </p>

            </div>

            <a href="#kontakt" className="button button--white">
              Umów bezpłatną konsultację
              <span>→</span>
            </a>

          </div>

        </section>


        {/* ================= OPINIE ================= */}
        <section className="reviews section" id="opinie">

          <div className="container">

            <div className="section-heading section-heading--center">

              <div className="section-label">
                <span></span>
                OPINIE KLIENTÓW
              </div>

              <h2>
                Dobre relacje
                <span> mają znaczenie.</span>
              </h2>

              <p>
                Najlepszym potwierdzeniem jakości współpracy
                są doświadczenia osób, którym już pomagałem.
              </p>

            </div>


            <div className="reviews__grid">

              <article className="review-card">

                <div className="review-card__stars">
                  ★★★★★
                </div>

                <p>
                  „Profesjonalne podejście, wszystko zostało dokładnie
                  wyjaśnione, a formalności przebiegły szybko i bezproblemowo.”
                </p>

                <div className="review-card__author">
                  <div className="review-card__avatar">K</div>
                  <div>
                    <strong>Klient</strong>
                    <span>Opinia Google</span>
                  </div>
                </div>

              </article>


              <article className="review-card">

                <div className="review-card__stars">
                  ★★★★★
                </div>

                <p>
                  „Bardzo profesjonalny i zaangażowany doradca.
                  Kontakt przebiegał sprawnie i w miłej atmosferze.”
                </p>

                <div className="review-card__author">
                  <div className="review-card__avatar">K</div>
                  <div>
                    <strong>Klient</strong>
                    <span>Opinia Google</span>
                  </div>
                </div>

              </article>


              <article className="review-card">

                <div className="review-card__stars">
                  ★★★★★
                </div>

                <p>
                  „Wszystkie kwestie zostały przedstawione w jasny
                  i zrozumiały sposób. Zdecydowanie polecam.”
                </p>

                <div className="review-card__author">
                  <div className="review-card__avatar">K</div>
                  <div>
                    <strong>Klient</strong>
                    <span>Opinia Google</span>
                  </div>
                </div>

              </article>

            </div>

          </div>

        </section>


        {/* ================= CONTACT ================= */}
<section className="contact section" id="kontakt">

  <div className="container contact__grid">

    <div className="contact__content">

      <div className="section-label">
        <span></span>
        KONTAKT
      </div>

      <h2>
        Porozmawiajmy o Twoim
        <span> bezpieczeństwie.</span>
      </h2>

      <p>
        Masz pytanie dotyczące ubezpieczenia?
        Chcesz sprawdzić, czy Twoja obecna ochrona
        odpowiada Twoim potrzebom?
      </p>

      <p>
        Zostaw kontakt. Skontaktuję się z Tobą
        i ustalimy dogodny termin rozmowy.
      </p>

      <div className="contact__details">

        <a href="tel:+48518917930" className="contact-detail">
          <div className="contact-detail__icon">☎</div>
          <div>
            <span>Telefon</span>
            <strong>518 917 930</strong>
          </div>
        </a>

        <div className="contact-detail">
          <div className="contact-detail__icon">⌖</div>
          <div>
            <span>Obszar działania</span>
            <strong>Białystok i Podlasie</strong>
          </div>
        </div>

      </div>

    </div>

    <ContactForm />

  </div>

</section>

</main>
      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="container footer__top">

          <div className="footer__brand">

            <div className="logo logo--footer">
              <span className="logo__mark">D</span>

              <div className="logo__text">
                <strong>Daniel Trzeszczkowski</strong>
                <span>Doradca ubezpieczeniowy</span>
              </div>
            </div>

            <p>
              Pomagam świadomie zadbać o ochronę życia,
              zdrowia, rodziny i majątku.
            </p>

          </div>


          <div className="footer__links">

            <div>
              <h4>Menu</h4>
              <a href="#o-mnie">O mnie</a>
              <a href="#ubezpieczenia">Ubezpieczenia</a>
              <a href="#jak-dzialam">Jak działam</a>
              <a href="#opinie">Opinie</a>
            </div>

            <div>
              <h4>Kontakt</h4>
              <a href="tel:+48518917930">518 917 930</a>
              <a href="#kontakt">Umów konsultację</a>
            </div>

          </div>

        </div>


        <div className="container footer__bottom">

          <span>
            © {new Date().getFullYear()} Daniel Trzeszczkowski
          </span>

          <span>
            Doradca ubezpieczeniowy Nationale-Nederlanden
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;