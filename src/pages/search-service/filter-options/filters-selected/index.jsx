import { Chip, Stack } from '@mui/material';
import React from 'react';

function transformHour(time) {
  if (!time) return null;
  return time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const diasSemana = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
];

export function FiltersSelected({ filtros }) {
  const {
    horarioAtendimentoInicio,
    horarioAtendimentoFim,
    diasAtendimento,
    city,
    category,
    profission,
    especiality,
  } = filtros;

  return (
    <div>
      <MakeChip label={category?.nome} data={category?.nome} />
      <MakeChip label={profission?.nome} data={profission?.nome} />
      <MakeChip label={especiality?.nome} data={especiality?.nome} />
      <MakeChip label={city?.nome} data={city} />
      <MakeChip
        label={`De: ${transformHour(horarioAtendimentoInicio)}`}
        data={horarioAtendimentoInicio}
      />
      <MakeChip
        label={`Até: ${transformHour(horarioAtendimentoFim)}`}
        data={horarioAtendimentoFim}
      />
      <MakeChipDias dias={diasAtendimento} />
    </div>
  );
}

function MakeChipDias({ dias }) {
  if (dias?.length === 0) return null;
  const diasSelecionados = dias.map((dia) => diasSemana[dia - 1]);
  return (
    <Chip
      sx={{ m: 0.5 }}
      variant="outlined"
      label={diasSelecionados.join(', ')}
    />
  );
}
function MakeChip({ label, data }) {
  if (!data) return null;
  return <Chip sx={{ m: 0.5 }} variant="outlined" label={label} />;
}
