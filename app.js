const express = require('express');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver').v1;

const app = express();
const appPort = 3000;

const dbPort = 7687;
const dbUri = `bolt://localhost:${dbPort}`;
const user = 'neo4j';
const password = 'password';

// enable cors for html form to retrieve all employees
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// enable parsing body of POST requests
app.use(bodyParser());

// create one
app.post('/create_employee/', (req, res) => {
    const driver = neo4j.driver(dbUri, neo4j.auth.basic(user, password));
    const session = driver.session();

    console.log('body:',req.body);
    const name = req.body.name;
    const id = req.body.emp_id;
    const endMsg = `Created ${name}, ${id}`;

    session.run(
        'CREATE (:Employee {emp_id: $emp_id, name: $name})',
        {name: name, emp_id: id}
    ).then(() => {
        session.close(() => console.log(endMsg));
        res.send(endMsg);
    });
});

// get all
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

app.listen(appPort, () => console.log(`listening on port ${appPort}!\nneo4j uri: ${dbUri}`))
