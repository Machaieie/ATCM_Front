# Pharmacy — Frontend (README)


---


---

## 🧰 Tech stack

* React (v19)
* Vite
* Ant Design (UI)
* MUI Icons (ícones variados)
* react-router-dom (v6)
* react-responsive (detecção mobile)
* framer-motion (animações)
* axios (requisições HTTP)
* outras libs: lodash, dayjs, react-hook-form, yup, react-toastify, etc.

---

## 📦 Pré-requisitos

* Node.js v18+ recomendado
* npm 9+ (ou yarn)

---

## ⚙️ Instalação (local)

1. Clone:

```bash
git clone <repo-url>
cd Farmacia_Front
```

2. Ajustes no `package.json` (se aplicável): remova entradas `overrides` conflitantes com `vite` se existirem:

```json
// REMOVER se presente
"overrides": {
  "vite": "npm:rolldown-vite@7.1.14"
}
```

3. Instala dependências:

```bash
npm install
```

4. Rodar em dev:

```bash
npm run dev
```

5. Build para produção:

```bash
npm run build
npm run preview   # testar build localmente
```

---

## 🧩 Variáveis de ambiente (exemplo `.env`)

Cria um `.env` ou `.env.local` na raiz:

```
VITE_API_BASE_URL=https://api.seusistema.com
VITE_APP_NAME=Farmacia_Front
VITE_AUTH_TOKEN_KEY=bm_token
```

> No código acede com `import.meta.env.VITE_API_BASE_URL`.

---

## 🧭 Routing & Permissões

* Existe `routes/Routes.jsx` (ou `SideRoute`) que exporta uma função:

```js
const SideRoute = (role) => [ /* menu configurado */ ];
```

* Os componentes `SideNav` e `DrawerMenu` consomem `SideRoute(role)` para renderizar os itens conforme `role`.
* Exemplos de roles: `ADMINISTRADOR`, `FUNCIONARIO`, `USUARIO`.

---

## 🧩 Como usar o `SideNav` (exemplo)

```jsx
<SideNav
  role="ADMINISTRADOR"
  collapsed={collapsed}
  onCollapse={setCollapsed}
  user={{ name: 'Edwin Machaieie', photo: '/images/edwin.jpg' }}
  onLogout={() => {
    // limpa token, redireciona para /login
    localStorage.removeItem('token');
    navigate('/login');
  }}
/>
```

---

## ✨ Comportamento responsivo

* Usa `react-responsive` com breakpoint `768px` para alternar Sider/Drawer.
* `TopNav` tem o botão que abre o Drawer no mobile e colapsa/expande o Sider no desktop.
* Animações: `framer-motion` para entradas e transições suaves.

---

## 🔐 Autenticação (padrão sugerido)

* Guardar token JWT em `localStorage` (ou HttpOnly cookie se preferir maior segurança).
* HOC ou route guard:

```jsx
// exemplo simples
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};
```

---

## ✅ Boas práticas no projeto

* Centralizar rotas e permissões em `Routes.jsx`.
* Extrair chamadas HTTP para um cliente `axios` configurado (`/src/services/api.js`).
* Componentizar formulários (usar `react-hook-form` + `yup`).
* Usar `Suspense` + lazy loading para páginas grandes.
* Testar no mobile frequentemente: Drawer e botões devem estar acessíveis.

---

## 🪺 Troubleshooting comum

* `vite` not recognized: ver `node_modules` instalados, remover `overrides` conflitantes e rodar `npm install`.
* Versões duplicadas de `react` no `devDependencies` e `dependencies`: mantenha `react` e `react-dom` apenas em `dependencies`.

Se der conflito:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 📁 Exemplo de `package.json` scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

---

## 🧪 Testes & CI (sugestões)

* Adicionar testes com Jest + React Testing Library.
* Pipeline CI (GitHub Actions) para:

  * `npm ci`
  * `npm run build`
  * rodar testes e lint
  * opcional: deploy automático para Vercel / Netlify

---

## 📦 Deploy (sugestão rápida)

* Build: `npm run build`
* Hospedar o conteúdo da pasta `dist` num serviço estático (Vercel, Netlify, Surge) ou configurar servidor para servir estáticos.

---

## 🤝 Como contribuir

1. Fork → branch com feature (`feature/nome-do-modulo`)
2. Commit claro e PR com descrição do que mudou
3. Garantir lint e testes básicos

---

## 📝 Notas finais / TODOs

* Implementar módulo de permissão dinâmico (carrega roles do backend).
* Dashboard com widgets por módulo (salão, ginásio, takeaway, games).
* Paginação e filtros em listas (clientes, pedidos).
* Integração real-time (WebSocket) opcional para pedidos/atendimento.

---

## ✉️ Contato

Se quiser, eu posso:

* Gerar ficheiros exemplo (ex: `vite.config.js`, `axios` client, auth hooks)
* Adicionar páginas base para Salão / Ginásio / TakeAway / Games
* Criar o README em formato MD no repositório (faço o commit-modelo)

Quer que eu gere agora o `vite.config.js` e um `api.js` axios base para o projeto?
