# --- Build Stage ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .
# Pass default VITE_API_URL during build time for direct browser requests to host port 2000
ARG VITE_API_URL=http://localhost:2000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# --- Production Stage ---
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
