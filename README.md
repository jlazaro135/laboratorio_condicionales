# laboratorio condicionales

**[DEMO LINK - LABORATORIO CONDICIONALES](https://laboratio-condicionales.netlify.app/)**

INTRODUCCIÓN
He desarrollado todas las propuestas del laboratorio y he añadido features por mi cuenta, como son las animaciones. He intentado crearlo lo más modularizado posible, intentado respetar el principio de única responsabilidad única de las funciones. Algunas de las características de este proyecto son:

- El método para aleatorizar se ha hecho extrayendo un número aleatorio, resultado de multiplicar Math.Random y la longitud del array de objetos de las cartas, redondeando dicho resultado hacia abajo (floor). El resultado es utilizado para acceder a la posición de la carta dentro del array de objetos de cartas. A medida que las cartas van saliendo, se van eliminando del array, evitando que vuelva a salir otra vez.

- El array que se modifica es una copia del array del original, para asegurarnos de que el array original permanece intacto.

- El array está compuesto por objetos que contienen un string con el nombre (name) de la carta y su valor correspondiente (value). Se ha creado una interfazde tipo Card

- Las cartas conseguidas se crean al vuelo (función createCardElement) y se muestran en la parte inferior de la baraja.

- El modal con la información se crea al vuelo (función createModal) y se pasa como argumentos diferentes textos,  en función de la puntuación obtenida o de la acción llevada a cabo por parte del usuario.

- Los textos y los timeOuts están metidos en variables constantes;

- Se han creado diferentes funciones: para actualizar el estado del juego, para obtener un índice aleatorio, para extraer la url de la imagen, para mover y eliminar del tablero la carta obtenida, para voltear la carta, para setear puntos y chequear el resultado... etc.

- Existe un contador de puntos que se va actualizando cada vez que se saca una carta. 

- El juego se corta cuando se hace match con 7.5 o cuando se rebasas esa cifra. También se corta cuando el usuario elige la opción "¡Me planto!".

- Cuando el usuario se planta tiene la opción de ver una carta más, tras el volteo de la carta, aparecerá un modal indicando que hubiera sucedido.

- A nivel estilos, se ha intentado replicar un tapete clásico de juegos de cartas y se han creado animaciones para hacerlo más dinámico.




