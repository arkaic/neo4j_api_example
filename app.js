const express = require('express');
const neo4j = require('neo4j-driver').v1;

const app = express();
const port = 3000;
const dbUri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = 'password';

app.get('/create_employee/:name/:id', (req, res) => {
    const driver = neo4j.driver(dbUri, neo4j.auth.basic(user, password));
    const session = driver.session();
    const endMsg = `Created ${req.params.name}, ${req.params.id}`;

    session.run(
        'CREATE (:Employee {emp_id: $emp_id, name: $name})',
        {name: req.params.name, emp_id: req.params.id}
    ).then(() => {
        session.close(() => {
            console.log(endMsg + ' yup');
        });
        res.send(endMsg);
    });
});

app.get('/get_all_employees', (req, res) => {
    const driver = neo4j.driver(dbUri, neo4j.auth.basic(user, password));
    const session = driver.session();
    
    session.run(
        'MATCH (e:Employee) \
        RETURN e.name AS name, e.emp_id as id'
    ).then(result => {
        session.close();
        const resultJson = result.records.map(record => {
            return {'name': record.get('name'), 'emp_id': record.get('id')};
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(resultJson));
    });
});

app.listen(port, () => console.log(`listening on port ${port}!`))
