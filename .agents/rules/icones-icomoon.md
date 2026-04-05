---
trigger: always_on
---

### Regra: Uso de Ícones com IcoMoon

Sempre utilizar os ícones do **IcoMoon** através de **classes CSS**, nunca importar SVGs individuais ou bibliotecas externas de ícones.

#### Como usar

Os ícones devem ser renderizados utilizando a tag `<i>` com a classe correspondente ao nome do ícone.

Exemplo:

```jsx
<i className="icon-live_tv" />
```

#### Fonte dos nomes dos ícones

Os nomes das classes dos ícones **devem ser consultados obrigatoriamente** no arquivo:

```
/public/styles/icomoon.css
```

Antes de utilizar qualquer ícone, verificar nesse arquivo qual é o nome correto da classe disponível.

#### Regras obrigatórias

* Sempre usar `<i>` para renderizar ícones.
* Sempre usar `className` no formato:

```jsx
<i className="icon-{nome-do-icone}" />
```

* O `{nome-do-icone}` deve existir no arquivo:

```
\public\styles\icomoon.css
```

* Nunca:

  * Importar bibliotecas externas de ícones (ex: FontAwesome, Material Icons, Lucide, Heroicons, etc.)
  * Usar SVG inline para ícones padrão
  * Criar novos ícones sem que estejam no `icomoon.css`

#### Exemplo correto

```jsx
<button>
  <i className="icon-live_tv" />
  Assistir ao vivo
</button>
```

#### Exemplo incorreto

```jsx
import { LiveTv } from "lucide-react";

<LiveTv />
```

ou

```jsx
<svg>...</svg>
```
