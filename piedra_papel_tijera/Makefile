# Makefile para Piedra Papel Tijera

# Detectar el sistema operativo
ifeq ($(OS),Windows_NT)
    # Comandos para Windows
    CP_CMD = copy
    RM_CMD = del
else
    # Comandos para Linux / Mac
    CP_CMD = cp
    RM_CMD = rm -f
endif

# Variables de directorios
FRONT_DIR = cliente-vite

.PHONY: install db start dev clean env

# 0. CONFIGURACIÓN: Copiar .env
env:
	@echo "📄 Creando archivo .env desde el ejemplo..."
	$(CP_CMD) .env.example .env

# 1. INSTALACIÓN
install:
	@echo "📦 Instalando dependencias del Backend..."
	npm install
	@echo "📦 Instalando dependencias del Frontend..."
	cd $(FRONT_DIR) && npm install

# 2. BASE DE DATOS
db:
	@echo "🔄 Ejecutando migraciones..."
	npx sequelize-cli db:migrate
	@echo "🌱 Sembrando la base de datos (Bots)..."
	npx sequelize-cli db:seed:all

# 3. RESET DB
db-reset:
	@echo "⚠️  Reseteando Base de Datos..."
	npx sequelize-cli db:migrate:undo:all
	npx sequelize-cli db:migrate
	npx sequelize-cli db:seed:all

# 4. START BACKEND
run-back:
	npm run dev

# 5. START FRONTEND
run-front:
	cd $(FRONT_DIR) && npm run dev

# 6. DEV (Paralelo)
dev:
	@echo "🚀 Iniciando Servidor y Cliente..."
	make -j2 run-back run-front

# 7. INIT (Todo en uno)
# Primero creamos el .env, luego instalamos y luego configuramos la BD
init: env install db