# CONTENIDO_TEOLOGIA.md — Fuente de datos curada para la app

> **Para el agente:** este archivo es la única fuente de verdad para el contenido teológico. Está pre-estructurado como JSON dentro de bloques de código. Convertilo en `src/data/contenido.json` (o equivalente) en la app. Cada flashcard, item de chuleta y pregunta tiene un `id` estable, un `chapterId` y un `priority` (alta/media/baja probabilidad de salir en parcial). El campo `mnemonic` solo aparece en listas largas/feas.

---

## Estructura general

```json
{
  "metadata": {
    "examDate": "2026-05-29",
    "subject": "Teología",
    "lastUpdated": "2026-05-07",
    "coversUntil": "Capítulo XIV - La Iglesia",
    "pendingTopics": ["Sacramentos: Bautismo, Confirmación, Eucaristía, Penitencia, Unción, Orden, Matrimonio"]
  },
  "chapters": [
    { "id": "cap1", "number": "I", "title": "Introducción al Conocimiento Teológico", "part": "Teología Fundamental" },
    { "id": "cap2", "number": "II", "title": "La Fe Sobrenatural", "part": "Teología Fundamental" },
    { "id": "cap3", "number": "III", "title": "El Conocimiento Natural de Dios", "part": "Teología Fundamental" },
    { "id": "cap4", "number": "IV", "title": "Conocimiento Sobrenatural de Dios", "part": "Teología Fundamental" },
    { "id": "cap5", "number": "V", "title": "Dios Uno en Esencia", "part": "Dios Uno, Trino y Creador" },
    { "id": "cap6", "number": "VI", "title": "Dios Trino en Personas", "part": "Dios Uno, Trino y Creador" },
    { "id": "cap7", "number": "VII", "title": "La Creación en General", "part": "Dios Uno, Trino y Creador" },
    { "id": "cap8", "number": "VIII", "title": "Las Criaturas en Particular", "part": "Dios Uno, Trino y Creador" },
    { "id": "cap9", "number": "IX", "title": "La Encarnación del Verbo", "part": "Cristología" },
    { "id": "cap10", "number": "X", "title": "La Redención", "part": "Cristología" },
    { "id": "cap11", "number": "XI", "title": "Conclusión Gloriosa de la Obra Redentora", "part": "Cristología" },
    { "id": "cap12", "number": "XII", "title": "Mariología", "part": "Cristología" },
    { "id": "cap13", "number": "XIII", "title": "Teología de la Gracia", "part": "Gracia, Iglesia, Sacramentos" },
    { "id": "cap14", "number": "XIV", "title": "La Iglesia", "part": "Gracia, Iglesia, Sacramentos" }
  ]
}
```

---

## FLASHCARDS

> Formato: `{ id, chapterId, front, back, priority, tags? }`. Priority: `alta` = casi seguro cae, `media` = puede caer, `baja` = contexto.

