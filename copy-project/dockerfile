FROM rust:latest
RUN apt-get update && apt-get install -y \
    libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    file \
    git \
    && curl -fsSL https://deb.nodesource.com/setup_current.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

RUN cargo install tauri-cli

WORKDIR /usr/src/copy-project

RUN git clone https://Laexxi/copy-project.git .

RUN pnpm install

ENTRYPOINT ["/bin/bash"]