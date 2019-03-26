# Example Neo4j API Application


How to install:

Install Neo4j Desktop and start up an instance with port pointed to 7687

```shell
npm install
npm start
```

## API endpoints

Creating an employee with a name and id:
```
http://localhost:3000/create_employee/:name/:emp_id
```

Retrieving all employees:
```
http://localhost:3000/get_all_employees
```