```json
{
  "flashcards": [
    {
      "id": "fc-001",
      "chapterId": "cap1",
      "front": "Definición de Teología",
      "back": "Conocimiento científico de la Revelación divina a los hombres, y de su credibilidad. Etimología: theós (Dios) + logos (tratado).",
      "priority": "alta"
    },
    {
      "id": "fc-002",
      "chapterId": "cap1",
      "front": "¿Por qué la Teología es supremo entre las ciencias?",
      "back": "Por (1) la excelsitud de su objeto (Dios), (2) la suprema certeza de sus conocimientos (saber infalible de Dios), (3) su ordenamiento al fin supremo del hombre (la bienaventuranza).",
      "priority": "media"
    },
    {
      "id": "fc-003",
      "chapterId": "cap1",
      "front": "Las 4 fuentes de la Teología",
      "back": "(1) Sagrada Escritura, (2) Tradición, (3) Magisterio de la Iglesia (solemne y ordinario), (4) Razón iluminada por la Fe.",
      "priority": "alta"
    },
    {
      "id": "fc-004",
      "chapterId": "cap1",
      "front": "Grados de certeza teológica (de mayor a menor)",
      "back": "1) Dogma de Fe, 2) Verdad próxima a la Fe, 3) Sentencia teológicamente cierta, 4) Sentencia común, 5) Sentencias probables, 6) Sentencia tolerada.",
      "priority": "alta"
    },
    {
      "id": "fc-005",
      "chapterId": "cap1",
      "front": "¿Qué es un Dogma de Fe?",
      "back": "Verdad definida por el Magisterio infalible (el Papa hablando ex cathedra o un Concilio Universal).",
      "priority": "alta"
    },
    {
      "id": "fc-006",
      "chapterId": "cap2",
      "front": "Definición de Fe",
      "back": "Virtud sobrenatural por la que el hombre cree firmemente lo que Dios ha revelado y la Iglesia enseña como tal.",
      "priority": "alta"
    },
    {
      "id": "fc-007",
      "chapterId": "cap2",
      "front": "¿Cuál es el objeto formal de la fe?",
      "back": "La autoridad de Dios mismo que revela. NO la evidencia intelectual.",
      "priority": "alta"
    },
    {
      "id": "fc-008",
      "chapterId": "cap2",
      "front": "Frase clave de San Agustín sobre fe y razón",
      "back": "Creo para comprender y comprendo para creer mejor.",
      "priority": "media"
    },
    {
      "id": "fc-009",
      "chapterId": "cap2",
      "front": "¿Qué es Fideísmo?",
      "back": "Error que da primacía absoluta a la Fe sobre la razón. Asociado a Lutero.",
      "priority": "alta"
    },
    {
      "id": "fc-010",
      "chapterId": "cap2",
      "front": "¿Qué es Racionalismo?",
      "back": "Error que da primacía absoluta a la razón sobre la fe.",
      "priority": "alta"
    },
    {
      "id": "fc-011",
      "chapterId": "cap2",
      "front": "Encíclica de Juan Pablo II sobre fe y razón (año y frase clave)",
      "back": "Fides et Ratio (1998). 'La Fe y la razón son como las dos alas con las cuales el espíritu humano se eleva hacia la contemplación de la verdad.'",
      "priority": "alta"
    },
    {
      "id": "fc-012",
      "chapterId": "cap3",
      "front": "¿Qué Concilio definió como dogma que Dios puede ser conocido por la razón natural?",
      "back": "Concilio Vaticano I, 1869.",
      "priority": "alta"
    },
    {
      "id": "fc-013",
      "chapterId": "cap3",
      "front": "Las 5 Vías de Santo Tomás (lista ordenada)",
      "back": "1ª: Movimiento → Primer Motor inmóvil. 2ª: Causas eficientes → Causa primera incausada. 3ª: Contingencia → Ser necesario. 4ª: Grados de perfección → Ser máximamente perfecto. 5ª: Orden y finalidad → Ser inteligente que dirige todo a un fin.",
      "priority": "alta",
      "mnemonic": "MO-CA-CO-PE-OR (Movimiento, Causa, Contingencia, Perfección, Orden)"
    },
    {
      "id": "fc-014",
      "chapterId": "cap3",
      "front": "Esquema común a las 5 Vías",
      "back": "Hecho evidente → principio de causalidad → imposibilidad de regresión infinita → Primera Causa = Dios.",
      "priority": "alta"
    },
    {
      "id": "fc-015",
      "chapterId": "cap3",
      "front": "Argumento Ontológico (autor y planteo)",
      "back": "San Anselmo. Dios existe en el pensamiento como 'lo mayor que puede pensarse' → debe existir también en la realidad. Criticado por Kant.",
      "priority": "media"
    },
    {
      "id": "fc-016",
      "chapterId": "cap3",
      "front": "Respuesta filosófica al Problema del Mal",
      "back": "El mal es privación del bien, no un ser positivo. Por eso su existencia presupone la del bien (y de Dios).",
      "priority": "alta"
    },
    {
      "id": "fc-017",
      "chapterId": "cap3",
      "front": "Tipos de Ateísmo",
      "back": "Práctico, Dogmático, Agnóstico (Huxley, 1869), Crítico, Deísmo, Humanismo ateo (Feuerbach: 'el hombre es el nuevo dios del hombre').",
      "priority": "media"
    },
    {
      "id": "fc-018",
      "chapterId": "cap3",
      "front": "Diferencia entre Paganismo y Panteísmo",
      "back": "Paganismo = politeísmo (adoración de la naturaleza, idolatría). Panteísmo = identificar a Dios con el universo ('Todo es Dios' o 'Dios es Todo'). El panteísmo se asocia al new age.",
      "priority": "media"
    },
    {
      "id": "fc-019",
      "chapterId": "cap4",
      "front": "Definición de Revelación",
      "back": "Acto por el cual Dios desvela o manifiesta algo de orden religioso. Del latín revelatio / griego apokalipsis.",
      "priority": "alta"
    },
    {
      "id": "fc-020",
      "chapterId": "cap4",
      "front": "Etapas de la Revelación",
      "back": "(1) Revelación originaria (primeros padres). (2) Revelación al Pueblo de Israel (Abraham, Sinaí, Profetas). (3) Jesucristo, plenitud de la Revelación (Jn 14,9). Terminó con el último Apóstol.",
      "priority": "alta"
    },
    {
      "id": "fc-021",
      "chapterId": "cap4",
      "front": "Definición de Sagrada Escritura",
      "back": "Conjunto de libros que tiene a Dios como Autor principal y al hombre que escribe como autor secundario (causa instrumental), y que contiene lo esencial de la Revelación divina para la salvación.",
      "priority": "alta"
    },
    {
      "id": "fc-022",
      "chapterId": "cap4",
      "front": "Cantidad de libros de la Biblia católica",
      "back": "73 libros: 46 del Antiguo Testamento + 27 del Nuevo Testamento. (Canon protestante: 66.)",
      "priority": "alta"
    },
    {
      "id": "fc-023",
      "chapterId": "cap4",
      "front": "¿Cuándo y dónde se fijó el canon bíblico católico?",
      "back": "Concilio de Trento, 8 de abril de 1546.",
      "priority": "alta"
    },
    {
      "id": "fc-024",
      "chapterId": "cap4",
      "front": "Lenguas originales de la Biblia",
      "back": "Hebreo (mayoría del AT), arameo y griego (todo el NT).",
      "priority": "media"
    },
    {
      "id": "fc-025",
      "chapterId": "cap4",
      "front": "¿Qué es la Inspiración bíblica?",
      "back": "Gracia del Espíritu Santo por la cual el escritor sagrado (hagiógrafo) es movido a poner por escrito lo que Dios quiere comunicar. Dios respeta las capacidades del autor; no le dicta.",
      "priority": "alta"
    },
    {
      "id": "fc-026",
      "chapterId": "cap4",
      "front": "¿Qué es la Inerrancia bíblica?",
      "back": "Ausencia de error en lo referente a la salvación del hombre. 'La Escritura no puede fallar' (Jn 10,35).",
      "priority": "alta"
    },
    {
      "id": "fc-027",
      "chapterId": "cap4",
      "front": "Sentidos de la Escritura",
      "back": "Literal (descubierto por la exégesis) y Espiritual: alegórico (en Cristo), moral (conducta justa), anagógico (eternidad), tipológico (Adán figura de Cristo).",
      "priority": "alta"
    },
    {
      "id": "fc-028",
      "chapterId": "cap4",
      "front": "Frase clave sobre la relación AT/NT",
      "back": "El Nuevo Testamento se encuentra latente en el Antiguo, y el Antiguo se hace patente en el Nuevo.",
      "priority": "alta"
    },
    {
      "id": "fc-029",
      "chapterId": "cap4",
      "front": "Las 4 tradiciones del Pentateuco",
      "back": "Yahvista (J, s. X a.C., reinado de Salomón). Elohísta (E, s. IX-VIII a.C., reino del Norte). Deuteronomista (D, edición definitiva en el exilio 587-538 a.C.). Sacerdotal (P, exilio en Babilonia, s. VI a.C.).",
      "priority": "alta",
      "mnemonic": "JEDP — orden por antigüedad: Jefe Está Diciendo Pavadas"
    },
    {
      "id": "fc-030",
      "chapterId": "cap4",
      "front": "¿Qué libros componen el Pentateuco?",
      "back": "Génesis, Éxodo, Levítico, Números, Deuteronomio (la Torá).",
      "priority": "media"
    },
    {
      "id": "fc-031",
      "chapterId": "cap4",
      "front": "Profetas mayores",
      "back": "Isaías, Jeremías, Daniel, Ezequiel.",
      "priority": "media"
    },
    {
      "id": "fc-032",
      "chapterId": "cap4",
      "front": "¿Qué significa 'Profeta'?",
      "back": "Del hebreo nabí: llamado. Es mensajero e intérprete de la Palabra divina. 'Así habla Yahvé.'",
      "priority": "media"
    },
    {
      "id": "fc-033",
      "chapterId": "cap4",
      "front": "Evangelios sinópticos",
      "back": "Mateo, Marcos, Lucas. Escritos en la segunda mitad del s. I. Presentan semejanzas que permiten verlos en columnas paralelas. Hipótesis de la fuente Q.",
      "priority": "alta"
    },
    {
      "id": "fc-034",
      "chapterId": "cap4",
      "front": "Características distintivas del Evangelio de Juan",
      "back": "Escrito a finales del s. I. Prólogo teológico (Jn 1,1-18). 'La Palabra se hizo carne'. Cristo es el Verbo de Dios.",
      "priority": "alta"
    },
    {
      "id": "fc-035",
      "chapterId": "cap4",
      "front": "Definición de Tradición",
      "back": "Transmisión oral de la verdad revelada que, a partir de lo dicho y obrado por Jesús, iniciaron los Apóstoles y que perdura ininterrumpidamente en la Iglesia bajo la asistencia del Espíritu Santo.",
      "priority": "alta"
    },
    {
      "id": "fc-036",
      "chapterId": "cap4",
      "front": "Instrumentos de conservación de la Tradición",
      "back": "Profesiones de fe (Credos), decisiones infalibles de Papas y Concilios, Liturgia, escritos de los Santos Padres (s. I al VI-VIII), escritos de los Santos Doctores, Actas de los mártires.",
      "priority": "media"
    },
    {
      "id": "fc-037",
      "chapterId": "cap4",
      "front": "¿Qué son los Motivos de Credibilidad?",
      "back": "Acontecimientos racionalmente comprobables que ayudan a la razón a comprender que Dios ha hablado en la Revelación sobrenatural. Principalmente: milagros y profecías.",
      "priority": "alta"
    },
    {
      "id": "fc-038",
      "chapterId": "cap4",
      "front": "Diferencia entre milagros de Jesús y de los profetas/santos",
      "back": "Jesús los obra en nombre propio. Los profetas y santos los hacen 'en el nombre de Dios'.",
      "priority": "alta"
    },
    {
      "id": "fc-039",
      "chapterId": "cap5",
      "front": "Nombres de Dios en el AT",
      "back": "Elohim (ser fuerte, poderoso); Adonai (señor, dueño / griego Kyrios); Padre; Yahveh / YHWH (el Nombre inefable revelado a Moisés en Ex 3, 'El que es', 'El Existente').",
      "priority": "alta"
    },
    {
      "id": "fc-040",
      "chapterId": "cap5",
      "front": "Tres métodos para hablar de la esencia de Dios",
      "back": "(1) De negación: negar de Dios toda imperfección. (2) Positivo: aplicarle perfecciones reales de las criaturas. (3) De sublimación: elevar esas perfecciones a grado infinito.",
      "priority": "alta"
    },
    {
      "id": "fc-041",
      "chapterId": "cap5",
      "front": "Atributos entitativos de Dios (10)",
      "back": "Perfección, Infinitud, Simplicidad, Unicidad, Verdad, Bondad, Inmutabilidad, Eternidad, Inmensidad, Omnipresencia.",
      "priority": "alta",
      "mnemonic": "PIS-UV-BIE-IO: Perfección Infinitud Simplicidad / Unicidad Verdad / Bondad Inmutabilidad Eternidad / Inmensidad Omnipresencia"
    },
    {
      "id": "fc-042",
      "chapterId": "cap5",
      "front": "Atributos operativos de Dios",
      "back": "Inteligencia divina y Voluntad divina.",
      "priority": "alta"
    },
    {
      "id": "fc-043",
      "chapterId": "cap5",
      "front": "Definición clásica de Eternidad (Boecio)",
      "back": "La posesión total, simultánea y perfecta de una vida interminable.",
      "priority": "alta"
    },
    {
      "id": "fc-044",
      "chapterId": "cap5",
      "front": "Propiedades morales de la Voluntad divina",
      "back": "Justicia (distributiva y vindicativa) y Misericordia.",
      "priority": "media"
    },
    {
      "id": "fc-045",
      "chapterId": "cap5",
      "front": "Diferencia entre Providencia y Gobierno divinos",
      "back": "Providencia = el plan eterno de Dios sobre el mundo. Gobierno = la ejecución en el tiempo de ese plan eterno.",
      "priority": "alta"
    },
    {
      "id": "fc-046",
      "chapterId": "cap5",
      "front": "¿Qué es la Conservación divina?",
      "back": "Dios está continuamente sosteniendo en la existencia a todas las cosas. La criatura no depende de Dios solo en el instante en que es producida, sino en todo su existir.",
      "priority": "alta"
    },
    {
      "id": "fc-047",
      "chapterId": "cap5",
      "front": "¿Qué es el Concurso divino?",
      "back": "Causalidad de Dios aplicada a la acción de las criaturas: por la creación y conservación Dios es causa primera del ser; por el concurso es causa primera del obrar.",
      "priority": "media"
    },
    {
      "id": "fc-048",
      "chapterId": "cap6",
      "front": "Definición dogmática de la Trinidad",
      "back": "En Dios hay tres personas (Padre, Hijo y Espíritu Santo) y cada una posee la esencia divina que es numéricamente la misma. Dios es uno y único en naturaleza, y trino en personas.",
      "priority": "alta"
    },
    {
      "id": "fc-049",
      "chapterId": "cap6",
      "front": "Concilio que definió la Trinidad y año",
      "back": "Concilio I de Nicea (325). El símbolo niceno-constantinopolitano (325 y 381).",
      "priority": "alta"
    },
    {
      "id": "fc-050",
      "chapterId": "cap6",
      "front": "Procesiones ad intra en Dios",
      "back": "Solo dos: la generación del Verbo (el Hijo procede del Padre por generación intelectual) y la procesión del Espíritu Santo (procede del Padre y del Hijo como de un solo principio de espiración activa).",
      "priority": "alta"
    },
    {
      "id": "fc-051",
      "chapterId": "cap6",
      "front": "¿Qué es la Perijóresis trinitaria?",
      "back": "La relación de las tres Personas divinas entre sí: en cada una están las otras dos. 'El Padre está todo en el Hijo, todo en el Espíritu Santo...' (Dz 704).",
      "priority": "media"
    },
    {
      "id": "fc-052",
      "chapterId": "cap6",
      "front": "Las 4 relaciones reales en Dios",
      "back": "Generación activa (= paternidad), generación pasiva (= filiación), espiración activa, espiración pasiva.",
      "priority": "alta"
    },
    {
      "id": "fc-053",
      "chapterId": "cap6",
      "front": "Apropiaciones a las Personas divinas",
      "back": "Padre: eternidad, unidad, poder. Hijo: sabiduría, verdad, hermosura. Espíritu Santo: bondad, santidad, beatitud. En la Creación: Padre = causa eficiente, Hijo = causa ejemplar, Espíritu Santo = causa final.",
      "priority": "alta"
    },
    {
      "id": "fc-054",
      "chapterId": "cap6",
      "front": "¿Qué es el Filioque y qué problema implica?",
      "back": "La afirmación de que el Espíritu Santo procede del Padre Y del Hijo. Su introducción en el Símbolo de Nicea-Constantinopla es hasta hoy motivo de no convergencia con las Iglesias ortodoxas (CATIC 247).",
      "priority": "alta"
    },
    {
      "id": "fc-055",
      "chapterId": "cap6",
      "front": "Las 8 herejías antitrinitarias y cristológicas (lista)",
      "back": "1. Monarquismo dinámico (Adopcionismo). 2. Modalismo (Sabelianismo). 3. Subordinacionismo. 4. Arrianismo. 5. Macedonianismo. 6. Triteísmo. 7. Nestorianismo. 8. Monofisismo.",
      "priority": "alta",
      "mnemonic": "MoMoSubAr-MaTriNeMo: Mono-Modal-Sub-Arr / Maced-Tri-Nest-Mono"
    },
    {
      "id": "fc-056",
      "chapterId": "cap6",
      "front": "Arrianismo",
      "back": "Jesús es la primera criatura, más noble que los ángeles, pero no eterno ni consubstancial al Padre. Condenado en el Concilio de Nicea (325).",
      "priority": "alta"
    },
    {
      "id": "fc-057",
      "chapterId": "cap6",
      "front": "Modalismo (Sabelianismo)",
      "back": "Padre, Hijo y Espíritu Santo son tres modos de aparición del único Dios, no tres Personas reales.",
      "priority": "alta"
    },
    {
      "id": "fc-058",
      "chapterId": "cap6",
      "front": "Nestorianismo",
      "back": "A Jesús (hijo de María) solo lo une el Logos divino una unión moral; dos personas, dos naturalezas. Condenado en el Concilio de Éfeso (431).",
      "priority": "alta"
    },
    {
      "id": "fc-059",
      "chapterId": "cap6",
      "front": "Monofisismo",
      "back": "Una sola persona y una sola naturaleza: las dos naturalezas se fusionan dando una tercera, o la humana queda absorbida por la divina. Condenado en el Concilio de Calcedonia (451).",
      "priority": "alta"
    },
    {
      "id": "fc-060",
      "chapterId": "cap7",
      "front": "Definición de Creación (Royo Marín)",
      "back": "Primera producción de todo el ser, hecha de la nada por la causa universal, que es Dios.",
      "priority": "alta"
    },
    {
      "id": "fc-061",
      "chapterId": "cap7",
      "front": "Significado de 'creación de la nada'",
      "back": "Sin ninguna materia preexistente (ex nihilo). Es un acto tan propio y exclusivo de Dios que ni por milagro podría transferirlo a ninguna criatura.",
      "priority": "alta"
    },
    {
      "id": "fc-062",
      "chapterId": "cap7",
      "front": "Fines de la Creación",
      "back": "Primario: manifestación de las perfecciones divinas con la subsiguiente glorificación de Dios. Secundario: colmar de beneficios a las criaturas y hacer felices a las racionales.",
      "priority": "media"
    },
    {
      "id": "fc-063",
      "chapterId": "cap7",
      "front": "Errores contrarios a la Creación",
      "back": "Gnosticismo (creación por divinidad secundaria), Dualismo (dos principios eternos), Materialismo/Monismo materialista, Panteísmo.",
      "priority": "alta"
    },
    {
      "id": "fc-064",
      "chapterId": "cap7",
      "front": "Frase de San Agustín sobre el sentido de la Biblia",
      "back": "Dios nos quiso enseñar no cómo van los cielos (ciencia), sino cómo se va al cielo (salvación).",
      "priority": "media"
    },
    {
      "id": "fc-065",
      "chapterId": "cap8",
      "front": "Definición dogmática sobre los ángeles",
      "back": "Dios, al principio del tiempo, creó de la nada unas sustancias espirituales que son llamadas ángeles.",
      "priority": "alta"
    },
    {
      "id": "fc-066",
      "chapterId": "cap8",
      "front": "Naturaleza de los ángeles",
      "back": "Espíritus puros (sin cuerpo), creados, finitos, inmortales. Inteligencia intuitiva (no discursiva). Voluntad libre.",
      "priority": "alta"
    },
    {
      "id": "fc-067",
      "chapterId": "cap8",
      "front": "Los 9 coros de ángeles (Pseudo-Dionisio)",
      "back": "1ª jerarquía (más cerca de Dios): Tronos, Querubines, Serafines. 2ª: Potestades, Dominaciones, Virtudes. 3ª (más cerca de los hombres): Ángeles, Arcángeles, Principados.",
      "priority": "alta",
      "mnemonic": "TQS-PDV-AAP. 'Tres Queridos Santos / Pueden Dar Virtudes / A Adorables Personas'"
    },
    {
      "id": "fc-068",
      "chapterId": "cap8",
      "front": "Pecado de los ángeles caídos",
      "back": "Soberbia: querer ser como Dios. 'Non serviam' (no serviré). No pueden beneficiarse de la obra redentora de Cristo. Rechazo radical e irrevocable.",
      "priority": "alta"
    },
    {
      "id": "fc-069",
      "chapterId": "cap8",
      "front": "Imagen y semejanza de Dios en el hombre",
      "back": "Imagen = naturaleza (inteligencia, voluntad y memoria, según San Agustín). Semejanza = lo sobrenatural (la gracia).",
      "priority": "alta"
    },
    {
      "id": "fc-070",
      "chapterId": "cap8",
      "front": "Postura de la Iglesia sobre evolucionismo",
      "back": "Se admite el evolucionismo moderado si: (1) queda a salvo la creación de Dios de la materia y vida primitivas; (2) el alma humana exige intervención inmediata creadora de Dios (no evolución); (3) se afirma el monogenismo (humanidad de un solo tronco).",
      "priority": "alta"
    },
    {
      "id": "fc-071",
      "chapterId": "cap8",
      "front": "Los 4 estados de la naturaleza humana",
      "back": "1. Justicia original (antes del pecado, con todos los dones). 2. Naturaleza caída (tras el pecado de Adán). 3. Naturaleza redimida (restaurada por Cristo, con gracia santificante pero sin dones preternaturales). 4. Naturaleza glorificada (visión beatífica).",
      "priority": "alta"
    },
    {
      "id": "fc-072",
      "chapterId": "cap8",
      "front": "Dones del Estado de Justicia Original",
      "back": "Naturales (la naturaleza humana). Preternaturales: ciencia infusa, inmunidad de concupiscencia, impasibilidad, inmortalidad. Sobrenaturales: gracia santificante y habitual.",
      "priority": "alta"
    },
    {
      "id": "fc-073",
      "chapterId": "cap8",
      "front": "¿En qué consistió el pecado original?",
      "back": "Querer el hombre una total autonomía respecto a la determinación del bien y del mal (autonomía moral), sustrayéndole a Dios la autoridad y el poder de determinarlos.",
      "priority": "alta"
    },
    {
      "id": "fc-074",
      "chapterId": "cap8",
      "front": "Heridas de los dones naturales tras el pecado original",
      "back": "Ignorancia/error (inteligencia), malicia (voluntad), fragilidad/debilidad (apetito irascible), concupiscencia desordenada (apetito concupiscible).",
      "priority": "alta"
    },
    {
      "id": "fc-075",
      "chapterId": "cap8",
      "front": "¿Qué es el Protoevangelio?",
      "back": "Primer anuncio de salvación en Gn 3,14-15. La Tradición ve allí el anuncio del 'nuevo Adán' (Cristo) y la 'nueva Eva' (María).",
      "priority": "alta"
    },
    {
      "id": "fc-076",
      "chapterId": "cap9",
      "front": "Tres rasgos únicos de Jesús",
      "back": "(a) Hecho único en la historia: la pretensión humilde a la divinidad. (b) El único Dios humillado de la historia. (c) Testimonio único: la resurrección.",
      "priority": "alta"
    },
    {
      "id": "fc-077",
      "chapterId": "cap9",
      "front": "Datos cronológicos de Jesús",
      "back": "Nacimiento: 4 a 7 a.C. Bautismo y vida pública: 27 o 28 d.C. Muerte y Resurrección: 30 d.C.",
      "priority": "media"
    },
    {
      "id": "fc-078",
      "chapterId": "cap9",
      "front": "Definición de Encarnación",
      "back": "El hecho de que el Hijo de Dios haya asumido una naturaleza humana (Jn 1,14: 'Y la Palabra se hizo carne').",
      "priority": "alta"
    },
    {
      "id": "fc-079",
      "chapterId": "cap9",
      "front": "Definición de Unión Hipostática",
      "back": "En Cristo hay una sola persona (la segunda persona divina, Dios Hijo) y dos naturalezas que subsisten (divina y humana), que no se confunden ni se mezclan, en la misma persona del Logos.",
      "priority": "alta"
    },
    {
      "id": "fc-080",
      "chapterId": "cap9",
      "front": "Concilios que definieron la Unión Hipostática",
      "back": "Éfeso (431): unidad de persona, contra Nestorio. Calcedonia (451): dualidad de naturaleza y unicidad de persona.",
      "priority": "alta"
    },
    {
      "id": "fc-081",
      "chapterId": "cap9",
      "front": "¿Cuándo comenzó la Unión Hipostática y se interrumpió alguna vez?",
      "back": "Comenzó en el instante de la concepción en el seno virginal de María. NUNCA se interrumpió. La muerte de Cristo rompió la unión cuerpo-alma, pero no la unión divinidad-humanidad.",
      "priority": "alta"
    },
    {
      "id": "fc-082",
      "chapterId": "cap9",
      "front": "Tipos de ciencia en Cristo hombre",
      "back": "Visión beatífica (permanente desde la concepción), ciencia infusa, ciencia adquirida o experimental.",
      "priority": "media"
    },
    {
      "id": "fc-083",
      "chapterId": "cap10",
      "front": "Definición de Redención",
      "back": "La ofrenda al Padre que Jesucristo hace de su propia vida humana, por amor al hombre, para satisfacer la deuda debida a la justicia divina, restaurarnos la gracia y el derecho al cielo, liberándonos de la esclavitud del pecado y del demonio.",
      "priority": "alta"
    },
    {
      "id": "fc-084",
      "chapterId": "cap10",
      "front": "Redención objetiva vs subjetiva",
      "back": "Objetiva: la obra redentora de Cristo, de alcance universal. Subjetiva: la realización en cada hombre, su aplicación = justificación, por el Bautismo.",
      "priority": "alta"
    },
    {
      "id": "fc-085",
      "chapterId": "cap10",
      "front": "Faceta negativa y positiva de la Redención",
      "back": "Negativa (en sentido estricto): liberación del señorío del pecado, demonio, muerte y de la ley mosaica ('rescate'). Positiva (Reconciliación): restauración del estado de unión sobrenatural con Dios por la gracia santificante.",
      "priority": "alta"
    },
    {
      "id": "fc-086",
      "chapterId": "cap10",
      "front": "Teoría de la Satisfacción Vicaria (autor)",
      "back": "San Anselmo (s. XI). El pecado es ultraje al honor de Dios. La satisfacción es el desagravio de ese honor. Solo Cristo (Dios y Hombre) podía dar una satisfacción adecuada (valor infinito).",
      "priority": "alta"
    },
    {
      "id": "fc-087",
      "chapterId": "cap10",
      "front": "Cristo en el Calvario fue al mismo tiempo...",
      "back": "Sumo Sacerdote y Víctima. La Víctima tiene valor infinito.",
      "priority": "alta"
    },
    {
      "id": "fc-088",
      "chapterId": "cap11",
      "front": "Significado del 'descenso a los infiernos'",
      "back": "Cristo se reveló a aquellos difuntos de todos los tiempos y pueblos que murieron en estado de unión con Dios pero a quienes estaba prohibido el acceso a la visión de Dios antes de su muerte. Fin: librar a las almas justas del limbo, aplicándoles los frutos de la redención.",
      "priority": "alta"
    },
    {
      "id": "fc-089",
      "chapterId": "cap11",
      "front": "Verdad de fe central de la Resurrección",
      "back": "Al tercer día después de su muerte, Cristo resucitó glorioso de entre los muertos. Es la verdad de fe fundamental del cristianismo.",
      "priority": "alta"
    },
    {
      "id": "fc-090",
      "chapterId": "cap11",
      "front": "Características de la Resurrección de Cristo",
      "back": "(i) Acontecimiento físico objetivo (mismo cuerpo). (ii) Resucitó por su propio poder. (iii) Para no morir jamás. (iv) Cuerpo glorioso con características preternaturales.",
      "priority": "alta"
    },
    {
      "id": "fc-091",
      "chapterId": "cap11",
      "front": "Las 3 'Huellas' de la Resurrección",
      "back": "1. Cristo murió verdaderamente (constatado). 2. El sepulcro vacío (hecho histórico irrefutable). 3. Las apariciones (encuentros objetivos; cambio de actitud de los apóstoles inexplicable de otro modo).",
      "priority": "alta"
    },
    {
      "id": "fc-092",
      "chapterId": "cap11",
      "front": "Verdad de fe de la Ascensión",
      "back": "Cristo subió en Cuerpo y Alma a los cielos por su propio poder, y está sentado a la derecha de Dios Padre Omnipotente. A los 40 días de la Resurrección.",
      "priority": "alta"
    },
    {
      "id": "fc-093",
      "chapterId": "cap11",
      "front": "Pentecostés (qué es y dónde se relata)",
      "back": "Descenso del Espíritu Santo sobre los apóstoles (Hch 2,1-5). En el NT el Espíritu Santo se revela claramente como Tercera Persona de la Trinidad.",
      "priority": "alta"
    },
    {
      "id": "fc-094",
      "chapterId": "cap11",
      "front": "Frase de San Agustín sobre el Espíritu Santo y la Iglesia",
      "back": "El Espíritu Santo es el principio vital interno, el alma invisible de la Iglesia visible.",
      "priority": "media"
    },
    {
      "id": "fc-095",
      "chapterId": "cap12",
      "front": "Inmaculada Concepción (definición y fecha)",
      "back": "Definida el 8 de diciembre de 1854 por Pío IX. María fue preservada de la mancha del pecado original por una gracia especial de Dios omnipotente en atención a los méritos de Jesucristo, salvador del género humano.",
      "priority": "alta"
    },
    {
      "id": "fc-096",
      "chapterId": "cap12",
      "front": "Maternidad Divina de María",
      "back": "María es verdadera Madre de Dios Hijo en cuanto a su Humanidad. Concibió y dio a luz a la segunda persona de la Trinidad, no en cuanto a su naturaleza divina, sino en cuanto a la naturaleza humana asumida.",
      "priority": "alta"
    },
    {
      "id": "fc-097",
      "chapterId": "cap12",
      "front": "Virginidad Perpetua de María",
      "back": "Virginal antes (concepción virginal del Espíritu Santo), durante (integridad corporal) y después del parto (toda su vida). Los 'hermanos de Jesús' son hijos de otra María, llamada 'la otra María' (Mt 27,56).",
      "priority": "alta"
    },
    {
      "id": "fc-098",
      "chapterId": "cap12",
      "front": "Asunción de María (definición y fecha)",
      "back": "Definida el 1 de noviembre de 1950 por Pío XII (Munificentissimus Deus, Dz 2333). La Santísima Virgen, poco después de su muerte y resurrección gloriosas, fue recibida en cuerpo y alma gloriosos en el cielo para siempre.",
      "priority": "alta"
    },
    {
      "id": "fc-099",
      "chapterId": "cap12",
      "front": "Diferencia entre Asunción y Ascensión",
      "back": "Cristo: Ascensión (subió por su propio poder divino). María: Asunción (fue arrebatada por el poder divino).",
      "priority": "alta"
    },
    {
      "id": "fc-100",
      "chapterId": "cap12",
      "front": "Tipos de culto",
      "back": "Latría (adoración, solo a Dios). Hiperdulía (a María por su dignidad de Madre de Dios). Dulía (veneración a ángeles y santos).",
      "priority": "alta"
    },
    {
      "id": "fc-101",
      "chapterId": "cap12",
      "front": "Características de María como Mediadora",
      "back": "Universal, Infalible, Solícita, Perpetua.",
      "priority": "media"
    },
    {
      "id": "fc-102",
      "chapterId": "cap13",
      "front": "Definición de Gracia",
      "back": "Don sobrenatural que Dios concede a la criatura racional por los méritos de Jesucristo, totalmente inmerecido por parte de la criatura, que hace al hombre hijo de Dios y heredero del Cielo. Es participación en la vida de Dios.",
      "priority": "alta"
    },
    {
      "id": "fc-103",
      "chapterId": "cap13",
      "front": "Diferencia entre gracia habitual y gracia actual",
      "back": "Habitual (santificante): cualidad permanente y sobrenatural del alma que santifica intrínsecamente. Actual: influjo sobrenatural y transitorio sobre las potencias del alma para alguna acción saludable.",
      "priority": "alta"
    },
    {
      "id": "fc-104",
      "chapterId": "cap13",
      "front": "Las 3 virtudes teologales",
      "back": "Fe, Esperanza y Caridad.",
      "priority": "alta"
    },
    {
      "id": "fc-105",
      "chapterId": "cap13",
      "front": "Las 4 virtudes morales (cardinales)",
      "back": "Prudencia, Templanza, Fortaleza y Justicia.",
      "priority": "alta"
    },
    {
      "id": "fc-106",
      "chapterId": "cap13",
      "front": "Los 7 Dones del Espíritu Santo",
      "back": "Sabiduría, Ciencia, Entendimiento, Consejo, Fortaleza, Piedad, Temor de Dios.",
      "priority": "alta",
      "mnemonic": "SaCi-EnCo-FoPiTe: 'Sabios Científicos Entienden Consejos / Fortes Piadosos Temen'"
    },
    {
      "id": "fc-107",
      "chapterId": "cap13",
      "front": "Error naturalista sobre la gracia",
      "back": "Optimismo ético ilimitado y desmedida confianza en la naturaleza humana. El estado de Adán antes y después del pecado no se diferencian esencialmente. El hombre puede merecer la vida eterna con sus solas fuerzas.",
      "priority": "alta"
    },
    {
      "id": "fc-108",
      "chapterId": "cap13",
      "front": "Error sobrenaturalista (protestantismo) sobre la gracia",
      "back": "La naturaleza humana está totalmente corrupta (no solo herida). Justificación por sola fides. El hombre permanece a la vez justo y pecador. No hay renovación de la naturaleza.",
      "priority": "alta"
    },
    {
      "id": "fc-109",
      "chapterId": "cap13",
      "front": "Voluntad salvífica universal de Dios (cita)",
      "back": "Dios quiere la salvación de todos los hombres sin hacerles violencia (I Tim 2,4). A ningún hombre le falta jamás la gracia necesaria y suficiente para salvarse.",
      "priority": "alta"
    },
    {
      "id": "fc-110",
      "chapterId": "cap13",
      "front": "Dos condiciones para merecer",
      "back": "(1) Estar en estado de peregrinación terrenal (in statu viae). (2) Estar en estado de gracia.",
      "priority": "alta"
    },
    {
      "id": "fc-111",
      "chapterId": "cap13",
      "front": "Definición de Pecado",
      "back": "Transgresión voluntaria de la ley de Dios. (CATIC 1849: falta contra la razón, la verdad, la conciencia recta; faltar al amor verdadero para con Dios y para con el prójimo, a causa de un apego perverso a ciertos bienes.)",
      "priority": "alta"
    },
    {
      "id": "fc-112",
      "chapterId": "cap13",
      "front": "Las 3 condiciones del pecado",
      "back": "(1) Materia prohibida (grave o leve). (2) Advertencia (la inteligencia advierte que es malo). (3) Consentimiento (la voluntad acepta libremente).",
      "priority": "alta"
    },
    {
      "id": "fc-113",
      "chapterId": "cap13",
      "front": "Pecado mortal",
      "back": "Transgresión voluntaria de la ley de Dios EN MATERIA GRAVE, con plena advertencia y perfecto consentimiento. Separa al hombre de Dios y hace perder la gracia santificante.",
      "priority": "alta"
    },
    {
      "id": "fc-114",
      "chapterId": "cap13",
      "front": "Pecado venial",
      "back": "Transgresión voluntaria de la ley de Dios en materia leve. Venial viene de venia (perdón). No supone aversión a Dios, solo desviación del recto camino.",
      "priority": "alta"
    },
    {
      "id": "fc-115",
      "chapterId": "cap13",
      "front": "Frase de San Agustín sobre el pecado",
      "back": "El pecado es la aversión a Dios y la conversión a la criatura.",
      "priority": "alta"
    },
    {
      "id": "fc-116",
      "chapterId": "cap13",
      "front": "Las 3 fuentes de tentación",
      "back": "El demonio, la propia carne, el mundo.",
      "priority": "alta"
    },
    {
      "id": "fc-117",
      "chapterId": "cap14",
      "front": "Origen de la Iglesia",
      "back": "Es una institución de origen divino. No viene de abajo (los hombres) sino de arriba. Cristo la fundó. 'Nunca existió cristianismo sin Iglesia.'",
      "priority": "alta"
    },
    {
      "id": "fc-118",
      "chapterId": "cap14",
      "front": "Definición de Iglesia",
      "back": "La comunidad de todos los bautizados, cuyo vínculo es la misma fe, con un gobierno unitario instituido por Cristo.",
      "priority": "alta"
    },
    {
      "id": "fc-119",
      "chapterId": "cap14",
      "front": "Nombres y figuras de la Iglesia",
      "back": "(1) Pueblo de Dios (nuevo, fundado en la nueva alianza por la sangre de Cristo). (2) Cuerpo Místico de Cristo (Cristo cabeza invisible, Papa cabeza visible, Espíritu Santo alma). (3) Templo del Espíritu Santo.",
      "priority": "alta"
    },
    {
      "id": "fc-120",
      "chapterId": "cap14",
      "front": "Propiedades esenciales de la Iglesia",
      "back": "Indefectibilidad (no puede corromperse ni desaparecer hasta el fin del mundo), Infalibilidad (asistencia del Espíritu Santo), Visibilidad (sociedad visible y organizada).",
      "priority": "alta"
    },
    {
      "id": "fc-121",
      "chapterId": "cap14",
      "front": "Condiciones de la infalibilidad papal (ex cathedra)",
      "back": "(1) Habla como pastor y doctor de todos los fieles. (2) Sobre materia de fe y costumbres. (3) Con intención de definirla como doctrina de fe. (4) Con intención de obligar a toda la Iglesia.",
      "priority": "alta"
    },
    {
      "id": "fc-122",
      "chapterId": "cap14",
      "front": "Las 4 notas distintivas de la Iglesia",
      "back": "Una, Santa, Católica y Apostólica.",
      "priority": "alta",
      "mnemonic": "USCA - 'Una Santa Católica Apostólica' (orden del Credo)"
    },
    {
      "id": "fc-123",
      "chapterId": "cap14",
      "front": "Tipos de unidad en la Iglesia",
      "back": "(1) De fe (mismas verdades). (2) De comunión (sujeción al Papa y obispos). (3) De participación (mismo culto y sacramentos).",
      "priority": "alta"
    },
    {
      "id": "fc-124",
      "chapterId": "cap14",
      "front": "Diferencia entre herejía y cisma",
      "back": "Herejía: rompe la unidad de fe (negar pertinazmente una verdad de fe definida). Cisma: rompe la unidad de comunión (rechazar la sujeción al Papa, ej. Iglesia Ortodoxa).",
      "priority": "alta"
    },
    {
      "id": "fc-125",
      "chapterId": "cap14",
      "front": "Catolicidad (significado)",
      "back": "Del griego katholikos = universal. La Iglesia está destinada a todos los hombres de todos los tiempos y lugares.",
      "priority": "alta"
    },
    {
      "id": "fc-126",
      "chapterId": "cap14",
      "front": "Apostolicidad",
      "back": "Continuidad ininterrumpida con los Apóstoles elegidos por Cristo. La sucesión apostólica garantiza la transmisión fiel de la doctrina y la validez de los sacramentos.",
      "priority": "alta"
    },
    {
      "id": "fc-127",
      "chapterId": "cap14",
      "front": "Tres requisitos para ser miembro pleno de la Iglesia",
      "back": "(1) Haber recibido válidamente el bautismo. (2) Profesar la verdadera fe. (3) Estar en comunión con la Iglesia (no separado por herejía ni cisma).",
      "priority": "alta"
    },
    {
      "id": "fc-128",
      "chapterId": "cap14",
      "front": "Iglesia como sacramento universal de salvación",
      "back": "Solo ella realiza la salvación de Cristo en el mundo. Es la prolongación sacramental de Cristo. Causa instrumental de la salvación (movida por el agente principal que es Cristo).",
      "priority": "alta"
    }
  ]
}
```

