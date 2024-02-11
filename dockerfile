FROM node:current
RUN apt-get update && apt-get install -y git
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
WORKDIR /app
RUN git clone https://github.com/Laexxi/copy-project.git /app
COPY package*.json ./
RUN npm install
EXPOSE 3000

CMD ["npm", "start"]
