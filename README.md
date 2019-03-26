# Example Neo4j API Application


How to install:

Install Neo4j Desktop and start up an instance with port pointed to 7687

```shell
npm install
npm start
```

## API endpoints

Creating an employee with the name "Forest" and id=6:
```
curl --header "Content-Type: application/json" -X POST http://localhost:3000/create_employee --data '{"name":"Forest", "emp_id":"6"}'
```

Retrieving all employees, a JSON list of {name, emp_id} objects:
```
curl http://localhost:3000/get_all_employees
```

## UI
Open `index.html` in a browser. There will be inputs for creating Employee nodes with Name and Id parameters. There is also a button for getting and displaying all employee nodes.
