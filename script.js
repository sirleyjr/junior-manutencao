'use strict';

/*
  script.js
  - mantém a lista completa de serviços (sem alterações)
  - controla seleção, cálculo do total, envio de WhatsApp
  - controla agenda: horários por dia, bloqueio via bookings.json
*/

// ===== lista completa (mantida sem alterações) =====
const servicos = {
  eletrica: [
    { nome: 'Tomada e interruptor simples', preco: 60 },
    { nome: 'Tomada e interruptor paralelo', preco: 70 },
    { nome: 'Tomada e interruptor intermediário', preco: 90 },
    { nome: 'Tomada 220V', preco: 120 },
    { nome: 'Tomada 20A', preco: 80 },
    { nome: 'Troca de Lâmpada', preco: 40 },
    { nome: 'Troca de Lâmpada dicróica', preco: 45 },
    { nome: 'Troca de Lâmpada LED', preco: 50 },
    { nome: 'Troca de Disjuntor simples', preco: 90 },
    { nome: 'Troca de Disjuntor DR', preco: 150 },
    { nome: 'Troca de Disjuntor DPS', preco: 140 },
    { nome: 'Revisão de Quadro de distribuição', preco: 220 },
    { nome: 'Reorganizar Circuitos - Quadro de distribuição', preco: 280 },
    { nome: 'Instalação de Chuveiro elétrico', preco: 120 },
    { nome: 'Troca de Chuveiro elétrico', preco: 90 },
    { nome: 'Troca de Resistência do chuveiro', preco: 60 },
    { nome: 'Instalação de Ventilador de teto', preco: 220 },
    { nome: 'Manuteção de Ventilador de teto', preco: 120 },
    { nome: 'Instalação de Lustre/luminária', preco: 150 },
    { nome: 'Instalação de Plafon', preco: 130 },
    { nome: 'Ponto de luz novo (até 10m de fiação)', preco: 260 },
    { nome: 'Extensão de circuito (até 10m)', preco: 240 },
    { nome: 'Tomada para ar-condicionado 127/220V (até 10m)', preco: 320 },
    { nome: 'Circuito dedicado 20A (até 10m)', preco: 350 },
    { nome: 'Padrão de entrada (substituição de componentes)', preco: 280 },
    { nome: 'Diagnóstico de curto-circuito', preco: 150 },
    { nome: 'Inspeção elétrica completa (residencial)', preco: 260 },
    { nome: 'Instalação de Tomada USB', preco: 110 },
    { nome: 'Instalação de Interruptor inteligente (Wi-Fi)', preco: 140 }
  ],
  hidraulica: [
    { nome: 'Troca de Válvula Hidra', preco: 150 },
    { nome: 'Manutenção de Válvula Hidra', preco: 120 },
    { nome: 'Reparo de Vazamento - Válvula Hidra', preco: 110 },
    { nome: 'Troca de Vaso sanitário', preco: 260 },
    { nome: 'Desobstrução simples de Vaso sanitário', preco: 180 },
    { nome: 'Ajuste de fixação de Vaso sanitário', preco: 120 },
    { nome: 'Troca de Mecanismo - Caixa acoplada', preco: 150 },
    { nome: 'Reparo de Vazamento - Caixa acoplada', preco: 120 },
    { nome: 'Troca completa - Caixa acoplada', preco: 220 },
    { nome: 'Troca de Sifão (pia/lavabo)', preco: 70 },
    { nome: 'Troca de Sifão (tanque)', preco: 80 },
    { nome: 'Ajuste/Vedação de Sifão', preco: 60 },
    { nome: 'Instalação de Misturador monocomando', preco: 220 },
    { nome: 'Instalação de Misturador comum', preco: 180 },
    { nome: 'Manutenção/Vedação de Misturador', preco: 120 },
    { nome: 'Troca de Torneira simples', preco: 60 },
    { nome: 'Instalação de Torneira elétrica', preco: 140 },
    { nome: 'Manutenção de Torneira elétrica', preco: 100 },
    { nome: 'Troca de Registro geral', preco: 150 },
    { nome: 'Reparo de vazamento - Registro', preco: 100 },
    { nome: 'Ajuste de haste/Vedação - Registro', preco: 90 },
    { nome: 'Troca de Boia de caixa acoplada', preco: 80 },
    { nome: 'Troca de Boia de caixa d’água', preco: 120 },
    { nome: 'Limpeza de Caixa Sifonada', preco: 100 },
    { nome: 'Troca de Caixa Sifonada', preco: 160 },
    { nome: 'Desentupimento simples de Ralo', preco: 120 },
    { nome: 'Troca de Ralo', preco: 90 },
    { nome: 'Desentupimento de Pia', preco: 120 },
    { nome: 'Troca de Válvula - Pia', preco: 80 },
    { nome: 'Vedação/Ajusste - Pia', preco: 90 },
    { nome: 'Instalação de Tanque', preco: 200 },
    { nome: 'Troca de Válvula de Tanque', preco: 90 },
    { nome: 'Tanque, ajuste e vedação', preco: 80 },
    { nome: 'Instalação de Ducha higiênica', preco: 120 },
    { nome: 'Troca de Ducha higiênica', preco: 90 },
    { nome: 'Reparo de ponto de Tubulação PVC', preco: 160 },
    { nome: 'Reparo de ponto de Tubulação cobre/PPR, reparo', preco: 220 },
    { nome: 'Diagnóstico de Vazamento oculto', preco: 220 },
    { nome: 'Reparo de Vazamento aparente', preco: 180 },
    { nome: 'Ligação de máquina de lavar', preco: 120 },
    { nome: 'Ligação de lava-louças', preco: 140 },
    { nome: 'Ajuste/Vedação de Chuveiro (hidráulico)', preco: 70 },
    { nome: 'Troca de Chuveiro (hidráulico)', preco: 80 },
    { nome: 'Limpeza de Caixa de gordura', preco: 160 },
    { nome: 'Instalação (hidr.) - Aquecedor a gás', preco: 260 },
    { nome: 'Instalação de Pressurizador', preco: 260 },
    { nome: 'Manutenção de Pressurizador', preco: 160 },
    { nome: 'Limpeza de calha (ponto) - Rede pluvial', preco: 140 },
    { nome: 'Manutenção Hidráulica - Boiler/térmico', preco: 240 },
    { nome: 'Instalação - Torneira filtro/parede', preco: 140 },
    { nome: 'Instalação - Filtro de água', preco: 150 },
    { nome: 'Desobstrução de Mictório', preco: 160 },
    { nome: 'Válvula/vedação de Mictório', preco: 140 },
    { nome: 'Ligação Hidráulica de Banheira', preco: 260 },
    { nome: 'Ajuste de Caixa acoplada com duplo acionamento', preco: 140 },
    { nome: 'Troca de kit de Caixa acoplada com duplo acionamento', preco: 190 },
    { nome: 'Instalação de Ducha pressurizada', preco: 180 },
    { nome: 'Manutenção de Ducha pressurizada', preco: 140 },
    { nome: 'Pia entupida (química leve + pressão)', preco: 140 },
    { nome: 'Ralo entupido (química leve + pressão)', preco: 140 },
    { nome: 'Tanque entupido (química leve + pressão)', preco: 150 },
    { nome: 'Diagnóstico de Vazão baixa na torneira', preco: 90 },
    { nome: 'Troca de Vedação de Torneira pingando', preco: 80 },
    { nome: 'Limpeza de aerador/arejador', preco: 60 },
    { nome: 'Limpeza/Troca de Chuveirinho entupido', preco: 70 },
    { nome: 'Instalação de Adaptador para máquina (entrada/saída)', preco: 140 },
    { nome: 'Reparo de Pia com vazamento na tubulação', preco: 160 },
    { nome: 'Instalação de Sifão flexível', preco: 80 },
    { nome: 'Troca de Flexível metálico', preco: 70 },
    { nome: 'Vedação de juntas (teflon/vedacit) — ponto', preco: 60 },
    { nome: 'Diagnóstico de Caixa d’água vazando', preco: 120 },
    { nome: 'Reparo em válvula de retenção', preco: 160 },
    { nome: 'Reparo em filtro de linha', preco: 120 },
    { nome: 'Reparo em engate rápido', preco: 90 },
    { nome: 'Instalação de lavatório (cubas, sifão, válvula)', preco: 260 },
    { nome: 'Troca de Kit de Válvula de descarga com vazamento', preco: 160 },
    { nome: 'Instalação de Assento sanitário', preco: 70 },
    { nome: 'Instalação de Ducha higiênica com registro', preco: 160 }
  ],
  outros: [
    { nome: 'Instalação de Varão de cortina', preco: 100 },
    { nome: 'Instalação de Prateleira simples', preco: 120 },
    { nome: 'Instalação de Prateleira com mão francesa', preco: 130 },
    { nome: 'Instalação de Suporte de TV (até 50”)', preco: 150 },
    { nome: 'Instalação de Suporte de TV (acima de 50”)', preco: 180 },
    { nome: 'Montagem de móvel pequeno', preco: 140 },
    { nome: 'Montagem de móvel médio', preco: 200 },
    { nome: 'Montagem de móvel grande', preco: 280 },
    { nome: 'Ponto de Vedação com silicone (box/pia)', preco: 100 },
    { nome: 'Rejunte pequeno reparo', preco: 120 },
    { nome: 'Vistoria técnica', preco: 90 },
    { nome: 'Mão de obra por hora (pequenos reparos)', preco: 120 },
    { nome: 'Porta — ajuste de fechadura/dobradiça', preco: 120 },
    { nome: 'Instalação de olho mágico', preco: 80 },
    { nome: 'Acessórios de banheiro (suportes), instalação', preco: 120 },
    { nome: 'Instalação de Espelho pequeno', preco: 110 },
    { nome: 'Instalação de Cortina de box', preco: 80 },
    { nome: 'Instalação de Barras de apoio', preco: 160 },
    { nome: 'Instalação (flexível/vedação) - Fogão', preco: 120 },
    { nome: 'Ligação - Forno/fogão elétrico', preco: 140 },
    { nome: 'Instalação de Cooktop', preco: 160 },
    { nome: 'Caixa d’água — limpeza', preco: 220 },
    { nome: 'Caixa d’água — manutenção simples', preco: 160 },
    { nome: 'Caixa d’água — instalação (até 1000L)', preco: 320 },
    { nome: 'Ajuste (caixa d’água) - Ladrão/boia/vedação', preco: 140 },
    { nome: 'Troca de Tampa de caixa d’água', preco: 120 },
    { nome: 'Ajuste - Suporte/base de caixa d’água', preco: 160 },
    { nome: 'Ajuste - Tubulação de alimentação/descarga', preco: 180 }
  ]
};


