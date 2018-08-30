# INCLUDE .env FILE
include .env

# DEFAULT TARGET
.DEFAULT_GOAL := help

# COLORS
GREEN   := $(shell tput -Txterm setaf 2)
WHITE   := $(shell tput -Txterm setaf 7)
YELLOW  := $(shell tput -Txterm setaf 3)
BLUE    := $(shell tput -Txterm setaf 4)
RESET   := $(shell tput -Txterm sgr0)

# PREPARED DOCKER COMPOSE COMMAND
DC := docker-compose -f $(DOCKER_COMPOSE_FILE)

# HELP
.PHONY: help
help: ## Help information with commands descriptions
	@echo "############################################################################################################"
	@awk 'BEGIN {FS = ":.*?## | # | \\| "} /^[a-zA-Z_-]+:.*?## / {printf "> ${GREEN}%-30s${RESET} %s ${YELLOW}%s${RESET} ${BLUE}%s${RESET}\n", $$1, $$2, $$3, $$4}' $(MAKEFILE_LIST)
	@echo "############################################################################################################"

.PHONY: build
build: ## Build containers # [c = container]
	$(DC) build $(c)

.PHONY: up
up: ## Up -d containers # [c = container]
	$(DC) up -d $(c)

.PHONY: stop
stop: ## Stop containers # [c = container]
	$(DC) stop $(c)

.PHONY: ps
ps: ## Info about up containers
	$(DC) ps

.PHONY: logs
logs: ## Container/s logs # [c = container]
	$(DC) logs -f $(c)

.PHONY: bash
bash: ## Bash to containers # [c = container]
	$(DC) exec $(c) bash

.PHONY: start-server
start-server: ## Start server
	$(DC) exec -d node npm run start

restart: stop up ## Restart containers # [] | (stop,up)
