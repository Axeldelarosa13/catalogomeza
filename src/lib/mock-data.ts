import type { CatalogProduct, Category, ProductImage } from "@/types/database";

const now = new Date().toISOString();

export const mockCategories: Category[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Baterias de cocina",
    slug: "baterias-de-cocina",
    description: "Juegos completos de ollas, sartenes y accesorios para cocina.",
    is_active: true,
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Ollas y sartenes",
    slug: "ollas-y-sartenes",
    description: "Piezas sueltas, cazuelas, comales y ollas de gran capacidad.",
    is_active: true,
    sort_order: 2,
    created_at: now,
    updated_at: now,
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Electrodomesticos",
    slug: "electrodomesticos",
    description: "Equipos practicos para preparar, calentar y servir alimentos.",
    is_active: true,
    sort_order: 3,
    created_at: now,
    updated_at: now,
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    name: "Organizacion",
    slug: "organizacion",
    description: "Soluciones para ordenar cocina, tapas, platos y especias.",
    is_active: true,
    sort_order: 4,
    created_at: now,
    updated_at: now,
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    name: "Vajillas y mesa",
    slug: "vajillas-y-mesa",
    description: "Vajillas, cubiertos y piezas para comedor.",
    is_active: true,
    sort_order: 5,
    created_at: now,
    updated_at: now,
  },
  {
    id: "66666666-6666-4666-8666-666666666666",
    name: "Utensilios",
    slug: "utensilios",
    description: "Accesorios de cocina para preparar, cortar y servir.",
    is_active: true,
    sort_order: 6,
    created_at: now,
    updated_at: now,
  },
  {
    id: "77777777-7777-4777-8777-777777777777",
    name: "Gas y parrillas",
    slug: "gas-y-parrillas",
    description: "Parrillas, tanques y articulos de apoyo para cocinar.",
    is_active: true,
    sort_order: 7,
    created_at: now,
    updated_at: now,
  },
];

const categoryBySlug = Object.fromEntries(
  mockCategories.map((category) => [category.slug, category]),
);

function image(
  id: string,
  productId: string,
  url: string,
  alt: string,
  isMain = false,
  position = 0,
): ProductImage {
  return {
    id,
    product_id: productId,
    storage_path: null,
    url,
    alt,
    is_main: isMain,
    position,
    created_at: now,
  };
}

type ProductSeed = {
  code: string;
  name: string;
  slug: string;
  categorySlug: string;
  image: string;
  short: string;
  description: string;
  credit_price?: number | null;
  down_payment?: number | null;
  weekly_payment?: number | null;
  featured?: boolean;
};