// Estado global
let servicosSelecionados = [];
let totalOrcamento = 0;
let horariosAgendados = [];

// Exibir lista de serviços
function mostrarServicos(tipo) {
  const lista = document.getElementById("lista-servicos");
  lista.innerHTML = "<h3>Escolha os serviços:</h3>";
  const ul = document.createElement("ul");

  servicos[tipo].forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s.nome;
    li.onclick = () => selecionarServico(s);
    ul.appendChild(li);
  });

  lista.appendChild(ul);
}

// Selecionar serviço para orçamento
function selecionarServico(servico) {
  servicosSelecionados.push(servico);
  totalOrcamento += servico.preco;
  alert(`Serviço adicionado: ${servico.nome}`);
}

// Abrir formulário de orçamento
function abrirFormularioOrcamento() {
  document.getElementById("formulario-orcamento").style.display = "block";
  document.getElementById("formulario-orcamento-novo").style.display = "none";
  document.getElementById("agenda").style.display = "none";
  document.getElementById("formulario-orcamento").innerHTML = `
    <h3>Solicite seu Orçamento</h3>
    <input type="text" id="nome" placeholder="Nome" required>
    <input type="text" id="endereco" placeholder="Endereço" required>
    <input type="tel" id="telefone" placeholder="Telefone" required>
    <button onclick="enviarOrcamento()">Enviar Orçamento</button>
  `;
}

