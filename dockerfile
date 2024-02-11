# Verwende die neueste Node-Version als Basis
FROM node:latest as build-stage

# Installiere pnpm global
RUN npm install -g pnpm

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und pnpm-lock.yaml Dateien und installiere die Abhängigkeiten
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Kopiere den restlichen Quellcode
COPY . .

# Exponiere den Port, auf dem deine App läuft (angepasst an deine App)
EXPOSE 3000

# Verwende Rust als zweite Stufe, um die Tauri-App zu bauen
FROM rust:latest as final-stage

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere den gebauten Code von der vorherigen Stufe
COPY --from=build-stage /app /app

# Installiere Tauri-Build-Abhängigkeiten und baue die App
RUN cargo install tauri-bundler && \
    cargo tauri build

# Starte die Tauri-App (angepasst an deinen Startbefehl)
CMD ["tauri", "dev"]
