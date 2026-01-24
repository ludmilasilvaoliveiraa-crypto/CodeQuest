# Documentação de APIs - Bug Reports e Sugestões

Este documento descreve as APIs do servidor Next.js para gerenciamento de **Bug Reports** e **Feature Requests (Sugestões)**.

> [!IMPORTANT]
> Sempre consultar estas APIs antes de iniciar trabalhos de correção de bugs ou implementação de features.

---

## 🐛 API de Bug Reports

### Endpoint Base
```
GET/POST/PATCH http://localhost:3000/api/bugs
```

### Schema do Modelo (Prisma)
```prisma
model Bug {
  id          String   @id @default(uuid())
  description String
  location    String
  category    String   @default("functional") // functional, visual, content
  status      String   @default("pending")    // pending, resolved
  createdAt   DateTime @default(now())
}
```

### Endpoints

#### GET `/api/bugs`
Retorna todos os bugs ordenados por data de criação (mais recentes primeiro).

**Exemplo de Resposta:**
```json
[
  {
    "id": "06360eb7-9187-48fa-8201-ee6dcace006f",
    "description": "Não consigo adicionar amigos...",
    "location": "/friends",
    "category": "functional",
    "status": "pending",
    "createdAt": "2026-01-24T01:29:23.107Z"
  }
]
```

#### POST `/api/bugs`
Cria um novo bug report.

**Body:**
```json
{
  "description": "Descrição do bug",
  "location": "/pagina-afetada",
  "category": "functional"
}
```

#### PATCH `/api/bugs`
Atualiza o status de um bug.

**Body:**
```json
{
  "id": "uuid-do-bug",
  "status": "resolved"
}
```

---

## 💡 API de Feature Requests (Sugestões)

### Endpoint Base
```
GET/POST/PATCH http://localhost:3000/api/features
```

### Schema do Modelo (Prisma)
```prisma
model FeatureRequest {
  id          String   @id @default(uuid())
  description String
  location    String
  category    String   @default("functional") // functional, visual, content
  status      String   @default("considered") // considered, planned, in_progress, implemented, rejected
  votes       Int      @default(0)
  createdAt   DateTime @default(now())
}
```

### Endpoints

#### GET `/api/features`
Retorna todas as sugestões.

#### POST `/api/features`
Cria uma nova sugestão.

**Body:**
```json
{
  "description": "Descrição da sugestão",
  "location": "/pagina-relacionada",
  "category": "visual"
}
```

#### PATCH `/api/features`
Atualiza o status de uma sugestão.

**Body:**
```json
{
  "id": "uuid-da-feature",
  "status": "implemented"
}
```

---

## 🔧 Workflow para IAs/Desenvolvedores

### Ao iniciar uma sessão de desenvolvimento:

1. **Consultar bugs pendentes:**
   ```bash
   curl http://localhost:3000/api/bugs | jq '.[] | select(.status == "pending")'
   ```

2. **Consultar sugestões em consideração:**
   ```bash
   curl http://localhost:3000/api/features | jq '.[] | select(.status == "considered")'
   ```

3. **Após resolver um bug:**
   ```bash
   curl -X PATCH http://localhost:3000/api/bugs \
     -H "Content-Type: application/json" \
     -d '{"id": "UUID_DO_BUG", "status": "resolved"}'
   ```

4. **Após implementar uma feature:**
   ```bash
   curl -X PATCH http://localhost:3000/api/features \
     -H "Content-Type: application/json" \
     -d '{"id": "UUID_DA_FEATURE", "status": "implemented"}'
   ```

---

## 📊 Categorias

| Categoria | Descrição |
|-----------|-----------|
| `functional` | Bugs ou features funcionais (lógica, comportamento) |
| `visual` | Problemas ou melhorias visuais/design |
| `content` | Conteúdo incorreto ou faltando |

## 📍 Status de Bugs

| Status | Descrição |
|--------|-----------|
| `pending` | Aguardando correção |
| `resolved` | Bug corrigido |

## 📍 Status de Features

| Status | Descrição |
|--------|-----------|
| `considered` | Em consideração |
| `planned` | Planejado para implementação |
| `in_progress` | Em desenvolvimento |
| `implemented` | Implementado |
| `rejected` | Rejeitado |

---

## 🎯 Componente Bug Reporter

Existe um componente `bug-reporter.tsx` em `apps/web/components/` que permite aos usuários reportar bugs diretamente pela interface.

**Localização:** `apps/web/components/bug-reporter.tsx`