// Enviar orçamento
function enviarOrcamento() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;

  const servicosTexto = servicosSelecionados.map(s => s.nome).join(", ") || "Nenhum serviço selecionado";
  const mensagem = `Olá, meu nome é ${nome}.
📍 Endereço: ${endereco}
📞 Telefone: ${telefone}
🛠 Serviços: ${servicosTexto}
💰 Valor total estimado: R$ ${totalOrcamento}`;

  window.open("https://wa.me/5514998947739?text=" + encodeURIComponent(mensagem), "_blank");

  servicosSelecionados = [];
  totalOrcamento = 0;
}

// Orçamento personalizado
function abrirFormularioOrcamentoNovo() {
  document.getElementById("formulario-orcamento-novo").style.display = "block";
  document.getElementById("formulario-orcamento").style.display = "none";
  document.getElementById("agenda").style.display = "none";
  document.getElementById("formulario-orcamento-novo").innerHTML = `
    <h3>Solicite um Orçamento Personalizado</h3>
    <input type="text" id="nomeNovo" placeholder="Nome" required>
    <input type="text" id="enderecoNovo" placeholder="Endereço" required>
    <input type="tel" id="telefoneNovo" placeholder="Telefone" required>
    <button onclick="enviarOrcamentoNovo()">Enviar Orçamento</button>
  `;
}