---

## CHULETA — Bloques de contenido condensado

> Formato: `{ id, chapterId, type, title, content, mnemonic? }`. `type` puede ser `definition`, `table`, `list`, `quote`, `comparison`.

```json
{
  "cheatsheet": [
    {
      "id": "ch-001",
      "chapterId": "cap1",
      "type": "list",
      "title": "Grados de certeza teológica (de mayor a menor)",
      "content": [
        "Dogma de Fe — definida por Magisterio infalible (Papa ex cathedra o Concilio Universal)",
        "Verdad próxima a la Fe — casi universalmente revelada, no definida",
        "Sentencia teológicamente cierta — conexión íntima con doctrina revelada",
        "Sentencia común — sostenida por todos los teólogos",
        "Sentencias probables — opiniones piadosas",
        "Sentencia tolerada — grado ínfimo, débiles argumentos"
      ]
    },
    {
      "id": "ch-002",
      "chapterId": "cap1",
      "type": "list",
      "title": "4 fuentes de la Teología",
      "content": [
        "Sagrada Escritura",
        "Tradición",
        "Magisterio (solemne y ordinario)",
        "Razón iluminada por la Fe"
      ]
    },
    {
      "id": "ch-003",
      "chapterId": "cap3",
      "type": "table",
      "title": "Las 5 Vías de Santo Tomás",
      "content": {
        "headers": ["#", "Punto de partida", "Conclusión"],
        "rows": [
          ["1ª", "Movimiento", "Primer Motor inmóvil"],
          ["2ª", "Causas eficientes", "Causa primera incausada"],
          ["3ª", "Contingencia", "Ser necesario"],
          ["4ª", "Grados de perfección", "Ser máximamente perfecto"],
          ["5ª", "Orden y finalidad", "Ser inteligente que dirige todo a un fin"]
        ]
      },
      "mnemonic": "MO-CA-CO-PE-OR (Movimiento, Causa, Contingencia, Perfección, Orden)"
    },
    {
      "id": "ch-004",
      "chapterId": "cap4",
      "type": "table",
      "title": "Tradiciones del Pentateuco",
      "content": {
        "headers": ["Tradición", "Época", "Característica clave"],
        "rows": [
          ["Yahvista (J)", "S. X a.C., reinado de Salomón", "Llama a Dios 'Yahveh'. Narrativo, vivo"],
          ["Elohísta (E)", "S. IX-VIII a.C., reino del Norte", "Llama a Dios 'Elohim'. Sobrio. Trascendencia"],
          ["Deuteronomista (D)", "Edición definitiva en el exilio (587-538 a.C.)", "Estilo amplio y oratorio. Elección de Israel"],
          ["Sacerdotal (P)", "Exilio en Babilonia, s. VI a.C.", "Abstracto, legislativo, genealogías y fiestas"]
        ]
      },
      "mnemonic": "JEDP por antigüedad: 'Jefe Está Diciendo Pavadas'"
    },
    {
      "id": "ch-005",
      "chapterId": "cap5",
      "type": "list",
      "title": "Atributos de Dios",
      "content": [
        "ENTITATIVOS (10): Perfección, Infinitud, Simplicidad, Unicidad, Verdad, Bondad, Inmutabilidad, Eternidad, Inmensidad, Omnipresencia",
        "OPERATIVOS (2): Inteligencia divina y Voluntad divina"
      ],
      "mnemonic": "PIS-UV-BIE-IO para entitativos"
    },
    {
      "id": "ch-006",
      "chapterId": "cap6",
      "type": "table",
      "title": "Herejías antitrinitarias y cristológicas",
      "content": {
        "headers": ["Herejía", "Error", "Concilio"],
        "rows": [
          ["Monarquismo dinámico (Adopcionismo)", "Cristo es puro hombre, recibe poder divino en el bautismo", "—"],
          ["Modalismo (Sabelianismo)", "Padre/Hijo/E.S. son tres modos del único Dios, no tres Personas", "—"],
          ["Subordinacionismo", "Hijo y Espíritu Santo son inferiores al Padre", "—"],
          ["Arrianismo", "Jesús es la primera criatura, no eterno ni consubstancial", "Nicea (325)"],
          ["Macedonianismo", "El Espíritu Santo es una criatura subordinada", "—"],
          ["Triteísmo", "Tres Personas = tres individuos distintos (tres dioses)", "—"],
          ["Nestorianismo", "Dos personas en Cristo, unidas solo moralmente", "Éfeso (431)"],
          ["Monofisismo", "Una sola persona Y una sola naturaleza en Cristo", "Calcedonia (451)"]
        ]
      },
      "mnemonic": "MoMoSubAr / MaTriNeMo (orden de la tabla)"
    },
    {
      "id": "ch-007",
      "chapterId": "cap8",
      "type": "list",
      "title": "9 Coros de Ángeles (Pseudo-Dionisio)",
      "content": [
        "1ª Jerarquía (más cerca de Dios): Tronos, Querubines, Serafines",
        "2ª Jerarquía: Potestades, Dominaciones, Virtudes",
        "3ª Jerarquía (más cerca de los hombres): Ángeles, Arcángeles, Principados"
      ],
      "mnemonic": "TQS-PDV-AAP"
    },
    {
      "id": "ch-008",
      "chapterId": "cap8",
      "type": "table",
      "title": "Los 4 estados de la naturaleza humana",
      "content": {
        "headers": ["Estado", "Quiénes", "Dones"],
        "rows": [
          ["Justicia original", "Antes del pecado", "Naturales + preternaturales + sobrenaturales"],
          ["Naturaleza caída", "Tras pecado de Adán, sin redención", "Naturales heridos. Sin gracia ni preternaturales"],
          ["Naturaleza redimida", "Bautizados", "Naturales (heridos) + gracia santificante. SIN preternaturales"],
          ["Naturaleza glorificada", "Bienaventurados", "Gracia en plenitud, visión beatífica"]
        ]
      }
    },
    {
      "id": "ch-009",
      "chapterId": "cap8",
      "type": "list",
      "title": "Heridas de los dones naturales tras el pecado original",
      "content": [
        "Ignorancia y error → afecta a la INTELIGENCIA",
        "Malicia → afecta a la VOLUNTAD",
        "Fragilidad/debilidad → afecta al APETITO IRASCIBLE",
        "Concupiscencia desordenada → afecta al APETITO CONCUPISCIBLE"
      ]
    },
    {
      "id": "ch-010",
      "chapterId": "cap10",
      "type": "comparison",
      "title": "Redención: facetas y modos",
      "content": {
        "items": [
          { "label": "Objetiva", "description": "La obra de Cristo en sí, alcance universal" },
          { "label": "Subjetiva (= Justificación)", "description": "Aplicación a cada hombre por el Bautismo" },
          { "label": "Faceta negativa (Rescate)", "description": "Liberación del pecado, demonio, muerte, ley mosaica" },
          { "label": "Faceta positiva (Reconciliación)", "description": "Restauración de la unión con Dios por la gracia" }
        ]
      }
    },
    {
      "id": "ch-011",
      "chapterId": "cap12",
      "type": "table",
      "title": "Dogmas marianos (4)",
      "content": {
        "headers": ["Dogma", "Fecha", "Papa"],
        "rows": [
          ["Maternidad Divina", "Concilio de Éfeso, 431", "—"],
          ["Virginidad Perpetua", "Tradición / Concilios antiguos", "—"],
          ["Inmaculada Concepción", "8 de diciembre de 1854", "Pío IX"],
          ["Asunción a los cielos", "1 de noviembre de 1950", "Pío XII (Munificentissimus Deus)"]
        ]
      }
    },
    {
      "id": "ch-012",
      "chapterId": "cap12",
      "type": "list",
      "title": "Tipos de culto",
      "content": [
        "LATRÍA — adoración. SOLO a Dios",
        "HIPERDULÍA — culto especial a María por su Maternidad Divina",
        "DULÍA — veneración a ángeles y santos"
      ]
    },
    {
      "id": "ch-013",
      "chapterId": "cap13",
      "type": "list",
      "title": "Las 7 virtudes y los 7 dones del Espíritu Santo",
      "content": [
        "VIRTUDES TEOLOGALES (3): Fe, Esperanza, Caridad",
        "VIRTUDES MORALES/CARDINALES (4): Prudencia, Templanza, Fortaleza, Justicia",
        "DONES DEL E.S. (7): Sabiduría, Ciencia, Entendimiento, Consejo, Fortaleza, Piedad, Temor de Dios"
      ],
      "mnemonic": "Dones: SaCi-EnCo-FoPiTe"
    },
    {
      "id": "ch-014",
      "chapterId": "cap13",
      "type": "comparison",
      "title": "Pecado mortal vs venial",
      "content": {
        "items": [
          { "label": "Pecado mortal", "description": "Materia GRAVE + plena advertencia + perfecto consentimiento. Pierde la gracia santificante. Aversión a Dios." },
          { "label": "Pecado venial", "description": "Materia LEVE. No supone aversión a Dios, solo desviación. 'Venial' viene de venia (perdón)." }
        ]
      }
    },
    {
      "id": "ch-015",
      "chapterId": "cap14",
      "type": "list",
      "title": "Las 4 notas de la Iglesia (Credo)",
      "content": [
        "UNA (unidad de fe, comunión, participación)",
        "SANTA (en su origen, fin y medios)",
        "CATÓLICA (universal, para todos los hombres y tiempos)",
        "APOSTÓLICA (sucesión apostólica continua)"
      ],
      "mnemonic": "USCA"
    },
    {
      "id": "ch-016",
      "chapterId": "cap14",
      "type": "table",
      "title": "Pecados contra la unidad de la Iglesia",
      "content": {
        "headers": ["Pecado", "Unidad rota", "Ejemplo"],
        "rows": [
          ["Herejía", "De fe (negación pertinaz de verdad de fe definida)", "Negar la Inmaculada Concepción"],
          ["Cisma", "De comunión (rechazo de sujeción al Papa)", "Iglesia Ortodoxa"]
        ]
      }
    }
  ]
}
```

