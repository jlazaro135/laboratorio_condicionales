# laboratorio condicionales

[DEMO LINK - LABORATORIO CONDICIONALES]

- El método para aleatorizar se hace con math.Random. Este es multipicado por la longitud del array de cartas disponibles y redondeado hacia abajo (floor). El resultado será utilizado para acceder a la posición de la carta dentro de un array. A medida que se vayan saliendo cartas, se van eliminando del array para evitar que se vuelvan a repetir.

- El array que se modifica es una copia del array del original, para asegurarnos de que el array original permanece intacto.

- El array está compuesto por objetos que contienen un string con el nombre (name) de la carta y su valor correspondiente (value). Se ha creado una interfazde tipo Card

- Las cartas conseguidas se crean al vuelo y se muestran en la parte inferior de la baraja.

- El modal con la información se crea al vuelo y se pasa como argumentos diferentes textos,  en función de la puntuación obtenida o de la acción llevada a cabo por parte del usuario.

- Los textos y los timeOuts están metidos en variables;

- Se han creado diferentes funciones: para actualizar el estado del juego, para obtener un índice aleatorio, para extraer la url de la imagen, para mover y eliminar del tablero la carta obtenida, para voltear la carta, para setear puntos y chequear el resultado... etc.



