const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());


// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'Kis'
};

// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con la base de datos MySQL');
});

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Ruta GET para obtener todos los pacientes
app.get('/api/personas', (req, res) => {
    // Consulta SQL para obtener todos los pacientes
    const sql = 'SELECT * FROM persona';

    // Ejecutar la consulta SQL
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error al obtener los pacientes' });
            return;
        }
        // Enviar los resultados como respuesta
        res.json(results);
    });
});



app.post('/api/persona', (req, res) => {
    const { nombre, apellido, rut, sexo, telefono, direccion, fechaNacimiento, correoElectronico } = req.body;

    // Consulta SQL para insertar una nueva persona en la base de datos
    const sql = 'INSERT INTO persona (nombre, apellido, rut, sexo, telefono, direccion, fechaNacimiento, correoElectronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, apellido, rut, sexo, telefono, direccion, fechaNacimiento, correoElectronico];

    // Ejecutar la consulta SQL
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar persona:', err);
            res.status(500).json({ error: 'Error al insertar persona' });
            return;
        }
        // Enviar una respuesta indicando que la persona fue creada correctamente
        res.status(201).json({ message: 'Persona creada correctamente', personaId: result.insertId });
    });
});
// Resto de los endpoints y definiciones de rutas...

app.delete('/api/persona/:id', (req, res) => {
    const personaId = req.params.id;

    // Consulta SQL para eliminar la persona de la base de datos
    const sql = 'DELETE FROM persona WHERE id = ?';
    const values = [personaId];

    // Ejecutar la consulta SQL
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al eliminar persona:', err);
            res.status(500).json({ error: 'Error al eliminar persona' });
            return;
        }
        // Verificar si se eliminó correctamente
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Persona no encontrada' });
            return;
        }
        // Enviar una respuesta indicando que la persona fue eliminada correctamente
        res.json({ message: 'Persona eliminada correctamente', personaId: personaId });
    });
});


app.get('/api/personas/buscar/:nombre', (req, res) => {
    const nombre = req.params.nombre;

    // Consulta SQL para buscar personas por nombre
    const sql = 'SELECT * FROM persona WHERE nombre LIKE ?';
    const values = [`%${nombre}%`];
    // Ejecutar la consulta SQL
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error al buscar personas por nombre' });
            return;
        }
        // Verificar si se encontraron resultados
        if (results.length === 0) {
            res.status(404).json({ error: 'No se encontraron personas con ese nombre' });
            return;
        }
        // Enviar los resultados como respuesta
        res.json(results);
    });
});
// Endpoint para actualizar los atributos de un registro por su ID
app.put('/api/persona/:id', (req, res) => {
    const personaId = req.params.id;
    const { nombre, apellido, rut, sexo, telefono, direccion, fechaNacimiento, correoElectronico } = req.body;

    // Consulta SQL para actualizar los atributos de la persona en la base de datos
    const sql = 'UPDATE persona SET nombre = ?, apellido = ?, rut = ?, sexo = ?, telefono = ?, direccion = ?, fechaNacimiento = ?, correoElectronico = ? WHERE id = ?';
    const values = [nombre, apellido, rut, sexo, telefono, direccion, fechaNacimiento, correoElectronico, personaId];

    // Ejecutar la consulta SQL
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar persona:', err);
            res.status(500).json({ error: 'Error al actualizar persona' });
            return;
        }
        // Verificar si se actualizó correctamente
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Persona no encontrada' });
            return;
        }
        // Enviar una respuesta indicando que la persona fue actualizada correctamente
        res.json({ message: 'Persona actualizada correctamente', personaId: personaId });
    });
});
// Iniciar el servidor y hacer que escuche en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor API iniciado en el puerto ${PORT}`);
});