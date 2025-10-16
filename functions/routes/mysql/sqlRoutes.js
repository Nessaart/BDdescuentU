const express = require("express");
const SqlService = require("../../../services/sqlService");

const router = express.Router();
const TABLE_NEGOCIO = "negocio";

// CREATE
router.post('/create', async (req, res) => {
  const { nombre, direccion, categoria } = req.body;
  if (!nombre || !direccion || !categoria) {
    return res.status(400).send("Faltan campos obligatorios.");
  }

  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `INSERT INTO ${TABLE_NEGOCIO} (nombre, direccion, categoria) VALUES (?, ?, ?)`,
      [nombre, direccion, categoria]
    );
    res.status(200).send(" Negocio creado exitosamente.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send(" Error al crear negocio.");
  } finally {
    await db.closeConnection();
  }
});

// READ ALL
router.get('/get-all', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const data = await db.query(`SELECT * FROM ${TABLE_NEGOCIO}`);
    res.status(200).json(data);
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al obtener negocios.");
  } finally {
    await db.closeConnection();
  }
});

// READ ONE
router.get('/get-one/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const result = await db.query(
      `SELECT * FROM ${TABLE_NEGOCIO} WHERE id_negocio = ?`,
      [req.params.id]
    );
    if (result.length === 0) return res.status(404).send("Negocio no encontrado.");
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al obtener negocio.");
  } finally {
    await db.closeConnection();
  }
});

// UPDATE
router.put('/update/:id', async (req, res) => {
  const { nombre, direccion, categoria } = req.body;
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `UPDATE ${TABLE_NEGOCIO} SET nombre = ?, direccion = ?, categoria = ? WHERE id_negocio = ?`,
      [nombre, direccion, categoria, req.params.id]
    );
    res.status(200).send(" Negocio actualizado.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al actualizar negocio.");
  } finally {
    await db.closeConnection();
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(`DELETE FROM ${TABLE_NEGOCIO} WHERE id_negocio = ?`, [req.params.id]);
    res.status(200).send(" Negocio eliminado.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al eliminar negocio.");
  } finally {
    await db.closeConnection();
  }
});


/////////////////////////////

const TABLE_ESTUDIANTE = "estudiante";

