import TranslationProvider from '@components/TranslationProvider';
import { ConferenceCreateProvider } from '@context/ConferenceCreateContext';
import { CommsProvider, ThemeProvider } from '@dolbyio/comms-uikit-react';
import { Navigator } from '@src/routes/Navigator';
import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';

import './App.module.scss';

const App = () => {
  const location = useLocation();

  const urlToken = useMemo(() => {
    return encodeURIComponent(new URLSearchParams(window.location.search).get('token') || '');
  }, [location]);

  const YOUR_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY4MDU2NTE5NCwic3ViIjoiOXp6V25NTnZWWHdRU29IS29nMzlYUT09Iiwib2lkIjoiZDViYzZkZWEtOTcyMS00MjFhLWFhYWYtYTdhMDgyY2I2MTc2IiwiYmlkIjoiOGEzNjgxYzk4NjAyNzg3ZTAxODYwOWZiN2JlOTU5Y2EiLCJhaWQiOiI4Nzc1YWM4Ny1jZjRhLTQwNWEtYmZmNS01YzQ4NDBmN2NkZjAiLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIl0sInRhcmdldCI6InNlc3Npb24iLCJleHAiOjE2ODA2MDgzOTR9.dYjhBXp4ijMibfzLu_bm0l3OYHlFIGe2wTMD4MUXaUPnFcvR8u_MOq10G9M1ju9HyXHYUbfbjY9REMcEl1BpSQ";
  // change the  domain to a relative url ./api/token-generator 
  const tokenServerURL = "https://senatokenserver.netlify.app/api/token-generator";
  

  return (
    <TranslationProvider>
      <ConferenceCreateProvider>
        <CommsProvider
          token={YOUR_TOKEN}
          packageUrlPrefix={`${window.location.origin}${
            import.meta.env.BASE_URL
          }assets/wasm`}
        >
          <ThemeProvider
            customThemes={{
              'My Theme': { colors: { white: 'yellow', primary: { 400: 'red' }, secondary: { 400: 'blue' } } },
            }}
          >
            <Navigator />
          </ThemeProvider>
        </CommsProvider>
      </ConferenceCreateProvider>
    </TranslationProvider>
  );
};

const container = document.getElementById('root');
// no-non-null-assertion comes from official react docs
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);


  // const fetchToken = async () => {
  //   return await fetch(tokenServerURL, {
  //         method: 'post'
  //       })
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((json) => json.access_token)
  //         .catch((error) => {
  //           console.error(error);
  //         });
  // }

  // const YOUR_TOKEN = await fetchToken();