


-- // 1- trazer apenas 12 primeiros produtos 
SELECT * FROM `produtos` LIMIT 12;

-- // 2- trazer apenas produtos que comecem com a letra a
SELECT * FROM `produtos` WHERE `titulo` LIKE 'a%';

-- // 3- trazer apenas produtos que tenham o preço de 410 
SELECT * FROM `produtos` WHERE `preco` = 410;

-- // 4- trazer apenas produtos com avaliação 4 e 5 
SELECT * FROM `produtos` WHERE `avaliacao` IN (4, 5);

-- // 5- trazer apenas produtos com avaliação 1 e 5 
SELECT * FROM `produtos` WHERE `avaliacao` IN (1, 5);

-- // 6- trazer apenas produtos entre id 21 e 32 
SELECT * FROM `produtos` WHERE `id` BETWEEN 21 AND 32;

-- // 7- trazer apenas os 12 últimos produtos 
SELECT * FROM `produtos` ORDER BY `id` DESC LIMIT 12;

-- // 8- trazer apenas os 12 primeiros produtos com avaliação 5 
SELECT * FROM `produtos` WHERE `avaliacao` = 5 LIMIT 12;

-- // 9- trazer todo os produtos em ordem de preço do menor para o maior 
SELECT * FROM `produtos` ORDER BY `preco` ASC;

-- // 10- trazer todo os produtos em ordem de avaliação do menor para o maior
SELECT * FROM `produtos` ORDER BY `avaliacao` ASC;