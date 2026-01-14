# 🔐 Guia de Configuração do Google OAuth

Este guia mostra como configurar autenticação Google OAuth 2.0 para o CodeQuest.

---

## 1️⃣ Criar Projeto no Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Clique em **"Selecionar projeto"** → **"Novo Projeto"**
3. Nome: `CodeQuest`
4. Clique em **"Criar"**

---

## 2️⃣ Configurar Tela de Consentimento OAuth

1. No menu lateral: **APIs e Serviços** → **Tela de consentimento OAuth**
2. Selecione **"Externo"** → **Criar**
3. Preencha:
   - Nome do app: `CodeQuest`
   - E-mail de suporte: seu e-mail
   - Domínios autorizados: deixe vazio (dev)
   - E-mail do desenvolvedor: seu e-mail
4. Clique **Salvar e Continuar**
5. Em "Escopos", clique **Salvar e Continuar** (padrão é suficiente)
6. Em "Usuários de teste", adicione seu e-mail → **Salvar e Continuar**
7. Clique **Voltar ao painel**

---

## 3️⃣ Criar Credenciais OAuth 2.0

1. No menu lateral: **APIs e Serviços** → **Credenciais**
2. Clique **"+ CRIAR CREDENCIAIS"** → **ID do cliente OAuth**
3. Tipo de aplicativo: **Aplicativo da Web**
4. Nome: `CodeQuest Web`
5. **URIs de redirecionamento autorizados**, adicione:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Clique **Criar**
7. Copie o **ID do cliente** e a **Chave secreta do cliente**

---

## 4️⃣ Configurar Variáveis de Ambiente

Crie o arquivo `apps/web/.env.local` com:

```bash
# NextAuth Secret (gere com: openssl rand -base64 32)
AUTH_SECRET="cole-aqui-um-secret-gerado"

# Google OAuth
GOOGLE_CLIENT_ID="cole-aqui-seu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="cole-aqui-sua-chave-secreta"

# URL do app
NEXTAUTH_URL="http://localhost:3000"
```

---

## 5️⃣ Gerar AUTH_SECRET

No terminal:
```bash
openssl rand -base64 32
```

Copie a saída e cole no `AUTH_SECRET`.

---

## 6️⃣ Reiniciar o Servidor

```bash
# Pare o servidor (Ctrl+C) e inicie novamente
npm run dev --filter=web
```

---

## ✅ Pronto!

Acesse http://localhost:3000/login e clique em "Continuar com Google".

---

## ⚠️ Solução de Problemas

| Erro | Solução |
|------|---------|
| "Error: GOOGLE_CLIENT_ID is missing" | Verifique se o `.env.local` está em `apps/web/` |
| "redirect_uri_mismatch" | Verifique a URL de callback no Google Console |
| "This app isn't verified" | Esperado em dev. Clique "Continuar" para testar |
