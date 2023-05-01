import AppNavbar from "./AppNavbar";
import { Container, Row, Tabs, Tab } from 'react-bootstrap';

const DashboardRestoranti = (props) => {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div>
      <div>
        <AppNavbar />
        <Container className='py-4'>
          <h6>{username}</h6>
          <Row className='justify-content-center'>
            <Tabs justify variant='pills' defaultActiveKey="tab-1" className='mb-1 p-0 border'>
              <Tab eventKey="tab-1" title="Menu-të">
                Tab 1 Content
              </Tab>
              <Tab eventKey="tab-2" title="Te dhenat e Restorantit">
                <form class="row g-3 w-75 mx-auto">
                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">
                      Email
                    </label>
                    <input type="email" class="form-control" id="inputEmail4" disabled={true} defaultValue={email} />
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">
                      Password
                    </label>
                    <input type="password" class="form-control" id="inputPassword4" />
                  </div>
                  <div class="col-12">
                    <label for="username" class="form-label">
                      username
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Restorant username"
                    />
                  </div>
                  <div class="col-12">
                    <label for="inputAddress2" class="form-label">
                      Adresa
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Lagjja, Rruga, Numri"
                    />
                  </div>
                  <button type="button" class="btn btn-info btn-block">
                    Shto adresë të re
                  </button>
                  <label for="" class="form-label">
                    Qyteti
                  </label>
                  <select class="btn btn-block form-control border">
                    <option>Qyteti</option>
                    <option>Prishtinë</option>
                  </select>
                  <button type="button" class="btn btn-info btn-block">
                    Shto qytet të ri
                  </button>
                  <div class="col-12">
                    <label for="inputAddress2" class="form-label">
                      Nr. Kontaktues 1
                    </label>
                    <input type="text" class="form-control" placeholder="Qyteti" />
                  </div>
                  <button type="button" class="btn btn-info btn-block">
                    Shto nr. kontaktues te ri
                  </button>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </Tab>
              <Tab eventKey="tab-3" title="Porositë ">
                Tab 3 Content
              </Tab>
            </Tabs>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default DashboardRestoranti
