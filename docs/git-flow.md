# Flujo de trabajo con Git Flow

En el desarrollo de software es muy importante llevar el control y una línea de tiempo de lo que desarrollamos, por lo que un Sistema de Control de Versiones (VCS) es muy importante, pero en esta ocasión más que hablar del control de versiones como tal, me gustaria introducirlos a una metodología bastante popular para el desarrollo de software en equipo.

Gitflow es un conjunto de reglas o “estándares” para versionamiento que (a mi manera de verlo) la mayoría de los equipos deberían seguir al momento de desarrollar software colaborativo, es una de las más populares y por lo tanto la que mejores valoraciones tiene. Empecemos.

## Instalacion
Para OSX podemos usar el siguiente comando:
```bash
brew install git-flow
```
Para instalar Git Flow en Windows, pueden seguir este enlace, ya que el instalador ya trae git flow incluido.

Para Linux, existen varias maneras que puedes investigar en línea, para las distribuciones basadas en Debian/Ubuntu, puedes ejecutar el siguiente comando:
```bash
sudo apt-get install -y git-flow.
```
Después de haber instalado git-flow lo único que debemos hacer es dirigirnos al repositorio local de nuestro proyecto y ejecutar git flow init, este comando es una extensión del comando git init y no va a cambiar nada en el repositorio excepto la creación de las ramas.

Una vez ejecutemos este comando, nos pedirá los nombres por defecto de las ramas principales para nuestro proyecto, podemos dejar los valores predeterminados y continuar, el resultado seria similar al siguiente:
```bash
$ git flow init
Initialized empty Git repository in ~/project/.git/
No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []

$ git branch
* develop
  master
```
  Las ramas que se crearan al inicio serán master y develop, profundicemos en ellas.

## Ramas `master` y `develop`
En lugar de solamente usar la rama master, este flujo de trabajo utiliza dos ramas para guardar el historial del proyecto. La rama master almacena el historial de lanzamientos oficiales, y la rama develop funciona como una rama de integración para nuevas características en desarrollo, también es conveniente etiquetar todos los commits que se hagan en la rama master con un número de versión.

El primer paso es complementar la rama master con la rama develop, la manera más sencilla es crear la rama develop y hacer push al repositorio en el servidor ejecutando los siguientes comandos:
```bash
git branch develop
git push origin develop
```
Esa rama va a contener el historial completo del proyecto mientras que master va a contener una versión reducida. A partir de este punto los compañeros de proyecto deberían clonar el repositorio central y crear una rama de seguimiento para la rama develop.

## Ramas por caracteristicas (feature branches)
Cada nueva característica debe residir en su propia rama, la cual puede ser guardada en el repositorio remoto para respaldo o colaboración. Pero, en vez de ramificar desde master, las ramas feature usen develop como su rama padre. Cuando una característica esté completa, debe ser combinada con develop. Las características nunca deberían ir directamente a la rama master.

Tomen en cuenta que las ramas por característica combinadas con la rama de desarrollo (develop) cumplen el propósito de ramificación por feature, pero el flujo de trabajo git flow no termina ahí.

Para crear una rama por característica, sin usar la herramienta git flow, podemos ejecutar los siguientes comandos:
```bash
git checkout develop
git checkout -b feature_branch
```

Pero cuando usamos la extensión git-flow, solamente debemos ejecutar:
```bash
git flow feature start feature_branch
```
Y continuamos usando git como siempre.

### Terminar features:
Una vez la característica (regularmente tickets asignados en los proyectos), el siguiente paso sería combinar la rama feature con la rama de desarrollo (develop).

Sin las extensiones de git flow, deberíamos ejecutar los siguientes comandos:
```bash
git checkout develop
git merge feature_branch
```
Pero teniendo gitflow instalado, solamente necesitamos ejecutar:
```bash
git flow feature finish feature_branch
```
Este comando hará automáticamente el cambio hacia develop y luego el merge de la rama en la que estemos trabajando, y adicionalmente elimina la rama feature que ya no necesitamos.

## Ramas para lanzamiento:
Una vez la rama de desarrollo haya adquirido suficientes características para un lanzamiento (o una fecha de lanzamiento está cerca), se hace una división (fork) de una rama de lanzamiento desde la rama develop. Al crear la rama se inicia un nuevo ciclo de lanzamiento, lo cual significa que en esta rama no deberían agregarse nuevas características sino a la rama develop, sin embargo, si se encuentran errores en este punto, estos deberían ser corregidos y actualizados en la rama de lanzamiento tanto como en la rama de desarrollo.

Usar una rama dedicada a los lanzamientos hace posible que el equipo pueda pulir y revisar adecuadamente el proyecto sin afectar o detener el desarrollo de nuevas características, esto también nos permite crear fases bien definidas del desarrollo.

Para poder crear ramas de lanzamiento también podemos hacerlo por nuestra cuenta, ejecutando los siguientes comandos:
```bash
git checkout develop
git checkout -b release/0.1.0
```
Pero si tenemos la extensión git-flow, también podemos hacer lo siguiente:
```bash
$ git flow release start 0.1.0
```
Lo cual nos dará como respuesta lo siguiente:

```bash
Switched to a new branch 'release/0.1.0'
```

Una vez esta rama esté lista, (sin bugs, documentada y revisada), debe combinarse con la rama principal (master) y etiquetada con un número de versión. Adicionalmente (no es obligacion) se sugiere que se haga merge a la rama develop por si hay alguna modificación que se haya realizado que necesite ser actualizada en la rama de desarrollo.

Para finalizar la rama de lanzamiento, podemos hacerlo, como siempre, de dos maneras, sin git-flow:
```bash
git checkout master
git merge release/0.1.0
```
Con git-flow:
```bash
git flow release finish '0.1.0'
```


## Ramas de mantenimiento (hotfix branch):
Las ramas de mantenimiento o “hotfix” son ramas que nos ayudan a corregir lanzamientos ya en producción, son muy parecidas a las ramas de lanzamiento excepto que ellas salen directamente de la rama master y no de develop. Nos ayudan a la hora de corregir errores pequeños como faltas de ortografías o una imagen que no se vea del todo bien.
Una vez se haya finalizado el trabajo en esta rama, debe ser combinada de nuevo con master pero también con develop para mantener todos los cambios en las ramas principales del proyecto.

### Inicializar una rama de revisión:
Sin git flow:
```bash
git checkout master
git checkout -b hotfix_branch
```
Con git-flow:
```bash
git flow hotfix start hotfix_branch
```
De manera similar a como se finaliza una rama de lanzamiento, las ramas de revisión se combinan en master y en develop, de la siguiente manera:

Sin git-flow:
```bash
git checkout master
git merge hotfix_branch
git checkout develop
git merge hotfix_branch
git branch -D hotfix_branch
```
Utilizando git flow
```bash
$ git flow hotfix finish hotfix_branch
```
Este es básicamente el flujo de trabajo que se sigue cuando se utiliza git flow, es muy ordenado y nos permite llevar un mejor seguimiento del trabajo hecho, y una linea de tiempo mas entendible evitando en lo posible los conflictos a la hora de combinar el trabajo hecho.
