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
  '/sistema-para-barbearia/': { group: 1, entrega: 'Agenda online por barbeiro, lembrete pelo WhatsApp, comissão de barbeiro e barbeiro parceiro, caixa, estoque, fidelização e site da barbearia com agendamento online.' },
  '/sistema-para-clinica-veterinaria/': { group: 1, entrega: 'Agenda, prontuário veterinário e carteira de vacinação, lembrete pelo WhatsApp, estoque e financeiro para clínicas veterinárias.' },
  '/sistema-para-pet-shop/': { group: 1, entrega: 'Agenda de banho e tosa, cadastro de pets, lembrete pelo WhatsApp, estoque, financeiro e comissão para pet shops.' },
  "/modules/": { group: 0, entrega: "Lista os módulos do sistema agrupados por área: agenda e atendimento, financeiro, clientes e marketing, equipe, estoque e redes." },
  "/diferenciais/": { group: 0, entrega: "Compara o Aurora Premium com sistemas tradicionais de agendamento e mostra o que muda na operação do negócio." },
  "/faq/": { group: 0, entrega: "Responde 17 perguntas sobre agenda online, WhatsApp, teste grátis, Pix, nota fiscal, migração, várias unidades e segurança." },
  "/sistema-para-clinica-de-estetica/": { group: 1, entrega: "Sistema para clínica de estética: agenda por profissional e sala, pacotes de sessões com saldo, ficha de anamnese por procedimento, termo de consentimento, prontuário com fotos de antes e depois, lembrete pelo WhatsApp, comissão, estoque e financeiro." },
  "/agenda-para-clinica-odontologica/": { group: 1, entrega: "Agenda com confirmação pelo WhatsApp, prontuário e acompanhamento de faltas para clínicas odontológicas." },
  "/agenda-para-consultorio-medico/": { group: 1, entrega: "Sistema para clínica médica e consultório: agenda médica por médico, confirmação de consulta pelo WhatsApp, prontuário do paciente com anamnese e alerta de validade de exames, convênios e carteirinha, retorno marcado na saída, plano de tratamento, comissão de médicos, financeiro, estoque e a Aurora Consulting, consultoria estratégica com o DNA Viviane Roque." },
  "/sistema-para-esmalteria/": { group: 1, entrega: "Agenda por manicure, lembrete de retorno e ticket médio por profissional para esmalterias." },
  "/agenda-para-designer-de-sobrancelhas/": { group: 1, entrega: "Agenda por procedimento e lembrete no intervalo de cada cliente para designers de sobrancelhas e cílios." },
  "/sistema-para-spa/": { group: 1, entrega: "Sistema para spa e day spa: agenda por sala e terapeuta, pacotes de sessões, day spa com vários serviços na mesma visita, lembrete pelo WhatsApp, comissão, estoque e financeiro." },
  "/lembrete-de-agendamento-whatsapp/": { group: 1, entrega: "Explica o lembrete e a confirmação de agendamento pelo WhatsApp para reduzir faltas." },
  "/sistema-para-rede-de-saloes-e-clinicas/": { group: 2, entrega: "Gestão de várias unidades em uma conta: agenda, equipe, clientes, estoque e receita por unidade." },
  "/sistema-para-rede-de-saloes-de-beleza/": { group: 2, entrega: "Gestão multiunidades para redes e franquias de salões de beleza, com receita por unidade e cadastro de clientes único." },
  "/sistema-para-rede-de-barbearias/": { group: 2, entrega: "Gestão multiunidades para redes e franquias de barbearias, com receita por unidade e cadastro de clientes único." },
  "/sistema-para-rede-de-pet-shops/": { group: 2, entrega: "Gestão multiunidades para redes de pet shops, com agenda de banho e tosa, estoque e receita por unidade." },
  "/sistema-para-rede-de-clinicas-veterinarias/": { group: 2, entrega: "Gestão multiunidades para redes de clínicas veterinárias, com prontuário e vacinas compartilhados entre unidades." },
  "/sistema-para-rede-de-clinicas-odontologicas/": { group: 2, entrega: "Gestão multiunidades para redes de clínicas odontológicas, com prontuário do paciente e receita por unidade." },
  "/sistema-para-rede-de-clinicas-medicas/": { group: 2, entrega: "Gestão multiunidades para redes de clínicas médicas, com prontuário do paciente e receita por unidade." },
  "/sistema-para-rede-de-spas/": { group: 2, entrega: "Gestão multiunidades para redes de spas, com agenda por sala, pacotes de sessões e receita por unidade." },
  "/blog/": { group: 3, entrega: "Artigos sobre agenda, comissões, CRM, estoque e gestão de negócios de serviços." },
  "/blog/reduzir-faltas-no-show-agenda-online/": { group: 3, entrega: "Explica como lembretes automáticos e agenda visual reduzem faltas e no-shows." },
  "/blog/comissionamento-automatico-fim-planilha/": { group: 3, entrega: "Explica como automatizar o cálculo de comissão por profissional e por serviço." },
  "/blog/crm-clinicas-nunca-perder-cliente/": { group: 3, entrega: "Explica como um CRM integrado à agenda evita perder clientes e pacientes de vista." },
  "/blog/controle-estoque-saloes-petshops/": { group: 3, entrega: "Explica por que controlar o consumo de produtos por atendimento em salões e pet shops." },
  "/blog/agenda-compartilhada-multiplos-profissionais/": { group: 3, entrega: "Explica como organizar a agenda de vários profissionais sem conflito de horário." },
  "/blog/um-sistema-em-vez-de-tres/": { group: 3, entrega: "Explica por que um sistema único funciona melhor do que agenda, planilha e caderno separados." },
  "/termos-de-uso/": { group: 4, entrega: "Termos de uso da plataforma Aurora Premium." },
  "/politica-de-privacidade/": { group: 4, entrega: "Política de privacidade: como os dados pessoais são coletados, usados e protegidos." },
};
