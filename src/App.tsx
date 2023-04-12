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

  const YOUR_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY4MTI2NTYwMywic3ViIjoieWp6NExuYlJDSDF3ZW0weWduZXhPUT09Iiwib2lkIjoiZDViYzZkZWEtOTcyMS00MjFhLWFhYWYtYTdhMDgyY2I2MTc2IiwiYmlkIjoiOGEzNjgxYzk4NjAyNzg3ZTAxODYwOWZiN2JlOTU5Y2EiLCJhaWQiOiJkYTkwOTNkNC1jNzA3LTRjMzItOGZiNC1lNzJkZDIzNzc1MzYiLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIl0sInRhcmdldCI6InNlc3Npb24iLCJleHAiOjE2ODEzMDg4MDN9.GGDgQH8HTPwipprHHdBuRHNr6VGj5GkuWciTEREeZ4CcNccpe6Kyyqb9hMu5xUR_jRsM3ElhAFki-841egqPxg";
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