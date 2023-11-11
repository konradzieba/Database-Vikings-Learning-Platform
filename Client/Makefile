.PHONY: development production

development:
	docker build -t client:development -f Dockerfile .
	docker run -p 5173:5173 client:development

production:
	docker build -t client:production -f Dockerfile .
	docker run -p 5173:5173 client:production