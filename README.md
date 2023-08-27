## How to run on local machine
1. Create *.env* file with db credentials (see *.envExample*).
2. Run docker with db. Use same creds from *.env* file:  
```sh
docker run --name pg-13.3 -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tradeDb -d postgres:13.3
```
3. Run server
```sh
npm run start:dev
```
4. Run script with client to test app:
```sh
node dist/src/test-client/client.js
```  


### Notes
- New entities are created when the server starts.  
- The database is cleared every day at 00:00.  