---

## BANCO DE PREGUNTAS

> Formato: `{ id, chapterId, type, question, answer, priority, points? }`. `type`: `corta` (1-2 oraciones) o `desarrollo` (varios párrafos).

```json
{
  "questions": [
    {
      "id": "q-001",
      "chapterId": "cap1",
      "type": "corta",
      "question": "Defina qué es la Teología y mencione su finalidad.",
      "answer": "La Teología es el conocimiento científico de la Revelación divina a los hombres, y de su credibilidad. Etimológicamente proviene del griego theós (Dios) y logos (tratado). Su finalidad es conocer y amar cada vez más a Dios; su fin último es la salvación del hombre.",
      "priority": "alta"
    },
    {
      "id": "q-002",
      "chapterId": "cap1",
      "type": "corta",
      "question": "¿Cuáles son las cuatro fuentes de la Teología?",
      "answer": "Las cuatro fuentes son: (1) la Sagrada Escritura, (2) la Tradición, (3) el Magisterio de la Iglesia (solemne y ordinario) y (4) la Razón iluminada por la Fe.",
      "priority": "alta"
    },
    {
      "id": "q-003",
      "chapterId": "cap1",
      "type": "desarrollo",
      "question": "Enumere y explique los grados de certeza teológica.",
      "answer": "Los grados, ordenados de mayor a menor certeza, son: (1) Dogma de Fe: verdad definida por el Magisterio infalible, sea por el Papa hablando ex cathedra o por un Concilio Universal. (2) Verdad próxima a la Fe: casi universalmente considerada como revelada, aunque no definida definitivamente. (3) Sentencia teológicamente cierta: garantizada por su íntima conexión con la doctrina revelada. (4) Sentencia común: sostenida generalmente por todos los teólogos. (5) Sentencias probables: opiniones teológicas con piedad. (6) Sentencia tolerada: grado ínfimo, con argumentos débiles, simplemente tolerada por la Iglesia.",
      "priority": "alta"
    },
    {
      "id": "q-004",
      "chapterId": "cap2",
      "type": "corta",
      "question": "Defina la Fe sobrenatural e indique cuál es su objeto formal.",
      "answer": "La Fe es una virtud sobrenatural por la que el hombre cree firmemente lo que Dios ha revelado y la Iglesia enseña como tal. Su objeto formal es la autoridad de Dios mismo que revela, no la evidencia intelectual.",
      "priority": "alta"
    },
    {
      "id": "q-005",
      "chapterId": "cap2",
      "type": "desarrollo",
      "question": "Explique la relación entre Fe y razón según la doctrina católica, contrastándola con el fideísmo y el racionalismo.",
      "answer": "La doctrina católica sostiene que la Fe es superior a la razón pero no contraria a ella. San Agustín lo expresó: 'creo para comprender y comprendo para creer mejor'. Juan Pablo II en la encíclica Fides et Ratio (1998) afirmó que la Fe y la razón son como las dos alas con las cuales el espíritu humano se eleva hacia la contemplación de la verdad. La Fe supone la razón, y la razón es sanada y elevada por la Fe. El fideísmo, asociado a Lutero, da primacía absoluta a la Fe sobre la razón. El racionalismo, en cambio, da primacía absoluta a la razón sobre la Fe. La solución católica es la armonía entre ambas, con subordinación de la razón a la Fe.",
      "priority": "alta"
    },
    {
      "id": "q-006",
      "chapterId": "cap3",
      "type": "desarrollo",
      "question": "Enumere las cinco vías de Santo Tomás de Aquino, indicando el punto de partida y la conclusión de cada una.",
      "answer": "Las cinco vías parten todas del esquema: hecho evidente, principio de causalidad, imposibilidad de regresión infinita, Primera Causa = Dios. (1ª) Movimiento en el mundo, concluye en un Primer Motor no movido por nada. (2ª) Causas eficientes subordinadas, concluye en una Causa eficiente primera incausada. (3ª) Seres contingentes, concluye en un Ser necesario. (4ª) Perfecciones limitadas, concluye en un Ser máximamente perfecto. (5ª) Orden y finalidad de las cosas, concluye en un Ser inteligente que dirige todo a un fin.",
      "priority": "alta"
    },
    {
      "id": "q-007",
      "chapterId": "cap3",
      "type": "corta",
      "question": "¿Qué dogma definió el Concilio Vaticano I sobre el conocimiento de Dios?",
      "answer": "El Concilio Vaticano I (1869) definió como dogma de fe católica que Dios puede ser conocido con certeza por la razón natural, mediante el lumen rationis.",
      "priority": "alta"
    },
    {
      "id": "q-008",
      "chapterId": "cap3",
      "type": "corta",
      "question": "Explique la respuesta filosófica al problema del mal.",
      "answer": "El mal no es un ser positivo sino una privación del bien (privatio boni). Por eso su existencia presupone la del bien y, en última instancia, la de Dios como bien supremo. Existe también una respuesta sobrenatural: el misterio del Dolor Redentor solo se comprende contemplando al Dios crucificado.",
      "priority": "alta"
    },
    {
      "id": "q-009",
      "chapterId": "cap4",
      "type": "desarrollo",
      "question": "Defina la Sagrada Escritura y explique los conceptos de inspiración, canonicidad e inerrancia.",
      "answer": "La Sagrada Escritura es un conjunto de libros que tiene a Dios como Autor principal y al hombre que escribe como autor secundario o causa instrumental, y que contiene lo esencial de la Revelación divina a los hombres para su eterna salvación. La INSPIRACIÓN es la gracia del Espíritu Santo por la cual el escritor sagrado, llamado hagiógrafo, es movido a poner por escrito lo que Dios quiere comunicar; Dios respeta las capacidades del autor y no le dicta. La CANONICIDAD se refiere al catálogo oficial de los libros inspirados (del griego kanon, regla); la Biblia católica tiene 73 libros (46 del AT y 27 del NT), canon fijado por el Concilio de Trento el 8 de abril de 1546. La INERRANCIA es la ausencia de error en lo referente a la salvación del hombre, conforme a Jn 10,35: 'la Escritura no puede fallar'.",
      "priority": "alta"
    },
    {
      "id": "q-010",
      "chapterId": "cap4",
      "type": "desarrollo",
      "question": "Mencione las cuatro tradiciones del Pentateuco con sus características.",
      "answer": "(1) YAHVISTA (J): siglo X a.C., durante el reinado de Salomón. Llama a Dios 'Yahveh'. Estilo narrativo, pintoresco y vivo. Ejemplo: Gn 2,4b-25. (2) ELOHÍSTA (E): siglos IX-VIII a.C., en el reino del Norte. Llama a Dios 'Elohim'. Más sobrio, destaca la trascendencia divina. (3) DEUTERONOMISTA (D): edición definitiva durante el exilio (587-538 a.C.). Estilo amplio y oratorio, con énfasis en la elección de Israel. (4) SACERDOTAL (P): exilio en Babilonia, siglo VI a.C. Estilo abstracto, redundante y legislativo, con genealogías y fiestas. Ejemplo: Gn 1,1-2,4a.",
      "priority": "alta"
    },
    {
      "id": "q-011",
      "chapterId": "cap4",
      "type": "corta",
      "question": "¿Qué es la Tradición y qué relación tiene con la Sagrada Escritura?",
      "answer": "La Sagrada Tradición es la transmisión oral de la verdad revelada que, a partir de lo dicho y obrado por Jesús, iniciaron los Apóstoles y que perdura ininterrumpidamente en la Iglesia bajo la asistencia del Espíritu Santo. La Sagrada Escritura no puede ser entendida cabalmente al margen de la Tradición. Contra el sola scriptura protestante, la propia Escritura afirma la Tradición (II Tes 2,15; I Cor 11,2).",
      "priority": "alta"
    },
    {
      "id": "q-012",
      "chapterId": "cap5",
      "type": "corta",
      "question": "¿Qué son los atributos divinos y cómo se clasifican?",
      "answer": "Los atributos son perfecciones que, según nuestro modo analógico de pensar, brotan de la esencia metafísica de Dios. Se dividen en: (1) Entitativos, que aluden al ser de Dios (Perfección, Infinitud, Simplicidad, Unicidad, Verdad, Bondad, Inmutabilidad, Eternidad, Inmensidad, Omnipresencia); y (2) Operativos, que aluden al obrar de Dios (Inteligencia divina y Voluntad divina).",
      "priority": "alta"
    },
    {
      "id": "q-013",
      "chapterId": "cap5",
      "type": "corta",
      "question": "Defina la eternidad de Dios según Boecio.",
      "answer": "La definición clásica de Boecio establece que la eternidad es la posesión total, simultánea y perfecta de una vida interminable. Es duración sin principio ni fin, sin antes ni después.",
      "priority": "media"
    },
    {
      "id": "q-014",
      "chapterId": "cap6",
      "type": "desarrollo",
      "question": "Exponga la doctrina católica sobre la Santísima Trinidad.",
      "answer": "La definición dogmática establece que en Dios hay tres personas (Padre, Hijo y Espíritu Santo), y cada una posee la esencia divina que es numéricamente la misma. Dios es uno y único en naturaleza, y trino en personas. Las tres Personas divinas tienen unidad e identidad en la única sustancia divina, hay real distinción entre ellas pero no son tres dioses sino un solo Dios. En Dios se dan solo dos procesiones inmanentes ad intra: la generación del Hijo (procede del Padre por generación intelectual) y la procesión del Espíritu Santo (procede del Padre y del Hijo, filioque, como de un solo principio de espiración activa). El dogma fue proclamado en el Concilio I de Nicea (325) y en el Símbolo niceno-constantinopolitano (325 y 381). Es un misterio en sentido estricto pero no antirracional.",
      "priority": "alta"
    },
    {
      "id": "q-015",
      "chapterId": "cap6",
      "type": "desarrollo",
      "question": "Enumere y explique las principales herejías antitrinitarias y cristológicas.",
      "answer": "(1) MONARQUISMO DINÁMICO o ADOPCIONISMO: Cristo es puro hombre dotado de un poder divino especial recibido en el bautismo, y pierde la divinidad en la crucifixión. (2) MODALISMO o SABELIANISMO: Padre, Hijo y Espíritu Santo son tres modos de aparición del único Dios, no tres Personas reales. (3) SUBORDINACIONISMO: las Personas Segunda y Tercera son inferiores al Padre y no consubstanciales. (4) ARRIANISMO: Jesús es la primera criatura, más noble que los ángeles, pero no eterno ni consubstancial al Padre; condenado en el Concilio de Nicea (325). (5) MACEDONIANISMO: el Espíritu Santo era una criatura, un ser espiritual subordinado. (6) TRITEÍSMO: las tres Personas son tres individuos distintos, como tres hombres de la misma especie. (7) NESTORIANISMO: a Jesús (hijo de María) solo lo une el Logos divino una unión moral; afirma dos personas y dos naturalezas; condenado en el Concilio de Éfeso (431). (8) MONOFISISMO: una sola persona y una sola naturaleza, las dos naturalezas se fusionan o la humana queda absorbida por la divina; condenado en el Concilio de Calcedonia (451).",
      "priority": "alta"
    },
    {
      "id": "q-016",
      "chapterId": "cap7",
      "type": "corta",
      "question": "Defina la creación y explique qué significa que es 'de la nada'.",
      "answer": "La creación es la primera producción de todo el ser, hecha de la nada por la causa universal, que es Dios (Royo Marín). 'De la nada' (ex nihilo) significa sin ninguna materia preexistente. Es un acto tan propio y exclusivo de Dios que ni por milagro podría transferirlo a ninguna criatura.",
      "priority": "alta"
    },
    {
      "id": "q-017",
      "chapterId": "cap7",
      "type": "corta",
      "question": "Mencione los principales errores contrarios a la doctrina de la creación.",
      "answer": "Los principales errores son: (1) Gnosticismo (el mundo fue creado por una divinidad secundaria), (2) Dualismo (dos principios eternos, bueno y malo), (3) Materialismo o Monismo materialista, y (4) Panteísmo (identificación de Dios con el universo).",
      "priority": "alta"
    },
    {
      "id": "q-018",
      "chapterId": "cap8",
      "type": "desarrollo",
      "question": "Explique los cuatro estados de la naturaleza humana.",
      "answer": "(1) ESTADO DE JUSTICIA ORIGINAL o de santidad original: el de los primeros padres antes del pecado, con todos los dones (naturales, preternaturales y sobrenaturales). (2) ESTADO DE NATURALEZA CAÍDA o de pecado original: tras el pecado de Adán; el hombre queda sin gracia santificante ni dones preternaturales, y los dones naturales quedan heridos por la ignorancia, la malicia, la fragilidad y la concupiscencia desordenada. (3) ESTADO DE NATURALEZA REDIMIDA o reparada: restaurado por la gracia redentora de Cristo; el hombre posee la gracia santificante pero no los dones preternaturales. (4) ESTADO DE NATURALEZA GLORIFICADA: el de quienes ya alcanzaron la visión beatífica; comprende la gracia santificante en toda su perfección.",
      "priority": "alta"
    },
    {
      "id": "q-019",
      "chapterId": "cap8",
      "type": "corta",
      "question": "¿En qué consistió el pecado original y cuáles fueron sus consecuencias en los dones naturales?",
      "answer": "El pecado original consistió en querer el hombre una total autonomía respecto a la determinación del bien y del mal (autonomía moral), sustrayendo a Dios la autoridad para determinarlos. Sus consecuencias en los dones naturales fueron cuatro heridas: ignorancia y error (en la inteligencia), malicia (en la voluntad), fragilidad o debilidad (en el apetito irascible) y concupiscencia desordenada (en el apetito concupiscible).",
      "priority": "alta"
    },
    {
      "id": "q-020",
      "chapterId": "cap9",
      "type": "desarrollo",
      "question": "Explique el misterio de la Encarnación y la Unión Hipostática.",
      "answer": "La Encarnación es el hecho de que el Hijo de Dios haya asumido una naturaleza humana (Jn 1,14: 'la Palabra se hizo carne'). Hay modificación en la naturaleza humana asumida, pero no en Dios. Su finalidad primordial es la salvación de los hombres y, como fin ulterior, la glorificación de Dios. La UNIÓN HIPOSTÁTICA (del griego hipóstasis = persona) significa que en Cristo hay una sola persona, la segunda persona divina, y dos naturalezas que subsisten (divina y humana), que no se confunden ni se mezclan. Fue proclamada en el Concilio de Éfeso (431), que afirmó la unidad de persona contra Nestorio, y en el Concilio de Calcedonia (451), que definió la dualidad de naturaleza y la unicidad de persona. La unión comenzó en el instante de la concepción en el seno virginal de María y nunca se interrumpió: la muerte de Cristo rompió la unión de su cuerpo y su alma, pero no rompió la unión entre su divinidad y su humanidad.",
      "priority": "alta"
    },
    {
      "id": "q-021",
      "chapterId": "cap10",
      "type": "desarrollo",
      "question": "Defina la Redención y explique sus dos facetas.",
      "answer": "La Redención es la ofrenda al Padre que Jesucristo hace de su propia vida humana, por amor al hombre, para satisfacer la deuda debida a la justicia divina, restaurarnos la gracia y el derecho al cielo, liberándonos de la esclavitud del pecado y del demonio. Tiene dos facetas: (1) la NEGATIVA o Redención en sentido estricto, que es la liberación del señorío del pecado, del demonio, de la muerte y de la esclavitud de la ley mosaica (rescate); (2) la POSITIVA o Reconciliación, que es la restauración del estado de unión sobrenatural con Dios causado por la gracia santificante. También se distingue entre redención objetiva (la obra de Cristo, de alcance universal) y subjetiva (la justificación, su aplicación a cada hombre por el Bautismo). Según San Anselmo, el pecado es ultraje al honor de Dios y solo Cristo, Dios y Hombre, podía dar una satisfacción adecuada de valor infinito.",
      "priority": "alta"
    },
    {
      "id": "q-022",
      "chapterId": "cap11",
      "type": "corta",
      "question": "Mencione las tres 'huellas' o pruebas de la Resurrección.",
      "answer": "(1) Cristo murió verdaderamente, hecho constatado por San Juan testigo ocular y por Pilato; (2) el sepulcro vacío, hecho histórico irrefutable que ni los enemigos pudieron impugnar, y que solo intentaron explicar por el robo del cuerpo; (3) las apariciones del Resucitado, encuentros objetivos con el Señor que explican el cambio de actitud de los apóstoles, inexplicable de otro modo.",
      "priority": "alta"
    },
    {
      "id": "q-023",
      "chapterId": "cap12",
      "type": "desarrollo",
      "question": "Enumere y explique los dogmas marianos.",
      "answer": "(1) MATERNIDAD DIVINA: María es verdadera Madre de Dios Hijo en cuanto a su Humanidad. Concibió y dio a luz a la segunda persona de la Santísima Trinidad, no en cuanto a su naturaleza divina sino a la humana asumida. Definida en el Concilio de Éfeso (431). (2) VIRGINIDAD PERPETUA: María concibió sin principio masculino por virtud del Espíritu Santo, dio a luz sin pérdida de su integridad corporal y permaneció virgen toda su vida. Los 'hermanos de Jesús' son hijos de otra María llamada 'la otra María' (Mt 27,56). (3) INMACULADA CONCEPCIÓN: definida el 8 de diciembre de 1854 por Pío IX. María fue preservada de la mancha del pecado original por una gracia especial de Dios omnipotente en atención a los méritos de Jesucristo, salvador del género humano (redención preservativa). (4) ASUNCIÓN: definida el 1 de noviembre de 1950 por Pío XII (Munificentissimus Deus, Dz 2333). La Santísima Virgen, poco después de su muerte y resurrección gloriosas, fue recibida en cuerpo y alma gloriosos en el cielo. Se dice 'asunción' (no 'ascensión') porque María fue arrebatada por el poder divino, mientras que Cristo subió por su propio poder.",
      "priority": "alta"
    },
    {
      "id": "q-024",
      "chapterId": "cap12",
      "type": "corta",
      "question": "Explique los tres tipos de culto y a quién corresponde cada uno.",
      "answer": "(1) LATRÍA: culto de adoración, debido únicamente a Dios. (2) HIPERDULÍA: culto especial debido a la Virgen María por su dignidad de Madre de Dios y su plenitud de gracia, esencialmente inferior a la latría pero superior en grado a la dulía. (3) DULÍA: culto de veneración debido a los ángeles y a todos los demás santos.",
      "priority": "alta"
    },
    {
      "id": "q-025",
      "chapterId": "cap13",
      "type": "desarrollo",
      "question": "Defina la gracia y explique los tipos principales con sus efectos.",
      "answer": "La gracia es un don sobrenatural que Dios concede a la criatura racional por los méritos de Jesucristo, totalmente inmerecido por parte de la criatura, que hace al hombre hijo de Dios y heredero del Cielo. Es una participación en la vida de Dios. Hay dos tipos: (1) GRACIA HABITUAL O SANTIFICANTE: cualidad permanente y sobrenatural del alma que la santifica intrínsecamente. Sus efectos son hacer al alma justa y santa, borrar el pecado mortal, hacer al hombre amigo de Dios, hijo adoptivo, hermano de Jesucristo, partícipe de la vida divina, templo de la Santísima Trinidad, heredero del cielo; y dar valor y mérito sobrenatural a los actos. (2) GRACIA ACTUAL: influjo sobrenatural y transitorio de Dios sobre las potencias del alma para realizar alguna acción saludable; tiende a la consecución, acrecentamiento o conservación de la gracia santificante. Junto a la gracia santificante van las tres virtudes teologales (fe, esperanza, caridad), las cuatro virtudes morales (prudencia, templanza, fortaleza, justicia) y los siete dones del Espíritu Santo (sabiduría, ciencia, entendimiento, consejo, fortaleza, piedad, temor de Dios).",
      "priority": "alta"
    },
    {
      "id": "q-026",
      "chapterId": "cap13",
      "type": "desarrollo",
      "question": "Contraste el error naturalista y el sobrenaturalista sobre la gracia con la postura católica.",
      "answer": "El ERROR NATURALISTA se caracteriza por un optimismo ético ilimitado y desmedida confianza en la naturaleza humana. Sostiene que el estado de Adán antes y después del pecado no se diferencian esencialmente, que no existe el pecado original, que Cristo solo aprovechó por su buen ejemplo, y que el hombre puede convertirse a Dios y merecer la vida eterna con sus solas fuerzas. El ERROR SOBRENATURALISTA, propio del protestantismo, sostiene que la naturaleza humana está totalmente corrupta (no solo herida) por el pecado original, que el hombre es incapaz de cualquier bien, que la voluntad ante la gracia es pura pasividad, y que la justificación es por sola fides (sola fe fiduciaria), permaneciendo el hombre simultáneamente justo y pecador, sin renovación de la naturaleza. La POSTURA CATÓLICA es el equilibrio: frente al naturalismo defiende la absoluta necesidad de la gracia; frente al sobrenaturalismo defiende cierta capacidad de la naturaleza humana, que aun herida puede conocer algunas verdades religiosas y morales y realizar algunos actos buenos.",
      "priority": "alta"
    },
    {
      "id": "q-027",
      "chapterId": "cap13",
      "type": "corta",
      "question": "Defina pecado y mencione las tres condiciones para que algo sea pecado.",
      "answer": "Pecado es una transgresión voluntaria de la ley de Dios; o, según el CATIC 1849, una falta contra la razón, la verdad y la conciencia recta, faltar al amor a Dios y al prójimo a causa de un apego perverso a ciertos bienes. Las tres condiciones son: (1) materia prohibida (grave o leve), (2) advertencia (la inteligencia advierte que el acto es malo), y (3) consentimiento (la voluntad acepta libremente cometerlo).",
      "priority": "alta"
    },
    {
      "id": "q-028",
      "chapterId": "cap13",
      "type": "corta",
      "question": "Distinga pecado mortal y pecado venial.",
      "answer": "El pecado MORTAL es la transgresión voluntaria de la ley de Dios en materia GRAVE, con plena advertencia y perfecto consentimiento. Separa al hombre de Dios y hace perder la gracia santificante; supone aversión a Dios y conversión a la criatura (San Agustín). El pecado VENIAL es la transgresión en materia LEVE; 'venial' viene de venia (perdón). No supone aversión a Dios, sino solo desviación del recto camino. Disminuye la caridad, conduce a la tibieza espiritual y predispone al pecado mortal.",
      "priority": "alta"
    },
    {
      "id": "q-029",
      "chapterId": "cap14",
      "type": "desarrollo",
      "question": "Enumere y explique las cuatro notas distintivas de la Iglesia.",
      "answer": "Las cuatro notas, profesadas en el Credo, son: (1) UNA: la Iglesia es una y nunca varias simultáneas. La unidad se da en tres planos: de fe (mismas verdades reveladas), de comunión (sujeción al Papa y obispos) y de participación (mismos sacramentos y culto). El fundamento de la unidad es la fe, no la caridad. (2) SANTA: santa y santificante. Santa en su origen (su fundador es Cristo y su alma el Espíritu Santo) y en su fin (la glorificación de Dios y la salvación de los hombres). Santificante porque posee los medios de santificación. (3) CATÓLICA (del griego katholikos = universal): destinada a todos los hombres de todos los tiempos y lugares. (4) APOSTÓLICA: continuidad ininterrumpida con los Apóstoles elegidos por Cristo. La sucesión apostólica garantiza la transmisión fiel de la doctrina y la validez de los sacramentos.",
      "priority": "alta"
    },
    {
      "id": "q-030",
      "chapterId": "cap14",
      "type": "corta",
      "question": "Explique en qué consiste la infalibilidad papal y sus condiciones.",
      "answer": "La infalibilidad papal es una asistencia especial del Espíritu Santo (no una virtud personal del Papa) para que la Revelación divina se mantenga íntegra. El Papa es infalible solo cuando habla EX CATHEDRA, lo que requiere cuatro condiciones: (1) hablar como pastor y doctor de todos los fieles, (2) sobre materia de fe y costumbres, (3) con intención de definirla como doctrina de fe, y (4) con intención de obligar a toda la Iglesia. NO es infalible en sus opiniones personales, en asuntos de ciencia, política, economía o historia, en disciplina ordinaria, ni en homilías ordinarias.",
      "priority": "alta"
    },
    {
      "id": "q-031",
      "chapterId": "cap14",
      "type": "corta",
      "question": "Distinga herejía y cisma.",
      "answer": "Ambos son pecados contra la unidad de la Iglesia. La HEREJÍA rompe la unidad de fe: es la doctrina errónea de un bautizado que niega o duda en forma pertinaz de una verdad de fe definida (por ejemplo, negar la Inmaculada Concepción). El CISMA rompe la unidad de comunión: es la división de quienes, confesando la misma fe, rechazan la sujeción al Papa (por ejemplo, la Iglesia Ortodoxa).",
      "priority": "alta"
    },
    {
      "id": "q-032",
      "chapterId": "cap14",
      "type": "corta",
      "question": "¿Cuáles son los tres requisitos para ser miembro pleno de la Iglesia?",
      "answer": "(1) Haber recibido válidamente el bautismo (ministerio sacerdotal). (2) Profesar la verdadera fe (ministerio doctrinal). (3) Estar en comunión con la Iglesia, es decir, no estar separado por herejía ni por cisma.",
      "priority": "alta"
    }
  ]
}
```

---

## Notas para el agente

- El campo `priority: "alta"` marca contenido que aparece literalmente como definición destacada en el resumen original o como dogma con fecha. Son los más probables de un parcial.
- Los `priority: "media"` son contexto importante pero menos probable de aparecer como pregunta directa.
- Cuando agregue los Sacramentos más adelante, mantendré este mismo formato JSON para que la app pueda absorberlos sin cambios estructurales.
- Las citas bíblicas y latinas se respetan literalmente: NO traducirlas ni modernizarlas.
