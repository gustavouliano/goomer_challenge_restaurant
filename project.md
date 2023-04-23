- A sua API deverá ser capaz de:
    - Listar todos os restaurantes
    - Cadastrar novos restaurantes
    - Listar os dados de um restaurante
    - Alterar os dados um restaurante
    - Excluir um restaurante
    - Listar todos os produtos de um restautante
    - Criar um produto de um restaurante
    - Alterar um produto de um restaurante
    - Excluir um produto de um restaurante

## Database tables:

# restaurant
- id
- name
- address
- photo

# restaurant_operation
- id
- restaurant_id
- weekday
- opening_time
- closing_time

# product
- id
- name
- price
- category

# product_promotion
- id
- product_id
- description
- discount_percentage
- start_date
- end_date

