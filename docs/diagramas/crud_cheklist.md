# Create CRUD Checklist

  -/src/lib/entidad/entidad.ts
    - definir la clase, interfaz
  -/src/routes/entidad/entidad.ts
    - definir los endpoints usando express.Routers y exportar la instancia del rauter
  - /  src/routes/index.ts
    - importar el router de la entidad y registrar el path (router.use)

    Nota: son 5 endpoints y 5 metodos en la libreria
        -getAll
        -getById
        -add
        -update
        -delete