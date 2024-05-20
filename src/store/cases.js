// store.ts
import { createStore, createEffect } from 'effector';
import axios from 'axios';

export const fetchCasesFx = createEffect(async () => {
  const response = await axios.get('https://services.it-cron.ru/api/cases', {
    headers: {
      'accept': 'text/plain',
      'Accept-language': 'ru'
    }
  });
  return response.data.Data;
});

export const $cases = createStore([])
  .on(fetchCasesFx.doneData, (_, cases) => cases);
