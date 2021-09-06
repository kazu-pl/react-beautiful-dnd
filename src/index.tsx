import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "@atlaskit/css-reset";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// JAK UZYWAC Z KLAWIATURY:
// 1 - klikasz byle gdzie na ekran,
// 2 - klikasz tab i wybierasz interesujący item
// 3 - naciskasz spację 1 raz
// 4 - wybary element zostanie sfocusowany i mozna strzałkami zmienić jego pozycję
// 5 - jak ustawisz odpowiednią pozycję elementów to znowu przyciskasz spację
