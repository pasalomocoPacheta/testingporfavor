
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'https://github.com/pasalomocoPacheta/testingporfavor', // <--- CAMBIA ESTO POR TU REPO REAL
  },
  singletons: {
    settings: singleton({
      label: 'Configuración Global',
      path: 'content/settings',
      schema: {
        siteTitle: fields.string({ label: 'Título del Sitio' }),
        primaryColor: fields.text({ label: 'Color Primario (Hex)', defaultValue: '#1C0445' }),
        accentColor: fields.text({ label: 'Color de Acento (Hex)', defaultValue: '#FFD100' }),
        secondaryColor: fields.text({ label: 'Color Secundario (Hex)', defaultValue: '#CF0072' }),
        footerText: fields.string({ label: 'Texto del Copyright', defaultValue: 'Beluga Linguistics' }),
      },
    }),
    navigation: singleton({
      label: 'Navegación y Menú',
      path: 'content/navigation',
      schema: {
        links: fields.array(
          fields.object({
            label: fields.string({ label: 'Etiqueta' }),
            href: fields.string({ label: 'URL/Slug' }),
          }),
          { label: 'Enlaces del Menú', itemLabel: props => props.fields.label.value }
        ),
      },
    }),
  },
  collections: {
    pages: collection({
      label: 'Páginas',
      slugField: 'title',
      path: 'content/pages/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        sections: fields.blocks({
          hero: {
            label: 'Sección Hero',
            itemLabel: props => `Hero: ${props.fields.line1.value}`,
            schema: fields.object({
              line1: fields.string({ label: 'Línea 1' }),
              line2: fields.string({ label: 'Línea 2' }),
              highlight: fields.string({ label: 'Texto Resaltado' }),
              subline: fields.string({ label: 'Subtítulo' }),
              bio: fields.text({ label: 'Biografía/Texto largo', multiline: true }),
            }),
          },
          manifesto: {
            label: 'Manifiesto',
            schema: fields.object({
              title: fields.string({ label: 'Título Grande' }),
              subtitle: fields.string({ label: 'Subtítulo Color' }),
              content: fields.text({ label: 'Contenido', multiline: true }),
            }),
          },
          services: {
            label: 'Cuadrícula de Servicios',
            schema: fields.object({
              title: fields.string({ label: 'Título de la Sección' }),
              subtitle: fields.string({ label: 'Texto superior' }),
            }),
          },
        }),
      },
    }),
  },
});
