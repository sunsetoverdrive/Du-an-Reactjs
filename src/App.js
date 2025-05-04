import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux-setup/store";
import Header from "./shared/components/layouts/Header";
import Slider from "./shared/components/layouts/Slider";
import Footer from "./shared/components/layouts/Footer";
import Banner from "./shared/components/layouts/Banner";
import Menu from "./shared/components/layouts/Menu";
import routers from "./routers";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div>
            <Header />
            {/*	Body	*/}
            <div id="body">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <Menu />
                  </div>
                </div>
                <div className="row">
                  <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                    <Slider />

                    <Routes>
                      {routers.map((router, index) => (
                        <Route
                          key={index}
                          path={router.path}
                          element={<router.element />}
                        />
                      ))}
                    </Routes>
                  </div>
                  <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
                    <Banner />
                  </div>
                </div>
              </div>
            </div>
            {/*	End Body	*/}
            <Footer />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
