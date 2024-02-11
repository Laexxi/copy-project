# Stage 1: Build the Vue (Nuxt) app
FROM node:latest as build-stage
RUN npm install -g pnpm
WORKDIR /app
RUN git clone https://github.com/Laexxi/copy-project.git .
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 3000

# Stage 2: Setup Rust for Tauri
FROM rust:latest as final-stage
WORKDIR /app
COPY --from=build-stage /app /app
COPY ./src-tauri/Cargo.toml ./src-tauri/Cargo.lock /app/src-tauri/
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
WORKDIR /app/src-tauri
RUN pnpm tauri dev

# Command to run your app
CMD ["pnpm", "tauri", "dev"]