function enviarOrcamentoNovo() {
  const nome = document.getElementById("nomeNovo").value;
  const endereco = document.getElementById("enderecoNovo").value;
  const telefone = document.getElementById("telefoneNovo").value;

  const mensagem = `Olá, meu nome é ${nome}.
📍 Endereço: ${endereco}
📞 Telefone: ${telefone}
Gostaria de solicitar um orçamento personalizado.`;

  window.open("https://wa.me/5514998947739?text=" + encodeURIComponent(mensagem), "_blank");
}

// Abrir agenda
async function abrirAgenda() {
  document.getElementById("formulario-orcamento").style.display = "none";
  document.getElementById("formulario-orcamento-novo").style.display = "none";
  document.getElementById("agenda").style.display = "block";

  const res = await fetch("/bookings");
  horariosAgendados = await res.json();

  const agendaDiv = document.getElementById("agenda");
  agendaDiv.innerHTML = `
    <h3>Agende sua visita</h3>
    <input type="date" id="data" onchange="mostrarHorariosDisponiveis()">
    <div id="horarios"></div>
  `;
}

// Mostrar horários disponíveis conforme o calendário
function mostrarHorariosDisponiveis() {
  const data = document.getElementById("data").value;
  const diaSemana = new Date(data + "T00:00:00").getDay(); // corrigido para timezone
  let horarios = [];

  if (diaSemana === 0) {
    horarios = []; // domingo
  } else if ([1,2,3,4,5].includes(diaSemana)) {
    horarios = ["07:20","08:20","09:20","10:20","16:20","17:20"];
  } else if (diaSemana === 6) {
    horarios = ["07:20","08:20","09:20","10:20","11:20"];
  }

  horarios = horarios.filter(h => !horariosAgendados.find(b => b.data === data && b.horario === h));

  const div = document.getElementById("horarios");
  if (horarios.length === 0) {
    div.innerHTML = "<p>Não há horários disponíveis para esta data.</p>";
    return;
  }

  div.innerHTML = "<h4>Escolha um horário:</h4>";
  horarios.forEach(h => {
    const btn = document.createElement("button");
    btn.textContent = h;
    btn.onclick = () => preencherAgendamento(data, h);
    div.appendChild(btn);
  });
}

// Preencher agendamento
function preencherAgendamento(data, horario) {
  const div = document.getElementById("horarios");
  div.innerHTML = `
    <h4>Preencha seus dados</h4>
    <input type="text" id="nomeAg" placeholder="Nome" required>
    <input type="text" id="enderecoAg" placeholder="Endereço" required>
    <input type="tel" id="telefoneAg" placeholder="Telefone" required>
    <button onclick="enviarAgendamento('${data}', '${horario}')">Confirmar Agendamento</button>
  `;
}

// Enviar agendamento
async function enviarAgendamento(data, horario) {
  const nome = document.getElementById("nomeAg").value;
  const endereco = document.getElementById("enderecoAg").value;
  const telefone = document.getElementById("telefoneAg").value;

  const booking = { data, horario, nome, endereco, telefone };

  await fetch("/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  });

  const mensagem = `Olá, meu nome é ${nome}.
📍 Endereço: ${endereco}
📞 Telefone: ${telefone}
📅 Agendamento para: ${data} às ${horario}`;

  window.open("https://wa.me/5514998947739?text=" + encodeURIComponent(mensagem), "_blank");

  abrirAgenda();
}
