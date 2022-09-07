
# Movies HATEOS

This project presents a basic movie rest api applying [HATEOAS](https://martinfowler.com/articles/richardsonMaturityModel.html) concepts through [HAL+JSON](https://stateless.group/hal_specification.html) pattern. [HAL-browser](https://github.com/mikekelly/hal-browser) project was used as a web client.

## How to play?
<br />

Setup de container (api, web and db)
```bash
docker compose up -d
```

Populate database with some movies

```bash
docker exec $(docker container ls --format '{{.ID}}' --filter "name=movies-hateos-api") yarn setup:dev
```


On browser

`Access http://localhost/`