# Qué son Discriminated Unions y Exhaustiveness Checking en TypeScript?

Hola, yo soy Gerson Umanzor, Front-End Developer, y en esta ocasión me gustaría hablarles sobre los *Discriminated Unions* y *Exhaustiveness Checkings* en TypeScript.

***Disclaimer***: No me considero un experto en TypeScript, solamente quiero compartir con ustedes lo que he aprendido y encuentro muy interesante.

## Discriminated Unions

Alguna vez han tenido una situación en la que necesiten basado en una propiedad de un parámetro actuar con otros keys o realizar cálculos?

Por ejemplo, si ustedes tienen dos perfiles de una persona, y quieren usar diferente información de estos perfiles para mostrarla, por ejemplo, asumamos que de un perfil, podríamos tener a un doctor, y a un ingeniero (de software, por supuesto) y que cada uno podria tener diferentes propiedades, como especialidad (para el doctor) y tecnología (para el ingeniero):

```ts
interface Perfil {
  tipo: 'doctor' | 'ingeniero';
  especialidad?: string;
  tecnologia?: string;
  hospital?: string;
  empresa: string;
}
```

Ahora bien, si yo quisiera mostrar información basado en el tipo de perfil que estoy utilizando, podría encontrarme con errores, por ejemplo, alguien podria proveerme con el perfil de un Doctor, pero accidentalmente no llenar la especialidad, o llenar la tecnologia, y eso se traduciría en que yo deba estar haciendo muchas validaciones, algo mas o menos así:

```ts
// ...
if (perfil.tipo === 'doctor') {
  if(perfil.especialidad) {
    // Mostrar informacion
  }
}
```

Pero dado que estas propiedades son opcionales (no puedo obligar al usuario a llenar toda la información cuando no la requiero toda), esto podría ocasionar que falte información o que esté recibiendo más información de la que necesito.

Y si agregamos más tipos? Esto se traduciría en agregar aún más propiedades al objeto, y terminaríamos con un objeto enorme lleno de propiedades opcionales, y, peor aún, con un listado de validaciones interminables.

Pero, como solucionamos esto? Bien sencillo, utilizamos lo que en TypeScript se llama ***Discriminated Unions***, que se traduce en, tener una propiedad en común entre todas las interfaces o tipos, para que, de acuerdo al valor de esta propiedad, nosotros usemos solamente las keys que se necesitan, en ese caso, el ejemplo antes mencionado se traduciría en lo siguiente:

```ts
interface Doctor {
  tipo: 'doctor';
  especialidad: string;
  hospital: string;
}

interface Ingeniero {
  tipo: 'ingeniero';
  tecnologia: string;
  empresa: string;
}
```

Y luego, lo mas importante, es que crearemos un *type* para unir (de ahi el *“Union”* en el nombre de esta característica) ambas interfaces, así:

```ts
type Perfil = Doctor | Ingeniero;
```

Ahora, cuando queramos hacer ciertas validaciones, esto funcionaria sin ningún problema:

```ts
function revisarPerfil(perfil: Perfil) {

  switch (perfil.tipo) {
    case 'doctor': {
      // Puedo usar las propiedades especialidad y hospital, sin problemas;
      break;
    }
    case 'ingeniero': {
      // Puedo usar las propiedades tecnologia y empresa, sin problemas;
      break;
    }
    default: {
      break;
    }
  }
}
```

Lo que significa que solo debo hacer una validación (la de tipo) y con eso sería suficiente para saber que otras propiedades son accesibles, fácil, no? Bien, continuemos con Exhaustiveness Checking.

## Exhaustiveness Checking

Cuando yo estoy recibiendo parámetros que tienen un número limitado de posibles valores, es muy importante saber que estoy cubriendo todos los posibles escenarios para poder evitar errores en producción.

Bien, tomaremos como base para el ejemplo los bloques de código anteriores, así que continuaremos utilizando el switch que creamos al final del primer ejercicio:

```ts
function revisarPerfil(perfil: Perfil) {
  switch (perfil.tipo) {
    case 'doctor': {
      // Puedo usar las propiedades especialidad y hospital, sin problemas;
      break;
    }
    case 'ingeniero': {
      // Puedo usar las propiedades tecnologia y empresa, sin problemas;
      break;
    }
    default: {
      break;
    }
  }
}
```

En ese bloque switch, nosotros estamos validando que todos los posibles escenarios estén cubiertos, ¿no?

Y que tal si más adelante, ya sea un par de días, unas semanas, unos meses o quien sabe, hasta un par de años, alguien más en el equipo agrega una interface más al tipo que nosotros habíamos declarado, llamemos a esta nueva interface `Arquitecto`

```ts
interface Arquitecto {
  tipo: 'arquitecto';
  // Resto de propiedades
}
```

Y ahora, el Union type se vería más o menos así:

```ts
type Perfil = Doctor | Ingeniero | Arquitecto;
```

Lo que significa que ahora, en nuestro switch case no estamos cubriendo todos los posibles escenarios que podríamos recibir, ¿qué hacemos? Aquí es donde el ***Exhaustiveness Checking*** entra en juego, y para implementarlo, hacemos lo siguiente:

```ts
function revisarPerfil(perfil: Perfil) {
  let exhaustiveChecking: never;

  switch (perfil.tipo) {
    case 'doctor': {
      // Puedo usar las propiedades especialidad y hospital, sin problemas;
      break;
    }
    case 'ingeniero': {
      // Puedo usar las propiedades tecnologia y empresa, sin problemas;
      break;
    }
    default: {
      exhaustiveChecking = perfil;
      break;
    }
  }
}
```

Los cambios que hemos realizado son dos:

1. Declaramos una variable de tipo `never`, a la cual llamamos `exhaustiveChecking`
2. Agregamos el default case, y en este asignamos el valor de perfil.

Pero, ¿qué significa que asigne un valor de un parámetro a una variable de tipo never? Aquí viene la explicación:

Dado que nosotros ya hemos cubierto todos los posibles escenarios de el parámetro perfil, cuando llegue al case default, no habría una coincidencia en cuanto al tipo, por lo tanto, TypeScript entiende que nunca va a llegar hasta ahí (de ahí que automáticamente se convierte en tipo never).

Esto significa que, cuando yo agregue una nueva opción a mi *type* `Perfil`, TypeScript va a detectar automáticamente que cuando llega al default case el tipo de el parámetro perfil no es de tipo never, sino que podría ser del tipo que recién agregamos, y no nos va a dejar compilar la aplicación, evitando errores en tiempo de compilación y mostrando el siguiente error al pasar el cursor sobre exhaustiveChecking:

```ts
Type 'Arquitecto' is not assignable to type 'never'.
```

Hasta aquí esta pequeña entrada, espero les haya gustado, y si tienen algún otro tema del que les gustaría que hablara, me pueden dejar saber, y con gusto preparamos una nueva entrada.

Un saludo!
