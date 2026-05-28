const MENSAGENS = {
  REGISTRAR_PAGAMENTO: 'registrar-pagamento',

  BUSCAR_ASSINATURAS: 'buscar-assinaturas',
  CADASTRAR_ASSINATURA: 'cadastrar-assinatura',
  ATUALIZAR_ASSINATURA: 'atualizar-assinatura',
  EXCLUIR_ASSINATURA: 'excluir-assinatura',
  BUSCAR_ASSINATURAS_ATIVAS: 'buscar-assinaturas-ativas', // Virá do cache
  CACHEAR_ASSINATURA_ATIVA: 'cachear-assinatura-ativa',

  BUSCAR_CLIENTES: 'buscar-clientes',
  CADASTRAR_CLIENTE: 'cadastrar-cliente',
  ATUALIZAR_CLIENTE: 'atualizar-cliente',
  EXCLUIR_CLIENTE: 'excluir-cliente',

  BUSCAR_PLANOS: 'buscar-planos',
  CADASTRAR_PLANO: 'cadastrar-plano',
  ATUALIZAR_PLANO: 'atualizar-plano',
  EXCLUIR_PLANO: 'excluir-plano',
} as const;

const EVENTOS = {
  PAGAMENTO_REGISTRADO: 'pagamento-registrado',
  ASSINATURA_ATIVA: 'assinatura-ativa',
  ASSINATURA_CANCELADA: 'assinatura-cancelada',
  ASSINATURA_CRIADA: 'assinatura-criada',
  ASSINATURA_ATUALIZADA: 'assinatura-atualizada',
  ASSINATURA_EXCLUIDA: 'assinatura-excluida',
} as const;

const FILAS = {
  FATURAMENTO: 'fila-servico-faturamento',
  GESTAO: 'fila-servico-gestao',
  ASSINATURAS_ATIVAS: 'fila-servico-assinaturas-ativas',
} as const;

export { MENSAGENS, EVENTOS, FILAS };
