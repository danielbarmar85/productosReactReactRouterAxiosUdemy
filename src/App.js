import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AgregarProducto from "./components/AgregarProducto";
import Productos from "./components/Productos";
import EditarProducto from "./components/EditarProducto";
import Producto from "./components/Producto";
import Header from "./components/Header";
import axios from "axios";

const App = () => {
  const [productos, guardarProductos] = useState([]);
  const [recargaProducto, setRecargaProducto] = useState(true);

  useEffect(() => {
    if (recargaProducto) {
      const consultarApi = async () => {
        // Consultar la API de json-server
        const resultado = await axios.get("http://localhost:4000/restaurant");
        console.log(resultado);
        guardarProductos(resultado.data);
      };
      consultarApi();

      //Cambia a false la recarga de los productos
      setRecargaProducto(false);
    }
  }, [recargaProducto]);

  return (
    <Router>
      <Header />
      <main className="conteiner mt-5">
        <Switch>
          <Route
            exact
            path="/productos"
            render={() => (
              <Productos
                productos={productos}
                setRecargaProducto={setRecargaProducto}
              />
            )}
          />

          <Route
            exact
            path="/nuevo-producto"
            render={() => (
              <AgregarProducto setRecargaProducto={setRecargaProducto} />
            )}
          />

          <Route exact path="/productos/:id" component={Producto} />
          <Route
            exact
            path="/productos/editar/:id"
            render={props => {
              // ID Product.
              const idProducto = parseInt(props.match.params.id);

              // Producto que se pasa a el State.
              const producto = productos.filter(
                producto => producto.id === idProducto
              );

              return (
                <EditarProducto
                  producto={producto[0]}
                  setRecargaProducto={setRecargaProducto}
                />
              );
            }}
          />
        </Switch>
      </main>

      <p className="mt-2 p2 text-center">Todos los derechos reservados</p>
    </Router>
  );
};

export default App;
