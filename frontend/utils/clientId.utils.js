import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export function getClientId() {
  let clientId = Cookies.get('clientId');
  if (!clientId) {
    clientId = uuidv4();
    Cookies.set('clientId', clientId, { expires: 30 }); // 30 днів
  }
  return clientId;
}
