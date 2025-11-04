import api from './axios.js';

export async function getAllPrograms() {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'getAllPrograms'
  });
  return response.data.result;
}

export async function getProgramRows(programId) {
  const response = await api.post('/rpc', {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'getProgramRowsByProgramId',
    params: { programId }
  });
  return response.data.result;
}