const products: ProductSeed[] = [
  {
    code: "001",
    name: "Kit de ollas de aluminio Lamex 30, 11 y 6.5 L",
    slug: "kit-ollas-aluminio-lamex",
    categorySlug: "ollas-y-sartenes",
    image: "01-kit-ollas-aluminio-lamex.jpeg",
    short: "Juego de ollas de aluminio con tapas de vidrio en tres capacidades.",
    description:
      "Set Lamex ideal para preparar comidas familiares, eventos y porciones grandes. Incluye capacidades de 30, 11 y 6.5 litros.",
    featured: true,
  },
  {
    code: "002",
    name: "Bateria antiadherente Alpine Cuisine 17 piezas",
    slug: "bateria-antiadherente-alpine-cuisine-17-piezas",
    categorySlug: "baterias-de-cocina",
    image: "02-bateria-cocina-antiadherente-roja.jpeg",
    short: "Bateria completa con ollas, sartenes, tapas y utensilios.",
    description:
      "Juego antiadherente de uso diario con piezas para guisar, freir, saltear y servir. Incluye tapas de vidrio y utensilios para complementar la cocina.",
    featured: true,
  },
  {
    code: "003",
    name: "Olla de aluminio 120 litros",
    slug: "olla-aluminio-120-litros",
    categorySlug: "ollas-y-sartenes",
    image: "03-olla-aluminio-120-litros.jpeg",
    short: "Olla grande de aluminio para eventos, negocios y preparaciones familiares.",
    description:
      "Olla de alta capacidad con tapa y asas laterales para preparaciones de gran volumen.",
    featured: true,
  },
  {
    code: "004",
    name: "Plancha de vapor T-fal Easygliss azul",
    slug: "plancha-vapor-tefal-easygliss-azul",
    categorySlug: "electrodomesticos",
    image: "04-plancha-vapor-tefal-azul.jpeg",
    short: "Plancha de vapor para ropa con suela deslizante.",
    description:
      "Equipo practico para el hogar, con vapor para mejorar el planchado y acabado de prendas de uso diario.",
  },
  {
    code: "005",
    name: "Bateria de cocina turquesa Kuche",
    slug: "bateria-cocina-turquesa-kuche",
    categorySlug: "baterias-de-cocina",
    image: "05-bateria-cocina-turquesa-kueche.jpeg",
    short: "Juego de ollas y sartenes color turquesa con tapas de vidrio.",
    description:
      "Bateria vistosa para renovar la cocina con piezas antiadherentes, asas comodas y accesorios para cocinar desde recetas sencillas hasta comidas completas.",
    featured: true,
  },
  {
    code: "006",
    name: "Set de sartenes ceramicos blancos",
    slug: "set-sartenes-ceramicos-blancos",
    categorySlug: "ollas-y-sartenes",
    image: "06-sartenes-ceramicos-blancos.jpeg",
    short: "Sartenes blancos con interior ceramico y tapa de vidrio.",
    description:
      "Juego de sartenes de estilo limpio y moderno, pensado para cocinar con menos aceite y servir directamente en mesa.",
  },
  {
    code: "007",
    name: "Cazuelas rosas apilables con tapa",
    slug: "cazuelas-rosas-apilables-con-tapa",
    categorySlug: "ollas-y-sartenes",
    image: "07-cazuelas-rosas-apilables.jpeg",
    short: "Cazuelas rosas con acabado tipo granito y tapas de vidrio.",
    description:
      "Set de cazuelas apilables para ahorrar espacio, con asas a tono y presentacion ideal para cocina moderna.",
    featured: true,
  },
  {
    code: "008",
    name: "Sartenes granito color terracota",
    slug: "sartenes-granito-color-terracota",
    categorySlug: "ollas-y-sartenes",
    image: "08-sartenes-granito-terracota.jpeg",
    short: "Sartenes antiadherentes con acabado granito en tono terracota.",
    description:
      "Juego de sartenes para preparar desayunos, guarniciones y platillos rapidos con una superficie facil de limpiar.",
  },
  {
    code: "009",
    name: "Cazuelas rosas Kiuche para cocina",
    slug: "cazuelas-rosas-kiuche-para-cocina",
    categorySlug: "ollas-y-sartenes",
    image: "09-cazuelas-rosas-jardin.jpeg",
    short: "Cazuelas rosas con tapa y acabado brillante.",
    description:
      "Piezas de cocina en color rosa con estilo decorativo, utiles para guisar, calentar y servir.",
  },
  {
    code: "010",
    name: "Bateria de cocina negra",
    slug: "bateria-cocina-negra",
    categorySlug: "baterias-de-cocina",
    image: "10-bateria-cocina-negra.jpeg",
    short: "Juego compacto de ollas y sartenes negros.",
    description:
      "Bateria sobria de color negro para quienes buscan piezas basicas, resistentes y faciles de combinar.",
  },
  {
    code: "011",
    name: "Bateria antiadherente naranja con accesorios",
    slug: "bateria-antiadherente-naranja-accesorios",
    categorySlug: "baterias-de-cocina",
    image: "11-bateria-cocina-naranja.jpeg",
    short: "Juego naranja con ollas, sartenes, tapas y utensilios.",
    description:
      "Bateria completa para cocina diaria con acabado antiadherente, tapas de vidrio y accesorios de servicio.",
    featured: true,
  },
  {
    code: "012",
    name: "Sandwichera Signa antiadherente",
    slug: "sandwichera-signa-antiadherente",
    categorySlug: "electrodomesticos",
    image: "12-sandwichera-signa.jpeg",
    short: "Sandwichera electrica para panes tostados y snacks rapidos.",
    description:
      "Equipo compacto para preparar sandwiches calientes, botanas y desayunos de forma practica.",
  },
  {
    code: "013",
    name: "Set de especieros cobre con base",
    slug: "set-especieros-cobre-con-base",
    categorySlug: "organizacion",
    image: "13-especieros-cobre-con-base.jpeg",
    short: "Organizador de especias con frascos y base metalica color cobre.",
    description:
      "Set decorativo para ordenar sal, cafe, azucar, te y especias pequenas con estilo elegante.",
  },
  {
    code: "014",
    name: "Organizador de sartenes y tapas",
    slug: "organizador-sartenes-y-tapas",
    categorySlug: "organizacion",
    image: "14-organizador-sartenes-metal.jpeg",
    short: "Rack metalico para ordenar tapas, sartenes y ollas.",
    description:
      "Organizador compacto con diferentes formas de instalacion para aprovechar gabinetes y mantener la cocina despejada.",
  },
  {
    code: "015",
    name: "Juego de cazuelas rojas 24, 26 y 28 cm",
    slug: "juego-cazuelas-rojas-24-26-28-cm",
    categorySlug: "ollas-y-sartenes",
    image: "15-cazuelas-rojas-24-26-28.jpeg",
    short: "Tres cazuelas rojas con tapa de vidrio en medidas practicas.",
    description:
      "Set de 24, 26 y 28 cm para cocinar guisos, sopas, arroz y platillos familiares.",
  },
  {
    code: "016",
    name: "Especiero giratorio estilo marmol",
    slug: "especiero-giratorio-estilo-marmol",
    categorySlug: "organizacion",
    image: "16-especiero-giratorio-marmol.jpeg",
    short: "Especiero giratorio con acabado marmoleado.",
    description:
      "Accesorio elegante para tener condimentos a la mano y mejorar la presentacion de la cocina.",
  },
  {
    code: "017",
    name: "Especiero ovalado con tapa de madera",
    slug: "especiero-ovalado-tapa-madera",
    categorySlug: "organizacion",
    image: "17-especiero-madera-ovalado.jpeg",
    short: "Base ovalada con frascos para especias y tapa tipo madera.",
    description:
      "Set para organizar condimentos en barra o alacena, con acabado calido y moderno.",
  },
  {
    code: "018",
    name: "Utensilios de silicona rojos 12 piezas",
    slug: "utensilios-silicona-rojos-12-piezas",
    categorySlug: "utensilios",
    image: "18-utensilios-silicona-rojos.jpeg",
    short: "Set de 12 piezas con mangos efecto madera.",
    description:
      "Utensilios para mezclar, servir, batir y manipular alimentos sin rayar superficies antiadherentes.",
  },
  {
    code: "019",
    name: "Vajilla negra elegante",
    slug: "vajilla-negra-elegante",
    categorySlug: "vajillas-y-mesa",
    image: "19-vajilla-negra-elegante.jpeg",
    short: "Juego de mesa negro para comedor moderno.",
    description:
      "Vajilla sobria para reuniones, desayunos y comidas con una presentacion elegante.",
  },
  {
    code: "020",
    name: "Vajilla blanca con filo rojo",
    slug: "vajilla-blanca-filo-rojo",
    categorySlug: "vajillas-y-mesa",
    image: "20-vajilla-blanca-filo-rojo.jpeg",
    short: "Vajilla blanca con decoracion roja y piezas de servicio.",
    description:
      "Set para mesa con platos, bowl y taza. Ideal para uso diario con un detalle de color clasico.",
  },
  {
    code: "021",
    name: "Tanque de gas portatil",
    slug: "tanque-gas-portatil",
    categorySlug: "gas-y-parrillas",
    image: "21-tanque-gas-portatil.jpeg",
    short: "Tanque de gas para uso domestico y apoyo en cocina.",
    description:
      "Articulo practico para complementar parrillas, cocinas portatiles o necesidades de gas en el hogar.",
  },
  {
    code: "022",
    name: "Bateria Cookinex gris 16 piezas",
    slug: "bateria-cookinex-gris-16-piezas",
    categorySlug: "baterias-de-cocina",
    image: "22-bateria-cookinex-gris.jpeg",
    short: "Juego Cookinex antiadherente con ollas, tapas y utensilios.",
    description:
      "Bateria completa con acabado gris, tapas de vidrio templado y utensilios para una cocina equipada.",
  },
  {
    code: "023",
    name: "Bateria Cookinex rosa 16 piezas",
    slug: "bateria-cookinex-rosa-16-piezas",
    categorySlug: "baterias-de-cocina",
    image: "23-bateria-cookinex-rosa.jpeg",
    short: "Juego Cookinex color rosa con utensilios incluidos.",
    description:
      "Bateria antiadherente con piezas para cocinar diferentes recetas y presentacion llamativa en color rosa.",
  },
  {
    code: "024",
    name: "Juego de sartenes rosa Kitchen",
    slug: "juego-sartenes-rosa-kitchen",
    categorySlug: "ollas-y-sartenes",
    image: "24-juego-sartenes-rosa-kitchen.jpeg",
    short: "Set rosa con sartenes y piezas complementarias.",
    description:
      "Juego practico para cocinar porciones pequenas y medianas, con color suave para una cocina coordinada.",
  },
  {
    code: "025",
    name: "Escurridor de platos de dos niveles",
    slug: "escurridor-platos-dos-niveles",
    categorySlug: "organizacion",
    image: "25-escurridor-platos-dos-niveles.jpeg",
    short: "Escurridor para mantener la cocina organizada.",
    description:
      "Organizador de platos, tazas y utensilios con dos niveles, ideal para aprovechar espacio junto al fregadero.",
  },
  {
    code: "026",
    name: "Set de sartenes granito terracota",
    slug: "set-sartenes-granito-terracota",
    categorySlug: "ollas-y-sartenes",
    image: "26-sartenes-granito-terracota-set.jpeg",
    short: "Sartenes antiadherentes en color terracota.",
    description:
      "Set de sartenes con acabado tipo granito para uso diario, facil limpieza y buen desempeno en cocina.",
  },
  {
    code: "027",
    name: "Cortador de verduras multifuncional",
    slug: "cortador-verduras-multifuncional",
    categorySlug: "utensilios",
    image: "27-cortador-verduras-multifuncional.jpeg",
    short: "Cortador con cuchillas intercambiables para picar y rebanar.",
    description:
      "Accesorio para ahorrar tiempo al preparar verduras, cebolla, papa y otros ingredientes.",
  },
  {
    code: "028",
    name: "Vajilla blanca texturizada",
    slug: "vajilla-blanca-texturizada",
    categorySlug: "vajillas-y-mesa",
    image: "28-vajilla-blanca-texturizada.jpeg",
    short: "Juego blanco con acabado texturizado para mesa diaria.",
    description:
      "Vajilla versatil para comedor, facil de combinar con distintos estilos de mesa.",
  },
  {
    code: "029",
    name: "Malteadora RCA negra con vaso de acero",
    slug: "malteadora-rca-negra-vaso-acero",
    categorySlug: "electrodomesticos",
    image: "29-malteadora-rca-negra.jpeg",
    short: "Malteadora para bebidas, licuados y postres frios.",
    description:
      "Equipo de barra con vaso metalico graduado para preparar malteadas, frappes y bebidas cremosas.",
  },
  {
    code: "030",
    name: "Licuadora Oster con vaso de vidrio",
    slug: "licuadora-oster-vaso-vidrio",
    categorySlug: "electrodomesticos",
    image: "30-licuadora-oster-vaso-vidrio.jpeg",
    short: "Licuadora Oster para jugos, salsas y smoothies.",
    description:
      "Electrodomestico basico para cocina diaria, con vaso de vidrio y controles frontales.",
    featured: true,
  },
  {
    code: "031",
    name: "Parrilla de gas Garell cuatro quemadores",
    slug: "parrilla-gas-garell-cuatro-quemadores",
    categorySlug: "gas-y-parrillas",
    image: "31-estufa-parrilla-gas-garell.jpeg",
    short: "Parrilla de gas negra con cuatro quemadores.",
    description:
      "Parrilla practica para espacios compactos, cocinas auxiliares o departamentos.",
  },
  {
    code: "032",
    name: "Bateria roja Genova antiadherente",
    slug: "bateria-roja-genova-antiadherente",
    categorySlug: "baterias-de-cocina",
    image: "32-bateria-roja-genova.jpeg",
    short: "Juego rojo con ollas, sartenes y tapas de vidrio.",
    description:
      "Bateria completa con acabado rojo para cocinar y servir con estilo.",
  },
  {
    code: "033",
    name: "Bateria premium de acero Kiuche",
    slug: "bateria-premium-acero-kiuche",
    categorySlug: "baterias-de-cocina",
    image: "33-bateria-acero-kueche-premium.jpeg",
    short: "Set de acero con tetera, ollas, sarten y accesorios.",
    description:
      "Juego premium con piezas de acero, detalles dorados y accesorios para una cocina completa.",
    featured: true,
  },
  {
    code: "034",
    name: "Bateria de acero Kiuche con accesorios",
    slug: "bateria-acero-kiuche-accesorios",
    categorySlug: "baterias-de-cocina",
    image: "34-bateria-acero-kueche-set.jpeg",
    short: "Set de acero con tapas y rejilla incluida.",
    description:
      "Bateria elegante de acero para cocinar con piezas resistentes y presentacion moderna.",
  },
  {
    code: "035",
    name: "Ollas azules con tapas de vidrio",
    slug: "ollas-azules-tapas-vidrio",
    categorySlug: "baterias-de-cocina",
    image: "35-ollas-azules-vidrio.jpeg",
    short: "Bateria azul con tapas de vidrio y sarten cuadrado.",
    description:
      "Set antiadherente azul para cocina diaria, con diferentes tamanos y accesorios.",
  },
  {
    code: "036",
    name: "Set de cubiertos de acero 40 piezas",
    slug: "set-cubiertos-acero-40-piezas",
    categorySlug: "vajillas-y-mesa",
    image: "36-cubiertos-acero-40-piezas.jpeg",
    short: "Cubiertos de acero inoxidable para mesa completa.",
    description:
      "Juego de 40 piezas con cucharas, tenedores y cuchillos para equipar comedor familiar.",
  },
  {
    code: "037",
    name: "Cazuelas rojas con tapas de vidrio",
    slug: "cazuelas-rojas-tapas-vidrio",
    categorySlug: "ollas-y-sartenes",
    image: "37-cazuelas-rojas-vidrio.jpeg",
    short: "Set de cazuelas rojas con tapa ahumada.",
    description:
      "Piezas con asas negras y rojas, ideales para guisos, caldos y preparaciones familiares.",
  },
  {
    code: "038",
    name: "Cazuelas rosas con tapas de vidrio",
    slug: "cazuelas-rosas-tapas-vidrio",
    categorySlug: "ollas-y-sartenes",
    image: "38-cazuelas-rosas-vidrio.jpeg",
    short: "Set de tres cazuelas rosas con tapas.",
    description:
      "Juego de cazuelas para cocinar porciones variadas con estilo suave y decorativo.",
  },
  {
    code: "039",
    name: "Mesa triana sencilla de resina",
    slug: "mesa-triana-sencilla-resina",
    categorySlug: "organizacion",
    image: "39-mesa-triana-resina.jpeg",
    short: "Mesa auxiliar con charola y canastilla.",
    description:
      "Mesa practica para apoyo en cocina, patio o area de servicio, con estructura ligera y charola superior.",
  },
  {
    code: "040",
    name: "Microondas Midea con funcion ECO",
    slug: "microondas-midea-funcion-eco",
    categorySlug: "electrodomesticos",
    image: "40-microondas-midea-eco.jpeg",
    short: "Microondas negro con funcion de ahorro de energia.",
    description:
      "Equipo moderno para calentar, descongelar y cocinar rapidamente con opcion ECO para ahorro de energia.",
  },
  {
    code: "041",
    name: "Bateria Bologna Kiuche 8 piezas",
    slug: "bateria-bologna-kiuche-8-piezas",
    categorySlug: "baterias-de-cocina",
    image: "41-bateria-bologna-kueche.jpeg",
    short: "Juego de acero inoxidable con manijas de silicona.",
    description:
      "Bateria Bologna de 8 piezas con tapas de vidrio templado y fondo termodinamico para distribuir calor.",
  },
  {
    code: "042",
    name: "Juego de cocina Samary Cuisine color durazno",
    slug: "juego-cocina-samary-cuisine-durazno",
    categorySlug: "baterias-de-cocina",
    image: "42-juego-cocina-samary-cuisine.jpeg",
    short: "Bateria color durazno con sartenes, ollas y comal.",
    description:
      "Set decorativo para cocina equipada con piezas antiadherentes, asas efecto madera y tapas de vidrio.",
    featured: true,
  },
  {
    code: "043",
    name: "Juego de sartenes negros 18, 23 y 28 cm",
    slug: "juego-sartenes-negros-18-23-28-cm",
    categorySlug: "ollas-y-sartenes",
    image: "43-sartenes-negros-medidas.jpeg",
    short: "Tres sartenes antiadherentes con medidas visibles.",
    description:
      "Set de sartenes negros para cocina diaria en 18, 23 y 28 cm, con mangos resistentes.",
  },
  {
    code: "044",
    name: "Bateria azul Alpine Cuisine",
    slug: "bateria-azul-alpine-cuisine",
    categorySlug: "baterias-de-cocina",
    image: "44-bateria-azul-alpine-cuisine.jpeg",
    short: "Juego azul con ollas, sartenes, tapas y utensilios.",
    description:
      "Bateria completa Alpine Cuisine en color azul, lista para cocinar con diferentes capacidades.",
  },
  {
    code: "045",
    name: "Comal rectangular negro",
    slug: "comal-rectangular-negro",
    categorySlug: "gas-y-parrillas",
    image: "45-comal-rectangular-negro.jpeg",
    short: "Comal rectangular para estufa con asas laterales.",
    description:
      "Comal amplio para tortillas, carnes, verduras y preparaciones directas sobre estufa.",
  },
];

export const mockProducts: CatalogProduct[] = products.map((product, index) => {
  const category = categoryBySlug[product.categorySlug] ?? mockCategories[0];
  const id = `90000000-0000-4000-8000-000000000${product.code}`;
  const productImage = image(
    `img-${product.code}`,
    id,
    `/productos-meza/${product.image}`,
    product.name,
    true,
  );

  return {
    id,
    category_id: category.id,
    name: product.name,
    slug: product.slug,
    short_description: product.short,
    description: product.description,
    sku: `AM-${product.code}`,
    price: null,
    currency: "MXN",
    credit_price: product.credit_price ?? null,
    down_payment: product.down_payment ?? null,
    weekly_payment: product.weekly_payment ?? null,
    is_active: true,
    is_featured: Boolean(product.featured),
    whatsapp_message: `Hola, me interesa ${product.name} de Articulos Meza.`,
    meta_title: product.name,
    meta_description: product.short,
    created_by: null,
    updated_by: null,
    created_at: new Date(Date.now() - index * 60_000).toISOString(),
    updated_at: now,
    category,
    product_images: [productImage],
    main_image: productImage,
  };
});
