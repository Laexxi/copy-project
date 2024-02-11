# Stage 1: Build the Vue (Nuxt) app
FROM node:latest as build-stage
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN pnpm generate

# Stage 2: Setup Rust for Tauri
FROM rust:latest
WORKDIR /app
COPY --from=build-stage /app /app
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
RUN cargo build --release