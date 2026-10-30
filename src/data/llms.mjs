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
  '/': { group: 0, entrega: "Sistema de agendamento online e gestão para salões, barbearias, clínicas e pet shops: agenda, WhatsApp, comissão, financeiro, gestão de suprimentos (estoque e fornecedores) e site com agendamento." },
  '/planos/': { group: 0, entrega: 'Solo R$ 39,90, Essential R$ 157, Growth R$ 497, Scale R$ 1.197, Enterprise sob consulta; 14 dias grátis.' },
  '/sistema-para-salao-de-beleza/': { group: 1, entrega: "Agenda online, confirmação pelo WhatsApp, comissão, financeiro, gestão de suprimentos (estoque e fornecedores) e relatórios com IA." },
  '/sistema-para-barbearia/': { group: 1, entrega: "Agenda online por barbeiro, lembrete pelo WhatsApp, comissão de barbeiro e barbeiro parceiro, caixa, gestão de suprimentos (estoque e fornecedores), fidelização e site da barbearia com agendamento online." },
  '/sistema-para-clinica-veterinaria/': { group: 1, entrega: "Agenda, prontuário veterinário e carteira de vacinação, lembrete pelo WhatsApp, gestão de suprimentos (estoque e fornecedores) e financeiro para clínicas veterinárias." },
  '/sistema-para-pet-shop/': { group: 1, entrega: "Agenda de banho e tosa, cadastro de pets, lembrete pelo WhatsApp, gestão de suprimentos (estoque e fornecedores), financeiro e comissão para pet shops." },
  "/sobre/": { group: 4, entrega: "Quem faz o Aurora Premium: lançado em 2025, criado por Viviane Roque (tecnologia e operações desde 1998: BCP/Claro, Ernst & Young, NEC nas arenas Fonte Nova e Pernambuco, sistemas para municípios) e desenvolvido pela Roque Business Evolution Serviços Ltda., CNPJ 47.308.584/0001-20. Contato: contato@aurorapremium.com e WhatsApp +55 11 97396-7161." },
  "/modules/": { group: 0, entrega: "Lista os 14 módulos do Aurora Premium: agenda online com recorrência e pacotes de sessões, lembrete pelo WhatsApp, clientes e CRM com retenção e fidelidade, financeiro com fechamento de caixa, comissão automática, gestão de equipe com metas e ponto, gestão de suprimentos (estoque e fornecedores), serviços e precificação, ficha de anamnese e prontuário, relatórios com IA, Aurora Consulting, página de agendamento online, várias unidades e controle de acesso e exportação de dados." },
  "/diferenciais/": { group: 0, entrega: "Diferenciais do Aurora Premium: atendimento que atualiza estoque, comissão e cliente, sistema que se adapta ao segmento, ficha e prontuário por serviço, IA que não inventa dados e Aurora Consulting." },
  "/faq/": { group: 0, entrega: "34 perguntas e respostas sobre o sistema de agendamento Aurora Premium: preço dos planos, teste grátis, agenda online, lembrete pelo WhatsApp incluído, Pix e maquininha, nota fiscal, comissão, estoque, IA e Aurora Consulting, clínicas, várias unidades, migração, segurança e LGPD." },
  "/sistema-para-clinica-de-estetica/": { group: 1, entrega: "Sistema para clínica de estética: agenda por profissional e sala, pacotes de sessões com saldo, ficha de anamnese por procedimento, termo de consentimento, prontuário com fotos de antes e depois, lembrete pelo WhatsApp, comissão, gestão de suprimentos e financeiro." },
  "/agenda-para-clinica-odontologica/": { group: 1, entrega: "Sistema para clínica odontológica e consultório: agenda por dentista e cadeira, confirmação de consulta pelo WhatsApp, odontograma digital, prontuário odontológico com radiografias e anamnese assinada, plano de tratamento em etapas, convênios e carteirinha, comissão de dentistas por procedimento e convênio, financeiro, gestão de suprimentos (estoque e fornecedores) e a Aurora Consulting, consultoria estratégica com o DNA Viviane Roque." },
  "/agenda-para-consultorio-medico/": { group: 1, entrega: "Sistema para clínica médica e consultório: agenda médica por médico, confirmação de consulta pelo WhatsApp, prontuário do paciente com anamnese e alerta de validade de exames, convênios e carteirinha, retorno marcado na saída, plano de tratamento, comissão de médicos, financeiro, gestão de suprimentos (estoque e fornecedores) e a Aurora Consulting, consultoria estratégica com o DNA Viviane Roque." },
  "/sistema-para-esmalteria/": { group: 1, entrega: "Sistema para esmalteria e nail designer: agenda por manicure, agendamento online, lembrete pelo WhatsApp, pacote de manutenção do alongamento em gel com intervalo em dias, ficha de anamnese por serviço, comissão de manicure, escala e metas da equipe, caixa, gestão de suprimentos (estoque de esmaltes e fornecedores), relatórios com IA e a Aurora Consulting." },
  "/agenda-para-designer-de-sobrancelhas/": { group: 1, entrega: "Sistema e agenda para designer de sobrancelhas e estúdio de sobrancelhas: agenda por profissional, agendamento online, lembrete pelo WhatsApp, retorno no intervalo de cada cliente com pacote de sessões, ficha de anamnese com fotos de antes e depois, micropigmentação e lash designer, comissão, escala e metas da equipe, caixa, gestão de suprimentos (henna, pigmentos e fornecedores), relatórios com IA e a Aurora Consulting." },
  "/sistema-para-spa/": { group: 1, entrega: "Sistema para spa e day spa: agenda por sala e terapeuta, pacotes de sessões, day spa com vários serviços na mesma visita, lembrete pelo WhatsApp, comissão, gestão de suprimentos (estoque e fornecedores) e financeiro." },
  "/lembrete-de-agendamento-whatsapp/": { group: 1, entrega: "Lembrete de agendamento pelo WhatsApp, e-mail e notificação: confirmação na marcação, lembrete 24 horas e 1 hora antes, mensagem editável com nome, serviço, data, horário e profissional, aviso de atraso, pós-atendimento, modelos de mensagem de lembrete de consulta e acompanhamento de faltas. WhatsApp como adicional em parceria com a EngageBot." },
  "/sistema-para-rede-de-saloes-e-clinicas/": { group: 2, entrega: "Sistema para redes e franquias multiunidades: agenda, equipe e caixa de cada unidade, cliente único na rede e links para as páginas de rede de cada segmento." },
  "/sistema-para-rede-de-saloes-de-beleza/": { group: 2, entrega: "Rede de salões de beleza e franquias: agenda e link de agendamento por unidade, cabeleireira que atende em mais de um salão, cliente com histórico e ficha de química em qualquer unidade, comissão somada, caixa e receita de cada salão." },
  "/sistema-para-rede-de-barbearias/": { group: 2, entrega: "Rede de barbearias e franquias: agenda por loja, barbeiro volante, cliente e fidelidade em todas as lojas, comissão somada, caixa por loja e receita da rede." },
  "/sistema-para-rede-de-pet-shops/": { group: 2, entrega: "Rede de pet shops e franquias: banho e tosa por loja, cadastro do pet válido em todas as unidades, comissão de tosadores e caixa de cada loja." },
  "/sistema-para-rede-de-clinicas-veterinarias/": { group: 2, entrega: "Rede de clínicas veterinárias e hospitais: prontuário do pet e carteira de vacinas compartilhados entre as unidades, agenda por veterinário e consultório, plantões e receita de cada clínica." },
  "/sistema-para-rede-de-clinicas-odontologicas/": { group: 2, entrega: "Rede de clínicas odontológicas: prontuário, odontograma e plano de tratamento em qualquer unidade, convênios da rede, cadeiras de cada clínica, comissão de dentistas e receita particular e convênio." },
  "/sistema-para-rede-de-clinicas-medicas/": { group: 2, entrega: "Rede de clínicas médicas: prontuário, exames e convênio do paciente em qualquer unidade, agenda por médico e consultório, comissão de médicos e receita de cada clínica." },
  "/sistema-para-rede-de-spas/": { group: 2, entrega: "Rede de spas e day spas: salas e terapeutas por unidade, pacote de sessões válido em qualquer unidade, comissão de terapeutas e receita de cada endereço." },
  "/blog/": { group: 3, entrega: "Guias práticos de gestão para salões, barbearias, clínicas e pet shops, escritos por Viviane Roque, fundadora do Aurora Premium." },
  "/blog/reduzir-faltas-no-show-agenda-online/": { group: 3, entrega: "Como reduzir faltas no salão e na clínica (no-show): 9 ações, modelos de mensagem de lembrete e como medir a taxa de faltas." },
  "/blog/comissionamento-automatico-fim-planilha/": { group: 3, entrega: "Como calcular comissão de profissional: modelos (percentual, valor fixo, por serviço), exemplos de cálculo e base de cálculo." },
  "/blog/crm-clinicas-nunca-perder-cliente/": { group: 3, entrega: "CRM para clínicas: retorno, tratamentos parados, faixas de 30 e 60 dias, mensagens de retorno e cuidados com dados de saúde." },
  "/blog/controle-estoque-saloes-petshops/": { group: 3, entrega: "Controle de estoque para salão e pet shop: estoque de uso e de revenda, ficha de consumo, ponto de reposição e checklist mensal." },
  "/blog/agenda-compartilhada-multiplos-profissionais/": { group: 3, entrega: "Agenda compartilhada para vários profissionais: regras de duração, intervalo, cancelamento, salas e permissões." },
  "/blog/um-sistema-em-vez-de-tres/": { group: 3, entrega: "Sistema de gestão ou ERP para salão e clínica: custo das ferramentas soltas, comparação e 12 critérios para escolher." },
  "/termos-de-uso/": { group: 4, entrega: "Termos de uso da plataforma Aurora Premium." },
  "/politica-de-privacidade/": { group: 4, entrega: "Política de privacidade: como os dados pessoais são coletados, usados e protegidos." },
};
