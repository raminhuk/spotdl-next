
# 🎵 Spotify Playlist Downloader

**Spotify Playlist Downloader** é uma aplicação que permite buscar músicas de uma playlist do Spotify e fazer o download de cada música no formato `.mp3`. A interface oferece informações como nome da música, artista, álbum, e tempo de duração, além de links para abrir as músicas diretamente no Spotify.

---

## 📋 Sumário

- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🚀 Demonstração

<p align="center">
<img src="https://via.placeholder.com/800x400.png?text=Demonstra%C3%A7%C3%A3o+da+interface+Spotify+Playlist+Downloader" alt="Demonstração da Interface" />
</p>

---

## ✨ Funcionalidades

- 🎧 Busca músicas em uma playlist do Spotify.
- 🔗 Exibe nome da música, artista, álbum, duração e um link para o Spotify.
- 📥 Permite download das músicas no formato `.mp3`.
- 🖼️ Exibe a thumbnail do álbum.

---

## 🛠 Tecnologias Utilizadas

- **Front-end**: React + Tailwind CSS
- **Back-end**: Next.js
- **Spotify API**: Para buscar informações das playlists
- **YouTube API**: Para obter links de vídeo relacionados às músicas
- **YouTube Downloader**: [`@distube/ytdl-core`](https://www.npmjs.com/package/@distube/ytdl-core)
- **Node.js**: Para manipulação de arquivos

---

## 🧑‍💻 Instalação

Siga estas etapas para rodar o projeto localmente.

### Pré-requisitos

1. **Node.js** (versão 16+)
2. Uma conta Spotify Developer para obter **Client ID** e **Client Secret**.
3. **Chave da API do YouTube** para buscar vídeos relacionados.
4. **Git** para clonar o repositório.

### Passo 1: Clone o repositório

```bash
git clone https://github.com/raminhuk/spotdl-next.git
cd spotdl-next
```

### Passo 2: Instale as dependências

```bash
npm install
```

### Passo 3: Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:

```bash
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
YOUTUBE_API_KEY=sua_chave_api_youtube
```

### Passo 4: Rodando o projeto

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 🖥️ Como Usar

1. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).
2. Cole o link de uma playlist do Spotify no campo de entrada.
3. Clique em **Buscar Músicas** para carregar as músicas da playlist.
4. Inicie o download clicando no botão **Iniciar Download**.
5. Acompanhe as informações das músicas nos cartões listados.

---

## 📂 Estrutura do Projeto

```
spotify-playlist-downloader/
│
├── public/                # Arquivos estáticos (imagens, ícones)
├── src/                   # Código fonte
│   ├── app/               # Componentes da aplicação (Home, layout)
│   ├── api/               # Rota de API para busca e download
│   └── lib/               # Funções auxiliares (Spotify, YouTube)
├── .env.local             # Variáveis de ambiente
├── package.json           # Dependências do projeto
├── README.md              # Documentação do projeto
└── tsconfig.json          # Configurações TypeScript
```

---