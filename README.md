

docker compose up -d

docker exec $(docker container ls --format '{{.ID}}' --filter "name=movies-hateos-api") yarn setup:dev

Access http://localhost/