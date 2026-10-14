// Grupos e frase do llms.txt por página. Ao mudar uma página de verdade, atualizar a frase aqui.
// Páginas ainda não portadas (sem pasta em src/content-pages) ficam de fora do llms.txt e do sitemap.
export const GROUPS = [
  'Produto e ajuda',
  'Soluções por segmento (uma página por tipo de negócio)',
  'Redes e franquias (várias unidades)',
  'Blog',
  'Institucional',
];

export const LLMS_INTRO = {
  title: 'Aurora Premium',
  summary: 'Sistema de agendamento online e gestão para salões, barbearias, clínicas e pet shops: agenda, WhatsApp, comissão, financeiro e estoque. Teste 14 dias grátis.',
  about: 'Sistema de gestão com agenda online, CRM, financeiro, estoque e equipe para negócios de serviços que atendem por hora marcada (salões, barbearias, clínicas, spas e pet shops). Teste grátis por 14 dias, sem cartão de crédito. O Aurora Premium não emite nota fiscal e não processa o pagamento do cliente final.',
};

// caminho -> { group: índice em GROUPS, entrega: frase }
export const LLMS = {
  '/': { group: 0, entrega: 'Sistema de agendamento online e gestão para salões, barbearias, clínicas e pet shops: agenda, WhatsApp, comissão, financeiro, estoque e site com agendamento.' },
  '/planos/': { group: 0, entrega: 'Solo R$ 39,90, Essential R$ 157, Growth R$ 497, Scale R$ 1.197, Enterprise sob consulta; 14 dias grátis.' },
  '/sistema-para-salao-de-beleza/': { group: 1, entrega: 'Agenda online, confirmação pelo WhatsApp, comissão, financeiro, estoque e relatórios com IA.' },
  '/sistema-para-clinica-veterinaria/': { group: 1, entrega: 'Agenda, prontuário veterinário e carteira de vacinação, lembrete pelo WhatsApp, estoque e financeiro para clínicas veterinárias.' },
  '/sistema-para-pet-shop/': { group: 1, entrega: 'Agenda de banho e tosa, cadastro de pets, lembrete pelo WhatsApp, estoque, financeiro e comissão para pet shops.' },
};
