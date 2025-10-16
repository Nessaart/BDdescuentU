const express = require("express");
const { getFirestore } = require("firebase-admin/firestore");
const db = require("../../services/firebaseService.js");
const router = express.Router();

//  Colección DESCUENTOS 
const descuentosCollection = "descuentos";

router.get("/descuentos/all", async (req, res) => {
  try {
    const snapshot = await db.collection(descuentosCollection).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener descuentos:", error);
    res.status(500).send("Error al obtener descuentos");
  }
});

router.get("/descuentos/:id", async (req, res) => {
  try {
    const doc = await db.collection(descuentosCollection).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send("Descuento no encontrado");
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error al obtener descuento:", error);
    res.status(500).send("Error al obtener descuento");
  }
});

router.post("/descuentos", async (req, res) => {
  try {
    const {
      id,
      codigo_validacion,
      condiciones,
      descripcion,
      fecha_inicio,
      fecha_fin,
      fecha_uso,
      id_estudiante,
      id_negocio,
      porcentaje
    } = req.body;

    if (!id || !codigo_validacion || !condiciones || !descripcion || !fecha_inicio || !fecha_fin || !id_estudiante || !id_negocio || porcentaje === undefined) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    };

    const data = {
      codigo_validacion,
      condiciones,
      descripcion,
      fecha_inicio: new Date(fecha_inicio),
      fecha_fin: new Date(fecha_fin),
      fecha_uso: fecha_uso ? new Date(fecha_uso) : null,
      id_estudiante,
      id_negocio,
      porcentaje
    };

    await db.collection(descuentosCollection).doc(id).set(data);
    res.status(201).json({ message: "Descuento creado correctamente", id });
  } catch (error) {
    console.error("Error al crear descuento:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

//  Colección ESTUDIANTES 
const estudiantesCollection = "estudiantes";

router.get("/estudiantes/all", async (req, res) => {
  try {
    const snapshot = await db.collection(estudiantesCollection).get();
    res.status(200).json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    res.status(500).send("Error al obtener estudiantes");
  }
});

router.get("/estudiantes/:id", async (req, res) => {
  try {
    const doc = await db.collection(estudiantesCollection).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send("Estudiante no encontrado");
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error al obtener estudiante:", error);
    res.status(500).send("Error interno");
  }
});

router.post("/estudiantes", async (req, res) => {
  try {
    const { id, credencial, estado_verificacion, id_universidad, nombre } = req.body;

    if (!id || !credencial || estado_verificacion === undefined || !id_universidad || !nombre) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const data = { credencial, estado_verificacion, id_universidad, nombre };
    await db.collection(estudiantesCollection).doc(id).set(data);
    res.status(201).json({ message: "Estudiante creado correctamente", id });
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

//  Colección NEGOCIOS 
const negociosCollection = "negocios";

router.get("/negocios/all", async (req, res) => {
  try {
    const snapshot = await db.collection(negociosCollection).get();
    res.status(200).json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error("Error al obtener negocios:", error);
    res.status(500).send("Error al obtener negocios");
  }
});

router.get("/negocios/:id", async (req, res) => {
  try {
    const doc = await db.collection(negociosCollection).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send("Negocio no encontrado");
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error al obtener negocio:", error);
    res.status(500).send("Error interno");
  }
});

router.post("/negocios", async (req, res) => {
  try {
    const { id, direccion, negocios } = req.body;

    if (!id || !direccion || !negocios) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const data = { direccion, negocios };
    await db.collection(negociosCollection).doc(id).set(data);
    res.status(201).json({ message: "Negocio creado correctamente", id });
  } catch (error) {
    console.error("Error al crear negocio:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

//  Colección UNIVERSIDADES 
const universidadesCollection = "universidades";

router.get("/universidades/all", async (req, res) => {
  try {
    const snapshot = await db.collection(universidadesCollection).get();
    res.status(200).json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error("Error al obtener universidades:", error);
    res.status(500).send("Error al obtener universidades");
  }
});

router.get("/universidades/:id", async (req, res) => {
  try {
    const doc = await db.collection(universidadesCollection).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send("Universidad no encontrada");
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error al obtener universidad:", error);
    res.status(500).send("Error interno");
  }
});

router.post("/universidades", async (req, res) => {
  try {
    const { id, dominio_email, nombre } = req.body;

    if (!id || !dominio_email || !nombre) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const data = { dominio_email, nombre };
    await db.collection(universidadesCollection).doc(id).set(data);
    res.status(201).json({ message: "Universidad creada correctamente", id });
  } catch (error) {
    console.error("Error al crear universidad:", error);
    res.status(500).json({ error: "Error interno" });
 return res.status(500).json({ error: "Internal Server Error" });
   }
 });


module.exports = router;




// const express = require("express");
// const { getFirestore } = require("firebase-admin/firestore");
// const db = require("../../services/firebaseService.js");
// const router = express.Router();

// // ========== GET all documents ==========
// router.get("/all", async (req, res) => {
//   try {
//     const collectionName = "Test";
//     const snapshot = await db.collection(collectionName).get();

//     // Collect documents into an array
//     const data = [];
//     snapshot.forEach((doc) => {
//       data.push({ id: doc.id, ...doc.data() });
//     });

//     return res.status(200).json(data);
//   } catch (err) {
//     console.error("Error retrieving documents:", err);
//     return res.status(500).send("Error retrieving all documents");
//   }
// });

// // ========== GET one document by ID ==========
// router.get("/one/:id", async (req, res) => {
//   const collectionName = "Test";
//   const { id } = req.params;

//   try {
//     const docRef = db.collection(collectionName).doc(id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).send(`Document with ID '${id}' not found`);
//     }

//     return res.status(200).json({ id: doc.id, ...doc.data() });
//   } catch (err) {
//     console.error("Error retrieving document:", err);
//     return res.status(500).send("Error retrieving the document");
//   }
// });

// // ========== POST new document ==========
// router.post("/post", async (req, res) => {
//   const collectionName = "Test";
//   try {
//     const { id, param1, param2, paramN } = req.body;

//     // Validate required fields
//     if (!id || !param1 || !param2 || !paramN) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Create the data object
//     const data = {
//       param1: param1,
//       param2: param2,
//       paramN: paramN,
//     };

//     // Save document with specific ID
//     await db.collection(collectionName).doc(id).set(data);
//     return res.status(201).json({ message: "Document successfully created", id });
//   } catch (error) {
//     console.error("Error creating document:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// module.exports = router;
