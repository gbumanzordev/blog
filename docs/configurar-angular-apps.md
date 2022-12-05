# Como estructurar aplicaciones en Angular

Cuando se trata de estructurar aplicaciones, podemos pensar que no es necesario tener un orden definido, pero a medida el desarrollo crece, el equipo cambia y nuevos requerimientos son añadidos, se hace mas necesario tener consistencia en nuestro trabajo para facilitar la integración de nuevos miembros, nuevos requerimientos y para la mantenibilidad del proyecto.

Angular tiene una estructura bien definida de como deberían ordenarse los archivos y carpetas y hoy me gustaría profundizar en ello.

## Patrón LIFT
LIFT es el patrón principal creado por el equipo de Angular para ayudarte a definir bien la estructura de tus proyectos, significa lo siguiente:

Locate = Localizar
Identify = Identificar
Flat = Plano
T-DRY = Intentar no repetirse.

Ahora, veamos mas a detalle lo que cada uno significa.

### Locate
Debemos hacer que el localizar código en nuestra aplicación sea algo fácil e intuitivo, que ya sea que tengamos mucho o poco tiempo en un proyecto siempre sepamos a donde ir para encontrar cada cosa.

Para cumplir con este paso, podemos guardar archivos en sub carpetas con nombres descriptivos y que tengan relación, por ejemplo, una carpeta para componentes (components), una carpeta para directivas, servicios, interfaces y pipes. De esta manera, sabremos que cada modulo que trabajemos tendrá este grupo de carpetas y sabremos a donde dirigirnos.

### Identify
Para cumplir con este paso, lo que debemos hacer es nombrar nuestros archivos de manera que identificarlos sea fácil, es decir, si estamos creando un componente, podemos colocar el nombre y la terminación `.component.ext`, si estamos trabajando con servicios sería `.service.ts` y así sucesivamente.

Para este paso, lo que debemos evitar es que un archivo contenga más de un componente, así podremos saber que el nombre del archivo hace relación explícitamente a su contenido y no usar nombres más generales. Siempre debemos preferir nombres descriptivos (aunque largos) a tener nombres cortos pero confusos.

### Flat
La estructura de nuestras aplicaciones debe ser lo mas plana posible, a nadie le gusta navegar a cinco niveles de profundidad en carpetas para encontrar el componente que andamos buscando.

Una recomendación importante es que cuando una carpeta tenga más de diez archivos dentro de ella, deberíamos considerar crear sub-carpetas, porque si bien es cierto no queremos que se llene de anidaciones, tampoco es lo correcto dejar todo dentro de una sola carpeta.

### T-DRY
T-DRY significa `Try Don't Repeat Yourself` y lo que significa es que, en la medida de lo posible intentemos no repetirnos, pero si es inevitable, o si haremos sacrificios en nuestro código para no repetirnos, que elijamos legibilidad sobre el DRY.

Como ejemplo, debemos evitar nombrar con cosas obvias nuestros componentes, como agregar `login-view.component.html` cuando la extensión ya nos esta indicando que es una vista, o nombrar `sign-up-style.component.scss` cuando la extensión claramente nos dice que es un archivo de estilos.
