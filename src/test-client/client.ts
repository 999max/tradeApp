import axios from 'axios';
import { Logger, ILogObj } from 'tslog';
import * as EventSource from 'eventsource';

const URL = 'http://localhost:3000';

interface ISecurity {
  seccode: string;
  price: string;
  isin: string;
  lotsize: number;
}
interface ITrade {
  size: number;
  side: number;
  security: number;
  client: string;
}

const log: Logger<ILogObj> = new Logger();

async function subscribe() {
  const sse = new EventSource(`${URL}/trade`);

  sse.addEventListener('newTrade', (event) => {
    const trade = JSON.parse(event.data);
    log.info({ message: 'New trade', trade });
  });

  sse.onerror = (error) => {
    log.error({ message: 'Error in trade subscription', error });
  };
}

async function fetchAllSecurities(): Promise<void> {
  try {
    const response = await axios.get(`${URL}/security`);
    const securities = response.data;
    log.info({ message: 'All securities', securities });
  } catch (error) {
    log.error({ message: 'Error fetching securities', error: error.message });
  }
}

async function fetchSecurityById(id: number): Promise<void> {
  try {
    const response = await axios.get(`${URL}/security/${id}`);
    const security = response.data;
    log.info({ message: 'Security by ID', security });
  } catch (error) {
    log.error({ message: 'Error fetching security', error: error.message });
  }
}

async function createSecurity(newSecurity: ISecurity): Promise<void> {
  try {
    const response = await axios.post(`${URL}/security`, newSecurity);
    const createdSecurity = response.data;
    log.info({ message: 'Created security', security: createdSecurity });
  } catch (error) {
    log.error({ message: 'Error creating security', error: error.message });
  }
}

async function createTrade(newTrade: ITrade): Promise<void> {
  try {
    const response = await axios.post(`${URL}/trade`, newTrade);
    const createdTrade = response.data;
    log.info({ message: 'Created trade', trade: createdTrade });
  } catch (error) {
    log.error({ message: 'Error creating trade', error: error.message });
  }
}

// subscribe before creating new trade
subscribe();

// fetch existing data
fetchAllSecurities();
fetchSecurityById(3);

// new security
createSecurity({
  seccode: 'AAPL-NEW',
  price: '1234.56',
  isin: '010203APL-NEW',
  lotsize: 5,
});

// new trade with fired subscription log
createTrade({
  size: 29,
  side: 1,
  security: 2,
  client: 'testClient1',
});
