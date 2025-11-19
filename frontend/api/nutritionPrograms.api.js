import api from './axios.js';

const uniqueId=Math.random().toString(36).slice(2);
export async function getAllPrograms() {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: uniqueId,
    method: 'getAllPrograms'
  });
  return response.data.result;
}

export async function getProgramRows(programId) {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: uniqueId,
    method: 'getProgramRowsByProgramId',
    params: { programId }
  });
  return response.data.result;
}
