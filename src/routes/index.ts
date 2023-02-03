import express from 'express';
const router  = express.Router();
import empresasRouter from './empresas/empresas';
// REST API
// Internet ->HTTP -> REST API -> DB
// SOAP XML wsdl
// {} -> JSON
// [] -> JSON
// { llave : valor }
// valor: texto, numerico, booleano, array [valores], objeto {llave:valor}

// REST stateless, resource unique representation
// CRUD Create, Read, Update, Delete
//     POST, GET,PUT, DELETE

//http://localhost:3001
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 //http://localhost:3001/version
 router.get('/version', (_req, res) => {
  const version: string = "1.0.0";
  const jsonResp = {"name":"FODA Be","version":version};
  //string, number, boolean, type, interfaces, classes, enumerators
  res.json(jsonResp);
 });

 //http://localhost:3001/empresas
 router.use('/empresas',empresasRouter);

 //router.get router.post router.delete router.put router.use 
export default router;
