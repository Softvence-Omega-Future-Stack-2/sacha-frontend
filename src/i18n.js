import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // এটা দরকার
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar
      "nav.our_apartments": "Our apartments",
      "nav.rental_management": "Rental management",
      "nav.premium": "Premium",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.dashboard": "Dashboard",
      "nav.logout": "Logout",
      "nav.login_register": "Login / Register",

      // Hero Section
      "hero.title": "Find your Apartment Quickly",
      "hero.subtitle": "and without agency fees",
      "hero.description": "Apply to listings and receive direct offers from owners - €0 agency fees, 100% between individuals.",
      "hero.our_apartments": "OUR APARTMENTS",
      "hero.i_am_owner": "I AM THE OWNER",

      // Search Form
      "search.find_home": "Find Your Next Home",
      "search.property_type": "Property Type",
      "search.property_type_placeholder": "Select Property Type",
      "search.location": "Location",
      "search.location_placeholder": "e.g., Paris, Berlin, or a Postal Code",
      "search.price_range": "Monthly Price Range",
      "search.price_range_placeholder": "Any Monthly Price",
      "search.search_now": "SEARCH NOW",

      // Stats Section
      "stats.apartments_available": "Apartments Available",
      "stats.agency_fees": "Agency Fees",
      "stats.average_time": "On Average To Find",
      "stats.guaranteed_response": "Guaranteed Response",

      // Featured Section
      "featured.title_prefix": "Latest",
      "featured.title_suffix": "Apartments",
      "featured.subtitle": "Discover our selection of available apartments",
      "featured.view_all": "VIEW ALL",
      "featured.month_cc": "/month CC",
      "featured.view_details": "View Details",

      // Why Us Section
      "why_us.title": "Why Us?",
      "why_us.badge_simplify": "SAVE TIME AND MONEY",
      "why_us.simplify_title_prefix": "What",
      "why_us.simplify_title_suffix": "Hello Appart simplifies",
      "why_us.simplify_title_end": "for you",
      "why_us.badge_protect": "SECURE AND PEACEFUL RENTAL",
      "why_us.protect_title_prefix": "What protects you with",
      "why_us.protect_title_suffix": "Hello Appart",

      // Why Us List Items
      "why_us.simplify_1": "100% no agency fees",
      "why_us.simplify_2": "Quick online application",
      "why_us.simplify_3": "Track your applications in real time",
      "why_us.simplify_4": "Responsive customer support",
      "why_us.simplify_5": "Publish your research",
      "why_us.simplify_6": "Apply for apartments",

      "why_us.protect_1": "Ads manually verified",
      "why_us.protect_2": "Personal data protected",
      "why_us.protect_3": "Owners are screened to prevent scams",
      "why_us.protect_4": "Personalized assistance if needed",
      "why_us.protect_5": "File verification for owners",
      "why_us.protect_6": "Filter according to your criteria",

      // Footer
      "footer.navigation": "Navigation",
      "footer.our_apartments": "Our Apartments",
      "footer.premium_service": "Premium Service",
      "footer.faq": "FAQ",
      "footer.services": "Services",
      "footer.login": "Login",
      "footer.registration": "Registration",
      "footer.contact": "Contact",
      "footer.address": "Address",
      "footer.email": "Email",
      "footer.phone": "Phone",
      "footer.rights_reserved": "All rights reserved",

      // France Apartments Section
      "france.title_prefix": "Find your",
      "france.title_suffix": "Apartment",
      "france.title_end": "anywhere in France",
      "france.subtitle": "Thousands of verified listings in major French cities",

      // Works Section
      "works.badge": "Trending",
      "works.badge_text": "400 people found what they were looking for this week",
      "works.title_prefix": "How does it",
      "works.title_suffix": "work",
      "works.subtitle": "In 3 simple steps, find your apartment faster",
      "works.subtitle_2": "than with a traditional agency",
      "works.card_1_title": "Create your file",
      "works.card_1_desc": "Complete your tenant profile in 5 minutes. Add your documents, search criteria and budget.",
      "works.card_2_title": "Active double search",
      "works.card_2_desc": "Apply to the listings that interest you AND enable notifications to receive direct offers from owners.",
      "works.card_3_title": "Visit and sign",
      "works.card_3_desc": "Arrange your visits directly with the owners. No intermediaries, no agency fees to pay.",
      "works.cta_button": "START NOW - IT'S FREE",
      "works.cta_subtext": "Free trial • Immediate access to listings",
      "works.login_modal_title": "You must be logged in",
      "works.login_modal_desc": "Please log in to continue with your application.",
      "works.login_modal_btn": "Go to Login",
      "works.login_modal_cancel": "Cancel",

      // Partners Section
      "partners.badge": "Our partners",
      "partners.title_prefix": "Trusted",
      "partners.title_suffix": "Partners",
    }
  },

  fr: {
    translation: {
      "nav.our_apartments": "Nos appartements",
      "nav.rental_management": "Gestion locative",
      "nav.premium": "Premium",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.dashboard": "Tableau de bord",
      "nav.logout": "Déconnexion",
      "nav.login_register": "Connexion / Inscription",

      "hero.title": "Trouvez votre appartement rapidement",
      "hero.subtitle": "et sans frais d'agence",
      "hero.description": "Postulez aux annonces et recevez des offres directes des propriétaires - 0€ de frais d'agence, 100% entre particuliers.",
      "hero.our_apartments": "NOS APPARTEMENTS",
      "hero.i_am_owner": "JE SUIS PROPRIÉTAIRE",

      "search.find_home": "Trouvez votre prochain logement",
      "search.property_type": "Type de bien",
      "search.property_type_placeholder": "Sélectionnez le type de bien",
      "search.location": "Localisation",
      "search.location_placeholder": "ex. Paris, Berlin ou un code postal",
      "search.price_range": "Fourchette de prix mensuel",
      "search.price_range_placeholder": "Tout prix mensuel",
      "search.search_now": "RECHERCHER",

      "logout.confirm": "Êtes-vous sûr de vouloir vous déconnecter ?",
      "logout.yes": "Oui, Déconnexion",
      "logout.cancel": "Annuler",
      "logout.logging_out": "Déconnexion en cours...",

      // Featured Section
      "featured.title_prefix": "Appartements",
      "featured.title_suffix": "en Vedette",
      "featured.subtitle": "Découvrez notre sélection d'appartements disponibles",
      "featured.view_all": "VOIR TOUT",
      "featured.month_cc": "/mois CC",
      "featured.view_details": "Voir Détails",

      // Why Us Section
      "why_us.title": "Pourquoi Nous ?",
      "why_us.badge_simplify": "GAGNEZ DU TEMPS ET DE L'ARGENT",
      "why_us.simplify_title_prefix": "Ce que",
      "why_us.simplify_title_suffix": "Hello Appart simplifie",
      "why_us.simplify_title_end": "pour vous",
      "why_us.badge_protect": "LOCATION SÉCURISÉE ET SEREINE",
      "why_us.protect_title_prefix": "Ce qui vous protège avec",
      "why_us.protect_title_suffix": "Hello Appart",

      // Why Us List Items
      "why_us.simplify_1": "100% sans frais d'agence",
      "why_us.simplify_2": "Candidature en ligne rapide",
      "why_us.simplify_3": "Suivez vos candidatures en temps réel",
      "why_us.simplify_4": "Support client réactif",
      "why_us.simplify_5": "Publiez votre recherche",
      "why_us.simplify_6": "Postulez aux appartements",

      "why_us.protect_1": "Annonces vérifiées manuellement",
      "why_us.protect_2": "Données personnelles protégées",
      "why_us.protect_3": "Propriétaires contrôlés pour éviter les arnaques",
      "why_us.protect_4": "Assistance personnalisée si nécessaire",
      "why_us.protect_5": "Vérification des dossiers pour les propriétaires",
      "why_us.protect_6": "Filtrez selon vos critères",

      // Stats Section
      "stats.apartments_available": "Appartements Disponibles",
      "stats.agency_fees": "Frais d'agence",
      "stats.average_time": "En Moyenne Pour Trouver",
      "stats.guaranteed_response": "Réponse Garantie",

      // Footer
      "footer.navigation": "Navigation",
      "footer.our_apartments": "Nos Appartements",
      "footer.premium_service": "Service Premium",
      "footer.faq": "FAQ",
      "footer.services": "Services",
      "footer.login": "Connexion",
      "footer.registration": "Inscription",
      "footer.contact": "Contact",
      "footer.address": "Adresse",
      "footer.email": "Email",
      "footer.phone": "Téléphone",
      // France Apartments Section
      "france.title_prefix": "Trouvez votre",
      "france.title_suffix": "Appartement",
      "france.title_end": "partout en France",
      "france.subtitle": "Des milliers d'annonces vérifiées dans les grandes villes françaises",

      // Works Section
      "works.badge": "Tendance",
      "works.badge_text": "400 personnes ont trouvé ce qu'elles cherchaient cette semaine",
      "works.title_prefix": "Comment ça",
      "works.title_suffix": "marche",
      "works.subtitle": "En 3 étapes simples, trouvez votre appartement plus vite",
      "works.subtitle_2": "qu'avec une agence traditionnelle",
      "works.card_1_title": "Créez votre dossier",
      "works.card_1_desc": "Complétez votre profil locataire en 5 minutes. Ajoutez vos documents, critères de recherche et budget.",
      "works.card_2_title": "Double recherche active",
      "works.card_2_desc": "Postulez aux annonces qui vous intéressent ET activez les notifications pour recevoir des offres directes des propriétaires.",
      "works.card_3_title": "Visitez et signez",
      "works.card_3_desc": "Organisez vos visites directement avec les propriétaires. Pas d'intermédiaires, pas de frais d'agence à payer.",
      "works.cta_button": "COMMENCEZ MAINTENANT - C'EST GRATUIT",
      "works.cta_subtext": "Essai gratuit • Accès immédiat aux annonces",
      "works.login_modal_title": "Vous devez être connecté",
      "works.login_modal_desc": "Veuillez vous connecter pour continuer votre candidature.",
      "works.login_modal_btn": "Aller à la connexion",
      "works.login_modal_cancel": "Annuler",

      // Partners Section
      "partners.badge": "Nos partenaires",
      "partners.title_prefix": "Partenaires de",
      "partners.title_suffix": "Confiance",
    }
  },

  de: {
    translation: {
      "nav.our_apartments": "Unsere Wohnungen",
      "nav.rental_management": "Mietverwaltung",
      "nav.premium": "Premium",
      "nav.faq": "FAQ",
      "nav.contact": "Kontakt",
      "nav.dashboard": "Dashboard",
      "nav.logout": "Abmelden",
      "nav.login_register": "Anmelden / Registrieren",

      "hero.title": "Finden Sie schnell Ihre Wohnung",
      "hero.subtitle": "und ohne Maklergebühren",
      "hero.description": "Bewerben Sie sich auf Anzeigen und erhalten Sie direkte Angebote von Eigentümern – 0 € Maklergebühren, 100 % zwischen Privatpersonen.",
      "hero.our_apartments": "UNSERE WOHNUNGEN",
      "hero.i_am_owner": "ICH BIN EIGENTÜMER",

      "search.find_home": "Finden Sie Ihr nächstes Zuhause",
      "search.property_type": "Objektart",
      "search.property_type_placeholder": "Objektart auswählen",
      "search.location": "Ort",
      "search.location_placeholder": "z.B. Paris, Berlin oder Postleitzahl",
      "search.price_range": "Monatlicher Preisbereich",
      "search.price_range_placeholder": "Beliebiger monatlicher Preis",
      "search.search_now": "JETZT SUCHEN",

      "logout.confirm": "Sind Sie sicher, dass Sie sich abmelden möchten?",
      "logout.yes": "Ja, abmelden",
      "logout.cancel": "Abbrechen",
      "logout.logging_out": "Abmeldung läuft...",

      // Featured Section
      "featured.title_prefix": "Ausgewählte",
      "featured.title_suffix": "Wohnungen",
      "featured.subtitle": "Entdecken Sie unsere Auswahl an verfügbaren Wohnungen",
      "featured.view_all": "ALLE ANZEIGEN",
      "featured.month_cc": "/monat NK",
      "featured.view_details": "Details Anzeigen",

      // Why Us Section
      "why_us.title": "Warum Wir?",
      "why_us.badge_simplify": "SPAREN SIE ZEIT UND GELD",
      "why_us.simplify_title_prefix": "Was",
      "why_us.simplify_title_suffix": "Hello Appart vereinfacht",
      "why_us.simplify_title_end": "für Sie",
      "why_us.badge_protect": "SICHERE UND RUHIGE VERMIETUNG",
      "why_us.protect_title_prefix": "Was Sie schützt bei",
      "why_us.protect_title_suffix": "Hello Appart",

      // Why Us List Items
      "why_us.simplify_1": "100% keine Maklergebühren",
      "why_us.simplify_2": "Schnelle Online-Bewerbung",
      "why_us.simplify_3": "Verfolgen Sie Ihre Bewerbungen in Echtzeit",
      "why_us.simplify_4": "Reaktionsschneller Kundensupport",
      "why_us.simplify_5": "Veröffentlichen Sie Ihre Suche",
      "why_us.simplify_6": "Auf Wohnungen bewerben",

      "why_us.protect_1": "Anzeigen manuell überprüft",
      "why_us.protect_2": "Persönliche Daten geschützt",
      "why_us.protect_3": "Eigentümer überprüft, um Betrug zu verhindern",
      "why_us.protect_4": "Persönliche Unterstützung bei Bedarf",
      "why_us.protect_5": "Aktenüberprüfung für Eigentümer",
      "why_us.protect_6": "Filtern Sie nach Ihren Kriterien",

      // Stats Section
      "stats.apartments_available": "Wohnungen Verfügbar",
      "stats.agency_fees": "Maklergebühren",
      "stats.average_time": "Im Durchschnitt zu finden",
      "stats.guaranteed_response": "Garantierte Antwort",

      // Footer
      "footer.navigation": "Navigation",
      "footer.our_apartments": "Unsere Wohnungen",
      "footer.premium_service": "Premium Service",
      "footer.faq": "FAQ",
      "footer.services": "Dienstleistungen",
      "footer.login": "Anmelden",
      "footer.registration": "Registrierung",
      "footer.contact": "Kontakt",
      "footer.address": "Adresse",
      "footer.email": "Email",
      "footer.phone": "Telefon",
      // France Apartments Section
      "france.title_prefix": "Finden Sie Ihre",
      "france.title_suffix": "Wohnung",
      "france.title_end": "überall in Frankreich",
      "france.subtitle": "Tausende geprüfte Angebote in französischen Großstädten",

      // Works Section
      "works.badge": "Trend",
      "works.badge_text": "400 Personen haben diese Woche gefunden, was sie suchten",
      "works.title_prefix": "Wie es",
      "works.title_suffix": "funktioniert",
      "works.subtitle": "In 3 einfachen Schritten finden Sie Ihre Wohnung schneller",
      "works.subtitle_2": "als mit einer herkömmlichen Agentur",
      "works.card_1_title": "Erstellen Sie Ihre Akte",
      "works.card_1_desc": "Vervollständigen Sie Ihr Mieterprofil in 5 Minuten. Fügen Sie Dokumente, Suchkriterien und Budget hinzu.",
      "works.card_2_title": "Aktive Doppelsuche",
      "works.card_2_desc": "Bewerben Sie sich auf interessante Anzeigen UND aktivieren Sie Benachrichtigungen für direkte Angebote von Eigentümern.",
      "works.card_3_title": "Besuchen und unterschreiben",
      "works.card_3_desc": "Organisieren Sie Besichtigungen direkt mit den Eigentümern. Keine Vermittler, keine Maklergebühren.",
      "works.cta_button": "JETZT STARTEN - ES IST KOSTENLOS",
      "works.cta_subtext": "Kostenlose Testversion • Sofortiger Zugriff auf Anzeigen",
      "works.login_modal_title": "Sie müssen eingeloggt sein",
      "works.login_modal_desc": "Bitte loggen Sie sich ein, um mit Ihrer Bewerbung fortzufahren.",
      "works.login_modal_btn": "Zum Login gehen",
      "works.login_modal_cancel": "Stornieren",

      // Partners Section
      "partners.badge": "Unsere Partner",
      "partners.title_prefix": "Vertrauenswürdige",
      "partners.title_suffix": "Partner",
    }
  }
};

i18n
  .use(LanguageDetector)        //   localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ['localStorage', 'navigator'],  // localStorage
      caches: ['localStorage']               //
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;