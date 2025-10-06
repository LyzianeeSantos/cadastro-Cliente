# Etapa 1: Imagem base
FROM node:20

# Etapa 2: Diretório de trabalho dentro do container
WORKDIR /app

# Etapa 3: Copiar arquivos de dependências
COPY package*.json ./

# Etapa 4: Instalar dependências
RUN npm install

# Etapa 5: Copiar o restante do projeto
COPY . .

# Etapa 6: Gerar o cliente do Prisma
RUN npx prisma generate

# Etapa 7: Expor a porta que o app usa
EXPOSE 3000

# Etapa 8: Comando para iniciar a aplicação
CMD ["npm", "start"]