// CREATE
router.post('/create', async (req, res) => {
  const { nombre, correo, credencial, estado_verificacion, id_universidad } = req.body;
  if (!nombre || !correo || !credencial || !id_universidad) {
    return res.status(400).send("Faltan campos obligatorios.");
  }

  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `INSERT INTO ${TABLE_ESTUDIANTE} (nombre, correo, credencial, estado_verificacion, id_universidad)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, correo, credencial, estado_verificacion || 0, id_universidad]
    );
    res.status(200).send(" Estudiante creado exitosamente.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send(" Error al crear estudiante.");
  } finally {
    await db.closeConnection();
  }
});

// READ ALL
router.get('/get-all', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const data = await db.query(`SELECT * FROM ${TABLE_ESTUDIANTE}`);
    res.status(200).json(data);
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al obtener estudiantes.");
  } finally {
    await db.closeConnection();
  }
});

// READ ONE
router.get('/get-one/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const result = await db.query(
      `SELECT * FROM ${TABLE_ESTUDIANTE} WHERE id_estudiante = ?`,
      [req.params.id]
    );
    if (result.length === 0) return res.status(404).send("Estudiante no encontrado.");
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al obtener estudiante.");
  } finally {
    await db.closeConnection();
  }
});

// UPDATE
router.put('/update/:id', async (req, res) => {
  const { nombre, correo, credencial, estado_verificacion, id_universidad } = req.body;
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `UPDATE ${TABLE_ESTUDIANTE} SET nombre = ?, correo = ?, credencial = ?, estado_verificacion = ?, id_universidad = ? 
       WHERE id_estudiante = ?`,
      [nombre, correo, credencial, estado_verificacion, id_universidad, req.params.id]
    );
    res.status(200).send(" Estudiante actualizado.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al actualizar estudiante.");
  } finally {
    await db.closeConnection();
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(`DELETE FROM ${TABLE_ESTUDIANTE} WHERE id_estudiante = ?`, [req.params.id]);
    res.status(200).send(" Estudiante eliminado.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al eliminar estudiante.");
  } finally {
    await db.closeConnection();
  }
});


///////////////////////////////

const TABLE_UNIVERSIDAD = "universidad";

// CREATE
router.post('/create', async (req, res) => {
  const { nombre, dominio_email } = req.body;
  if (!nombre || !dominio_email) return res.status(400).send("Faltan campos obligatorios.");

  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `INSERT INTO ${TABLE_UNIVERSIDAD} (nombre, dominio_email) VALUES (?, ?)`,
      [nombre, dominio_email]
    );
    res.status(200).send(" Universidad creada exitosamente.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al crear universidad.");
  } finally {
    await db.closeConnection();
  }
});

// READ ALL
router.get('/get-all', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const data = await db.query(`SELECT * FROM ${TABLE_UNIVERSIDAD}`);
    res.status(200).json(data);
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al obtener universidades.");
  } finally {
    await db.closeConnection();
  }
});

// READ ONE
router.get('/get-one/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const result = await db.query(
      `SELECT * FROM ${TABLE_UNIVERSIDAD} WHERE id_universidad = ?`,
      [req.params.id]
    );
    if (result.length === 0) return res.status(404).send("Universidad no encontrada.");
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al obtener universidad.");
  } finally {
    await db.closeConnection();
  }
});

// UPDATE
router.put('/update/:id', async (req, res) => {
  const { nombre, dominio_email } = req.body;
 
  try {
    await db.connectToDb();
    await db.query(
      `UPDATE ${TABLE_UNIVERSIDAD} SET nombre = ?, dominio_email = ? WHERE id_universidad = ?`,
      [nombre, dominio_email, req.params.id]
    );
    res.status(200).send(" Universidad actualizada.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al actualizar universidad.");
  } finally {
    await db.closeConnection();
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(`DELETE FROM ${TABLE_UNIVERSIDAD} WHERE id_universidad = ?`, [req.params.id]);
    res.status(200).send(" Universidad eliminada.");
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error al eliminar universidad.");
  } finally {
    await db.closeConnection();
  }
});


/////////////////////////////////

const TABLE_USO = "uso_descuento";

// CREATE
router.post('/create', async (req, res) => {
  const { id_descuento, id_estudiante, fecha_uso, codigo_validacion } = req.body;
  if (!id_descuento || !id_estudiante || !codigo_validacion) {
    return res.status(400).send("Faltan campos obligatorios.");
  }

  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `INSERT INTO ${TABLE_USO} (id_descuento, id_estudiante, fecha_uso, codigo_validacion)
       VALUES (?, ?, ?, ?)`,
      [id_descuento, id_estudiante, fecha_uso || new Date(), codigo_validacion]
    );
    res.status(200).send(" Uso de descuento registrado.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al crear uso_descuento.");
  } finally {
    await db.closeConnection();
  }
});

// READ ALL
router.get('/get-all', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const data = await db.query(`SELECT * FROM ${TABLE_USO}`);
    res.status(200).json(data);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al obtener usos.");
  } finally {
    await db.closeConnection();
  }
});

// READ ONE
router.get('/get-one/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    const result = await db.query(
      `SELECT * FROM ${TABLE_USO} WHERE id_uso = ?`,
      [req.params.id]
    );
    if (result.length === 0) return res.status(404).send("Uso de descuento no encontrado.");
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al obtener uso.");
  } finally {
    await db.closeConnection();
  }
});

// UPDATE
router.put('/update/:id', async (req, res) => {
  const { id_descuento, id_estudiante, fecha_uso, codigo_validacion } = req.body;
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      `UPDATE ${TABLE_USO} 
       SET id_descuento = ?, id_estudiante = ?, fecha_uso = ?, codigo_validacion = ?
       WHERE id_uso = ?`,
      [id_descuento, id_estudiante, fecha_uso, codigo_validacion, req.params.id]
    );
    res.status(200).send(" Uso de descuento actualizado.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al actualizar uso_descuento.");
  } finally {
    await db.closeConnection();
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(`DELETE FROM ${TABLE_USO} WHERE id_uso = ?`, [req.params.id]);
    res.status(200).send("🗑️ Uso de descuento eliminado.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error al eliminar uso_descuento.");
  } finally {
    await db.closeConnection();
  }
});

module.exports = router;





//lo del profe
// 


// const express = require("express");
// const SqlService = require("../../services/sqlService");

// const router = express.Router();


// // ========== Post entry to table ==========
// router.post('/post', async (req, res) => {
//   const { param1, param2, paramN } = req.body;
//   if (!param1 || !param2 || !paramN) {
//     return res.status(400).send("Missing fields.");
//   }

//   const db = new SqlService();
//   const tableName = "test_table"
//   try {
//     await db.connectToDb();
//     await db.query(
//       `INSERT INTO ${tableName} (param1, param2, paramN) VALUES (?, ?, ?)`,
//       [param1, param2, paramN]
//     );
//     res.status(200).send("Entry created");
//   } catch (err) {
//     console.error("SQL error:", err);
//     res.status(500).send("Error creating entry.");
//   } finally {
//     await db.closeConnection();
//   }
// });

// // ========== Get all entries of a table ==========
// router.get('/get-all', async (req, res) => {
//   const db = new SqlService();
//   const tableName = "test_table"
//   try {
//     await db.connectToDb();
//     const data = await db.query(`SELECT * FROM ${tableName}`);
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("SQL error:", err);
//     res.status(500).send("Error fetching data.");
//   } finally {
//     await db.closeConnection();
//   }
// });

// // ========== Get one entry of a table ==========
// router.get('/get-one/:id', async (req, res) => {
//   const db = new SqlService();
//   const tableName = "test_table"
//   try {
//     await db.connectToDb();
//     const result = await db.query(
//       `SELECT * FROM ${tableName} WHERE id = ?`,
//       [req.params.id]
//     );
//     await db.closeConnection();

//     if (result.length === 0) {
//       res.status(404).send("Entry not found.");
//     } else {
//       res.status(200).json(result[0]);
//     }
//   } catch (err) {
//     console.error("SQL error:", err);
//     res.status(500).send("Error retrieving info.");
//   }
// });
// module.exports = router;