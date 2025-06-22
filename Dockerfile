# Etapa 1: construção da aplicação
FROM node:22.14.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production 

# Executa o comando de build da aplicação

FROM node:22.14.0

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public

RUN npm install --only=production

EXPOSE 1010

CMD ["npm", "start"]