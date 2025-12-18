
// En un entorno real, usaríamos @keystatic/core/reader
// Aquí simulamos el acceso a los datos que Keystatic guardaría en archivos JSON

export const getKeystaticData = async () => {
  // Intentamos recuperar datos de localStorage para simular el guardado del admin en este entorno demo
  const localData = localStorage.getItem('keystatic-content');
  if (localData) return JSON.parse(localData);

  // Datos iniciales por defecto (Seed)
  return {
    settings: {
      siteTitle: "Beluga Linguistics",
      primaryColor: "#1C0445",
      accentColor: "#FFD100",
      secondaryColor: "#CF0072",
      footerText: "© 2025 Beluga Linguistics"
    },
    navigation: {
      links: [
        { label: "HOME", href: "home" },
        { label: "SERVICES", href: "services" },
        { label: "CONTACT", href: "contact" }
      ]
    },
    pages: {
      home: {
        title: "home",
        sections: [
          {
            _type: 'hero',
            line1: "LANGUAGE",
            line2: "SERVICES",
            highlight: "NAH,",
            subline: "WE SPEAK HUMAN",
            bio: "Forget word counts. Forget strings. Think people. We don't just translate; we build bridges."
          },
          {
            _type: 'manifesto',
            title: "ROBOTS DON'T",
            subtitle: "FALL IN LOVE",
            content: "They also don't get sarcasm, nuance, or the beauty of a well-placed pause."
          }
        ]
      }
    }
  };
};
